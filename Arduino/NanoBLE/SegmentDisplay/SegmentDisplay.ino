#include "SevSeg.h" //Die vorher hinzugefügte Library laden
SevSeg sevseg; //Ein sieben Segment Objekt initialisieren

void setup() 
{
byte numDigits = 4; //Hier wird die Anzahl der Ziffern angegeben
byte digitPins[] = {6, 7, 8 , 9}; //Die Pins zu den Ziffern werden festgelegt
byte segmentPins[] = {10, 11, 12, 2, 3, 13, A0, A1}; //Die Pins zu den //Segmenten werden festgelegt
sevseg.begin(COMMON_CATHODE, numDigits, digitPins, segmentPins); //In diesem
//Abschnitt kann man nun entweder testen welche Art von Display man besitzt oder
//wenn man es schon weiß angeben ob es sich um ein COMMON_CATHODE oder
//COMMON_ANODE Display handelt. Das Display funktioniert nur wenn die richtige
//Art eingetragen ist, ansonsten werden alle Segmente gleichzeitig leuchten.

}

void loop() 
{
  int test = -456;
sevseg.setNumber(test,4); //Hier können wir nun die gewünschte Zahl eintragen.
//Wir haben als Beispiel 1234 angegeben. Die Zahl hinter dem Komma steht für den
//Punkt hinter einer Ziffer. Hierbei ist 3 der Punkt neben der ersten Ziffer und
//0 wäre der Punkt ganz rechts neben der letzten Ziffer. Wenn man keinen Punkt
//mit angezeigt haben möcht kann man z.B. 4 angeben.
sevseg.refreshDisplay(); // Dieser Teil lässt die Nummer auf dem Display
//erscheinen.
sevseg.setBrightness(90); //Hier kann die Helligkeit des Displays angepasst
//werden. In einem Bereich von 0-100 wobei 100 das Hellste ist. 0 bedeutet
//jedoch nicht dass das Display komplett dunkel ist. Für die Anzeige einer Zahl
//ist allein die "sevseg.refreshDisplay();" Zeile verantwortlich
}
