//Definiendo generales
const randomId = () => self.crypto.randomUUID();
const $ = (selector) => document.getElementById(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const inicializar = () => {
    if (!traer("categorias")) {
        localStorage.setItem("categorias", JSON.stringify(categorias));
    }
    mostrarOperaciones(operaciones);
    actualizarBalance(operaciones);
    crearLista(categorias);
    mostrarOpciones(categorias);
    cargarFechas();
    ordenarYBalance();
    vistaReportes(operaciones);
    actualizarReportes(operaciones);
};

const actualizarReportes = (operaciones) => {
    mayorGananciaPorCategorias(operaciones);
    mayorGastosPorCategorias(operaciones);
    categoriaMayorBalance(operaciones);
    mesMayorGanancia(operaciones);
    mesMayorGasto(operaciones);
    totalesPorCategoria(operaciones);
    totalesPorMes(operaciones);
};

//Definiendo fecha actual
const cargarFechas = () => {
    let fechaHoy = new Date();
    let mes = fechaHoy.getMonth() + 1;
    let dia = fechaHoy.getDate();
    let anio = fechaHoy.getFullYear();
    if (dia < 10) dia = "0" + dia;
    if (mes < 10) mes = "0" + mes;
    $("fecha-nueva-op").value = anio + "-" + mes + "-" + dia;
    $("fecha-filtro").value = anio + "-" + mes + "-" + dia;
};

const traer = (clave) => {
    return JSON.parse(localStorage.getItem(`${clave}`));
};

//Para definir datos a nivel local
const actualizarInfo = (clave, datos) => {
    localStorage.setItem(`${clave}`, JSON.stringify(datos));
};

let operaciones = traer("operaciones") || [];

//Navbar

const mostrarVista = (vistaAMostrar) => {
    $$(".vista").forEach((vista) => {
        vista.classList.add("is-hidden");
        $(`${vistaAMostrar}`).classList.remove("is-hidden");
    });
};

$("navbar-balance").addEventListener("click", () =>
    mostrarVista("seccion-balance")
);
$("navbar-categorias").addEventListener("click", () =>
    mostrarVista("seccion-categorias")
);
$("nueva-operacion-btn").addEventListener("click", () =>
    mostrarVista("nueva-operacion")
);
$("navbar-reportes").addEventListener("click", () =>
    mostrarVista("seccion-reportes")
);

//Menu hamburguesa

$("burger").addEventListener("click", () => {
    $("burger").classList.toggle("is-active");
    $("navbarLinks").classList.toggle("is-active");
});

// SECCION BALANCE

//Ocultar filtros
$("ocultar-filtros").addEventListener("click", () => {
    $("filtros").classList.toggle("is-hidden");
});

//Abre card de nueva operacion
const abrirNuevaOperacion = () => {
    $("seccion-balance").classList.add("is-hidden");
    $("nueva-operacion").classList.remove("is-hidden");
};

$("nueva-operacion-btn").addEventListener("click", () => abrirNuevaOperacion());