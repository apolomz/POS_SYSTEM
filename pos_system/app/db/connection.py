import psycopg2

def get_connection():
    return psycopg2.connect(
        dbname="posdb",
        user="posuser",
        password="pospass",
        host="localhost",
        port=5432
    )
