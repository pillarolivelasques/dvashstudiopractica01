# Dvash Studio · Biblias pintadas a mano

Práctica 01 de **Maquetación web con hojas de estilo** (UDIT): la web de un comercio de barrio.

Dvash Studio es una tienda-taller en el barrio de Salamanca (Madrid) que hace Biblias con tapas pintadas en acuarela, impresas sobre algodón, forradas a mano y con detalles en dorado.

**Web publicada:** https://pillarolivelasques.github.io/dvashstudiopractica01/

## Tecnologías

- **HTML** semántico
- **Tailwind CSS v4** (Play CDN) con un sistema de diseño propio en `@theme`: colores, tipografías
- **CSS propio** (`style.css`), organizado en capas: componentes, utilidades y animaciones con `@keyframes`
- **jQuery**: menú móvil, carrito, vista previa de la dedicatoria, horario de la tienda y páginas de producto
- **AOS**: animaciones al hacer scroll
- **Modo oscuro** con la variante `dark:` de Tailwind: las variables del `@theme` cambian de valor y la elección se guarda con localStorage
- Imágenes en **WebP**

## Estructura

```
index.html                  página principal
biblia-*.html               una página por cada Biblia de la colección
style.css                   estilos propios
js/carrito.js               carrito (se guarda con localStorage)
js/modo.js                  botón de modo claro / oscuro
img/                        imágenes
```

## Ramas

Cada parte de la web se hizo en su propia rama y después se unió a `main`:

| Rama | Contenido |
|---|---|
| `sistemadediseno` | colores, tipografías y base del `@theme` |
| `cabecera-nav` | cabecera con navegación y menú móvil |
| `portada` | portada con ramas y frase principal |
| `coleccion` | carrusel, dedicatoria y recién pintadas (más las páginas de cada Biblia) |
| `ofertas` | ofertas de noviembre con etiqueta de precio |
| `taller` | el proceso en 4 pasos |
| `horario-ubicacion` | tienda, horario y dirección |
| `footer` | newsletter y pie de página |
| `animaciones` | animaciones CSS |
| `interacciones-js` | jQuery: carrito, menú fijo, dedicatoria, horario y AOS |
| `talleres` | talleres en la tienda (acuarela, letra, tapa) con formulario de reserva |
| `modo-oscuro` | modo oscuro «miel a la luz de una vela» con `dark:` y botón luna/sol |
