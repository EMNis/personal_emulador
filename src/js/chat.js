/* ============================================
   CHAT.JS — controla el acceso al chat en vivo.

   Cuando el usuario quiere comunicarse con
   soporte abrimos el widget de Tidio. Éste se
   carga de forma asíncrona, así que aquí solo
   comprobamos que la API esté lista antes de
   usarla.
   ============================================ */

/* ------------------------------------------
   abrirChat()

   Esta función se dispara al pulsar el enlace
   "Chatea con nosotros" dentro del emulador.
   Carga el script de Tidio dinámicamente solo
   cuando sea necesario, evitando el botón
   flotante automático.
   ------------------------------------------ */
function abrirChat() {

    // Si ya está cargado, abrimos directamente
    if (window.tidioChatApi) {
        window.tidioChatApi.open();
        console.log('Tidio: chat abierto');
        return;
    }

    // Si no está cargado, lo cargamos dinámicamente
    console.log('Tidio: cargando script...');
    
    var script = document.createElement('script');
    script.src = '//code.tidio.co/cdcvpmq1itowmt3wueaoni6hfn67omjl.js';
    script.async = true;
    
    script.onload = function() {
        console.log('Tidio: script cargado correctamente');
        // Esperar a que Tidio esté listo
        var intentos = 0;
        var intervalo = setInterval(function() {
            if (window.tidioChatApi) {
                window.tidioChatApi.open();
                console.log('Tidio: chat abierto después de cargar');
                clearInterval(intervalo);
            } else {
                intentos++;
                if (intentos > 20) {
                    console.log('Tidio: no se pudo cargar');
                    clearInterval(intervalo);
                }
            }
        }, 250);
    };
    
    document.body.appendChild(script);
}