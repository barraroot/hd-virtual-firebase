import { app } from '../firebase';
import { foldersPath } from '../files_list/firebase_get_data';

export default function () {
    let path = '/';

    foldersPath.forEach((item, key) => {
        if(key > 0) {
            path += item.id + '/';
        }
    });

    let fileInput = document.getElementById('uploadFile');
    fileInput.click();

    fileInput.addEventListener('change', (e) => {
        const storageRef = app.storage().ref();
        let fileRef = storageRef.child('files/1' + path + e.target.files[0].name);

        fileRef.put(e.target.files[0]).then((snapshot) => {
            let folderRef = app.database().ref('files/1' + path);
            folderRef.push({
                type: 'file',
                title: e.target.files[0].name,
                url: snapshot.downloadURL
            });
        })
    });

}