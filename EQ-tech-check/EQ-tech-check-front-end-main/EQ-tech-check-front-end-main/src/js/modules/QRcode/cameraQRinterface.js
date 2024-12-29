import { QRvideoInspector } from './QRvideoInspector.js';
import { setContactToFailedList } from '../setContactToFailedList.js';

const cameraCheckButtonEl = document.getElementById('camera-check-btn');
const qrProcceedBtnEl = document.querySelector('.qr-button');
const qrFailureMessage = document.querySelector('.qr-failure-message');
const cameraFailureEl = document.getElementById('camera-failure-text');
const videoContainerEl = document.querySelector('.tech-camera-container');
const failureLink = document.querySelector('.tech-failure-link');

const videoInspector = new QRvideoInspector();

if (getParamValue('techCheck')) {
    videoContainerEl.style.display = 'none';
    cameraFailureEl.style.display = 'block';

    const response = await fetch('http://localhost:3000/getData');
    const { data } = await response.json();
    failureLink.href = data[0][6];
} else {
    videoContainerEl.style.display = 'block';
}

failureLink.addEventListener('click', setContactToFailedList);

function getParamValue(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

cameraCheckButtonEl.addEventListener('click', () => {
    videoInspector.inspect();
});

qrProcceedBtnEl.addEventListener('click', async () => {
    const userId = getUserACId();
    const response = await fetch(`users/${userId}`);
    const user = await response.json();
    const meetingLink = user.meetingLink;

    const isFieldsAreTrue = Object.entries(user).every(
        ([key, value]) => key === 'isPossibleToUsePhone' || value
    );

    if (!isFieldsAreTrue) {
        qrFailureMessage.style.display = 'block';
        return;
    }
    window.location.href = meetingLink;
});

function getUserACId() {
    const currentUrl = window.location.href;
    const match = currentUrl.match(/\/(\w+)(?:\?.*)?$/);
    if (match) {
        return match[1];
    }
    return null;
}
