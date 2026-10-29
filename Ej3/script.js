class Vehiculo {
    #identificador
    #capacidad
    #estado

    constructor(identificador, capacidad) {
        this.#identificador = identificador
        this.#capacidad = capacidad
        this.#estado = "Disponible"
    }

    getIdentificador() {
        return this.#identificador
    }

    getCapacidad() {
        return this.#capacidad
    }

    getEstado() {
        return this.#estado
    }

    cambiarEstado(estado) {
        this.#estado = estado
    }

    costoViaje(distancia, costo) {
        return distancia * costo
    }
}

class Auto extends Vehiculo {
    constructor(identificador, capacidad) {
        super(identificador, capacidad)
    }

    costoViaje(distancia, costo) {
        return distancia * costo + 5000
    }
}

class Moto extends Vehiculo {
    constructor(identificador, capacidad) {
        super(identificador, capacidad)
    }

    costoViaje(distancia, costo) {
        return distancia * costo + 2000
    }
}

class Bicicleta extends Vehiculo {
    constructor(identificador, capacidad) {
        super(identificador, capacidad)
    }

    costoViaje(distancia, costo) {
        return distancia * costo
    }
}

let arregloVehiculos = []
let arregloViajes = []

function registrarVehiculo() {
    let identificador = document.getElementById("identificador").value
    let capacidadTexto = document.getElementById("capacidad").value
    let capacidad = Number(capacidadTexto)
    let tipo = document.getElementById("tipo").value
    let mensaje = document.getElementById("mensaje")

    if (identificador == "" || capacidadTexto == "") {
        mensaje.textContent = "Debe llenar todos los datos"
        return
    }

    if (capacidad <= 0 || capacidad % 1 != 0) {
        mensaje.textContent = "La capacidad debe ser mayor que cero"
        return
    }

    for (let i = 0; i < arregloVehiculos.length; i = i + 1) {
        if (arregloVehiculos[i].getIdentificador() == identificador) {
            mensaje.textContent = "Ese identificador ya existe"
            return
        }
    }

    let vehiculo

    if (tipo == "Auto") {
        vehiculo = new Auto(identificador, capacidad)
    } else if (tipo == "Moto") {
        vehiculo = new Moto(identificador, capacidad)
    } else {
        vehiculo = new Bicicleta(identificador, capacidad)
    }

    arregloVehiculos.push(vehiculo)

    mensaje.textContent = "Vehículo registrado"
    mostrarVehiculos()
}

function registrarViaje() {
    let identificador = document.getElementById("vehiculoViaje").value
    let distanciaTexto = document.getElementById("distancia").value
    let costoTexto = document.getElementById("costo").value
    let distancia = Number(distanciaTexto)
    let costo = Number(costoTexto)
    let mensaje = document.getElementById("mensaje")
    let vehiculoEncontrado

    if (identificador == "" || distanciaTexto == "" || costoTexto == "") {
        mensaje.textContent = "Debe llenar todos los datos del viaje"
        return
    }

    if (distancia <= 0 || costo < 0) {
        mensaje.textContent = "La distancia debe ser positiva y el costo no puede ser negativo"
        return
    }

    for (let i = 0; i < arregloVehiculos.length; i = i + 1) {
        if (arregloVehiculos[i].getIdentificador() == identificador) {
            vehiculoEncontrado = arregloVehiculos[i]
        }
    }

    if (vehiculoEncontrado == undefined) {
        mensaje.textContent = "El vehículo no existe"
        return
    }

    if (vehiculoEncontrado.getEstado() == "Ocupado") {
        mensaje.textContent = "El vehículo ya está ocupado"
        return
    }

    let total = vehiculoEncontrado.costoViaje(distancia, costo)

    if (total < 0) {
        mensaje.textContent = "El costo no puede ser negativo"
        return
    }

    let viaje = {
        identificador: identificador,
        distancia: distancia,
        total: total
    }

    arregloViajes.push(viaje)
    vehiculoEncontrado.cambiarEstado("Ocupado")

    mensaje.textContent = "Viaje registrado. Costo total: $" + total

    mostrarVehiculos()
    mostrarViajes()
}

function mostrarVehiculos() {
    let tabla = document.getElementById("tablaVehiculos")
    tabla.innerHTML = ""

    for (let i = 0; i < arregloVehiculos.length; i = i + 1) {
        let tipo = ""

        if (arregloVehiculos[i] instanceof Auto) {
            tipo = "Automóvil"
        } else if (arregloVehiculos[i] instanceof Moto) {
            tipo = "Motocicleta"
        } else {
            tipo = "Bicicleta"
        }

        tabla.innerHTML += `<tr>
            <td>${arregloVehiculos[i].getIdentificador()}</td>
            <td>${tipo}</td>
            <td>${arregloVehiculos[i].getCapacidad()}</td>
            <td>${arregloVehiculos[i].getEstado()}</td>
        </tr>`
    }
}

function mostrarViajes() {
    let tabla = document.getElementById("tablaViajes")
    tabla.innerHTML = ""

    for (let i = 0; i < arregloViajes.length; i = i + 1) {
        tabla.innerHTML += `<tr>
            <td>${arregloViajes[i].identificador}</td>
            <td>${arregloViajes[i].distancia} km</td>
            <td>$${arregloViajes[i].total}</td>
        </tr>`
    }
}