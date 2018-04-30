import uploader from '../utils/uploader';

export default function () {
    let fileInput = document.getElementById('uploadFile');
    fileInput.click();
    fileInput.addEventListener('change', (e) => {
        uploader(e.target.files[0], e.target.files[0].name);
    });

}