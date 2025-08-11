document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('menu-toggle');
  const menuOptions = document.getElementById('menu-options');

  // Mostrar / ocultar el menú
  toggleBtn.addEventListener('click', () => {
    menuOptions.classList.toggle('hidden');
  });

  // Acciones de los botones
  menuOptions.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      switch(action) {
        case 'inicio':
          window.location.href = './index.html';
          break;
        case 'tarjetas':
          window.location.href = './tarjetas-AR.html';
          break;
        case 'salon':
          window.location.href = './salon-AR.html';
          break;
      }
      // Ocultar el menú después de elegir
      menuOptions.classList.add('hidden');
    });
  });
});
