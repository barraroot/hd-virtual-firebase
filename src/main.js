import templateComponent from './template';
import uploaderComponent from './uploader';
import authComponent from './auth';

const components = [
    templateComponent,
    uploaderComponent,
    authComponent
];

class Init {
    constructor() {
        components.forEach((component) => {
            if(component.el !== '' || component.el != null) { 
                let elementMain = document.querySelector(component.el);
                if(elementMain !== null) {
                    elementMain.innerHTML = component.template;
                }                
            }
            component.afterBind();            
        });

        if (process.env.NODE_ENV === 'production') {
            this.registerSW()
        }
    }

    registerSW() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./service-worker.js')
        }
    }
}

new Init();
