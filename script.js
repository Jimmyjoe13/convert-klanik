document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('uploadForm');
    const pdfFile = document.getElementById('pdfFile');
    const statusMessage = document.getElementById('statusMessage');

    uploadForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Empêche le rechargement de la page

        statusMessage.textContent = 'Téléversement en cours...';
        statusMessage.className = ''; // Réinitialise les classes de statut

        const file = pdfFile.files[0];

        if (!file) {
            statusMessage.textContent = 'Veuillez sélectionner un fichier PDF.';
            statusMessage.className = 'error';
            return;
        }

        if (file.type !== 'application/pdf') {
            statusMessage.textContent = 'Veuillez sélectionner un fichier au format PDF.';
            statusMessage.className = 'error';
            return;
        }

        const formData = new FormData();
        formData.append('file', file); // Le nom du champ doit correspondre à ce que le webhook attend

        try {
            const response = await fetch('https://primary-production-8f28.up.railway.app/webhook/549d3b7c-75e0-48a7-91d0-6337d58fd87', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                statusMessage.textContent = 'Fichier téléversé avec succès ! Réponse du serveur : ' + JSON.stringify(result);
                statusMessage.className = 'success';
            } else {
                const errorText = await response.text();
                statusMessage.textContent = `Erreur lors du téléversement : ${response.status} ${response.statusText} - ${errorText}`;
                statusMessage.className = 'error';
            }
        } catch (error) {
            statusMessage.textContent = `Une erreur réseau est survenue : ${error.message}`;
            statusMessage.className = 'error';
        }
    });
});
