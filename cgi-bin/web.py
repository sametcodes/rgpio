#!/usr/bin/python

import RPi.GPIO as GPIO
import cgi, os, sys

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)

form = cgi.FieldStorage()
pinler = [2, 3, 4, 14, 15, 17, 18, 22, 23, 27, 24, 10, 9, 25, 8, 7, 11, 5, 6, 13, 19, 26, 12, 16, 20, 21]

for pin in pinler:
	GPIO.setup(pin, GPIO.OUT)

print "Content-type:text/html\n"

def get_pins():
	for pin in pinler:
		print str(pin) + "=" + str(GPIO.input(pin))
	
for pin in form.keys():
	if form[pin].value == "etkin":
		GPIO.output(int(pin), 1)
	elif form[pin].value == "pasif":
		GPIO.output(int(pin), 0)
	if str(pin) == "pin" and str(form[pin].value) == "goster":
		get_pins()
