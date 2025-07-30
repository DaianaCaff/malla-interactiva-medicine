fetch('materias.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('materias-container');
    data.materias.forEach(m => {
      const div = document.createElement('div');
      div.className = `materia ${m.estado}`;
      div.innerHTML = `<strong>${m.nombre}</strong> (Código: ${m.codigo})<br>Correlativas: ${m.correlativas.join(', ') || 'Ninguna'}`;
      container.appendChild(div);
    });
  });
