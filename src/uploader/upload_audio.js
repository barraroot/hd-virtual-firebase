import uploader from '../utils/uploader';

let streamAudio;
let recorder;

const audioRecorder = function () {
    recorder = new MediaRecorder(streamAudio);
    let chunks = [];

    recorder.ondataavailable = (event) => {
        chunks.push(event.data);
    }

    recorder.onstop = () => {
        let blob = new Blob(chunks, {type: 'video/webm'});
        chunks = [];

        let name = Math.random().toString(36).substring(2);
        name += '.ogg';
        uploader(blob, name);   
    }

    recorder.start();
}

export default function () {
    if(streamAudio) {
        recorder.stop();
        streamAudio.getTracks()[0].stop();
        console.log('parando audio');
    } else {
        let config = {
            video: false,
            audio: true,
        }

        let success = function (stream) {
            streamAudio = stream;
            audioRecorder();
            console.log('gravando audio');
        }

        navigator.getUserMedia(config, success, (err) => console.log(err));
    }
}