document.addEventListener('DOMContentLoaded', renderContent);

function renderContent() {
    const urlParams = new URLSearchParams(window.location.search);
    const cameraCheckParam = urlParams.get('cameraCheck');
    const microphoneCheckParam = urlParams.get('microphoneCheck');

    const htmlFile = getHtmlFile(cameraCheckParam, microphoneCheckParam);

    if (htmlFile) {
        fetch(htmlFile)
            .then((response) => response.text())
            .then((htmlContent) => {
                document.documentElement.innerHTML = htmlContent;
            })
            .catch((error) => {
                console.error('Error fetching HTML file:', error);
            });
    }
}

function getHtmlFile(cameraCheckParam, microphoneCheckParam) {
    if (cameraCheckParam) {
        return '../cameraQrPage.html';
    } else if (microphoneCheckParam) {
        return '../microphoneQrPage.html';
    }
}
