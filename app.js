// app.js

// Function to switch tabs
function switchTab(tabName) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.style.display = 'none';
    });
    document.getElementById(tabName).style.display = 'block';
}

// Function to open chat
function abrirChat() {
    // Implementation for opening chat
    console.log('Chat opened');
}

// Function to open WhatsApp bot
function abrirWhatsAppBot() {
    // Implementation for opening WhatsApp bot
    console.log('WhatsApp Bot opened');
}

// Function to open ManyChat
function abrirManyChat() {
    // Implementation for opening ManyChat
    console.log('ManyChat opened');
}

// Function to use ManyChat
function usarManyChat() {
    // Implementation for using ManyChat
    console.log('Using ManyChat');
}

// Function to use Tidio
function usarTidio() {
    // Implementation for using Tidio
    console.log('Using Tidio');
}

// Initialization on DOMContentLoaded
document.addEventListener('DOMContentLoaded', (event) => {
    // Initialization logic here
    console.log('DOM fully loaded and parsed');
    switchTab('defaultTab'); // Example of setting a default tab
});
