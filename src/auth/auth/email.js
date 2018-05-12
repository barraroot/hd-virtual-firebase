import { app } from '../../firebase';

export const createAccountEmail = function () {
    alert('Criação de conta com e-mail e senha');

    let email = prompt('Informe seu e-mail:', '');
    let senha = prompt('Informe sua senha', '');
    let confirmaSenha = prompt('Confirme sua senha:', '');

    if(senha !== confirmaSenha) {
        alert('Senha e confirmação de senha não conferem.');
        return;
    } else {
        app.auth().createUserWithEmailAndPassword(email, senha)
            .then((user) => {
                console.log(user);
            })
            .catch((err) => {
                console.log('erro: ' + err);
                alert(err.message);
            });
    }
    
}

export const authAccountEmail = function () {
    alert("Login via e-mail e senha");

    let email = prompt('Informe seu e-mail:', '');
    let senha = prompt('Informe sua senha', '');
    
    app.auth().signInWithEmailAndPassword(email, senha)
        .then((data) => {
            console.log(data);
        })
        .catch((err) => {
            console.log(err);
            alert('Erro: '+ err.message);
        })
}