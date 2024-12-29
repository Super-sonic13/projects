import { QRmicroInspector } from './QRmicroInspector';
import { setContactToFailedList } from '../setContactToFailedList.js';

const microCheckButtonEl = document.getElementById('micro-check-btn');
const qrProcceedBtnEl = document.querySelector('.qr-button');
const qrFailureMessage = document.querySelector('.qr-failure-message');
const microBackdropEl = document.getElementById('microphone-check');
const microContainerEl = document.querySelector('.qr-microphone-container');
const microFailureEl = document.getElementById('microphone-failure-text');
const failureLink = document.querySelector('.tech-failure-link');

const microInspector = new QRmicroInspector();

if (getParamValue('techCheck')) {
    microContainerEl.style.display = 'none';
    microFailureEl.style.display = 'block';
    microBackdropEl.style.display = 'none';

    const response = await fetch('http://localhost:3000/getData');
    const { data } = await response.json();
    failureLink.href = data[0][6];
} else {
    microContainerEl.style.display = 'block';
}

failureLink.addEventListener('click', setContactToFailedList);

function getParamValue(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

microCheckButtonEl.addEventListener('click', () => {
    microInspector.inspect();
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
