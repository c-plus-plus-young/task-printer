from escpos.printer import Usb
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

def cut():
	# Feed a few lines and cut
	p.text("\n")
	p.cut(mode='PART') # partial cut, leaves corner attached

def main():
	message = sys.argv[1]
	print_message(message)
	cut()

main()