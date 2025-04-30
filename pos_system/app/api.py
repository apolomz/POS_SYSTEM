from flask import Flask, jsonify, request
from flask_cors import CORS
from db.connection import get_connection
from flask_bcrypt import Bcrypt

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

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

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    conn = get_connection()
    cur = conn.cursor()
    try:
        cur.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (data['username'], hashed_pw))
        conn.commit()
        return jsonify({'message': 'Usuario creado'}), 201
    except:
        return jsonify({'message': 'El usuario ya existe'}), 400

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT password, rol FROM users WHERE username = %s", (data['username'],))
    user = cur.fetchone()

    if user and bcrypt.check_password_hash(user[0], data['password']):
        return jsonify({
            'message': 'Login exitoso',
            'rol': user[1],
            'user': data['username']
        }), 200

    return jsonify({'message': 'Credenciales inválidas'}), 401

if __name__ == '__main__':
    app.run(debug=True)