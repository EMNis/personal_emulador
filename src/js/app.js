/* ============================================
   APP.JS — comportamiento básico del emulador

   Aquí reside la lógica que permite moverse
   entre las distintas "pantallas" dentro del
   teléfono falso y arrancar la aplicación cuando
   la página termina de cargar.
   ============================================ */

/* ------------------------------------------
   switchTab(tabName)

   Esta es la función que hace posible la
   navegación. Recibe el nombre de la pestaña
   seleccionada (por ejemplo "home" o "mas"),
   oculta todas las demás pantallas y muestra la
   solicitada. También actualiza cuál ícono está
   marcado en la barra inferior, se encarga de
   ocultar el header en la vista "Descubrí" y
   desplaza el contenido hacia arriba.
   ------------------------------------------ */
function switchTab(tabName) {

    // 1. Ocultar todas las pantallas
    var pantallas = document.querySelectorAll('.screen');
    pantallas.forEach(function(p) {
        p.classList.remove('active');
    });

    // 2. Mostrar la pantalla seleccionada
    var destino = document.getElementById('screen-' + tabName);
    if (destino) {
        destino.classList.add('active');
    }

    // 3. Actualizar tab activo en la nav bar
    var tabs = document.querySelectorAll('.nav-item');
    tabs.forEach(function(tab) {
        if (tab.dataset.screen === tabName) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // 4. Ocultar header en pantalla Descubrí
    var header   = document.getElementById('app-header');
    var selector = document.getElementById('phone-selector');

    if (tabName === 'descubri') {
        header.style.display   = 'none';
        selector.style.display = 'none';
    } else {
        header.style.display   = 'flex';
        selector.style.display = 'flex';
    }

    // 5. Scroll al tope
    var scroll = document.getElementById('scroll-content');
    if (scroll) scroll.scrollTop = 0;
}

/* ------------------------------------------
   Cuando el DOM está listo, arrancamos la app
   mostrando la pantalla de inicio y dejamos un
   mensaje en la consola para saber que todo
   cargó correctamente.
   ------------------------------------------ */
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar pantalla de inicio por defecto
    switchTab('home');
    console.log('App Personal Emulador: iniciado correctamente');
});