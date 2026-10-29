class Producto {
    #nombre
    #precio
    #disponibilidad

    constructor(nombre, precio, disponibilidad) {
        this.#nombre = nombre
        this.#precio = precio
        this.#disponibilidad = disponibilidad
    }

    getNombre() {
        return this.#nombre
    }

    getPrecio() {
        return this.#precio
    }

    getDisponibilidad() {
        return this.#disponibilidad
    }

    calcularPrecio(adicional) {
        return this.#precio + adicional
    }
}

class PlatoPreparado extends Producto {
    constructor(nombre, precio, disponibilidad) {
        super(nombre, precio, disponibilidad)
    }

    calcularPrecio(adicional) {
        return this.getPrecio() + adicional
    }
}

class Bebida extends Producto {
    constructor(nombre, precio, disponibilidad) {
        super(nombre, precio, disponibilidad)
    }

    calcularPrecio(adicional) {
        return this.getPrecio()
    }
}

let arregloMenu = []
let arregloPedidos = []

function registrarProducto() {
    let nombre = document.getElementById("nombre").value
    let precioTexto = document.getElementById("precio").value
    let precio = Number(precioTexto)
    let tipo = document.getElementById("tipo").value
    let disponibilidad = document.getElementById("disponibilidad").value
    let mensaje = document.getElementById("mensaje")

    if (nombre == "" || precioTexto == "") {
        mensaje.style.color = "red"
        mensaje.textContent = "Debe llenar todos los datos"
        return
    }

    if (precio <= 0) {
        mensaje.style.color = "red"
        mensaje.textContent = "El precio debe ser mayor que cero"
        return
    }

    for (let i = 0; i < arregloMenu.length; i = i + 1) {
        if (arregloMenu[i].getNombre().toLowerCase() == nombre.toLowerCase()) {
            mensaje.style.color = "red"
            mensaje.textContent = "Este producto ya está registrado"
            return
        }
    }

    let producto

    if (tipo == "Plato") {
        producto = new PlatoPreparado(nombre, precio, disponibilidad)
    } else {
        producto = new Bebida(nombre, precio, disponibilidad)
    }

    arregloMenu.push(producto)

    mensaje.style.color = "green"
    mensaje.textContent = "Producto registrado correctamente"

    mostrarMenu()
}

function agregarPedido() {
    let mesaTexto = document.getElementById("mesa").value
    let nombre = document.getElementById("productoPedido").value
    let cantidadTexto = document.getElementById("cantidad").value
    let adicional = Number(document.getElementById("adicional").value)
    let mesa = Number(mesaTexto)
    let cantidad = Number(cantidadTexto)
    let mensaje = document.getElementById("mensaje")
    let productoEncontrado

    if (mesaTexto == "" || nombre == "" || cantidadTexto == "") {
        mensaje.style.color = "red"
        mensaje.textContent = "Debe llenar todos los datos del pedido"
        return
    }

    if (mesa <= 0 || cantidad <= 0 || cantidad % 1 != 0) {
        mensaje.style.color = "red"
        mensaje.textContent = "La mesa y la cantidad deben ser válidas"
        return
    }

    for (let i = 0; i < arregloMenu.length; i = i + 1) {
        if (arregloMenu[i].getNombre().toLowerCase() == nombre.toLowerCase()) {
            productoEncontrado = arregloMenu[i]
        }
    }

    if (productoEncontrado == undefined) {
        mensaje.style.color = "red"
        mensaje.textContent = "El producto no existe en el menú"
        return
    }

    if (productoEncontrado.getDisponibilidad() == "Agotado") {
        mensaje.style.color = "red"
        mensaje.textContent = "El producto está agotado"
        return
    }

    let total = productoEncontrado.calcularPrecio(adicional) * cantidad

    if (total <= 0) {
        mensaje.style.color = "red"
        mensaje.textContent = "El precio calculado no es válido"
        return
    }

    let pedido = {
        mesa: mesa,
        nombre: productoEncontrado.getNombre(),
        cantidad: cantidad,
        adicional: adicional,
        total: total
    }

    arregloPedidos.push(pedido)

    mensaje.style.color = "green"
    mensaje.textContent = "Producto agregado al pedido. Total: $" + total

    mostrarPedidos()
}

function mostrarMenu() {
    let tabla = document.getElementById("tablaMenu")
    tabla.innerHTML = ""

    for (let i = 0; i < arregloMenu.length; i = i + 1) {
        let producto = arregloMenu[i]
        let tipo = ""

        if (producto instanceof PlatoPreparado) {
            tipo = "Plato preparado"
        } else {
            tipo = "Bebida"
        }

        tabla.innerHTML += `<tr>
            <td>${producto.getNombre()}</td>
            <td>${tipo}</td>
            <td>$${producto.getPrecio()}</td>
            <td>${producto.getDisponibilidad()}</td>
        </tr>`
    }
}

function mostrarPedidos() {
    let tabla = document.getElementById("tablaPedidos")
    tabla.innerHTML = ""

    for (let i = 0; i < arregloPedidos.length; i = i + 1) {
        tabla.innerHTML += `<tr>
            <td>${arregloPedidos[i].mesa}</td>
            <td>${arregloPedidos[i].nombre}</td>
            <td>${arregloPedidos[i].cantidad}</td>
            <td>$${arregloPedidos[i].adicional}</td>
            <td>$${arregloPedidos[i].total}</td>
        </tr>`
    }
}

function calcularTotalMesa() {
    let mesaTexto = document.getElementById("mesaConsultar").value
    let mesa = Number(mesaTexto)
    let total = 0
    let encontrado = false
    let mensaje = document.getElementById("totalMesa")

    if (mesaTexto == "" || mesa <= 0) {
        mensaje.textContent = "Ingrese un número de mesa válido"
        return
    }

    for (let i = 0; i < arregloPedidos.length; i = i + 1) {
        if (arregloPedidos[i].mesa == mesa) {
            total = total + arregloPedidos[i].total
            encontrado = true
        }
    }

    if (encontrado == false) {
        mensaje.textContent = "Esta mesa no tiene pedidos"
    } else {
        mensaje.textContent = "Total de la mesa " + mesa + ": $" + total
    }
}