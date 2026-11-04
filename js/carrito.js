// ===== CARRITO =====
// Se guarda en el navegador (localStorage) para que no se pierda al cambiar de página.
$(function () {

  const EMAIL_ENCARGOS = 'contact@pillartss.com';   // correo que recibe los encargos

  function leer() {
    try { return JSON.parse(localStorage.getItem('carrito')) || []; } catch (e) { return []; }
  }
  function guardar(carrito) {
    try { localStorage.setItem('carrito', JSON.stringify(carrito)); } catch (e) {}
  }

  // Pinta el contador del icono y la lista del panel
  function pintar() {
    const carrito = leer();
    let total = 0;
    $('#contador-carrito').text(carrito.length).toggle(carrito.length > 0);
    $('#btn-carrito').attr('aria-label', 'Carrito (' + carrito.length + ')');
    const $lista = $('#lista-carrito').empty();
    carrito.forEach(function (item, i) {
      total += item.precio;
      $lista.append(
        $('<li class="flex items-baseline gap-3 py-2 border-b border-oliva/15">').append(
          $('<span class="flex-1">').text(item.nombre + (item.dorado ? ' · «' + item.dorado + '» en dorado' : '')),
          $('<span class="whitespace-nowrap">').text(item.precio + ' €'),
          $('<button type="button" class="quitar text-oliva/50 hover:text-rosa" aria-label="Quitar">×</button>').attr('data-i', i)
        )
      );
    });
    $('#carrito-vacio').toggle(carrito.length === 0);
    $('#carrito-lleno').toggle(carrito.length > 0);
    $('#total-carrito').text(total + ' €');

    // "Finalizar encargo": abre un correo con el pedido ya escrito
    const lineas = carrito.map(function (item) {
      return '- ' + item.nombre + (item.dorado ? ' (nombre en dorado: ' + item.dorado + ')' : '') + ' · ' + item.precio + ' €';
    });
    const cuerpo = 'Hola, me gustaría encargar:\n\n' + lineas.join('\n') + '\n\nTotal: ' + total + ' €\n\nMi nombre:\nCiudad de envío:';
    $('#finalizar-encargo').attr('href', 'mailto:' + EMAIL_ENCARGOS + '?subject=' + encodeURIComponent('Encargo Dvash Studio') + '&body=' + encodeURIComponent(cuerpo));
  }
  pintar();

  // Abrir y cerrar el panel
  $('#btn-carrito').on('click', function (e) {
    e.stopPropagation();
    const abierto = $(this).attr('aria-expanded') === 'true';
    $(this).attr('aria-expanded', !abierto);
    $('#panel-carrito').stop().fadeToggle(200);
  });
  // Se cierra al hacer clic fuera
  $(document).on('click', function (e) {
    if (!$(e.target).closest('#panel-carrito, #btn-carrito').length) {
      $('#panel-carrito').fadeOut(150);
      $('#btn-carrito').attr('aria-expanded', false);
    }
  });

  // Quitar una Biblia o vaciar el carrito
  $('#lista-carrito').on('click', '.quitar', function (e) {
    e.stopPropagation();
    const carrito = leer();
    carrito.splice(Number($(this).data('i')), 1);
    guardar(carrito);
    pintar();
  });
  $('#vaciar-carrito').on('click', function (e) {
    e.stopPropagation();
    guardar([]);
    pintar();
  });

  // Página de cada Biblia: botón "Añadir al carrito"
  $('#anadir-carrito').on('click', function () {
    const dorado = $('#personalizar').is(':checked') ? ($.trim($('#nombre').val()) || 'nombre') : '';
    const carrito = leer();
    carrito.push({ nombre: $('h1').first().text(), precio: Number($('#precio').text()), dorado: dorado });
    guardar(carrito);
    pintar();
    const $boton = $(this).text('Añadida al carrito ✓');
    setTimeout(function () { $boton.text('Añadir al carrito'); }, 1800);
    $('#contador-carrito').stop(true, true).fadeOut(100).fadeIn(250);
  });
});
