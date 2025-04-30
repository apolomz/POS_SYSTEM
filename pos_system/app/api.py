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
    data = request.json
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

@app.route('/api/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("DELETE FROM products WHERE id = %s", (id,))
    conn.commit()
    cur.close()
    return jsonify({'message': 'Producto eliminado'}), 200

@app.route('/api/products/<int:id>', methods=['PUT'])
def update_product(id):
    data = request.get_json()
    name = data['name']
    price = data['price']
    
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("UPDATE products SET name = %s, price = %s WHERE id = %s",
                (name, price, id))
    conn.commit()
    cur.close()
    return jsonify({'message': 'Producto actualizado'}), 200


if __name__ == '__main__':
    app.run(debug=True)