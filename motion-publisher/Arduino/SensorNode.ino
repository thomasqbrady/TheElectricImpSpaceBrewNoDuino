#include <SoftwareSerial.h>

#define trigPin A3
#define echoPin A2

boolean detected = false;
int led = 13;

void setup()
{
  Serial.begin(9600);
  pinMode(led, OUTPUT);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }
  setupSonar();
}

void loop()
{
  long distance = getDistance();
  //Serial.println(distance);
  if (Serial.available()) {
    int b = 0;
    b = Serial.read();
    if (b == 0x11) {
      blink();
      delay(3600000); // wait a long time (this is for night mode, not yet supported on the Imp code)
      detected = false;
      digitalWrite(led,LOW);
    }
  }
  if (distance < 140) {
    if (!detected) {
      detected = true;
      digitalWrite(led, HIGH);
      Serial.write(0x11);
      delay(3000);
    } else {
      detected = false;
      digitalWrite(led, LOW);
      Serial.write(0x10);
    }
  } else {
    if (detected) {
      detected = false;
      digitalWrite(led, LOW);
      Serial.write(0x10);
    }
  }
  delay(250);
}

void setupSonar(void) {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  blink();
}

void blink() {
  digitalWrite(led, LOW);
  delay(500);
  digitalWrite(led, HIGH);
  delay(500);
  digitalWrite(led, LOW);
  delay(500);
  digitalWrite(led, HIGH);
  delay(500);
  digitalWrite(led, LOW);
  delay(500);
  digitalWrite(led, HIGH);
  delay(500);
  digitalWrite(led, LOW);
}

long getDistance(void) {
  long duration, distance;
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  distance = (duration/2) / 29.1;
  return distance;
}