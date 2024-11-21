import firebase_admin
from firebase_admin import credentials, db
import cv2
from cvzone.HandTrackingModule import HandDetector
import time
import serial

# Firebase setup
cred = credentials.Certificate("/Users/alexandrtaibert/Desktop/Arduino Project/firebase.json")
firebase_admin.initialize_app(cred, {
    #Your link to the Firebase 
})

# Firebase reference for fingers path
fingers_ref = db.reference("fingers")

# Initialize HandDetector with higher confidence
detector = HandDetector(detectionCon=0.8, maxHands=1)

# Initialize camera
cap = cv2.VideoCapture(0)

# Serial setup for Arduino communication
ser = serial.Serial('/dev/cu.usbmodem101', baudrate=9600, timeout=1)

# Track last finger data to minimize redundant updates
last_finger_data = None

# Function to update Firebase with finger data
def update_firebase_fingers(index, middle, pinky, ring, thumb):
    global last_finger_data
    finger_data = {
        "index": index,
        "middle": middle,
        "pinky": pinky,
        "ring": ring,
        "thumb": thumb,
        "timestamp": int(time.time())
    }
    # Only update if there's a change
    if finger_data != last_finger_data:
        fingers_ref.set(finger_data)
        last_finger_data = finger_data

# Function to send finger data to Arduino
def send_to_arduino(index, middle, pinky, ring, thumb):
    # Reverse the thumb state (invert thumb value)
    thumb = 1 - thumb  # If 0, change to 1; if 1, change to 0

    # Prepare data to send to Arduino in "1 0 1 0 1" format
    data = f"{thumb} {index} {middle} {ring} {pinky}\n"
    print(f"Sending data to Arduino: {data}")  # Debugging output
    ser.write(data.encode())  # Send data to Arduino

# Main loop for finger detection and sending data to Arduino
try:
    while True:
        # Capture frame-by-frame
        ret, frame = cap.read()

        if not ret:
            print("Failed to grab frame.")
            break

        # Flip frame to avoid mirrored image
        frame = cv2.flip(frame, 1)

        # Detect hands and get finger states
        hands, _ = detector.findHands(frame, flipType=False)  # Detect hands in the frame
        if hands:
            hand = hands[0]
            fingers = detector.fingersUp(hand)  # Get a list of 1s and 0s for each finger
            # Invert the thumb value because it works opposite to the other fingers
            index, middle, pinky, ring, thumb = fingers[1], fingers[2], fingers[3], fingers[4], 1 - fingers[0]  # Invert thumb value

            # Update Firebase with finger data
            update_firebase_fingers(index, middle, pinky, ring, thumb)

            # Send the finger data to Arduino
            send_to_arduino(index, middle, pinky, ring, thumb)

            # Display the detected fingers on the screen
            cv2.putText(frame, f"Index: {index}", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 0, 0), 2)
            cv2.putText(frame, f"Middle: {middle}", (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 0, 0), 2)
            cv2.putText(frame, f"Pinky: {pinky}", (10, 90), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 0, 0), 2)
            cv2.putText(frame, f"Ring: {ring}", (10, 120), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 0, 0), 2)
            cv2.putText(frame, f"Thumb: {thumb}", (10, 150), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 0, 0), 2)
        
        else:
            # Set all fingers to down if no hand is detected
            send_to_arduino(0, 0, 0, 0, 0)
            update_firebase_fingers(0, 0, 0, 0, 0)

        # Show the frame with OpenCV
        cv2.imshow("Finger Detection", frame)

        # Press 'q' to quit
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

except KeyboardInterrupt:
    print("Interrupted by user")

finally:
    # Release the capture and close windows
    cap.release()
    cv2.destroyAllWindows()
