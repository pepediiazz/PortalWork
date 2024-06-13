document.addEventListener("DOMContentLoaded", function() {
    var puntos = document.getElementById("puntos");
    var menuDeportes = puntos.querySelector(".menu-deportes");

    puntos.addEventListener("click", function(event) {
        // Evita que el clic en el enlace recargue la página
        event.preventDefault();

        // Alternar la visibilidad del menú de deportes
        menuDeportes.classList.toggle("show");
    });

    // Cerrar el menú si se hace clic fuera de él
    document.addEventListener("click", function(event) {
        if (!puntos.contains(event.target)) {
            menuDeportes.classList.remove("show");
        }
    });
});

function cambiarImagen() {
    var imagen = document.getElementById("imagen");
    imagen.src = "estrella2.png";
}

function restaurarImagen() {
    var imagen = document.getElementById("imagen");
    imagen.src = "estrella.png";
}

document.addEventListener("DOMContentLoaded", function() {
    var setting = document.getElementById("setting");
    var menuSetting = setting.querySelector(".menu-setting");

    setting.addEventListener("click", function(event) {
        // Evita que el clic en la imagen de setting recargue la página
        event.preventDefault();

        // Alternar la visibilidad del menú de setting
        menuSetting.classList.toggle("show");
    });

    // Cerrar el menú si se hace clic fuera de él
    document.addEventListener("click", function(event) {
        if (!setting.contains(event.target)) {
            menuSetting.classList.remove("show");
        }
    });
});

function toggleSwitch(event) {
    // Evitar la propagación del evento clic
    event.stopPropagation();

    var toggleButton = document.getElementById("toggleButton");

    // Toggle de la clase CSS dependiendo del estado actual
    if (toggleButton.classList.contains("switch_boton_toggle_off")) {
        toggleButton.classList.remove("switch_boton_toggle_off");
        toggleButton.classList.add("switch_boton_toggle_on");
    } else {
        toggleButton.classList.remove("switch_boton_toggle_on");
        toggleButton.classList.add("switch_boton_toggle_off");
    }
}

function cambiarImagen(event) {
    event.stopPropagation();
    var imagen = document.getElementById("miImagen");
    if (imagen.src.endsWith("flecha.png")) {
        imagen.src = "flecha2.png";
    } else {
        imagen.src = "flecha.png";
    }

        var menu = document.getElementById("menuIdiomas");
        if (menu.style.display === "none") {
            menu.style.display = "block";
        } else {
            menu.style.display = "none";
        }
    
}

