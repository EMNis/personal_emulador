function abrirManyChat() {
    try {
        if (window.ManychatAPI) {
            window.ManychatAPI.open();
            console.log('ManyChat widget opened successfully.');
        } else {
            throw new Error('ManychatAPI not available.');
        }
    } catch (error) {
        console.error('Error opening ManyChat:', error);
    }
}

function abrirWhatsAppBot() {
    try {
        if (window.ManychatAPI) {
            window.ManychatAPI.open();
            console.log('WhatsApp bot widget opened successfully.');
        } else {
            throw new Error('ManychatAPI not available.');
        }
    } catch (error) {
        console.error('Error opening WhatsApp bot:', error);
    }
}

function usarManyChat() {
    // Existing functionality preserved, or add more logic if needed
}

function usarTidio() {
    // Existing functionality preserved, or add more logic if needed
}