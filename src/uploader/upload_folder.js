import getPath from '../utils/get_path';
import { app } from '../firebase';

export default function () {
    let path = getPath();

    let dirctoryName = prompt('Qual o nome do diretório a ser criado ?', 'Minha pasta');

    console.log(dirctoryName);
    if(dirctoryName == null || dirctoryName == '') {
        return;
    }
    let folderRef = app.database().ref('files/1' + path);
    folderRef.push({
        type: 'folder-open',
        title: dirctoryName,
    });
}
