// Centro de adopcion de mascotas

class Mascota {
    #estadoAdopcion

    constructor(identificador, nombre, edad) {
        this.identificador = identificador
        this.nombre = nombre
        this.edad = edad
        this.#estadoAdopcion = "Disponible"
    }

    mostrarEstado() {
        return this.#estadoAdopcion
    }

    adoptar() {
        this.#estadoAdopcion = "Adoptada"
    }

    cuidados() {
        return "Cuidados generales"
    }
}

class Perro extends Mascota {
    constructor(identificador, nombre, edad) {
        super(identificador, nombre, edad)
        this.tipo = "Perro"
    }

    cuidados() {
        return "Necesita paseos y alimento"
    }
}

class Gato extends Mascota {
    constructor(identificador, nombre, edad) {
        super(identificador, nombre, edad)
        this.tipo = "Gato"
    }

    cuidados() {
        return "Necesita arenero y alimento"
    }
}

class SolicitudAdopcion {
    constructor(numero, identificadorMascota, persona) {
        this.numero = numero
        this.identificadorMascota = identificadorMascota
        this.persona = persona
        this.estado = "Pendiente"
    }
}

let mascota1
let solicitud1

let arregloMascotas = []
let arregloSolicitudes = []

function registrarMascota() {
    let identificador = document.getElementById("identificador").value
    let nombre = document.getElementById("nombre").value
    let edad = document.getElementById("edad").value
    let tipo = document.getElementById("tipo").value

    if (identificador == "" || nombre == "" || edad == "") {
        alert("Complete todos los datos")
    } else if (Number(edad) < 0) {
        alert("La edad no puede ser negativa")
    } else {
        let existe = false

        for (let i = 0; i < arregloMascotas.length; i = i + 1) {
            if (arregloMascotas[i].identificador == identificador) {
                existe = true
            }
        }

        if (existe == true) {
            alert("El identificador ya existe")
        } else {
            if (tipo == "Perro") {
                mascota1 = new Perro(identificador, nombre, Number(edad))
            } else {
                mascota1 = new Gato(identificador, nombre, Number(edad))
            }

            arregloMascotas.push(mascota1)
            alert("Mascota registrada")
        }
    }
}

function mostrarMascotas() {
    let tabla = document.getElementById("tablaMascotas")

    tabla.innerHTML = ""

    for (let i = 0; i < arregloMascotas.length; i = i + 1) {
        tabla.innerHTML += `<tr>
            <td>${arregloMascotas[i].identificador}</td>
            <td>${arregloMascotas[i].nombre}</td>
            <td>${arregloMascotas[i].edad}</td>
            <td>${arregloMascotas[i].tipo}</td>
            <td>${arregloMascotas[i].mostrarEstado()}</td>
            <td>${arregloMascotas[i].cuidados()}</td>
        </tr>`
    }
}

function registrarSolicitud() {
    let numero = document.getElementById("numeroSolicitud").value
    let identificador = document.getElementById("mascotaSolicitud").value
    let persona = document.getElementById("persona").value

    if (numero == "" || identificador == "" || persona == "") {
        alert("Complete todos los datos")
    } else {
        let existe = false

        for (let i = 0; i < arregloSolicitudes.length; i = i + 1) {
            if (arregloSolicitudes[i].numero == numero) {
                existe = true
            }
        }

        let encontrada = false
        let disponible = false

        for (let i = 0; i < arregloMascotas.length; i = i + 1) {
            if (arregloMascotas[i].identificador == identificador) {
                encontrada = true

                if (arregloMascotas[i].mostrarEstado() == "Disponible") {
                    disponible = true
                }
            }
        }

        if (existe == true) {
            alert("El numero de solicitud ya existe")
        } else if (encontrada == false) {
            alert("La mascota no existe")
        } else if (disponible == false) {
            alert("La mascota ya fue adoptada")
        } else {
            solicitud1 = new SolicitudAdopcion(numero, identificador, persona)
            arregloSolicitudes.push(solicitud1)
            alert("Solicitud registrada")
        }
    }
}

function aprobarAdopcion() {
    let numero = document.getElementById("aprobarSolicitud").value

    for (let i = 0; i < arregloSolicitudes.length; i = i + 1) {
        if (arregloSolicitudes[i].numero == numero) {
            if (arregloSolicitudes[i].estado == "Pendiente") {
                for (let j = 0; j < arregloMascotas.length; j = j + 1) {
                    if (arregloMascotas[j].identificador == arregloSolicitudes[i].identificadorMascota) {
                        if (arregloMascotas[j].mostrarEstado() == "Disponible") {
                            arregloMascotas[j].adoptar()
                            arregloSolicitudes[i].estado = "Aprobada"
                            alert("Adopcion aprobada")
                            return
                        }
                    }
                }
            }

            alert("No se puede aprobar esta solicitud")
            return
        }
    }

    alert("Solicitud no encontrada")
}

function mostrarSolicitudes() {
    let tabla = document.getElementById("tablaSolicitudes")

    tabla.innerHTML = ""

    for (let i = 0; i < arregloSolicitudes.length; i = i + 1) {
        tabla.innerHTML += `<tr>
            <td>${arregloSolicitudes[i].numero}</td>
            <td>${arregloSolicitudes[i].identificadorMascota}</td>
            <td>${arregloSolicitudes[i].persona}</td>
            <td>${arregloSolicitudes[i].estado}</td>
        </tr>`
    }
}