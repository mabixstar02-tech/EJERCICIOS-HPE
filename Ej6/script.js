class Recurso {
    #codigo
    #titulo
    #disponibilidad

    constructor(codigo, titulo) {
        this.#codigo = codigo
        this.#titulo = titulo
        this.#disponibilidad = "Disponible"
    }

    getCodigo() {
        return this.#codigo
    }

    getTitulo() {
        return this.#titulo
    }

    getDisponibilidad() {
        return this.#disponibilidad
    }

    prestar() {
        this.#disponibilidad = "Prestado"
    }

    devolver() {
        this.#disponibilidad = "Disponible"
    }

    calcularPlazo() {
        return 0
    }
}

class LibroImpreso extends Recurso {
    constructor(codigo, titulo) {
        super(codigo, titulo)
    }

    calcularPlazo() {
        return 14
    }
}

class RecursoDigital extends Recurso {
    constructor(codigo, titulo) {
        super(codigo, titulo)
    }

    calcularPlazo() {
        return 7
    }
}

let arregloRecursos = []
let arregloPrestamos = []

function registrarRecurso() {
    let codigo = document.getElementById("codigo").value
    let titulo = document.getElementById("titulo").value
    let tipo = document.getElementById("tipo").value
    let mensaje = document.getElementById("mensaje")

    if (codigo == "" || titulo == "") {
        mensaje.style.color = "red"
        mensaje.textContent = "Debe llenar todos los datos"
        return
    }

    for (let i = 0; i < arregloRecursos.length; i = i + 1) {
        if (arregloRecursos[i].getCodigo() == codigo) {
            mensaje.style.color = "red"
            mensaje.textContent = "Este código ya está registrado"
            return
        }
    }

    let recurso

    if (tipo == "Impreso") {
        recurso = new LibroImpreso(codigo, titulo)
    } else {
        recurso = new RecursoDigital(codigo, titulo)
    }

    arregloRecursos.push(recurso)

    mensaje.style.color = "green"
    mensaje.textContent = "Recurso registrado correctamente"

    mostrarRecursos()
}

function buscarRecurso() {
    let codigo = document.getElementById("codigoBuscar").value
    let mensaje = document.getElementById("mensaje")
    let encontrado

    if (codigo == "") {
        mensaje.style.color = "red"
        mensaje.textContent = "Ingrese el código que desea buscar"
        return
    }

    for (let i = 0; i < arregloRecursos.length; i = i + 1) {
        if (arregloRecursos[i].getCodigo() == codigo) {
            encontrado = arregloRecursos[i]
        }
    }

    if (encontrado == undefined) {
        mensaje.style.color = "red"
        mensaje.textContent = "No se encontró ningún recurso con ese código"
    } else {
        mensaje.style.color = "green"
        mensaje.textContent = "Recurso encontrado: " + encontrado.getTitulo()
    }
}

function prestarRecurso() {
    let codigo = document.getElementById("codigoPrestamo").value
    let mensaje = document.getElementById("mensaje")
    let recursoEncontrado

    if (codigo == "") {
        mensaje.style.color = "red"
        mensaje.textContent = "Ingrese el código del recurso"
        return
    }

    for (let i = 0; i < arregloRecursos.length; i = i + 1) {
        if (arregloRecursos[i].getCodigo() == codigo) {
            recursoEncontrado = arregloRecursos[i]
        }
    }

    if (recursoEncontrado == undefined) {
        mensaje.style.color = "red"
        mensaje.textContent = "El recurso no existe"
        return
    }

    if (recursoEncontrado.getDisponibilidad() == "Prestado") {
        mensaje.style.color = "red"
        mensaje.textContent = "El recurso ya está prestado"
        return
    }

    recursoEncontrado.prestar()

    let prestamo = {
        codigo: recursoEncontrado.getCodigo(),
        titulo: recursoEncontrado.getTitulo(),
        plazo: recursoEncontrado.calcularPlazo(),
        estado: "Activo"
    }

    arregloPrestamos.push(prestamo)

    mensaje.style.color = "green"
    mensaje.textContent = "Préstamo registrado. Plazo: " + prestamo.plazo + " días"

    mostrarRecursos()
    mostrarPrestamos()
}

function devolverRecurso() {
    let codigo = document.getElementById("codigoPrestamo").value
    let mensaje = document.getElementById("mensaje")
    let recursoEncontrado
    let prestamoEncontrado

    if (codigo == "") {
        mensaje.style.color = "red"
        mensaje.textContent = "Ingrese el código del recurso"
        return
    }

    for (let i = 0; i < arregloRecursos.length; i = i + 1) {
        if (arregloRecursos[i].getCodigo() == codigo) {
            recursoEncontrado = arregloRecursos[i]
        }
    }

    for (let i = 0; i < arregloPrestamos.length; i = i + 1) {
        if (arregloPrestamos[i].codigo == codigo &&
            arregloPrestamos[i].estado == "Activo") {
            prestamoEncontrado = arregloPrestamos[i]
        }
    }

    if (recursoEncontrado == undefined ||
        prestamoEncontrado == undefined) {
        mensaje.style.color = "red"
        mensaje.textContent = "No existe un préstamo activo para este recurso"
        return
    }

    recursoEncontrado.devolver()
    prestamoEncontrado.estado = "Devuelto"

    mensaje.style.color = "green"
    mensaje.textContent = "Recurso devuelto correctamente"

    mostrarRecursos()
    mostrarPrestamos()
}

function mostrarRecursos() {
    let tabla = document.getElementById("tablaRecursos")
    tabla.innerHTML = ""

    for (let i = 0; i < arregloRecursos.length; i = i + 1) {
        let recurso = arregloRecursos[i]
        let tipo = ""

        if (recurso instanceof LibroImpreso) {
            tipo = "Libro impreso"
        } else {
            tipo = "Recurso digital"
        }

        tabla.innerHTML += `<tr>
            <td>${recurso.getCodigo()}</td>
            <td>${recurso.getTitulo()}</td>
            <td>${tipo}</td>
            <td>${recurso.getDisponibilidad()}</td>
            <td>${recurso.calcularPlazo()} días</td>
        </tr>`
    }
}

function mostrarPrestamos() {
    let tabla = document.getElementById("tablaPrestamos")
    tabla.innerHTML = ""

    for (let i = 0; i < arregloPrestamos.length; i = i + 1) {
        tabla.innerHTML += `<tr>
            <td>${arregloPrestamos[i].codigo}</td>
            <td>${arregloPrestamos[i].titulo}</td>
            <td>${arregloPrestamos[i].plazo}</td>
            <td>${arregloPrestamos[i].estado}</td>
        </tr>`
    }
}