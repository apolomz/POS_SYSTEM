from flask import Flask, jsonify, request
from flask_cors import CORS
from db.connection import get_connection

app = Flask(__name__)
CORS(app)

@app.route('/api/products', methods=['GET'])
def get_products():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT id, name, price, stock FROM products")
    rows = cur.fetchall()
    cur.close()
    conn.close()

    productos = [
        {'id': r[0], 'name': r[1], 'price': float(r[2]), 'stock': r[3]}
        for r in rows
    ]
    return jsonify(productos)

@app.route('/api/products', methods=['POST'])
def add_product():
    data = request.get_json()
    conn = get_connection()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO products (name, description, price, stock) VALUES (%s, %s, %s, %s)",
        (data['name'], data['description'], data['price'], data['stock'])
    )
    conn.commit()
    cur.close()
    conn.close()
    return jsonify({'message': 'Producto creado'}), 201

@app.route('/api/sales', methods=['POST'])
def add_sale():
    data = request.get_json()
    product_id = data['product_id']
    quantity = int(data['quantity'])

    conn = get_connection()
    # Obtener precio unitario del producto
    cur = conn.cursor()
    cur.execute("SELECT price FROM products WHERE id = %s", (product_id,))
    result = cur.fetchone()

    if result:
        price = result[0]
        total = price * quantity

        cur.execute("INSERT INTO sales (product_id, quantity, total) VALUES (%s, %s, %s)",
                    (product_id, quantity, total))
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"message": "Venta registrada con éxito"}), 201
    else:
        cur.close()
        conn.close()
        return jsonify({"error": "Producto no encontrado"}), 404


@app.route('/api/sales', methods=['GET'])
def get_sales():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("""
        SELECT sales.id, products.name, sales.quantity, sales.total, sales.sale_date
        FROM sales
        JOIN products ON sales.product_id = products.id
        ORDER BY sales.sale_date DESC
    """)
    rows = cur.fetchall()
    cur.close()
    conn.close()

    sales = []
    for row in rows:
        sales.append({
            "id": row[0],
            "product_name": row[1],
            "quantity": row[2],
            "total": float(row[3]),
            "sale_date": row[4].strftime("%Y-%m-%d %H:%M")
        })

    return jsonify(sales)

if __name__ == '__main__':
    app.run(debug=True)


