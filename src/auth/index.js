import { app } from '../firebase';
import { createAccountEmail, authAccountEmail } from './auth/email';
import { UserClass } from './user';
import fileListComponent from '../files_list';

let template = document.createElement('template');
template.innerHTML = require('./template.html');
template = template.content.childNodes;

document.querySelector('body').appendChild(template[0]);

export default {
    el: null,
    template: null,
    afterBind () {
        app.auth().onAuthStateChanged(function (user) {
            if(user) {
                const userInstance = new UserClass;
                userInstance.user = user;

                if(fileListComponent.el !== '' || fileListComponent.el != null) { 
                    let elementMain = document.querySelector(fileListComponent.el);
                    if(elementMain !== null) {
                        elementMain.innerHTML = fileListComponent.template;
                    }                
                }
                fileListComponent.afterBind();

                const auth = document.getElementById('auth');
                auth.className = 'modal';
                
                const sha1 = require('js-sha1');
                let ref = app.database().ref('/sharer/' + sha1(user.email));
                ref.set(user.uid);
            } else {
                const auth = document.getElementById('auth');
                auth.className = 'modal open';

                document.getElementById('auth-login').addEventListener('click', function (e) {
                    e.preventDefault();
                    authAccountEmail();
                });

                document.getElementById('auth-cadastro').addEventListener('click', function (e) {
                    e.preventDefault();
                    createAccountEmail();
                });                

            }
        })
    }
}