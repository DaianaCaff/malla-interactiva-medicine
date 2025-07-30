fetch('materias.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('materias-container');
    const saved = JSON.parse(localStorage.getItem('progresoMaterias') || '{}');

    data.materias.forEach(m => {
      const div = document.createElement('div');
      div.className = 'materia';
      div.innerHTML = `
        <h3>${m.nombre}</h3>
        <div class="estado">${m.estado}</div>
        <div>Correlativas: ${m.correlativas.join(', ') || 'Ninguna'}</div>
        <div class="nota-input">
          Nota: <input type="number" min="4" max="10" value="${saved[m.codigo]?.nota || ''}" data-codigo="${m.codigo}" />
        </div>
      `;

      // Estado guardado localmente
      const estadoLocal = saved[m.codigo]?.estado || m.estado;
      if (estadoLocal === "aprobada") div.classList.add("aprobada");

      // Toggle estado y permitir nota
      div.addEventListener("click", (e) => {
        if (e.target.tagName === "INPUT") return; // no afectar al hacer click en el input
        div.classList.toggle("aprobada");
        const estado = div.classList.contains("aprobada") ? "aprobada" : "pendiente";
        const nota = div.querySelector("input").value;
        saved[m.codigo] = { estado, nota };
        localStorage.setItem('progresoMaterias', JSON.stringify(saved));
      });

      // Guardar nota al escribir
      div.querySelector("input").addEventListener("input", (e) => {
        const codigo = e.target.dataset.codigo;
        const estado = div.classList.contains("aprobada") ? "aprobada" : "pendiente";
        const nota = e.target.value;
        saved[codigo] = { estado, nota };
        localStorage.setItem('progresoMaterias', JSON.stringify(saved));
      });

      container.appendChild(div);
    });
  });
