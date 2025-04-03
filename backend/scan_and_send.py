import asyncio
from bleak import BleakScanner
import requests

# ⚙️ ตั้งค่าตามเครื่องแต่ละตัว
LAPTOP_INDEX = 4             # 👈 เปลี่ยนเป็น 1-4 ตามเครื่อง
PRODUCT_ID = 10               # ID ของสินค้าที่ต้องการผูก
BEACON_MAPPING = {
    "IBKS 105 No 1": 1,
    "IBKS 105 No 2": 2,
    "IBKS 105 No 3": 3,
    "IBKS 105 No 4": 4,
    "IBKS 105 No 5": 5,
    "IBKS 105 No 6": 6
}
BACKEND_URL = "http://localhost:5000/update-rssi-current"  # URL backend

# 🚀 ฟังก์ชันส่ง RSSI ไป API
def send_rssi_to_api(product_id, beacon_id, rssi, laptop_index):
    payload = {
        "productId": product_id,
        "beaconId": beacon_id,
        "rssi": rssi,
        "laptopIndex": laptop_index
    }

    try:
        res = requests.post(BACKEND_URL, json=payload)
        if res.status_code == 200:
            print(f"✅ ส่งค่า RSSI สำเร็จ: {rssi} (Laptop {laptop_index})")
        else:
            print(f"❌ ส่งค่า RSSI ล้มเหลว:", res.text)
    except Exception as e:
        print(f"❌ เกิดข้อผิดพลาดในการส่ง: {e}")

# 🔍 ฟังก์ชันสแกน BLE แล้วส่งค่า
async def scan_and_send():
    print(f"🔍 กำลังสแกน Beacon: ...")
    devices = await BleakScanner.discover(timeout=5.0)

    for d in devices:
        beacon_name = d.name
        if beacon_name in BEACON_MAPPING:
            beacon_id = BEACON_MAPPING[beacon_name]
            send_rssi_to_api(PRODUCT_ID, beacon_id, d.rssi, LAPTOP_INDEX)

    print(f"⚠️ ไม่พบ Beacon ")

# 🔁 Loop สแกนทุก 10 วินาที
async def loop_scan(interval=10):
    while True:
        await scan_and_send()
        await asyncio.sleep(interval)

# ✅ เริ่มรัน
asyncio.run(loop_scan())
