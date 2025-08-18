from escpos.printer import Usb
from escpos.capabilities import get_profile
from PIL import Image

# Load Epson profile
profile = get_profile("epson")

# Connect to USB printer
p = Usb(0x04b8, 0x0202, profile=profile)

# --- Font A ---
p.set(font='A', bold=False, underline=0, width=1, height=1)
p.text("Font A - Normal\n")

p.set(font='A', bold=True)
p.text("Font A - Bold\n")

p.set(font='A', underline=1)
p.text("Font A - Underlined\n")

p.set(font='A', width=2, height=2)
p.text("Font A - Double Size\n\n")

# Reset to normal
p.set(font='A', bold=False, underline=0, width=1, height=1)

# --- Font B ---
p.set(font='B', bold=False, underline=0, width=1, height=1)
p.text("Font B - Normal\n")

p.set(font='B', bold=True)
p.text("Font B - Bold\n")

p.set(font='B', underline=1)
p.text("Font B - Underlined\n")

p.set(font='B', width=2, height=2)
p.text("Font B - Double Size\n\n")

# Reset to normal
p.set(font='B', bold=False, underline=0, width=1, height=1)

# --- Centered text ---
p.text("Centered Text\n")  # Use device_profile width for centering if needed

# --- Optional: Print a centered image ---
image = Image.open("logo.png").convert("1")  # monochrome
printer_width = 384  # typical for 80mm
offset = max((printer_width - image.width) // 2, 0)
new_img = Image.new("1", (printer_width, image.height), 1)
new_img.paste(image, (offset, 0))
p.image(new_img)

# --- Blank lines and partial cut ---
p.text("\n\n\n\n\n")
p.cut(mode='PART')

