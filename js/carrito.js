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
    const primero = $('#primer-encargo').is(':checked');
    $('#contador-carrito').text(carrito.length).toggle(carrito.length > 0);
    $('#btn-carrito').attr('aria-label', 'Carrito (' + carrito.length + ')');
    const $lista = $('#lista-carrito').empty();
    carrito.forEach(function (item, i) {
      total += item.precio;
      $lista.append(
        $('<li class="flex items-baseline gap-3 py-2 border-b border-oliva/15">').append(
          $('<span class="flex-1">').text(item.nombre + (item.dorado ? ' · «' + item.dorado + '» en dorado' : '')),
          $('<span class="whitespace-nowrap">').text(item.precio + ' €'),
          $('<button type="button" class="quitar text-xl leading-none p-2 -m-2 text-oliva/50 hover:text-rosa">×</button>').attr({ 'data-i': i, 'aria-label': 'Quitar ' + item.nombre })
        )
      );
    });
    $('#carrito-vacio').toggle(carrito.length === 0);
    $('#carrito-lleno').toggle(carrito.length > 0);
    const descuento = primero ? Math.round(total * 0.10) : 0;   // −10 % en el primer encargo
    total -= descuento;
    $('#total-carrito').text(total + ' €');

    // "Finalizar encargo": abre un correo con el pedido ya escrito
    const lineas = carrito.map(function (item) {
      return '- ' + item.nombre + (item.dorado ? ' (nombre en dorado: ' + item.dorado + ')' : '') + ' · ' + item.precio + ' €';
    });
    if (descuento) lineas.push('- Primer encargo: −' + descuento + ' €');
    const cuerpo = 'Hola, me gustaría encargar:\n\n' + lineas.join('\n') + '\n\nTotal: ' + total + ' €\n\nMi nombre:\nCiudad de envío:';
    $('#finalizar-encargo').attr('href', 'mailto:' + EMAIL_ENCARGOS + '?subject=' + encodeURIComponent('Encargo Dvash Studio') + '&body=' + encodeURIComponent(cuerpo));
  }
  pintar();
  $('#primer-encargo').on('change', pintar);

  // Abrir y cerrar el panel
  $('#btn-carrito').on('click', function (e) {
    e.stopPropagation();
    const abierto = $(this).attr('aria-expanded') === 'true';
    $(this).attr('aria-expanded', !abierto);
    $('#panel-carrito').stop().fadeToggle(200);
    // si el menú móvil estaba abierto, se cierra
    $('#menu-movil').slideUp(200);
    $('#btn-menu').attr({ 'aria-expanded': false, 'aria-label': 'Abrir menú' });
  });
  // y al revés: al abrir el menú se cierra el carrito
  $('#btn-menu').on('click', function () {
    $('#panel-carrito').fadeOut(150);
    $('#btn-carrito').attr('aria-expanded', false);
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
    const personalizar = $('#personalizar').is(':checked');
    const dorado = personalizar ? $.trim($('#nombre').val()) : '';
    if (personalizar && !dorado) {          // no se añade sin nombre
      $('#falta-nombre').fadeIn(200);
      $('#nombre').trigger('focus');
      return;
    }
    const bautizo = personalizar && $('#bautizo').is(':checked');
    const carrito = leer();
    carrito.push({ nombre: $('h1').first().text() + (bautizo ? ' (bautizo)' : ''), precio: Number($('#precio').text()), dorado: dorado });
    guardar(carrito);
    pintar();
    const $boton = $(this).text('Añadida al carrito ✓');
    setTimeout(function () { $boton.text('Añadir al carrito'); }, 1800);
    $('#contador-carrito').stop(true, true).fadeOut(100).fadeIn(250);
  });

  // Ofertas de la portada que se añaden directamente (pack de bodas)
  $('.anadir-oferta').on('click', function () {
    const carrito = leer();
    carrito.push({ nombre: $(this).data('nombre'), precio: Number($(this).data('precio')), dorado: '' });
    guardar(carrito);
    pintar();
    const $boton = $(this), texto = $boton.text();
    $boton.text('Añadido al carrito ✓');
    setTimeout(function () { $boton.text(texto); }, 1800);
  });
});
