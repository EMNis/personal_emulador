/* ============================================
   API CONFIG — Configuración central de APIs
   Todos los datos sensibles en un solo lugar.
   Importado por whatsapp.js y chat.js
   ============================================ */
const API_CONFIG = {

    // ── MANYCHAT ──────────────────────────────
    MANYCHAT_API_KEY:  '4137615:bc1d1a8d5e70277030a15c9866e4a13e',
    BOT_ID:            '4137615',
    MANYCHAT_BASE_URL: 'https://api.manychat.com/fb',

    // ── WHATSAPP ──────────────────────────────
    // Número de WhatsApp Business del bot
    WHATSAPP_NUMBER:   '+5491131392122',

    // URL directa para abrir WhatsApp Web / app
    WHATSAPP_BOT_URL:  'https://api.whatsapp.com/send?phone=5491131392122&text=Hola',

    // Mensaje que se envía automáticamente al abrir el chat
    INITIAL_MESSAGE:   'Hola, vengo desde la APP de Mi Personal',

    // ── TIDIO ─────────────────────────────────
    TIDIO_SCRIPT_ID: 'cdcvpmq1itowmt3wueaoni6hfn67omjl'
};

export default API_CONFIG;