/* ============================================
   WHATSAPP.JS — todo lo que tiene que ver con
   WhatsApp y ManyChat en el emulador.

   Aquí reunimos las utilidades necesarias para:
   • Construir el enlace que abre WhatsApp con un
     texto prellenado.
   • Mostrar un pequeño modal de confirmación
     dentro del emulador antes de redirigir.
   • Y, si ya conocemos el subscriber ID, enviar
     mensajes directamente a la API de ManyChat.
   ============================================ */

// Importar configuración central (si se usa un bundler o modules)
// import API_CONFIG from '../../config/api-config.js';

/* ------------------------------------------
   Primero definimos algunas constantes con
   valores fijos: número de WhatsApp, mensaje
   inicial y credenciales de ManyChat. En un
   proyecto más complejo podríamos importarlos
   desde config/api-config.js.
   ------------------------------------------ */
const WHATSAPP_NUMBER  = '+5491131392122';
const INITIAL_MESSAGE  = 'Hola, vengo desde Mi Personal';
const MANYCHAT_API_KEY = '4137615:bc1d1a8d5e70277030a15c9866e4a13e';
const MANYCHAT_URL     = 'https://api.manychat.com/fb';

/* ------------------------------------------
   Esta función se encarga de armar la URL que
   abre WhatsApp. Limpia el número de cualquier
   carácter no numérico, codifica el texto para
   que sea seguro en la URL y concatena todo en
   el formato que espera la API de WhatsApp.
   ------------------------------------------ */
function generarLinkWhatsApp(mensajePersonalizado) {

    // Usar mensaje personalizado o el mensaje por defecto
    var mensaje = mensajePersonalizado || INITIAL_MESSAGE;

    // Eliminar caracteres no numéricos del número (+, espacios, guiones)
    // Ejemplo: '+5491131392122' → '5491131392122'
    var numeroLimpio = WHATSAPP_NUMBER.replace(/[^0-9]/g, '');

    // encodeURIComponent convierte espacios y caracteres especiales
    // para que funcionen en una URL
    // Ejemplo: 'Hola mundo' → 'Hola%20mundo'
    var mensajeCodificado = encodeURIComponent(mensaje);

    // Construir la URL final de WhatsApp
    return 'https://api.whatsapp.com/send?phone=' + numeroLimpio + '&text=' + mensajeCodificado;
}

/* ------------------------------------------
   Función que se enlaza al botón de WhatsApp
   dentro del HTML. Llama a generarLinkWhatsApp
   con el mensaje por defecto, abre esa URL en
   una pestaña nueva y deja un mensaje en la
   consola para facilitar la depuración.
   ------------------------------------------ */
function abrirWhatsAppBot() {

    // Generar el link con el mensaje inicial
    var link = generarLinkWhatsApp(INITIAL_MESSAGE);

    // Abrir en una nueva pestaña del navegador
    // '_blank' = nueva pestaña
    window.open(link, '_blank');

    // Log para debugging en la consola del navegador
    console.log('WhatsApp abierto con link:', link);
}

/* ------------------------------------------
   Modal de confirmación

   Antes de sacar al usuario del emulador
   presentamos una pequeña ventana dentro de
   la interfaz. Estas dos funciones solo muestran
   u ocultan dicho modal.
   ------------------------------------------ */
function abrirModalWhatsApp() {

    // Buscar el modal en el HTML por su id
    var modal = document.getElementById('whatsapp-modal');

    // Mostrarlo cambiando su display
    if (modal) {
        modal.style.display = 'flex';
    }
}

function cerrarModalWhatsApp() {
    var modal = document.getElementById('whatsapp-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

/* ------------------------------------------
   Si contamos con el "subscriberId" de ManyChat,
   podemos mandar texto directo al bot a través
   de su API. Esta función hace la petición POST
   con el cuerpo adecuado y retorna la respuesta
   (o lanza el error si algo falla).
   ------------------------------------------ */
async function enviarAManyChat(subscriberId, mensaje) {
    try {
        // fetch() hace una petición HTTP a la API de ManyChat
        var respuesta = await fetch(MANYCHAT_URL + '/sending/sendContent', {
            method: 'POST',
            headers: {
                // Authorization con Bearer token (la API Key)
                'Authorization': 'Bearer ' + MANYCHAT_API_KEY,
                'Content-Type': 'application/json'
            },
            // body convierte el objeto JS a texto JSON
            body: JSON.stringify({
                subscriber_id: subscriberId,
                messages: [{
                    type: 'text',
                    text: mensaje
                }]
            })
        });

        // Convertir respuesta de JSON a objeto JavaScript
        var datos = await respuesta.json();
        console.log('ManyChat respondió:', datos);
        return datos;

    } catch (error) {
        console.error('Error al conectar con ManyChat:', error);
        throw error;
    }
}