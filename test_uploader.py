"""test_1_send_images.py -- basic send images test.

A simple test program that uses imagezmq to send images to a receiving program
that will display the images.

This program requires that the image receiving program to be running first.
Brief test instructions are in that program: test_1_receive_images.py.
"""

import sys
import time
import numpy as np
import cv2
import imagezmq.imagezmq as imagezmq
from imutils.video import VideoStream, FileVideoStream
import argparse
import os

ap = argparse.ArgumentParser()
ap.add_argument("-i", "--index", type=str, required=True,
    help="name of CCTV", default=240)
ap.add_argument("-s", "--source", type=str, required=True,
    help="name of source", default=240)
ap.add_argument("-W", "--width", type=int,
    help="width of image output", default=320)
ap.add_argument("-H", "--height", type=int,
    help="height of image output", default=240)

ap.add_argument("-u", "--url", type=str, 
    help="height of image output", default="localhost")
ap.add_argument("-p", "--port", type=str, 
    help="height of image output", default="5555")

args = vars(ap.parse_args())


sender = imagezmq.ImageSender(connect_to=f'tcp://{args["url"]}:{args["port"]}')
# sender = imagezmq.ImageSender()
i = 0

if args["source"].isnumeric():
    source = int(args["source"])
    start = True
else:
    source = args["source"]

    if os.path.isfile(source):
        start = True
    else:
        start = False

# vs = VideoStream(src=source, resolution=(args["width"], args["height"])).start()
vs = FileVideoStream(source).start()
time.sleep(2.0)

while start:  
    i = i + 1
    image = vs.read()
    # print(image)

    if image is not None:
        respon = (sender.send_image_reqrep(args["index"], image))
        # print(respon)

        # time.sleep(0.5)
        

vs.stop()

#running
# python test_uploader.py -i 0 -s 0 -W 320 - 240 -u localhost -p 5555
