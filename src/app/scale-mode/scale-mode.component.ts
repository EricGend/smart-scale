import { Component, OnInit, Input } from '@angular/core';
import {BluetoothLowEnergyComponent} from "../bluetooth-low-energy/bluetooth-low-energy.component";

@Component({
  selector: 'app-scale-mode',
  templateUrl: './scale-mode.component.html',
  styleUrls: ['./scale-mode.component.scss'],
})
export class ScaleModeComponent implements OnInit {
  @Input() name: string;

  bleComponent:BluetoothLowEnergyComponent = new BluetoothLowEnergyComponent();
  counter: number = 0;
  constructor() { }

  ngOnInit() {
    this.bleComponent.main();
  }

  addPlusOne(): number {
    return this.bleComponent.weight;
  }


}
