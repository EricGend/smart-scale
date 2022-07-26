import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScaleModeComponent } from './scale-mode.component';
import { BluetoothLowEnergyComponent } from '../bluetooth-low-energy/bluetooth-low-energy.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [ScaleModeComponent],
  exports: [ScaleModeComponent]
})
export class ScaleModeComponentModule {}
