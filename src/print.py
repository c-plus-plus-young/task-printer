from escpos.printer import Usb
from PIL import Image

# Replace with your printer's USB vendor and product IDs (from lsusb)
VENDOR_ID = 0x04b8  # Example: Epson
PRODUCT_ID = 0x0202  # Example: TM-T70

# Connect to printer
p = Usb(VENDOR_ID, PRODUCT_ID)

# Set width
p.device_profile = {
	"media":{"width":{"pixel":384}}
}

# Load and print image
image = Image.open("../test/test.png")
p.image(image, align="center")

# Feed a few lines and cut
p.text("\n\n\n")
p.cut(mode='PART')
