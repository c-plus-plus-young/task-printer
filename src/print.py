from escpos.printer import Usb
from PIL import Image

import sys

# Replace with your printer's USB vendor and product IDs (from lsusb)
VENDOR_ID = 0x04b8  # Example: Epson
PRODUCT_ID = 0x0202  # Example: TM-T70

# Connect to printer
p = Usb(VENDOR_ID, PRODUCT_ID)

# Set width
p.device_profile = {
	"media":{"width":{"pixel":384}}
}

def print_message(message):
	p.text(message)

def print_aperture_logo():
	p.text("              .,-:;//;:=,")
	p.text("          . :H@@@MM@M#H/.,+%;,")
	p.text("       ,/X+ +M@@M@MM%=,-%HMMM@X/,")
	p.text("     -+@MM; $M@@MH+-,;XMMMM@MMMM@+-")
	p.text("    ;@M@@M- XM@X;. -+XXXXXHHH@M@M#@/.")
	p.text("  ,%MM@@MH ,@%=             .---=-=:=,.")
	p.text("  =@#@@@MX.,                -%HX$$%%%:;")
	p.text(" =-./@M@M$                   .;@MMMM@MM:")
	p.text(" X@/ -$MM/                    . +MM@@@M$")
	p.text(",@M@H: :@:                    . =X#@@@@-")
	p.text(",@@@MMX, .                    /H- ;@M@M=")
	p.text(".H@@@@M@+,                    %MM+..%#$.")
	p.text(" /MMMM@MMH/.                  XM@MH; =;")
	p.text("  /%+%$XHH@$=              , .H@@@@MX,")
	p.text("   .=--------.           -%H.,@@@@@MX,")
	p.text("   .%MM@@@HHHXX$$$%+- .:$MMX =M@@MM%.")
	p.text("     =XMMM@MM@MM#H;,-+HMM@M+ /MMMX=")
	p.text("       =%@M@M#@$-.=$@MM@@@M; %M%=")
	p.text("         ,:+$+-,/H#MMMMMMM@= =,")
	p.text("               =++%%%%+/:-.")

def print_image():
	# Load and print image
	image = Image.open("../test/test.png")
	p.image(image, align="center")

def cut():
	# Feed a few lines and cut
	p.text("\n\n\n")
	p.cut(mode='PART') # partial cut, leaves corner attached


def main():
    # if sys.argv[1] == "message":
	# 	print_message(message)
	print_aperture_logo()

main()