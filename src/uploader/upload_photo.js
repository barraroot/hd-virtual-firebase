import uploader from '../utils/uploader';

require('./photo/style.scss');
let template = require('./photo/template.html')

document.querySelector('body').innerHTML += template;

let btnPhotoCancel = document.getElementById('btnCancelPhoto').addEventListener('click', function(e) {
    e.preventDefault();

    let photoModal = document.getElementById('photo');
    photoModal.className = 'modal';
});

const startVideo = function (id) {
    let streamVideo;
    let config = {
        video: {deviceId: id},
        audio: false
    }

    let video = document.createElement('video');
    document.getElementById('photo-viewer').appendChild(video);

    video.addEventListener('click', function (e) {
        let photo = new ImageCapture(streamVideo.getTracks()[0]);
        photo.takePhoto()
        .then((blob) => {
            let name = Math.random().toString(36).substring(2);
            name += '.png';
            uploader(blob, name);
            document.getElementById('btnCancelPhoto').click();
        });
    });

    let success = (stream) => {
        streamVideo = stream;
        video.srcObject = stream;
        video.play();
    }

    navigator.getUserMedia(config, success, (err) => console.log(err));
}

navigator.mediaDevices.enumerateDevices().then((devices) => {
    let menuCamera = document.querySelector('#photo-choise .menu-camera');
    let partialTemplate = menuCamera.innerHTML;
    let html = '';

    devices.forEach((device) => {
        if(device.kind == 'videoinput') {
            let label = device.label || 'Camera';
            html += partialTemplate
                    .replace(/{{id}}/g, device.deviceId)
                    .replace(/{{label}}/g, label);
        }
    });
    menuCamera.innerHTML = html;

    document.querySelector('#photo-choise .menu-camera a').addEventListener('click', function (e) {
        e.preventDefault();
        startVideo(e.target.dataset.camera);
        document.getElementById('photo-choise').setAttribute('style', 'display:none;');
    });
});

export default function () {
    let photoModal = document.getElementById('photo');
    photoModal.className = 'modal open';
}