#include <ArduinoBLE.h>
#include <HX711.h>
#include <SimpleTimer.h>
#include <SevSeg.h>

#define BLE_UUID_FILE_NAME "2D2F88C4-F244-5A80-21F1-EE0224E80658"
#define switchPin A2
SevSeg sevseg;

HX711 scale;
// HX711 circuit wiring
const int LOADCELL_DOUT_PIN = 5;
const int LOADCELL_SCK_PIN = 4;
const float Calibration_Weight = 630;

int lastMeasurement = -1;
SimpleTimer measurementInterval;

BLEService ledService("180A"); // BLE LED Service


// BLE LED Switch Characteristic - custom 128-bit UUID, read and writable by central
BLEIntCharacteristic switchCharacteristic("2A57", BLERead | BLEWrite);

//for writing strings to app
BLEIntCharacteristic fileNameCharacteristic( BLE_UUID_FILE_NAME, BLERead | BLENotify);

void setup() {
  Serial.begin(9600);
  
  /***Segment-Display-Block***/
  byte numDigits = 4; //Hier wird die Anzahl der Ziffern angegeben
  byte digitPins[] = {6, 7, 8 , 9}; //segment number pins
  byte segmentPins[] = {10, 11, 12, 2, 3, 13, A0, A1}; //Segmentdisplay Pins
  sevseg.begin(COMMON_CATHODE, numDigits, digitPins, segmentPins); 
  
  /***Timer-Block***/
  measurementInterval.setInterval(300) ;     
    
  /***Scale-Block***/
  scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);

  //calibration script
  scale.set_scale();
  scale.tare();
  Serial.println("Calibration");
  Serial.println("Put a known weight on the scale");
  delay(5000);
  float x = scale.get_units(10);
  x = x / Calibration_Weight;
  Serial.println(x);
  scale.set_scale(x);
  Serial.println("Calibration finished...");

  scale.set_scale(-232.97); //measured value I guess

  /***BLE-Block***/
  
  // set LED's pin to output mode
  pinMode(LEDR, OUTPUT);
  pinMode(LEDG, OUTPUT);
  pinMode(LEDB, OUTPUT);
  pinMode(LED_BUILTIN, OUTPUT);

  digitalWrite(LED_BUILTIN, LOW);         // when the central disconnects, turn off the LED
  digitalWrite(LEDR, HIGH);               // will turn the LED off
  digitalWrite(LEDG, HIGH);               // will turn the LED off
  digitalWrite(LEDB, HIGH);                // will turn the LED off

  // begin initialization
  if (!BLE.begin()) {
    Serial.println("starting Bluetooth® Low Energy failed!");

    while (1);
  }

  // set advertised local name and service UUID:
  BLE.setLocalName("Nano 33 BLE");
  BLE.setAdvertisedService(ledService);

  // add the characteristic to the service
  ledService.addCharacteristic(switchCharacteristic);
  ledService.addCharacteristic(fileNameCharacteristic);
  

  // add service
  BLE.addService(ledService);

  // set the initial value for the characteristic:
  switchCharacteristic.writeValue(0);

  // start advertising
  BLE.advertise();

  Serial.println("BLE LED Peripheral");
}

void loop() {
 /* int valueButtonPress = analogRead(switchPin);
  if(valueButtonPress == 1013){
    scale.tare();
    Serial.println("BNuttonpressed");
  }*/
  // listen for BLE peripherals to connect:
  BLEDevice central = BLE.central();

  measureWeight();
  sevseg.refreshDisplay(); 
  sevseg.setBrightness(100);

  // if a central is connected to peripheral:
  if (central) {
    Serial.print("Connected to central: ");
    // print the central's MAC address:
    Serial.println(central.address());
    digitalWrite(LED_BUILTIN, HIGH);            // turn on the LED to indicate the connection
    
    // while the central is still connected to peripheral:
    while (central.connected()) {

      measureWeight();
      sevseg.refreshDisplay(); 
      sevseg.setBrightness(100);
      fileNameCharacteristic.writeValue(lastMeasurement);
          
  
      // if the remote device wrote to the characteristic,
      // use the value to control the LED:
      if (switchCharacteristic.written()) {
        switch (switchCharacteristic.value()) {   // any value other than 0 
          case 01:
            Serial.println("Red LED on");
            digitalWrite(LEDR, LOW);            // will turn the LED on
            digitalWrite(LEDG, HIGH);         // will turn the LED off
            digitalWrite(LEDB, HIGH);         // will turn the LED off
            break;
          case 02:
            Serial.println("Green LED on");
            digitalWrite(LEDR, HIGH);         // will turn the LED off
            digitalWrite(LEDG, LOW);        // will turn the LED on
            digitalWrite(LEDB, HIGH);        // will turn the LED off
            break;
          case 03:
            Serial.println("Blue LED on");
            digitalWrite(LEDR, HIGH);         // will turn the LED off
            digitalWrite(LEDG, HIGH);       // will turn the LED off
            digitalWrite(LEDB, LOW);         // will turn the LED on
            break;
          default:
            Serial.println(F("LEDs off"));
            digitalWrite(LEDR, HIGH);          // will turn the LED off
            digitalWrite(LEDG, HIGH);        // will turn the LED off
            digitalWrite(LEDB, HIGH);         // will turn the LED off
            break;
        }
        Serial.println(switchCharacteristic.value());
      }
    }

    // when the central disconnects, print it out:
    Serial.print(F("Disconnected from central: "));
    Serial.println(central.address());
    digitalWrite(LED_BUILTIN, LOW);         // when the central disconnects, turn off the LED
    digitalWrite(LEDR, HIGH);          // will turn the LED off
    digitalWrite(LEDG, HIGH);        // will turn the LED off
    digitalWrite(LEDB, HIGH);         // will turn the LED off
  }
}

void measureWeight(){
   if (measurementInterval.isReady()){
    Serial.println("1 second has passed");
      if (scale.is_ready()) {
        int newMeasurement = scale.get_units();
        if ((lastMeasurement - newMeasurement > 1) || (lastMeasurement - newMeasurement < -1) ) //only update value if needed
        {
          Serial.print("HX711 reading: ");
          Serial.println(newMeasurement);
          lastMeasurement = newMeasurement;
          sevseg.setNumber(lastMeasurement,4);
          
        }  
     }
      else {
        Serial.println("HX711 not found.");
      }
      measurementInterval.reset();
  }
}
