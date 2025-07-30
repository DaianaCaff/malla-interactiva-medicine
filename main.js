
document.addEventListener("DOMContentLoaded", function () {
    const materiasContainer = document.getElementById("contenedor-materias");
    const toggle = document.getElementById("modoOscuroToggle");
    if (localStorage.getItem("modoOscuro") === "true") {
        document.body.classList.add("oscuro");
        toggle.checked = true;
    }
    toggle.addEventListener("change", () => {
        document.body.classList.toggle("oscuro");
        localStorage.setItem("modoOscuro", toggle.checked);
    });

    fetch("materias.json")
        .then(response => response.json())
        .then(data => mostrarMaterias(data.materias));

    window.filtrarPorAnio = function (anio) {
        document.querySelectorAll(".materia").forEach(el => {
            el.style.display = el.dataset.anio == anio ? "block" : "none";
        });
    };

    window.mostrarTodas = function () {
        document.querySelectorAll(".materia").forEach(el => el.style.display = "block");
    };

    function mostrarMaterias(materias) {
        materiasContainer.innerHTML = "";
        materias.forEach(materia => {
            const div = document.createElement("div");
            div.className = "materia " + materia.estado;
            div.dataset.anio = materia.anio;
            div.innerHTML = `
                <strong>${materia.nombre}</strong><br/>
                ${materia.estado}<br/>
                Correlativas: ${materia.correlativas.length > 0 ? materia.correlativas.join(", ") : "Ninguna"}<br/>
                Nota: <input type="text" value="${localStorage.getItem(materia.codigo) || ""}" oninput="localStorage.setItem('${materia.codigo}', this.value)" />
            `;
            materiasContainer.appendChild(div);
        });
    }
});
