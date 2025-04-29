from controllers.products import listar_productos, insertar_producto

def main():
    print("1. Listar Productos")
    print("2. Insertar productors")
    opcion = input("Opcion: ")
    if opcion == "1":
        listar_productos()
    elif opcion == "2":
        nombre = input("Nombre: ")
        descripcion = input("Descripcion: ")
        precio = float(input("Precio: "))
        stock = int(input("Stock: "))
        insertar_producto(nombre, descripcion, precio, stock)



if __name__ == "__main__":
    main()
