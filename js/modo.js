// ===== MODO CLARO / OSCURO =====
// La clase .dark en <html> cambia las variables de color del @theme (ver <style> del <head>).
// La elección se guarda en el navegador para la próxima visita.
$(function () {
  function pintarModo() {
    const oscuro = $('html').hasClass('dark');
    $('.btn-modo').attr({ 'aria-pressed': oscuro, 'aria-label': oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro' });
  }
  pintarModo();

  $('.btn-modo').on('click', function () {
    $('html').toggleClass('dark');
    try { localStorage.setItem('modo', $('html').hasClass('dark') ? 'oscuro' : 'claro'); } catch (e) {}
    pintarModo();
  });
});
