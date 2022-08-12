"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_tab_Scale-Mode_tab1_module_ts"],{

/***/ 8526:
/*!************************************************************************!*\
  !*** ./src/app/bluetooth-low-energy/bluetooth-low-energy.component.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BluetoothLowEnergyComponent": () => (/* binding */ BluetoothLowEnergyComponent)
/* harmony export */ });
/* harmony import */ var _home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _bluetooth_low_energy_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bluetooth-low-energy.component.html?ngResource */ 3950);
/* harmony import */ var _bluetooth_low_energy_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bluetooth-low-energy.component.scss?ngResource */ 968);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _capacitor_community_bluetooth_le__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @capacitor-community/bluetooth-le */ 695);






let BluetoothLowEnergyComponent = class BluetoothLowEnergyComponent {
  constructor() {
    //@Input() weight : number;
    this.weight = 0;
    this.WEIGHT_MEASUREMENT_SERVICE = '0000180a-0000-1000-8000-00805f9b34fb';
    this.WEIGHT_MEASUREMENT_CHARACTERISTIC = '2D2F88C4-F244-5A80-21F1-EE0224E80658';
  }

  ngOnChanges(changes) {
    console.log(changes);
  }

  ngOnInit() {
    return (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _capacitor_community_bluetooth_le__WEBPACK_IMPORTED_MODULE_3__.BleClient.initialize({
        androidNeverForLocation: true
      });
    })();
  }

  main() {
    var _this = this;

    return (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        yield _capacitor_community_bluetooth_le__WEBPACK_IMPORTED_MODULE_3__.BleClient.initialize();
        const device = yield _capacitor_community_bluetooth_le__WEBPACK_IMPORTED_MODULE_3__.BleClient.requestDevice({
          services: [_this.WEIGHT_MEASUREMENT_SERVICE]
        }); // connect to device, the onDisconnect callback is optional

        yield _capacitor_community_bluetooth_le__WEBPACK_IMPORTED_MODULE_3__.BleClient.connect(device.deviceId, deviceId => _this.onDisconnect(deviceId));
        console.log('connected to device', device);
        const result = yield _capacitor_community_bluetooth_le__WEBPACK_IMPORTED_MODULE_3__.BleClient.read(device.deviceId, _this.WEIGHT_MEASUREMENT_SERVICE, _this.WEIGHT_MEASUREMENT_CHARACTERISTIC);
        console.log('body sensor location', result.getUint8(0));
        yield _capacitor_community_bluetooth_le__WEBPACK_IMPORTED_MODULE_3__.BleClient.startNotifications(device.deviceId, _this.WEIGHT_MEASUREMENT_SERVICE, _this.WEIGHT_MEASUREMENT_CHARACTERISTIC, value => {
          console.log('current heart rate', _this.parseWeight(value));
          _this.weight = _this.parseWeight(value);
        });
        /*/ disconnect after 10 sec
        setTimeout(async () => {
          await BleClient.stopNotifications(device.deviceId, HEART_RATE_SERVICE, HEART_RATE_MEASUREMENT_CHARACTERISTIC);
          await BleClient.disconnect(device.deviceId);
          console.log('disconnected from device', device);
        }, 10000);*/
      } catch (error) {
        console.error(error);
      }
    })();
  }

  onDisconnect(deviceId) {
    console.log(`device ${deviceId} disconnected`);
  }

  parseWeight(value) {
    const flags = value.getUint8(0);

    try {
      this.weight = value.getInt32(0, true);
    } catch (error) {
      console.error(error);
    }

    return this.weight;
  }

};

BluetoothLowEnergyComponent.ctorParameters = () => [];

BluetoothLowEnergyComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Component)({
  selector: 'app-bluetooth-low-energy',
  template: _bluetooth_low_energy_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [_bluetooth_low_energy_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_2__]
})], BluetoothLowEnergyComponent);


/***/ }),

/***/ 7970:
/*!****************************************************!*\
  !*** ./src/app/scale-mode/scale-mode.component.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScaleModeComponent": () => (/* binding */ ScaleModeComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _scale_mode_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scale-mode.component.html?ngResource */ 4025);
/* harmony import */ var _scale_mode_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scale-mode.component.scss?ngResource */ 4240);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _bluetooth_low_energy_bluetooth_low_energy_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../bluetooth-low-energy/bluetooth-low-energy.component */ 8526);





let ScaleModeComponent = class ScaleModeComponent {
    constructor() {
        this.bleComponent = new _bluetooth_low_energy_bluetooth_low_energy_component__WEBPACK_IMPORTED_MODULE_2__.BluetoothLowEnergyComponent();
        this.counter = 0;
    }
    ngOnInit() {
        this.bleComponent.main();
    }
    addPlusOne() {
        return this.bleComponent.weight;
    }
};
ScaleModeComponent.ctorParameters = () => [];
ScaleModeComponent.propDecorators = {
    name: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Input }]
};
ScaleModeComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-scale-mode',
        template: _scale_mode_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_scale_mode_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], ScaleModeComponent);



/***/ }),

/***/ 7140:
/*!*************************************************!*\
  !*** ./src/app/scale-mode/scale-mode.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScaleModeComponentModule": () => (/* binding */ ScaleModeComponentModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var _scale_mode_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scale-mode.component */ 7970);






let ScaleModeComponentModule = class ScaleModeComponentModule {
};
ScaleModeComponentModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonicModule],
        declarations: [_scale_mode_component__WEBPACK_IMPORTED_MODULE_0__.ScaleModeComponent],
        exports: [_scale_mode_component__WEBPACK_IMPORTED_MODULE_0__.ScaleModeComponent]
    })
], ScaleModeComponentModule);



/***/ }),

/***/ 5125:
/*!*******************************************************!*\
  !*** ./src/app/tab_Scale-Mode/tab1-routing.module.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tab1PageRoutingModule": () => (/* binding */ Tab1PageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 124);
/* harmony import */ var _tab1_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tab1.page */ 4408);




const routes = [
    {
        path: '',
        component: _tab1_page__WEBPACK_IMPORTED_MODULE_0__.Tab1Page,
    }
];
let Tab1PageRoutingModule = class Tab1PageRoutingModule {
};
Tab1PageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
    })
], Tab1PageRoutingModule);



/***/ }),

/***/ 5289:
/*!***********************************************!*\
  !*** ./src/app/tab_Scale-Mode/tab1.module.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tab1PageModule": () => (/* binding */ Tab1PageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 3819);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2560);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 4666);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 2508);
/* harmony import */ var _tab1_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tab1.page */ 4408);
/* harmony import */ var _scale_mode_scale_mode_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../scale-mode/scale-mode.module */ 7140);
/* harmony import */ var _tab1_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tab1-routing.module */ 5125);








let Tab1PageModule = class Tab1PageModule {
};
Tab1PageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgModule)({
        imports: [
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonicModule,
            _angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule,
            _scale_mode_scale_mode_module__WEBPACK_IMPORTED_MODULE_1__.ScaleModeComponentModule,
            _tab1_routing_module__WEBPACK_IMPORTED_MODULE_2__.Tab1PageRoutingModule
        ],
        declarations: [_tab1_page__WEBPACK_IMPORTED_MODULE_0__.Tab1Page]
    })
], Tab1PageModule);



/***/ }),

/***/ 4408:
/*!*********************************************!*\
  !*** ./src/app/tab_Scale-Mode/tab1.page.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Tab1Page": () => (/* binding */ Tab1Page)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4929);
/* harmony import */ var _tab1_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tab1.page.html?ngResource */ 7770);
/* harmony import */ var _tab1_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tab1.page.scss?ngResource */ 9886);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2560);




let Tab1Page = class Tab1Page {
    constructor() { }
};
Tab1Page.ctorParameters = () => [];
Tab1Page = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'app-tab1',
        template: _tab1_page_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
        styles: [_tab1_page_scss_ngResource__WEBPACK_IMPORTED_MODULE_1__]
    })
], Tab1Page);



/***/ }),

/***/ 7654:
/*!******************************************************************************!*\
  !*** ./node_modules/@capacitor-community/bluetooth-le/dist/esm/bleClient.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BleClient": () => (/* binding */ BleClient)
/* harmony export */ });
/* harmony import */ var _home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @capacitor/core */ 5099);
/* harmony import */ var _conversion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./conversion */ 1193);
/* harmony import */ var _plugin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./plugin */ 391);
/* harmony import */ var _queue__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./queue */ 3013);
/* harmony import */ var _validators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./validators */ 5762);







class BleClientClass {
  constructor() {
    this.scanListener = null;
    this.eventListeners = new Map();
    this.queue = (0,_queue__WEBPACK_IMPORTED_MODULE_4__.getQueue)(true);
  }

  enableQueue() {
    this.queue = (0,_queue__WEBPACK_IMPORTED_MODULE_4__.getQueue)(true);
  }

  disableQueue() {
    this.queue = (0,_queue__WEBPACK_IMPORTED_MODULE_4__.getQueue)(false);
  }

  initialize(options) {
    var _this = this;

    return (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this.queue( /*#__PURE__*/(0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        yield _plugin__WEBPACK_IMPORTED_MODULE_3__.BluetoothLe.initialize(options);
      }));
    })();
  }
  /**
   * Reports whether BLE is enabled on this device.
   * Always returns `true` on **web**.
   * @deprecated Use `isEnabled` instead.
   */


  getEnabled() {
    var _this2 = this;

    return (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return _this2.isEnabled();
    })();
  }

  isEnabled() {
    var _this3 = this;

    return (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const enabled = yield _this3.queue( /*#__PURE__*/(0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        const result = yield _plugin__WEBPACK_IMPORTED_MODULE_3__.BluetoothLe.isEnabled();
        return result.value;
      }));
      return enabled;
    })();
  }

  enable() {
    var _this4 = this;

    return (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this4.queue( /*#__PURE__*/(0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        yield _plugin__WEBPACK_IMPORTED_MODULE_3__.BluetoothLe.enable();
      }));
    })();
  }

  disable() {
    var _this5 = this;

    return (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this5.queue( /*#__PURE__*/(0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        yield _plugin__WEBPACK_IMPORTED_MODULE_3__.BluetoothLe.disable();
      }));
    })();
  }

  startEnabledNotifications(callback) {
    var _this6 = this;

    return (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this6.queue( /*#__PURE__*/(0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        var _a;

        const key = `onEnabledChanged`;
        yield (_a = _this6.eventListeners.get(key)) === null || _a === void 0 ? void 0 : _a.remove();
        const listener = yield _plugin__WEBPACK_IMPORTED_MODULE_3__.BluetoothLe.addListener(key, result => {
          callback(result.value);
        });

        _this6.eventListeners.set(key, listener);

        yield _plugin__WEBPACK_IMPORTED_MODULE_3__.BluetoothLe.startEnabledNotifications();
      }));
    })();
  }

  stopEnabledNotifications() {
    var _this7 = this;

    return (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this7.queue( /*#__PURE__*/(0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        var _a;

        const key = `onEnabledChanged`;
        yield (_a = _this7.eventListeners.get(key)) === null || _a === void 0 ? void 0 : _a.remove();

        _this7.eventListeners.delete(key);

        yield _plugin__WEBPACK_IMPORTED_MODULE_3__.BluetoothLe.stopEnabledNotifications();
      }));
    })();
  }

  isLocationEnabled() {
    var _this8 = this;

    return (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const enabled = yield _this8.queue( /*#__PURE__*/(0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        const result = yield _plugin__WEBPACK_IMPORTED_MODULE_3__.BluetoothLe.isLocationEnabled();
        return result.value;
      }));
      return enabled;
    })();
  }

  openLocationSettings() {
    var _this9 = this;

    return (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this9.queue( /*#__PURE__*/(0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        yield _plugin__WEBPACK_IMPORTED_MODULE_3__.BluetoothLe.openLocationSettings();
      }));
    })();
  }

  openBluetoothSettings() {
    var _this10 = this;

    return (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this10.queue( /*#__PURE__*/(0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        yield _plugin__WEBPACK_IMPORTED_MODULE_3__.BluetoothLe.openBluetoothSettings();
      }));
    })();
  }

  openAppSettings() {
    var _this11 = this;

    return (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this11.queue( /*#__PURE__*/(0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        yield _plugin__WEBPACK_IMPORTED_MODULE_3__.BluetoothLe.openAppSettings();
      }));
    })();
  }

  setDisplayStrings(displayStrings) {
    var _this12 = this;

    return (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this12.queue( /*#__PURE__*/(0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        yield _plugin__WEBPACK_IMPORTED_MODULE_3__.BluetoothLe.setDisplayStrings(displayStrings);
      }));
    })();
  }

  requestDevice(options) {
    var _this13 = this;

    return (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const result = yield _this13.queue( /*#__PURE__*/(0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        const device = yield _plugin__WEBPACK_IMPORTED_MODULE_3__.BluetoothLe.requestDevice(options);
        return device;
      }));
      return result;
    })();
  }

  requestLEScan(options, callback) {
    var _this14 = this;

    return (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this14.queue( /*#__PURE__*/(0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        var _a;

        yield (_a = _this14.scanListener) === null || _a === void 0 ? void 0 : _a.remove();
        _this14.scanListener = yield _plugin__WEBPACK_IMPORTED_MODULE_3__.BluetoothLe.addListener('onScanResult', resultInternal => {
          const result = Object.assign(Object.assign({}, resultInternal), {
            manufacturerData: _this14.convertObject(resultInternal.manufacturerData),
            serviceData: _this14.convertObject(resultInternal.serviceData),
            rawAdvertisement: resultInternal.rawAdvertisement ? _this14.convertValue(resultInternal.rawAdvertisement) : undefined
          });
          callback(result);
        });
        yield _plugin__WEBPACK_IMPORTED_MODULE_3__.BluetoothLe.requestLEScan(options);
      }));
    })();
  }

  stopLEScan() {
    var _this15 = this;

    return (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this15.queue( /*#__PURE__*/(0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        var _a;

        yield (_a = _this15.scanListener) === null || _a === void 0 ? void 0 : _a.remove();
        _this15.scanListener = null;
        yield _plugin__WEBPACK_IMPORTED_MODULE_3__.BluetoothLe.stopLEScan();
      }));
    })();
  }

  getDevices(deviceIds) {
    var _this16 = this;

    return (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return _this16.queue( /*#__PURE__*/(0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        const result = yield _plugin__WEBPACK_IMPORTED_MODULE_3__.BluetoothLe.getDevices({
          deviceIds
        });
        return result.devices;
      }));
    })();
  }

  getConnectedDevices(services) {
    var _this17 = this;

    return (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return _this17.queue( /*#__PURE__*/(0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        const result = yield _plugin__WEBPACK_IMPORTED_MODULE_3__.BluetoothLe.getConnectedDevices({
          services
        });
        return result.devices;
      }));
    })();
  }

  connect(deviceId, onDisconnect, options) {
    var _this18 = this;

    return (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this18.queue( /*#__PURE__*/(0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        var _a;

        if (onDisconnect) {
          const key = `disconnected|${deviceId}`;
          yield (_a = _this18.eventListeners.get(key)) === null || _a === void 0 ? void 0 : _a.remove();
          const listener = yield _plugin__WEBPACK_IMPORTED_MODULE_3__.BluetoothLe.addListener(key, () => {
            onDisconnect(deviceId);
          });

          _this18.eventListeners.set(key, listener);
        }

        yield _plugin__WEBPACK_IMPORTED_MODULE_3__.BluetoothLe.connect(Object.assign({
          deviceId
        }, options));
      }));
    })();
  }

  createBond(deviceId) {
    var _this19 = this;

    return (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this19.queue( /*#__PURE__*/(0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        yield _plugin__WEBPACK_IMPORTED_MODULE_3__.BluetoothLe.createBond({
          deviceId
        });
      }));
    })();
  }

  isBonded(deviceId) {
    var _this20 = this;

    return (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const isBonded = yield _this20.queue( /*#__PURE__*/(0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        const result = yield _plugin__WEBPACK_IMPORTED_MODULE_3__.BluetoothLe.isBonded({
          deviceId
        });
        return result.value;
      }));
      return isBonded;
    })();
  }

  disconnect(deviceId) {
    var _this21 = this;

    return (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this21.queue( /*#__PURE__*/(0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        yield _plugin__WEBPACK_IMPORTED_MODULE_3__.BluetoothLe.disconnect({
          deviceId
        });
      }));
    })();
  }

  getServices(deviceId) {
    var _this22 = this;

    return (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const services = yield _this22.queue( /*#__PURE__*/(0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        const result = yield _plugin__WEBPACK_IMPORTED_MODULE_3__.BluetoothLe.getServices({
          deviceId
        });
        return result.services;
      }));
      return services;
    })();
  }

  readRssi(deviceId) {
    var _this23 = this;

    return (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const value = yield _this23.queue( /*#__PURE__*/(0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        const result = yield _plugin__WEBPACK_IMPORTED_MODULE_3__.BluetoothLe.readRssi({
          deviceId
        });
        return parseFloat(result.value);
      }));
      return value;
    })();
  }

  read(deviceId, service, characteristic, options) {
    var _this24 = this;

    return (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      service = (0,_validators__WEBPACK_IMPORTED_MODULE_5__.validateUUID)(service);
      characteristic = (0,_validators__WEBPACK_IMPORTED_MODULE_5__.validateUUID)(characteristic);
      const value = yield _this24.queue( /*#__PURE__*/(0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        const result = yield _plugin__WEBPACK_IMPORTED_MODULE_3__.BluetoothLe.read(Object.assign({
          deviceId,
          service,
          characteristic
        }, options));
        return _this24.convertValue(result.value);
      }));
      return value;
    })();
  }

  write(deviceId, service, characteristic, value, options) {
    var _this25 = this;

    return (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      service = (0,_validators__WEBPACK_IMPORTED_MODULE_5__.validateUUID)(service);
      characteristic = (0,_validators__WEBPACK_IMPORTED_MODULE_5__.validateUUID)(characteristic);
      return _this25.queue( /*#__PURE__*/(0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        if (!(value === null || value === void 0 ? void 0 : value.buffer)) {
          throw new Error('Invalid data.');
        }

        let writeValue = value;

        if (_capacitor_core__WEBPACK_IMPORTED_MODULE_1__.Capacitor.getPlatform() !== 'web') {
          // on native we can only write strings
          writeValue = (0,_conversion__WEBPACK_IMPORTED_MODULE_2__.dataViewToHexString)(value);
        }

        yield _plugin__WEBPACK_IMPORTED_MODULE_3__.BluetoothLe.write(Object.assign({
          deviceId,
          service,
          characteristic,
          value: writeValue
        }, options));
      }));
    })();
  }

  writeWithoutResponse(deviceId, service, characteristic, value, options) {
    var _this26 = this;

    return (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      service = (0,_validators__WEBPACK_IMPORTED_MODULE_5__.validateUUID)(service);
      characteristic = (0,_validators__WEBPACK_IMPORTED_MODULE_5__.validateUUID)(characteristic);
      yield _this26.queue( /*#__PURE__*/(0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        if (!(value === null || value === void 0 ? void 0 : value.buffer)) {
          throw new Error('Invalid data.');
        }

        let writeValue = value;

        if (_capacitor_core__WEBPACK_IMPORTED_MODULE_1__.Capacitor.getPlatform() !== 'web') {
          // on native we can only write strings
          writeValue = (0,_conversion__WEBPACK_IMPORTED_MODULE_2__.dataViewToHexString)(value);
        }

        yield _plugin__WEBPACK_IMPORTED_MODULE_3__.BluetoothLe.writeWithoutResponse(Object.assign({
          deviceId,
          service,
          characteristic,
          value: writeValue
        }, options));
      }));
    })();
  }

  readDescriptor(deviceId, service, characteristic, descriptor, options) {
    var _this27 = this;

    return (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      service = (0,_validators__WEBPACK_IMPORTED_MODULE_5__.validateUUID)(service);
      characteristic = (0,_validators__WEBPACK_IMPORTED_MODULE_5__.validateUUID)(characteristic);
      descriptor = (0,_validators__WEBPACK_IMPORTED_MODULE_5__.validateUUID)(descriptor);
      const value = yield _this27.queue( /*#__PURE__*/(0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        const result = yield _plugin__WEBPACK_IMPORTED_MODULE_3__.BluetoothLe.readDescriptor(Object.assign({
          deviceId,
          service,
          characteristic,
          descriptor
        }, options));
        return _this27.convertValue(result.value);
      }));
      return value;
    })();
  }

  writeDescriptor(deviceId, service, characteristic, descriptor, value, options) {
    var _this28 = this;

    return (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      service = (0,_validators__WEBPACK_IMPORTED_MODULE_5__.validateUUID)(service);
      characteristic = (0,_validators__WEBPACK_IMPORTED_MODULE_5__.validateUUID)(characteristic);
      descriptor = (0,_validators__WEBPACK_IMPORTED_MODULE_5__.validateUUID)(descriptor);
      return _this28.queue( /*#__PURE__*/(0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        if (!(value === null || value === void 0 ? void 0 : value.buffer)) {
          throw new Error('Invalid data.');
        }

        let writeValue = value;

        if (_capacitor_core__WEBPACK_IMPORTED_MODULE_1__.Capacitor.getPlatform() !== 'web') {
          // on native we can only write strings
          writeValue = (0,_conversion__WEBPACK_IMPORTED_MODULE_2__.dataViewToHexString)(value);
        }

        yield _plugin__WEBPACK_IMPORTED_MODULE_3__.BluetoothLe.writeDescriptor(Object.assign({
          deviceId,
          service,
          characteristic,
          descriptor,
          value: writeValue
        }, options));
      }));
    })();
  }

  startNotifications(deviceId, service, characteristic, callback) {
    var _this29 = this;

    return (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      service = (0,_validators__WEBPACK_IMPORTED_MODULE_5__.validateUUID)(service);
      characteristic = (0,_validators__WEBPACK_IMPORTED_MODULE_5__.validateUUID)(characteristic);
      yield _this29.queue( /*#__PURE__*/(0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        var _a;

        const key = `notification|${deviceId}|${service}|${characteristic}`;
        yield (_a = _this29.eventListeners.get(key)) === null || _a === void 0 ? void 0 : _a.remove();
        const listener = yield _plugin__WEBPACK_IMPORTED_MODULE_3__.BluetoothLe.addListener(key, event => {
          callback(_this29.convertValue(event === null || event === void 0 ? void 0 : event.value));
        });

        _this29.eventListeners.set(key, listener);

        yield _plugin__WEBPACK_IMPORTED_MODULE_3__.BluetoothLe.startNotifications({
          deviceId,
          service,
          characteristic
        });
      }));
    })();
  }

  stopNotifications(deviceId, service, characteristic) {
    var _this30 = this;

    return (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      service = (0,_validators__WEBPACK_IMPORTED_MODULE_5__.validateUUID)(service);
      characteristic = (0,_validators__WEBPACK_IMPORTED_MODULE_5__.validateUUID)(characteristic);
      yield _this30.queue( /*#__PURE__*/(0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        var _a;

        const key = `notification|${deviceId}|${service}|${characteristic}`;
        yield (_a = _this30.eventListeners.get(key)) === null || _a === void 0 ? void 0 : _a.remove();

        _this30.eventListeners.delete(key);

        yield _plugin__WEBPACK_IMPORTED_MODULE_3__.BluetoothLe.stopNotifications({
          deviceId,
          service,
          characteristic
        });
      }));
    })();
  }

  convertValue(value) {
    if (typeof value === 'string') {
      return (0,_conversion__WEBPACK_IMPORTED_MODULE_2__.hexStringToDataView)(value);
    } else if (value === undefined) {
      return new DataView(new ArrayBuffer(0));
    }

    return value;
  }

  convertObject(obj) {
    if (obj === undefined) {
      return undefined;
    }

    const result = {};

    for (const key of Object.keys(obj)) {
      result[key] = this.convertValue(obj[key]);
    }

    return result;
  }

}

const BleClient = new BleClientClass();

/***/ }),

/***/ 3052:
/*!***************************************************************************!*\
  !*** ./node_modules/@capacitor-community/bluetooth-le/dist/esm/config.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/// <reference types="@capacitor/cli" />


/***/ }),

/***/ 1193:
/*!*******************************************************************************!*\
  !*** ./node_modules/@capacitor-community/bluetooth-le/dist/esm/conversion.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dataViewToHexString": () => (/* binding */ dataViewToHexString),
/* harmony export */   "dataViewToNumbers": () => (/* binding */ dataViewToNumbers),
/* harmony export */   "dataViewToText": () => (/* binding */ dataViewToText),
/* harmony export */   "hexStringToDataView": () => (/* binding */ hexStringToDataView),
/* harmony export */   "mapToObject": () => (/* binding */ mapToObject),
/* harmony export */   "numberToUUID": () => (/* binding */ numberToUUID),
/* harmony export */   "numbersToDataView": () => (/* binding */ numbersToDataView),
/* harmony export */   "textToDataView": () => (/* binding */ textToDataView),
/* harmony export */   "webUUIDToString": () => (/* binding */ webUUIDToString)
/* harmony export */ });
/**
 * Convert an array of numbers into a DataView.
 */
function numbersToDataView(value) {
  return new DataView(Uint8Array.from(value).buffer);
}
/**
 * Convert a DataView into an array of numbers.
 */

function dataViewToNumbers(value) {
  return Array.from(new Uint8Array(value.buffer));
}
/**
 * Convert a string into a DataView.
 */

function textToDataView(value) {
  return numbersToDataView(value.split('').map(s => s.charCodeAt(0)));
}
/**
 * Convert a DataView into a string.
 */

function dataViewToText(value) {
  return String.fromCharCode(...dataViewToNumbers(value));
}
/**
 * Convert a 16 bit UUID into a 128 bit UUID string
 * @param value number, e.g. 0x180d
 * @return string, e.g. '0000180d-0000-1000-8000-00805f9b34fb'
 */

function numberToUUID(value) {
  return `0000${value.toString(16).padStart(4, '0')}-0000-1000-8000-00805f9b34fb`;
}
function hexStringToDataView(value) {
  const numbers = value.trim().split(' ').filter(e => e !== '').map(s => parseInt(s, 16));
  return numbersToDataView(numbers);
}
function dataViewToHexString(value) {
  return dataViewToNumbers(value).map(n => {
    let s = n.toString(16);

    if (s.length == 1) {
      s = '0' + s;
    }

    return s;
  }).join(' ');
}
function webUUIDToString(uuid) {
  if (typeof uuid === 'string') {
    return uuid;
  } else if (typeof uuid === 'number') {
    return numberToUUID(uuid);
  } else {
    throw new Error('Invalid UUID');
  }
}
function mapToObject(map) {
  const obj = {};

  if (!map) {
    return undefined;
  }

  map.forEach((value, key) => {
    obj[key.toString()] = value;
  });
  return obj;
}

/***/ }),

/***/ 8121:
/*!********************************************************************************!*\
  !*** ./node_modules/@capacitor-community/bluetooth-le/dist/esm/definitions.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScanMode": () => (/* binding */ ScanMode)
/* harmony export */ });
/**
 * Android scan mode
 */
var ScanMode;

(function (ScanMode) {
  /**
   * Perform Bluetooth LE scan in low power mode. This mode is enforced if the scanning application is not in foreground.
   * https://developer.android.com/reference/android/bluetooth/le/ScanSettings#SCAN_MODE_LOW_POWER
   */
  ScanMode[ScanMode["SCAN_MODE_LOW_POWER"] = 0] = "SCAN_MODE_LOW_POWER";
  /**
   * Perform Bluetooth LE scan in balanced power mode. (default) Scan results are returned at a rate that provides a good trade-off between scan frequency and power consumption.
   * https://developer.android.com/reference/android/bluetooth/le/ScanSettings#SCAN_MODE_BALANCED
   */

  ScanMode[ScanMode["SCAN_MODE_BALANCED"] = 1] = "SCAN_MODE_BALANCED";
  /**
   * Scan using highest duty cycle. It's recommended to only use this mode when the application is running in the foreground.
   * https://developer.android.com/reference/android/bluetooth/le/ScanSettings#SCAN_MODE_LOW_LATENCY
   */

  ScanMode[ScanMode["SCAN_MODE_LOW_LATENCY"] = 2] = "SCAN_MODE_LOW_LATENCY";
})(ScanMode || (ScanMode = {}));

/***/ }),

/***/ 695:
/*!**************************************************************************!*\
  !*** ./node_modules/@capacitor-community/bluetooth-le/dist/esm/index.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BleClient": () => (/* reexport safe */ _bleClient__WEBPACK_IMPORTED_MODULE_1__.BleClient),
/* harmony export */   "BluetoothLe": () => (/* reexport safe */ _plugin__WEBPACK_IMPORTED_MODULE_3__.BluetoothLe),
/* harmony export */   "ScanMode": () => (/* reexport safe */ _definitions__WEBPACK_IMPORTED_MODULE_0__.ScanMode),
/* harmony export */   "dataViewToHexString": () => (/* reexport safe */ _conversion__WEBPACK_IMPORTED_MODULE_2__.dataViewToHexString),
/* harmony export */   "dataViewToNumbers": () => (/* reexport safe */ _conversion__WEBPACK_IMPORTED_MODULE_2__.dataViewToNumbers),
/* harmony export */   "dataViewToText": () => (/* reexport safe */ _conversion__WEBPACK_IMPORTED_MODULE_2__.dataViewToText),
/* harmony export */   "hexStringToDataView": () => (/* reexport safe */ _conversion__WEBPACK_IMPORTED_MODULE_2__.hexStringToDataView),
/* harmony export */   "mapToObject": () => (/* reexport safe */ _conversion__WEBPACK_IMPORTED_MODULE_2__.mapToObject),
/* harmony export */   "numberToUUID": () => (/* reexport safe */ _conversion__WEBPACK_IMPORTED_MODULE_2__.numberToUUID),
/* harmony export */   "numbersToDataView": () => (/* reexport safe */ _conversion__WEBPACK_IMPORTED_MODULE_2__.numbersToDataView),
/* harmony export */   "textToDataView": () => (/* reexport safe */ _conversion__WEBPACK_IMPORTED_MODULE_2__.textToDataView),
/* harmony export */   "webUUIDToString": () => (/* reexport safe */ _conversion__WEBPACK_IMPORTED_MODULE_2__.webUUIDToString)
/* harmony export */ });
/* harmony import */ var _definitions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./definitions */ 8121);
/* harmony import */ var _bleClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bleClient */ 7654);
/* harmony import */ var _conversion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./conversion */ 1193);
/* harmony import */ var _plugin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./plugin */ 391);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./config */ 3052);






/***/ }),

/***/ 391:
/*!***************************************************************************!*\
  !*** ./node_modules/@capacitor-community/bluetooth-le/dist/esm/plugin.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BluetoothLe": () => (/* binding */ BluetoothLe)
/* harmony export */ });
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @capacitor/core */ 5099);

const BluetoothLe = (0,_capacitor_core__WEBPACK_IMPORTED_MODULE_0__.registerPlugin)('BluetoothLe', {
  web: () => __webpack_require__.e(/*! import() */ "node_modules_capacitor-community_bluetooth-le_dist_esm_web_js").then(__webpack_require__.bind(__webpack_require__, /*! ./web */ 2366)).then(m => new m.BluetoothLeWeb())
});

/***/ }),

/***/ 3013:
/*!**************************************************************************!*\
  !*** ./node_modules/@capacitor-community/bluetooth-le/dist/esm/queue.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getQueue": () => (/* binding */ getQueue)
/* harmony export */ });
/* harmony import */ var throat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! throat */ 7270);
/* harmony import */ var throat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(throat__WEBPACK_IMPORTED_MODULE_0__);

function getQueue(enabled) {
  if (enabled) {
    return throat__WEBPACK_IMPORTED_MODULE_0___default()(1);
  } else {
    return fn => fn();
  }
}

/***/ }),

/***/ 5762:
/*!*******************************************************************************!*\
  !*** ./node_modules/@capacitor-community/bluetooth-le/dist/esm/validators.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validateUUID": () => (/* binding */ validateUUID)
/* harmony export */ });
function validateUUID(uuid) {
  if (typeof uuid !== 'string') {
    throw new Error(`Invalid UUID type ${typeof uuid}. Expected string.`);
  }

  uuid = uuid.toLowerCase();
  const is128BitUuid = uuid.search(/^[0-9a-f]{8}\b-[0-9a-f]{4}\b-[0-9a-f]{4}\b-[0-9a-f]{4}\b-[0-9a-f]{12}$/) >= 0;

  if (!is128BitUuid) {
    throw new Error(`Invalid UUID format ${uuid}. Expected 128 bit string (e.g. "0000180d-0000-1000-8000-00805f9b34fb").`);
  }

  return uuid;
}

/***/ }),

/***/ 5099:
/*!****************************************************!*\
  !*** ./node_modules/@capacitor/core/dist/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Capacitor": () => (/* binding */ Capacitor),
/* harmony export */   "CapacitorException": () => (/* binding */ CapacitorException),
/* harmony export */   "CapacitorPlatforms": () => (/* binding */ CapacitorPlatforms),
/* harmony export */   "ExceptionCode": () => (/* binding */ ExceptionCode),
/* harmony export */   "Plugins": () => (/* binding */ Plugins),
/* harmony export */   "WebPlugin": () => (/* binding */ WebPlugin),
/* harmony export */   "WebView": () => (/* binding */ WebView),
/* harmony export */   "addPlatform": () => (/* binding */ addPlatform),
/* harmony export */   "registerPlugin": () => (/* binding */ registerPlugin),
/* harmony export */   "registerWebPlugin": () => (/* binding */ registerWebPlugin),
/* harmony export */   "setPlatform": () => (/* binding */ setPlatform)
/* harmony export */ });
/* harmony import */ var _home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 1670);


/*! Capacitor: https://capacitorjs.com/ - MIT License */
const createCapacitorPlatforms = win => {
  const defaultPlatformMap = new Map();
  defaultPlatformMap.set('web', {
    name: 'web'
  });
  const capPlatforms = win.CapacitorPlatforms || {
    currentPlatform: {
      name: 'web'
    },
    platforms: defaultPlatformMap
  };

  const addPlatform = (name, platform) => {
    capPlatforms.platforms.set(name, platform);
  };

  const setPlatform = name => {
    if (capPlatforms.platforms.has(name)) {
      capPlatforms.currentPlatform = capPlatforms.platforms.get(name);
    }
  };

  capPlatforms.addPlatform = addPlatform;
  capPlatforms.setPlatform = setPlatform;
  return capPlatforms;
};

const initPlatforms = win => win.CapacitorPlatforms = createCapacitorPlatforms(win);
/**
 * @deprecated Set `CapacitorCustomPlatform` on the window object prior to runtime executing in the web app instead
 */


const CapacitorPlatforms = /*#__PURE__*/initPlatforms(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {});
/**
 * @deprecated Set `CapacitorCustomPlatform` on the window object prior to runtime executing in the web app instead
 */

const addPlatform = CapacitorPlatforms.addPlatform;
/**
 * @deprecated Set `CapacitorCustomPlatform` on the window object prior to runtime executing in the web app instead
 */

const setPlatform = CapacitorPlatforms.setPlatform;

const legacyRegisterWebPlugin = (cap, webPlugin) => {
  var _a;

  const config = webPlugin.config;
  const Plugins = cap.Plugins;

  if (!config || !config.name) {
    // TODO: add link to upgrade guide
    throw new Error(`Capacitor WebPlugin is using the deprecated "registerWebPlugin()" function, but without the config. Please use "registerPlugin()" instead to register this web plugin."`);
  } // TODO: add link to upgrade guide


  console.warn(`Capacitor plugin "${config.name}" is using the deprecated "registerWebPlugin()" function`);

  if (!Plugins[config.name] || ((_a = config === null || config === void 0 ? void 0 : config.platforms) === null || _a === void 0 ? void 0 : _a.includes(cap.getPlatform()))) {
    // Add the web plugin into the plugins registry if there already isn't
    // an existing one. If it doesn't already exist, that means
    // there's no existing native implementation for it.
    // - OR -
    // If we already have a plugin registered (meaning it was defined in the native layer),
    // then we should only overwrite it if the corresponding web plugin activates on
    // a certain platform. For example: Geolocation uses the WebPlugin on Android but not iOS
    Plugins[config.name] = webPlugin;
  }
};

var ExceptionCode;

(function (ExceptionCode) {
  /**
   * API is not implemented.
   *
   * This usually means the API can't be used because it is not implemented for
   * the current platform.
   */
  ExceptionCode["Unimplemented"] = "UNIMPLEMENTED";
  /**
   * API is not available.
   *
   * This means the API can't be used right now because:
   *   - it is currently missing a prerequisite, such as network connectivity
   *   - it requires a particular platform or browser version
   */

  ExceptionCode["Unavailable"] = "UNAVAILABLE";
})(ExceptionCode || (ExceptionCode = {}));

class CapacitorException extends Error {
  constructor(message, code) {
    super(message);
    this.message = message;
    this.code = code;
  }

}

const getPlatformId = win => {
  var _a, _b;

  if (win === null || win === void 0 ? void 0 : win.androidBridge) {
    return 'android';
  } else if ((_b = (_a = win === null || win === void 0 ? void 0 : win.webkit) === null || _a === void 0 ? void 0 : _a.messageHandlers) === null || _b === void 0 ? void 0 : _b.bridge) {
    return 'ios';
  } else {
    return 'web';
  }
};

const createCapacitor = win => {
  var _a, _b, _c, _d, _e;

  const capCustomPlatform = win.CapacitorCustomPlatform || null;
  const cap = win.Capacitor || {};
  const Plugins = cap.Plugins = cap.Plugins || {};
  /**
   * @deprecated Use `capCustomPlatform` instead, default functions like registerPlugin will function with the new object.
   */

  const capPlatforms = win.CapacitorPlatforms;

  const defaultGetPlatform = () => {
    return capCustomPlatform !== null ? capCustomPlatform.name : getPlatformId(win);
  };

  const getPlatform = ((_a = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _a === void 0 ? void 0 : _a.getPlatform) || defaultGetPlatform;

  const defaultIsNativePlatform = () => getPlatform() !== 'web';

  const isNativePlatform = ((_b = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _b === void 0 ? void 0 : _b.isNativePlatform) || defaultIsNativePlatform;

  const defaultIsPluginAvailable = pluginName => {
    const plugin = registeredPlugins.get(pluginName);

    if (plugin === null || plugin === void 0 ? void 0 : plugin.platforms.has(getPlatform())) {
      // JS implementation available for the current platform.
      return true;
    }

    if (getPluginHeader(pluginName)) {
      // Native implementation available.
      return true;
    }

    return false;
  };

  const isPluginAvailable = ((_c = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _c === void 0 ? void 0 : _c.isPluginAvailable) || defaultIsPluginAvailable;

  const defaultGetPluginHeader = pluginName => {
    var _a;

    return (_a = cap.PluginHeaders) === null || _a === void 0 ? void 0 : _a.find(h => h.name === pluginName);
  };

  const getPluginHeader = ((_d = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _d === void 0 ? void 0 : _d.getPluginHeader) || defaultGetPluginHeader;

  const handleError = err => win.console.error(err);

  const pluginMethodNoop = (_target, prop, pluginName) => {
    return Promise.reject(`${pluginName} does not have an implementation of "${prop}".`);
  };

  const registeredPlugins = new Map();

  const defaultRegisterPlugin = (pluginName, jsImplementations = {}) => {
    const registeredPlugin = registeredPlugins.get(pluginName);

    if (registeredPlugin) {
      console.warn(`Capacitor plugin "${pluginName}" already registered. Cannot register plugins twice.`);
      return registeredPlugin.proxy;
    }

    const platform = getPlatform();
    const pluginHeader = getPluginHeader(pluginName);
    let jsImplementation;

    const loadPluginImplementation = /*#__PURE__*/function () {
      var _ref = (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        if (!jsImplementation && platform in jsImplementations) {
          jsImplementation = typeof jsImplementations[platform] === 'function' ? jsImplementation = yield jsImplementations[platform]() : jsImplementation = jsImplementations[platform];
        } else if (capCustomPlatform !== null && !jsImplementation && 'web' in jsImplementations) {
          jsImplementation = typeof jsImplementations['web'] === 'function' ? jsImplementation = yield jsImplementations['web']() : jsImplementation = jsImplementations['web'];
        }

        return jsImplementation;
      });

      return function loadPluginImplementation() {
        return _ref.apply(this, arguments);
      };
    }();

    const createPluginMethod = (impl, prop) => {
      var _a, _b;

      if (pluginHeader) {
        const methodHeader = pluginHeader === null || pluginHeader === void 0 ? void 0 : pluginHeader.methods.find(m => prop === m.name);

        if (methodHeader) {
          if (methodHeader.rtype === 'promise') {
            return options => cap.nativePromise(pluginName, prop.toString(), options);
          } else {
            return (options, callback) => cap.nativeCallback(pluginName, prop.toString(), options, callback);
          }
        } else if (impl) {
          return (_a = impl[prop]) === null || _a === void 0 ? void 0 : _a.bind(impl);
        }
      } else if (impl) {
        return (_b = impl[prop]) === null || _b === void 0 ? void 0 : _b.bind(impl);
      } else {
        throw new CapacitorException(`"${pluginName}" plugin is not implemented on ${platform}`, ExceptionCode.Unimplemented);
      }
    };

    const createPluginMethodWrapper = prop => {
      let remove;

      const wrapper = (...args) => {
        const p = loadPluginImplementation().then(impl => {
          const fn = createPluginMethod(impl, prop);

          if (fn) {
            const p = fn(...args);
            remove = p === null || p === void 0 ? void 0 : p.remove;
            return p;
          } else {
            throw new CapacitorException(`"${pluginName}.${prop}()" is not implemented on ${platform}`, ExceptionCode.Unimplemented);
          }
        });

        if (prop === 'addListener') {
          p.remove = /*#__PURE__*/(0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
            return remove();
          });
        }

        return p;
      }; // Some flair ✨


      wrapper.toString = () => `${prop.toString()}() { [capacitor code] }`;

      Object.defineProperty(wrapper, 'name', {
        value: prop,
        writable: false,
        configurable: false
      });
      return wrapper;
    };

    const addListener = createPluginMethodWrapper('addListener');
    const removeListener = createPluginMethodWrapper('removeListener');

    const addListenerNative = (eventName, callback) => {
      const call = addListener({
        eventName
      }, callback);

      const remove = /*#__PURE__*/function () {
        var _ref3 = (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          const callbackId = yield call;
          removeListener({
            eventName,
            callbackId
          }, callback);
        });

        return function remove() {
          return _ref3.apply(this, arguments);
        };
      }();

      const p = new Promise(resolve => call.then(() => resolve({
        remove
      })));
      p.remove = /*#__PURE__*/(0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        console.warn(`Using addListener() without 'await' is deprecated.`);
        yield remove();
      });
      return p;
    };

    const proxy = new Proxy({}, {
      get(_, prop) {
        switch (prop) {
          // https://github.com/facebook/react/issues/20030
          case '$$typeof':
            return undefined;

          case 'toJSON':
            return () => ({});

          case 'addListener':
            return pluginHeader ? addListenerNative : addListener;

          case 'removeListener':
            return removeListener;

          default:
            return createPluginMethodWrapper(prop);
        }
      }

    });
    Plugins[pluginName] = proxy;
    registeredPlugins.set(pluginName, {
      name: pluginName,
      proxy,
      platforms: new Set([...Object.keys(jsImplementations), ...(pluginHeader ? [platform] : [])])
    });
    return proxy;
  };

  const registerPlugin = ((_e = capPlatforms === null || capPlatforms === void 0 ? void 0 : capPlatforms.currentPlatform) === null || _e === void 0 ? void 0 : _e.registerPlugin) || defaultRegisterPlugin; // Add in convertFileSrc for web, it will already be available in native context

  if (!cap.convertFileSrc) {
    cap.convertFileSrc = filePath => filePath;
  }

  cap.getPlatform = getPlatform;
  cap.handleError = handleError;
  cap.isNativePlatform = isNativePlatform;
  cap.isPluginAvailable = isPluginAvailable;
  cap.pluginMethodNoop = pluginMethodNoop;
  cap.registerPlugin = registerPlugin;
  cap.Exception = CapacitorException;
  cap.DEBUG = !!cap.DEBUG;
  cap.isLoggingEnabled = !!cap.isLoggingEnabled; // Deprecated props

  cap.platform = cap.getPlatform();
  cap.isNative = cap.isNativePlatform();
  return cap;
};

const initCapacitorGlobal = win => win.Capacitor = createCapacitor(win);

const Capacitor = /*#__PURE__*/initCapacitorGlobal(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {});
const registerPlugin = Capacitor.registerPlugin;
/**
 * @deprecated Provided for backwards compatibility for Capacitor v2 plugins.
 * Capacitor v3 plugins should import the plugin directly. This "Plugins"
 * export is deprecated in v3, and will be removed in v4.
 */

const Plugins = Capacitor.Plugins;
/**
 * Provided for backwards compatibility. Use the registerPlugin() API
 * instead, and provide the web plugin as the "web" implmenetation.
 * For example
 *
 * export const Example = registerPlugin('Example', {
 *   web: () => import('./web').then(m => new m.Example())
 * })
 *
 * @deprecated Deprecated in v3, will be removed from v4.
 */

const registerWebPlugin = plugin => legacyRegisterWebPlugin(Capacitor, plugin);
/**
 * Base class web plugins should extend.
 */


class WebPlugin {
  constructor(config) {
    this.listeners = {};
    this.windowListeners = {};

    if (config) {
      // TODO: add link to upgrade guide
      console.warn(`Capacitor WebPlugin "${config.name}" config object was deprecated in v3 and will be removed in v4.`);
      this.config = config;
    }
  }

  addListener(eventName, listenerFunc) {
    var _this = this;

    const listeners = this.listeners[eventName];

    if (!listeners) {
      this.listeners[eventName] = [];
    }

    this.listeners[eventName].push(listenerFunc); // If we haven't added a window listener for this event and it requires one,
    // go ahead and add it

    const windowListener = this.windowListeners[eventName];

    if (windowListener && !windowListener.registered) {
      this.addWindowListener(windowListener);
    }

    const remove = /*#__PURE__*/function () {
      var _ref5 = (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        return _this.removeListener(eventName, listenerFunc);
      });

      return function remove() {
        return _ref5.apply(this, arguments);
      };
    }();

    const p = Promise.resolve({
      remove
    });
    Object.defineProperty(p, 'remove', {
      value: function () {
        var _ref6 = (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          console.warn(`Using addListener() without 'await' is deprecated.`);
          yield remove();
        });

        return function value() {
          return _ref6.apply(this, arguments);
        };
      }()
    });
    return p;
  }

  removeAllListeners() {
    var _this2 = this;

    return (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.listeners = {};

      for (const listener in _this2.windowListeners) {
        _this2.removeWindowListener(_this2.windowListeners[listener]);
      }

      _this2.windowListeners = {};
    })();
  }

  notifyListeners(eventName, data) {
    const listeners = this.listeners[eventName];

    if (listeners) {
      listeners.forEach(listener => listener(data));
    }
  }

  hasListeners(eventName) {
    return !!this.listeners[eventName].length;
  }

  registerWindowListener(windowEventName, pluginEventName) {
    this.windowListeners[pluginEventName] = {
      registered: false,
      windowEventName,
      pluginEventName,
      handler: event => {
        this.notifyListeners(pluginEventName, event);
      }
    };
  }

  unimplemented(msg = 'not implemented') {
    return new Capacitor.Exception(msg, ExceptionCode.Unimplemented);
  }

  unavailable(msg = 'not available') {
    return new Capacitor.Exception(msg, ExceptionCode.Unavailable);
  }

  removeListener(eventName, listenerFunc) {
    var _this3 = this;

    return (0,_home_eric_HS_Coburg_HCPS_Smart_Scale_smart_scale_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const listeners = _this3.listeners[eventName];

      if (!listeners) {
        return;
      }

      const index = listeners.indexOf(listenerFunc);

      _this3.listeners[eventName].splice(index, 1); // If there are no more listeners for this type of event,
      // remove the window listener


      if (!_this3.listeners[eventName].length) {
        _this3.removeWindowListener(_this3.windowListeners[eventName]);
      }
    })();
  }

  addWindowListener(handle) {
    window.addEventListener(handle.windowEventName, handle.handler);
    handle.registered = true;
  }

  removeWindowListener(handle) {
    if (!handle) {
      return;
    }

    window.removeEventListener(handle.windowEventName, handle.handler);
    handle.registered = false;
  }

}

const WebView = /*#__PURE__*/registerPlugin('WebView');


/***/ }),

/***/ 7270:
/*!**************************************!*\
  !*** ./node_modules/throat/index.js ***!
  \**************************************/
/***/ ((module) => {



function throatInternal(size) {
  var queue = new Queue();
  var s = size | 0;

  function run(fn, self, args) {
    if ((s | 0) !== 0) {
      s = (s | 0) - 1;
      return new Promise(function (resolve) {
        resolve(fn.apply(self, args));
      }).then(onFulfill, onReject);
    }

    return new Promise(function (resolve) {
      queue.push(new Delayed(resolve, fn, self, args));
    }).then(runDelayed);
  }

  function runDelayed(d) {
    try {
      return Promise.resolve(d.fn.apply(d.self, d.args)).then(onFulfill, onReject);
    } catch (ex) {
      onReject(ex);
    }
  }

  function onFulfill(result) {
    release();
    return result;
  }

  function onReject(error) {
    release();
    throw error;
  }

  function release() {
    var next = queue.shift();

    if (next) {
      next.resolve(next);
    } else {
      s = (s | 0) + 1;
    }
  }

  return run;
}

function earlyBound(size, fn) {
  const run = throatInternal(size | 0);
  return function () {
    var args = new Array(arguments.length);

    for (var i = 0; i < arguments.length; i++) {
      args[i] = arguments[i];
    }

    return run(fn, this, args);
  };
}

function lateBound(size) {
  const run = throatInternal(size | 0);
  return function (fn) {
    if (typeof fn !== 'function') {
      throw new TypeError('Expected throat fn to be a function but got ' + typeof fn);
    }

    var args = new Array(arguments.length - 1);

    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }

    return run(fn, this, args);
  };
}

module.exports = function throat(size, fn) {
  if (typeof size === 'function') {
    var temp = fn;
    fn = size;
    size = temp;
  }

  if (typeof size !== 'number') {
    throw new TypeError('Expected throat size to be a number but got ' + typeof size);
  }

  if (fn !== undefined && typeof fn !== 'function') {
    throw new TypeError('Expected throat fn to be a function but got ' + typeof fn);
  }

  if (typeof fn === 'function') {
    return earlyBound(size | 0, fn);
  } else {
    return lateBound(size | 0);
  }
};

module.exports["default"] = module.exports;

function Delayed(resolve, fn, self, args) {
  this.resolve = resolve;
  this.fn = fn;
  this.self = self || null;
  this.args = args;
}

var blockSize = 64;

function Queue() {
  this._s1 = [];
  this._s2 = [];
  this._shiftBlock = this._pushBlock = new Array(blockSize);
  this._pushIndex = 0;
  this._shiftIndex = 0;
}

Queue.prototype.push = function (value) {
  if (this._pushIndex === blockSize) {
    this._pushIndex = 0;
    this._s1[this._s1.length] = this._pushBlock = new Array(blockSize);
  }

  this._pushBlock[this._pushIndex++] = value;
};

Queue.prototype.shift = function () {
  if (this._shiftIndex === blockSize) {
    this._shiftIndex = 0;
    var s2 = this._s2;

    if (s2.length === 0) {
      var s1 = this._s1;

      if (s1.length === 0) {
        return undefined;
      }

      this._s1 = s2;
      s2 = this._s2 = s1.reverse();
    }

    this._shiftBlock = s2.pop();
  }

  if (this._pushBlock === this._shiftBlock && this._pushIndex === this._shiftIndex) {
    return undefined;
  }

  var result = this._shiftBlock[this._shiftIndex];
  this._shiftBlock[this._shiftIndex++] = null;
  return result;
};

/***/ }),

/***/ 968:
/*!*************************************************************************************!*\
  !*** ./src/app/bluetooth-low-energy/bluetooth-low-energy.component.scss?ngResource ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJibHVldG9vdGgtbG93LWVuZXJneS5jb21wb25lbnQuc2NzcyJ9 */";

/***/ }),

/***/ 4240:
/*!*****************************************************************!*\
  !*** ./src/app/scale-mode/scale-mode.component.scss?ngResource ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = "#container {\n  text-align: center;\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 50%;\n  transform: translateY(-50%);\n}\n\n#container strong {\n  font-size: 20px;\n  line-height: 26px;\n}\n\n#container p {\n  font-size: 16px;\n  line-height: 22px;\n  color: #8c8c8c;\n  margin: 0;\n}\n\n#container a {\n  text-decoration: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjYWxlLW1vZGUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxrQkFBQTtFQUVBLGtCQUFBO0VBQ0EsT0FBQTtFQUNBLFFBQUE7RUFDQSxRQUFBO0VBQ0EsMkJBQUE7QUFBSjs7QUFHRTtFQUNFLGVBQUE7RUFDQSxpQkFBQTtBQUFKOztBQUdFO0VBQ0UsZUFBQTtFQUNBLGlCQUFBO0VBRUEsY0FBQTtFQUVBLFNBQUE7QUFGSjs7QUFLRTtFQUNFLHFCQUFBO0FBRkoiLCJmaWxlIjoic2NhbGUtbW9kZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIiNjb250YWluZXIge1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgdG9wOiA1MCU7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICB9XG4gIFxuICAjY29udGFpbmVyIHN0cm9uZyB7XG4gICAgZm9udC1zaXplOiAyMHB4O1xuICAgIGxpbmUtaGVpZ2h0OiAyNnB4O1xuICB9XG4gIFxuICAjY29udGFpbmVyIHAge1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICBsaW5lLWhlaWdodDogMjJweDtcbiAgXG4gICAgY29sb3I6ICM4YzhjOGM7XG4gIFxuICAgIG1hcmdpbjogMDtcbiAgfVxuICBcbiAgI2NvbnRhaW5lciBhIHtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIH0iXX0= */";

/***/ }),

/***/ 9886:
/*!**********************************************************!*\
  !*** ./src/app/tab_Scale-Mode/tab1.page.scss?ngResource ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0YWIxLnBhZ2Uuc2NzcyJ9 */";

/***/ }),

/***/ 3950:
/*!*************************************************************************************!*\
  !*** ./src/app/bluetooth-low-energy/bluetooth-low-energy.component.html?ngResource ***!
  \*************************************************************************************/
/***/ ((module) => {

module.exports = "<p>\n  bluetooth-low-energy works!\n</p>\n";

/***/ }),

/***/ 4025:
/*!*****************************************************************!*\
  !*** ./src/app/scale-mode/scale-mode.component.html?ngResource ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = "<div id=\"container\">\n  <strong>{{ name }}</strong>\n  <p>DONT daExplore <a target=\"_blank\" rel=\"noopener noreferrer\" href=\"https://ionicframework.com/docs/components\">UI Components</a></p>\n  <h2 >{{ bleComponent.weight }}</h2>\n  <h2></h2>\n  <ion-fab  horizontal=\"center\" slot=\"fixed\">\n    <ion-fab-button (click)=\"addPlusOne()\">\n      <ion-icon name=\"add\"></ion-icon>\n    </ion-fab-button>\n  </ion-fab>\n  <app-bluetooth-low-energy></app-bluetooth-low-energy>\n</div>";

/***/ }),

/***/ 7770:
/*!**********************************************************!*\
  !*** ./src/app/tab_Scale-Mode/tab1.page.html?ngResource ***!
  \**********************************************************/
/***/ ((module) => {

module.exports = "<ion-header [translucent]=\"true\">\n  <ion-toolbar>\n    <ion-title>\n      Scale mode\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content [fullscreen]=\"true\">\n  <ion-header collapse=\"condense\">\n    <ion-toolbar>\n      <ion-title size=\"large\">Scale mode</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <app-scale-mode name=\"Scale mode page\"></app-scale-mode>\n</ion-content>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_tab_Scale-Mode_tab1_module_ts.js.map