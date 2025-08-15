document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('menu-toggle');
  const menuOptions = document.getElementById('menu-options');
  const loader = document.getElementById('loader');
  const loaderText = document.getElementById('loader-text');

  // Menú (exactamente como lo tenías)
  toggleBtn.addEventListener('click', () => {
    menuOptions.classList.toggle('hidden');
  });

  menuOptions.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      switch(action) {
        case 'inicio':
          window.location.href = './index.html';
          break;
        case 'tarjetas':
          window.location.href = './tarjetas.html';
          break;
        case 'salon':
          window.location.href = './salon.html';
          break;
        case 'agendas':
          window.location.href = './agendas.html';
          break;
        case 'showroom':
          window.location.href = './showroom.html';
          break;
      }
      menuOptions.classList.add('hidden');
    });
  });

  // Loader con porcentaje real
  const assets = document.getElementById('assetLoader');
  assets.addEventListener('progress', (e) => {
    if (e.detail.total > 0) {
      const porcentaje = Math.round((e.detail.loaded / e.detail.total) * 100);
      loaderText.textContent = `Cargando experiencia... ${porcentaje}%`;
    }
  });

  // Ocultar loader cuando todo esté listo
  document.querySelector('a-scene').addEventListener('loaded', () => {
    loader.style.display = 'none';
  });

  // Lazy loading de modelos
  const models = {
    model1: "./img/a_green_and_blue_hummingbird.glb",
    model2: "./img/fairy_girl_on_a_mushroom.glb",
    model3: "./img/Logo_reality_def.glb"
  };

  Object.keys(models).forEach(id => {
    const el = document.getElementById(id);
    el.parentNode.addEventListener('targetFound', () => {
      if (!el.getAttribute('src')) {
        el.setAttribute('src', models[id]);
      }
    });
  });
});
