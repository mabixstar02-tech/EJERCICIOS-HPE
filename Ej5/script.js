class Empleado {
    #identificacion
    #nombre
    #salario
    #dias

    constructor(identificacion, nombre, salario, dias) {
        this.#identificacion = identificacion
        this.#nombre = nombre
        this.#salario = salario
        this.#dias = dias
    }

    getIdentificacion() {
        return this.#identificacion
    }

    getNombre() {
        return this.#nombre
    }

    getSalario() {
        return this.#salario
    }

    getDias() {
        return this.#dias
    }

    calcularPago() {
        return this.#salario * this.#dias
    }
}

class EmpleadoPlanta extends Empleado {
    constructor(identificacion, nombre, salario, dias) {
        super(identificacion, nombre, salario, dias)
    }

    calcularPago() {
        return this.getSalario() / 30 * this.getDias()
    }
}

class Contratista extends Empleado {
    constructor(identificacion, nombre, salario, dias) {
        super(identificacion, nombre, salario, dias)
    }

    calcularPago() {
        return this.getSalario() * this.getDias()
    }
}

let arregloEmpleados = []

function registrarEmpleado() {
    let identificacion = document.getElementById("identificacion").value
    let nombre = document.getElementById("nombre").value
    let tipo = document.getElementById("tipo").value
    let salarioTexto = document.getElementById("salario").value
    let diasTexto = document.getElementById("dias").value

    let salario = Number(salarioTexto)
    let dias = Number(diasTexto)
    let mensaje = document.getElementById("mensaje")

    if (identificacion == "" || nombre == "" || salarioTexto == "" || diasTexto == "") {
        mensaje.textContent = "Debe llenar todos los datos"
        return
    }

    if (salario <= 0 || dias <= 0 || dias > 30 || dias % 1 != 0) {
        mensaje.textContent = "El salario debe ser positivo y los días deben estar entre 1 y 30"
        return
    }

    for (let i = 0; i < arregloEmpleados.length; i = i + 1) {
        if (arregloEmpleados[i].getIdentificacion() == identificacion) {
            mensaje.textContent = "Esta identificación ya está registrada"
            return
        }
    }

    let empleado

    if (tipo == "Planta") {
        empleado = new EmpleadoPlanta(identificacion, nombre, salario, dias)
    } else {
        empleado = new Contratista(identificacion, nombre, salario, dias)
    }

    let pago = empleado.calcularPago()

    if (pago <= 0 || pago != pago) {
        mensaje.textContent = "Error al calcular el pago"
        return
    }

    arregloEmpleados.push(empleado)

    mensaje.style.color = "green"
    mensaje.textContent = "Empleado registrado correctamente"

    mostrarEmpleados()
}

function mostrarEmpleados() {
    let tabla = document.getElementById("tablaEmpleados")
    tabla.innerHTML = ""

    for (let i = 0; i < arregloEmpleados.length; i = i + 1) {
        let empleado = arregloEmpleados[i]
        let tipo = ""

        if (empleado instanceof EmpleadoPlanta) {
            tipo = "Planta"
        } else {
            tipo = "Contratista"
        }

        let pago = empleado.calcularPago()

        tabla.innerHTML += `<tr>
            <td>${empleado.getIdentificacion()}</td>
            <td>${empleado.getNombre()}</td>
            <td>${tipo}</td>
            <td>$${empleado.getSalario()}</td>
            <td>${empleado.getDias()}</td>
            <td>$${pago.toFixed(2)}</td>
        </tr>`
    }
}