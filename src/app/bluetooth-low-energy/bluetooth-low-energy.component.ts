import { Component, OnChanges, OnInit, SimpleChange, SimpleChanges, Input } from '@angular/core';

import { BleClient, numbersToDataView, numberToUUID } from '@capacitor-community/bluetooth-le';
@Component({
  selector: 'app-bluetooth-low-energy',
  templateUrl: './bluetooth-low-energy.component.html',
  styleUrls: ['./bluetooth-low-energy.component.scss'],
})
export class BluetoothLowEnergyComponent implements OnInit, OnChanges {

  @Input() weight : number;
  constructor() { }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);  
  }
 
  
  async ngOnInit() {
    await BleClient.initialize({ androidNeverForLocation: true });
  }


 WEIGHT_MEASUREMENT_SERVICE = '0000180a-0000-1000-8000-00805f9b34fb';
 WEIGHT_MEASUREMENT_CHARACTERISTIC = '2D2F88C4-F244-5A80-21F1-EE0224E80658';


  async main(): Promise<void> {
    try {
      await BleClient.initialize();
  
      const device = await BleClient.requestDevice({
        services: [this.WEIGHT_MEASUREMENT_SERVICE],
      });
  
      // connect to device, the onDisconnect callback is optional
      await BleClient.connect(device.deviceId, (deviceId) => this.onDisconnect(deviceId));
      console.log('connected to device', device);
  
      const result = await BleClient.read(device.deviceId, this.WEIGHT_MEASUREMENT_SERVICE, this.WEIGHT_MEASUREMENT_CHARACTERISTIC );
      console.log('body sensor location', result.getUint8(0));
  
  
      await BleClient.startNotifications(
        device.deviceId,
        this.WEIGHT_MEASUREMENT_SERVICE,
        this.WEIGHT_MEASUREMENT_CHARACTERISTIC,
        (value) => {
          console.log('current heart rate', this.parseWeight(value));
          this.weight = this.parseWeight(value);
        }
      );
  
      /*/ disconnect after 10 sec
      setTimeout(async () => {
        await BleClient.stopNotifications(device.deviceId, HEART_RATE_SERVICE, HEART_RATE_MEASUREMENT_CHARACTERISTIC);
        await BleClient.disconnect(device.deviceId);
        console.log('disconnected from device', device);
      }, 10000);*/
    } catch (error) {
      console.error(error);
    }
  }
  
  onDisconnect(deviceId: string): void {
    console.log(`device ${deviceId} disconnected`);
  }
  
  parseWeight(value: DataView): number {    
    const flags = value.getUint8(0);
    try{
      this.weight = value.getInt32(0, true);
    }catch(error){
      console.error(error);
    }
    return this.weight;
  }
}
