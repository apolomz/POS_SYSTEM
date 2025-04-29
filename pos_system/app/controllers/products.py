from db.connection import get_connection

def listar_productos():
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT id, name, price, stock FROM products")
    rows = cur.fetchall
    print("Productos disponibles:")
    for row in rows:
        print(f"ID: {row[0]}, Nombre: {row[1]}, Precio: {row[2]}, Stock: {row[3]}")
    cur.close()
    conn.close()


def insertar_producto(nombre, descripcion, precio, stock):
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("INSERT INTO products (name, description, price, stock) VALUES (%s,%s,%s,%s)", (nombre, descripcion, precio, stock))
    conn.commit()
    print("Producto insertado correctamente")
    cur.close()
    conn.close()