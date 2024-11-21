#include <Servo.h>

const int numServos = 5;
int servoPins[numServos] = {9, 10, 11, 12, 13}; // Servo pins for each finger
Servo servos[numServos];

void setup() {
  // Attach each servo to its respective pin
  for (int i = 0; i < numServos; i++) {
    servos[i].attach(servoPins[i]);
    servos[i].write(90);  // Initialize each servo to 90 degrees (neutral position)
  }
  Serial.begin(9600);  // Initialize serial communication
  Serial.println("Setup complete. Waiting for data...");
}

void loop() {
  // Check if data is available on the serial port
  if (Serial.available() > 0) {
    // Read the incoming data as a string until a newline character
    String fingerData = Serial.readStringUntil('\n');
    fingerData.trim();  // Remove any extra whitespace

    // Debug: Print received data to ensure it's correct
    Serial.print("Received data: ");
    Serial.println(fingerData);

    // Ensure the received data length matches the number of servos
    if (fingerData.length() == numServos * 2 - 1) { // e.g., "1 0 1 0 1"
      // Parse finger data and control each servo based on the state of each finger
      for (int i = 0; i < numServos; i++) {
        int fingerState = fingerData[i * 2] - '0';  // Convert character '1' or '0' to integer

        // Special case for the thumb (finger 0), reverse the logic here
        if (i == 0) {
          // Reverse the thumb state: If it's "up" (1), move to 180 degrees (closed position)
          // If it's "down" (0), move to 0 degrees (spread position)
          fingerState = (fingerState == 1) ? 0 : 1;
        }

        // Move the servo based on the finger state
        if (fingerState == 1) {
          moveServoTo(i, 0);  // Move to 0 degrees (spread position)
          Serial.print("Finger ");
          Serial.print(i + 1);
          Serial.println(" up: Moving to 0 degrees.");
        } else {
          moveServoTo(i, 180);  // Move to 180 degrees (closed position)
          Serial.print("Finger ");
          Serial.print(i + 1);
          Serial.println(" down: Moving to 180 degrees.");
        }
      }
    }

    delay(100);  // Small delay for serial stability
  }
}

// Function to move the specified servo gradually to a target position
void moveServoTo(int servoIndex, int targetPosition) {
  int currentPosition = servos[servoIndex].read();  // Get the current position of the servo
  if (currentPosition == targetPosition) return;  // No need to move if already at the target

  // Move towards the target position gradually
  if (currentPosition < targetPosition) {
    for (int pos = currentPosition; pos <= targetPosition; pos++) {
      servos[servoIndex].write(pos);
      delay(10);  // Control speed by adjusting delay (faster movement with smaller delay)
    }
  } else {
    for (int pos = currentPosition; pos >= targetPosition; pos--) {
      servos[servoIndex].write(pos);
      delay(10);  // Control speed by adjusting delay (faster movement with smaller delay)
    }
  }
}
