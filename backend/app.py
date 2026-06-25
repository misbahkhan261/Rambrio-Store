"""
============================================================================
RIMBERIO — Executive Distribution Platform Layer
Production Python Flask Automation Engine (app.py)
============================================================================
"""

import os
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

# Enforce secure network access cross-origin orchestration
CORS(app, resources={r"/api/*": {"origins": "*"}})

FLAT_DELIVERY_CHARGE = 399

def dynamic_inventory_builder():
    """
    🤖 PURE AUTOMATION MACHINE: 
    Automatically looks outside the backend folder into frontend/public/ 
    to map and build live product nodes based on available images.
    """
    # Navigating correctly to ../frontend/public folder structure
    public_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'frontend', 'public'))
    products = []
    
    # Metadata anchor blueprint for naming and pricing conventions
    meta_vault = {
        "moon-lamp": {"name": "LUNA GLOW 3D Moon Lamp", "price": 2999, "compareAt": 4499, "tag": "LIFESTYLE"},
        "crystal-ball": {"name": "NEBULA 3D Crystal Ball Orb Light", "price": 1299, "compareAt": 2499, "tag": "LIFESTYLE"},
        "study-lamp": {"name": "LED Study Lamp with Pen Holder & Phone Stand", "price": 2399, "compareAt": 3999, "tag": "GADGETS"},
        "bird-feeder": {"name": "Waterproof Outdoor Wild Bird Hanging Grains Feeder", "price": 1599, "compareAt": 2999, "tag": "LIFESTYLE"}
    }

    if os.path.exists(public_dir):
        files = os.listdir(public_dir)
        # Identify base items using the primary anchor naming pattern '-1.png'
        for file in sorted(files):
            if file.endswith(('.png', '.jpg', '.jpeg')) and '-1' in file:
                key = file.split('-1')[0]
                
                # Dynamic fallback strategy for unexpected assets
                meta = meta_vault.get(key, {
                    "name": key.replace('-', ' ').upper() + " ELITE DROP",
                    "price": 2500,
                    "compareAt": 3500,
                    "tag": "NEW ARRIVALS"
                })
                
                # Secondary and tertiary rendering checks
                ext = os.path.splitext(file)[1]
                img2_name = f"{key}-2{ext}"
                img3_name = f"{key}-3{ext}"
                
                products.append({
                    "id": f"product-{key}",
                    "name": meta["name"],
                    "price": meta["price"],
                    "compareAt": meta["compareAt"],
                    "tag": meta["tag"],
                    "img1": f"public/{file}",
                    "img2": f"public/{img2_name}" if img2_name in files else f"public/{file}",
                    "img3": f"public/{img3_name}" if img3_name in files else ""
                })
    return products

# ============================================================================
# ENDPOINTS ARCHITECTURE PIPELINE
# ============================================================================
@app.route('/api/products', methods=['GET'])
def get_products():
    try:
        live_catalog = dynamic_inventory_builder()
        return jsonify({"success": True, "products": live_catalog}), 200
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500

@app.route('/api/checkout', methods=['POST'])
def process_checkout():
    try:
        payload = request.get_json() or {}
        customer = payload.get('customer')
        cart = payload.get('cart')
        payment_method = payload.get('paymentMethod')

        if not customer or not cart or not payment_method:
            return jsonify({"success": False, "message": "Missing required data packets."}), 400

        subtotal = sum(item['price'] * item['qty'] for item in cart)
        final_total = subtotal + FLAT_DELIVERY_CHARGE

        print(f"[TRANSACTION LOG] Safe Order Terminal Execution triggered: Rs {final_total}")

        return jsonify({
            "success": True, 
            "message": "Order streamed and logged successfully inside Python Local Layer.",
            "cartTotal": final_total
        }), 201
    except Exception as e:
        return jsonify({"success": False, "message": "Internal processing collapse."}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"success": True, "service": "Rimberio Engine Live", "runtime": "Python Flask Mode"}), 200

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)