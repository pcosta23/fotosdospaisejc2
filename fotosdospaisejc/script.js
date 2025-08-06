document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('uploadForm');
    const thankYouMessage = document.getElementById('thankYouMessage');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obter dados do formulário
        const photos = document.getElementById('photos').files;
        const names = document.getElementById('names').value;
        
        // Aqui você implementaria o upload para o Google Sheets
        uploadToGoogleSheets(photos, names);
        
        // Mostrar mensagem de agradecimento
        form.classList.add('hidden');
        thankYouMessage.classList.remove('hidden');
    });
});

function uploadToGoogleSheets(photos, names) {
    // 1. Carrega a API do Google
    gapi.load('client', () => {
        // 2. Configuração (substitua com SEUS dados!)
        const API_KEY = 'Foto dos Pais EJC';
        const CLIENT_ID = '956140667562-uugt5o7i0n8nr1tk8cfehr0uokvh2ire.apps.googleusercontent.com';
        const SPREADSHEET_ID = 'https://docs.google.com/spreadsheets/d/1z49U5HSt56AOP18Xy8mFrBz_ifYZv5rr0w8pZGWd5nY/edit?usp=sharing';
        
        gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
            scope: "https://www.googleapis.com/auth/spreadsheets"
        }).then(() => {
            // 3. Envia os dados para a planilha
            gapi.client.sheets.spreadsheets.values.append({
                spreadsheetId: SPREADSHEET_ID,
                range: 'Página1!A2:D2', // Altere para sua aba/intervalo
                valueInputOption: 'USER_ENTERED',
                resource: {
                    values: [
                        [
                            new Date().toLocaleString(), // Data
                            names, // Nomes e círculos
                            "", // Espaço para links (você pode adicionar depois)
                            "Fotos: " + photos.length // Número de fotos
                        ]
                    ]
                }
            }).then(response => {
                console.log("Dados salvos!", response);
                
                // (Opcional) Upload das fotos para o Drive
                if (photos.length > 0) {
                    uploadPhotosToDrive(photos, SPREADSHEET_ID);
                }
            });
        });
    });
}

// Função auxiliar para fotos (opcional)
function uploadPhotosToDrive(photos, spreadsheetId) {
    // Implementação depende do seu Apps Script
    console.log("Fotos para upload:", photos);
}