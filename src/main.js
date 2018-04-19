import templateComponent from './template';
import fileListComponent from './files_list';
import uploaderComponent from './uploader';

const components = [
    templateComponent,
    fileListComponent,
    uploaderComponent
];

class Init {
    constructor() {
        components.forEach((component) => {
            if(component.el !== '') { 
                let elementMain = document.querySelector(component.el);
                if(elementMain !== null) {
                    elementMain.innerHTML = component.template;
                }                
            }
            component.afterBind();            
        });
    }
}

new Init();
