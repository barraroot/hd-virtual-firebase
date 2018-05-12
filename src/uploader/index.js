import fileUpload from './upload_file';
import folderUpload from './upload_folder';
import photoUpload from './upload_photo';
import audioUpload from './upload_audio';
import noteUpload from './upload_note';

export default {
    el: '#footer',
    template: require('./template.html'),
    afterBind() {
        let btnCollection = document.querySelectorAll('#footer a');

        btnCollection.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                let element = e.target;

                if(element.tagName == 'I') {
                    element = e.target.parentElement;
                }

                if(element.tagName == 'A') {
                    switch(element.dataset.uploadType) {
                            case 'file':
                                fileUpload();
                            break;
                            case 'folder':
                                folderUpload();
                            break;
                            case 'photo':
                                photoUpload();
                            break;
                            case 'audio':
                                audioUpload();
                            break;
                            case 'note':
                                noteUpload();
                            break;                            
                    }
                }
                

            });
        });
    }
}