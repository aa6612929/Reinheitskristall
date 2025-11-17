import qrcode
from PIL import Image, ImageDraw




# 🔗 رابط الموقع
data = "https://reinheits-kristall.de"

# إنشاء QR code
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,  # تصحيح عالي
    box_size=10,
    border=4,
)
qr.add_data(data)
qr.make(fit=True)

# إنشاء صورة QR
img = qr.make_image(fill_color="black", back_color="white").convert("RGBA")

# تحميل الشعار (يُفضل أن يكون بخلفية شفافة)
logo = Image.open("endIcon_bw.png").convert("RGBA")

# تحديد الأحجام
qr_width, qr_height = img.size
logo_size = qr_width // 4  # الشعار ربع حجم الكود
logo = logo.resize((logo_size, logo_size))

# تحديد موقع الشعار في المنتصف
pos = ((qr_width - logo_size) // 2, (qr_height - logo_size) // 2)

# 🧱 تفريغ المنطقة خلف الشعار (نجعلها بيضاء)
draw = ImageDraw.Draw(img)
x, y = pos
draw.rectangle([x, y, x + logo_size, y + logo_size], fill="white")

# 🖼️ لصق الشعار فوق المنطقة الفارغة
img.paste(logo, pos, mask=logo)

# حفظ النتيجة
img.save("qr.png")

print("✅ تم إنشاء QR Code بخلفية فارغة تحت الشعار: qr.png")
