import fileUpload from './upload_file';
import folderUpload from './upload_folder';

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
                            
                            break;
                            case 'audio':
                            
                            break;
                            case 'note':
                            
                            break;                            
                    }
                }
                

            });
        });
    }
}