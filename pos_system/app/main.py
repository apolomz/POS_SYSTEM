import tkinter as tk
from controllers.products import listar_productos, insertar_producto

def mostrar_productos():
    listar_productos()

def main():
    window = tk.Tk()
    window.title("Sistema Pos")
    window.geometry("300x200")

    titulo = tk.Label(window, text="Menú principal", font=("Arial",16))
    titulo.pack(pady=10)

    boton_listar = tk.Button(window, text="Listar Productos", command=mostrar_productos)
    boton_listar.pack(pady=5)

    window.mainloop

if __name__ == "__main__":
    main()

## if opcion == "1":
 ##       listar_productos()
   ## elif opcion == "2":
     ##   nombre = input("Nombre: ")
       ## descripcion = input("Descripcion: ")
      ##  precio = float(input("Precio: "))
      ##  stock = int(input("Stock: "))
       ## insertar_producto(nombre, descripcion, precio, stock)