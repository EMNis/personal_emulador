/* ============================================
  FUNCIÓN PRINCIPAL: switchTab
  Navega entre las 5 pantallas de la app.
  Se llama desde los onclick del HTML.
  ============================================ */
function switchTab(tabName) {

  // Paso 1: ocultar TODAS las pantallas
  var pantallas = document.querySelectorAll('.screen');
  pantallas.forEach(function(p) {
    p.classList.remove('active');
  });

  // Paso 2: mostrar SOLO la pantalla pedida
  var pantallaDestino = document.getElementById('screen-' + tabName);
  pantallaDestino.classList.add('active');

  // Paso 3: actualizar qué tab está resaltado en el nav bar
  var tabs = document.querySelectorAll('.nav-item');
  tabs.forEach(function(tab) {
    if (tab.dataset.screen === tabName) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  // Paso 4: ocultar header en pantalla Descubrí
  var header   = document.getElementById('app-header');
  var selector = document.getElementById('phone-selector');

  if (tabName === 'descubri') {
    header.style.display   = 'none';
    selector.style.display = 'none';
  } else {
    header.style.display   = 'flex';
    selector.style.display = 'flex';
  }

  // Paso 5: volver al tope al cambiar de pantalla
  document.getElementById('scroll-content').scrollTop = 0;
}

/* ============================================
  FUNCIÓN: abrirChat
  Abre el widget de Tidio Live Chat.
  Configurado con script: //code.tidio.co/cdcvpmq1itowmt3wueaoni6hfn67omjl.js
   ============================================ */
function abrirChat() {
  // Verificar múltiples formas en que Tidio puede estar disponible
  if (window.tidioChatApi && window.tidioChatApi.open) {
    // Método principal
    window.tidioChatApi.open();
    console.log('Tidio abierto correctamente');
  } else if (window.tidioApi && window.tidioApi.open) {
    // Método alternativo
    window.tidioApi.open();
    console.log('Tidio abierto con API alternativa');
  } else {
    // Intentar después de esperar que se cargue
    console.log('Esperando que Tidio se cargue...');
    
    // Esperar hasta 5 segundos para que cargue
    let intentos = 0;
    const maxIntentos = 10;
    const intervalo = setInterval(function() {
      if (window.tidioChatApi && window.tidioChatApi.open) {
        window.tidioChatApi.open();
        console.log('Tidio cargado y abierto');
        clearInterval(intervalo);
      } else if (window.tidioApi && window.tidioApi.open) {
        window.tidioApi.open();
        console.log('Tidio cargado con API alternativa');
        clearInterval(intervalo);
      } else {
        intentos++;
        if (intentos >= maxIntentos) {
          console.log('Tidio no se pudo cargar después de 5 segundos');
          alert('El chat no está disponible en este momento. Inténtalo de nuevo.');
          clearInterval(intervalo);
        }
      }
    }, 500);
  }
}

/* ============================================
  FUNCIÓN: abrirWhatsAppBot
  Abre WhatsApp con mensaje que dispara ManyChat.
  API KEY: 4137615:bc1d1a8d5e70277030a15c9866e4a13e
   ============================================ */
function abrirWhatsAppBot() {
  // Configuración de tu bot de ManyChat
  var numero = '593625144759'; // ← Tu número de WhatsApp actualizado
  var mensaje = encodeURIComponent('Hola! Quiero hablar con el bot');
  var url = 'https://wa.me/' + numero + '?text=' + mensaje;
  window.open(url, '_blank');
}

/* ============================================
  FUNCIÓN: abrirManyChat
  Integración directa con ManyChat a través de WhatsApp
  Utiliza tu API KEY: 4137615:bc1d1a8d5e70277030a15c9866e4a13e
   ============================================ */
function abrirManyChat() {
  // ManyChat funciona mejor a través de WhatsApp directamente
  // Configurar mensaje específico para activar tu bot
  var numero = '593625144759'; // ← Tu número con ManyChat configurado
  var mensajeBot = encodeURIComponent('START'); // Palabra clave para activar ManyChat
  var urlManyChat = 'https://wa.me/' + numero + '?text=' + mensajeBot;
  
  // Abrir WhatsApp con el bot
  window.open(urlManyChat, '_blank');
}



/* ============================================
  FUNCIÓN: usarManyChat
  Cambia la preferencia para usar ManyChat en lugar de Tidio
   ============================================ */
function usarManyChat() {
  localStorage.setItem('preferManyChat', 'true');
  abrirManyChat();
}

/* ============================================
  FUNCIÓN: usarTidio
  Cambia la preferencia para usar Tidio en lugar de ManyChat
   ============================================ */
function usarTidio() {
  localStorage.setItem('preferManyChat', 'false');
  abrirChat();
}

/* ============================================
  INICIALIZACIÓN
  Cuando la página termina de cargar,
  mostrar la pantalla de inicio y probar Tidio.
   ============================================ */
document.addEventListener('DOMContentLoaded', function() {
  switchTab('home');
  
  // Probar si Tidio se carga correctamente
  setTimeout(function() {
    if (window.tidioChatApi || window.tidioApi) {
      console.log('✅ Tidio cargado correctamente');
    } else {
      console.log('❌ Tidio no se ha cargado');
      // Intentar cargar manualmente
      console.log('Intentando cargar Tidio manualmente...');
    }
  }, 3000);
});