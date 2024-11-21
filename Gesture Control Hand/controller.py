import firebase_admin
from firebase_admin import credentials, db
import serial
import time

# Firebase setup
cred = credentials.Certificate("/Users/alexandrtaibert/Desktop/Arduino Project/firebase.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://iotproject-9e92f-default-rtdb.firebaseio.com/'
})

# Firebase reference for fingers path
fingers_ref = db.reference("fingers")

# Serial setup for Arduino communication
ser = serial.Serial('/dev/cu.usbmodem101', baudrate=9600, timeout=1)

# Function to listen to Firebase changes (i.e., for servo control)
def listen_to_firebase():
    while True:
        # Fetch the latest data from Firebase
        data = fingers_ref.get()

        if data:
            thumb = data.get("thumb", 0)
            index = data.get("index", 0)
            middle = data.get("middle", 0)
            pinky = data.get("pinky", 0)
            ring = data.get("ring", 0)

            # Send the data to the Arduino to control the servos
            send_to_arduino(thumb, index, middle, ring, pinky)

        time.sleep(1)  # Poll Firebase every second

# Function to send data to Arduino for servo control
def send_to_arduino(thumb, index, middle, ring, pinky):
    data = f"{thumb} {index} {middle} {ring} {pinky}\n"
    print(f"Sending data to Arduino: {data}")
    ser.write(data.encode())  # Send data to Arduino

# Start the Firebase listener
try:
    listen_to_firebase()
except KeyboardInterrupt:
    print("Interrupted by user")

finally:
    ser.close()
