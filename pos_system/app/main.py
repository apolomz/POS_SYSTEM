from db.connection import get_connection

def main():
    try:
        conn = get_connection()
        print("Conexión exitosa a PostgreSQL")
        conn.close()
    except Exception as e:
        print("Error al conectar:", e)

if __name__ == "__main__":
    main()
