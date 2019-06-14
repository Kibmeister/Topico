#include "FastLED.h"
#define NUM_STRIPS 2
#define NUM_LEDS 56
CRGB leds[NUM_STRIPS][NUM_LEDS];
int nr = 1;
int led = 0;

void setup() {
  Serial.begin(9600); // Starts the serial communication
  FastLED.addLeds<NEOPIXEL, 6>(leds[1], NUM_LEDS);
}
void loop() {
  setLED();
  if(nr == 1) { 
    choose();
  }
  if(nr == 2){
    guy1();
  }
  if(nr == 3){
    guy2();
  }
  if(nr == 4){
    guy3(); 
  }
  if(nr == 5){
    guy4();
  }
  if(nr == 6){
    que1();
  }
  if(nr == 7){
    que2();
  }
  if(nr == 8){
    que3();
  }
  if(nr == 9){
    que4();
  }
  if(nr == 10){
    record();
  }
}

void record() {
  for(int i = 0; i<100; i++) {
  for(int i = 0; i<NUM_LEDS; i++){
        leds[1][i] = CRGB::Red; 
        delay(10);
       }
       FastLED.show();
   for(int i = 0; i<NUM_LEDS; i++){
        leds[1][i] = CRGB::Black; 
        delay(10);
       }
        if (Serial.available()) {
    break;
    }
       FastLED.show();
  }
}

void setLED() {
  if (Serial.available()) {
    nr = Serial.parseInt();
    Serial.println(nr);
    }
}

void guy1() {
  led = 13;  
  for(int i = 0; i<led; i++){
        leds[1][i] = CRGB::Green; 
        delay(5);
  }
  for(int i = led; i<NUM_LEDS; i++){
        leds[1][i] = CRGB::Black; 
        delay(5);
        
  }
  FastLED.show();
}

void guy2() {
  led = 27;
  for(int i = 0; i<26; i++){
        leds[1][i] = CRGB::Black; 
        delay(5); 
  } 
  for(int i = 14; i<led; i++){
        leds[1][i] = CRGB::Green; 
        delay(5);
  }
  for(int i = led; i<NUM_LEDS; i++){
        leds[1][i] = CRGB::Black; 
        delay(5);
        
  }
  FastLED.show();
}

void guy3() {
  led = 41;
  for(int i = 0; i<27; i++){
        leds[1][i] = CRGB::Black; 
        delay(5);
  }
  for(int i = 28; i<led; i++){
        leds[1][i] = CRGB::Green; 
        delay(5);
  }
  for(int i = led; i<NUM_LEDS; i++){
        leds[1][i] = CRGB::Black; 
        delay(5);
        
  }
  FastLED.show();
}

void guy4() {
  led = 56;
  for(int i = 0; i<41; i++){
        leds[1][i] = CRGB::Black; 
        delay(5); 
  } 
  for(int i = 42; i<led; i++){
        leds[1][i] = CRGB::Green; 
        delay(5);
  }
  for(int i = led; i<NUM_LEDS; i++){
        leds[1][i] = CRGB::Black; 
        delay(5); 
  }
  FastLED.show();
}

void choose() {
  if(Serial.available()) {
    return;
    }
  for(int i = 0; i<100; i++) {
  for(int i = 0; i<NUM_LEDS; i++){
        leds[1][i] = CRGB::White; 
        delay(5);
        FastLED.show();
       }
   for(int i = 0; i<NUM_LEDS; i++){
        leds[1][i] = CRGB::Black; 
        delay(5);
        FastLED.show();
       }   
  }
  }

void guy1que() {
  led = 13;  
  for(int i = 0; i<led; i++){
        leds[1][i] = CRGB::Green; 
        delay(100);
        FastLED.show();
  }
  delay(1000);
  }

void guy2que() {
  led = 27;
  for(int i = 14; i<led; i++){
        leds[1][i] = CRGB::Green; 
        delay(100);
        FastLED.show();
  }
  delay(1000);
  }

void guy3que() {
  led = 42;
  for(int i = 28; i<led; i++){
        leds[1][i] = CRGB::Green; 
        delay(100);
        FastLED.show();
  }
  delay(1000);
  }

void guy4que() {
  led = 56;
    for(int i = 43; i<led; i++){
        leds[1][i] = CRGB::Green; 
        delay(100);
        FastLED.show();
}
delay(1000);
}

void que1() {
    guy2que();
    guy3que();
    guy4que();
  }

void que2() {
    guy3que();
    guy4que();
    guy1que();
  }

void que3() {
    guy4que();
    guy1que();
    guy2que(); 
  }

void que4() {
    guy1que();
    guy2que();
    guy3que();
  }
