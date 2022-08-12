
#include "HX711.h"
// HX711 circuit wiring
const int LOADCELL_DOUT_PIN = 5;
const int LOADCELL_SCK_PIN = 4;
const float Calibration_Weight = 513;
HX711 scale;
void setup() {
Serial.begin(57600);
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

delay(1500);
}
void loop() {

if (scale.is_ready()) {
float reading = scale.get_units();
Serial.print("HX711 reading: ");
Serial.println(reading);
} else {
Serial.println("HX711 not found.");
}
delay(1500);
}
