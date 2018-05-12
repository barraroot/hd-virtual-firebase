import getPath from '../utils/get_path';
import { app } from '../firebase';
import { UserClass } from '../auth/user';

export default function () {
    let path = getPath();

    const userInstance = new UserClass;

    let dirctoryName = prompt('Qual o nome do diretório a ser criado ?', 'Minha pasta');

    console.log(dirctoryName);
    if(dirctoryName == null || dirctoryName == '') {
        return;
    }
    let folderRef = app.database().ref('files/'+ userInstance.user.uid + path);
    folderRef.push({
        type: 'folder-open',
        title: dirctoryName,
    });
}
