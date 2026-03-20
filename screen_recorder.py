"""
Screen Recorder — Quay màn hình để review website
Bấm Ctrl+C trong terminal để dừng recording
Video lưu tại: ./recordings/review_TIMESTAMP.mp4
"""
import cv2
import numpy as np
import pyautogui
import time
import os
import signal
import sys
from datetime import datetime

# Config
FPS = 10
OUT_DIR = "/Users/nguynbon03/Desktop/MMO/Blog OPA/recordings"
os.makedirs(OUT_DIR, exist_ok=True)

timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
output_path = f"{OUT_DIR}/review_{timestamp}.mp4"

# Get screen size
screen_size = pyautogui.size()
print(f"")
print(f"=== SCREEN RECORDER ===")
print(f"Màn hình: {screen_size.width}x{screen_size.height}")
print(f"FPS: {FPS}")
print(f"Output: {output_path}")
print(f"")
print(f">>> ĐANG QUAY... Bấm Ctrl+C để DỪNG <<<")
print(f"")

# Video writer
fourcc = cv2.VideoWriter_fourcc(*"mp4v")
writer = cv2.VideoWriter(
    output_path,
    fourcc,
    FPS,
    (screen_size.width, screen_size.height)
)

recording = True

def stop_recording(sig, frame):
    global recording
    recording = False
    print("\n>>> Đang dừng recording...")

signal.signal(signal.SIGINT, stop_recording)

frame_count = 0
start_time = time.time()

try:
    while recording:
        # Capture screen
        screenshot = pyautogui.screenshot()
        frame = np.array(screenshot)
        frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)

        # Resize if retina (2x)
        if frame.shape[1] > screen_size.width:
            frame = cv2.resize(frame, (screen_size.width, screen_size.height))

        writer.write(frame)
        frame_count += 1

        # Show progress every 5 seconds
        elapsed = time.time() - start_time
        if frame_count % (FPS * 5) == 0:
            print(f"  Đang quay... {elapsed:.0f}s ({frame_count} frames)")

        # Control FPS
        time.sleep(1.0 / FPS)

except Exception as e:
    print(f"Error: {e}")

finally:
    writer.release()
    elapsed = time.time() - start_time
    print(f"")
    print(f"=== HOÀN THÀNH ===")
    print(f"Thời gian: {elapsed:.1f}s")
    print(f"Frames: {frame_count}")
    print(f"File: {output_path}")
    print(f"")

    # Also extract key frames as screenshots
    print("Đang trích xuất screenshots từ video...")
    cap = cv2.VideoCapture(output_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

    # Extract 1 frame every 3 seconds
    screenshots_dir = f"{OUT_DIR}/frames_{timestamp}"
    os.makedirs(screenshots_dir, exist_ok=True)

    interval = FPS * 3  # every 3 seconds
    idx = 0
    shot = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            break
        if idx % interval == 0:
            cv2.imwrite(f"{screenshots_dir}/{shot:03d}.png", frame)
            shot += 1
        idx += 1

    cap.release()
    print(f"Đã trích xuất {shot} screenshots vào {screenshots_dir}/")
    print(f"")
    print(f"Bạn có thể xem video tại: {output_path}")
