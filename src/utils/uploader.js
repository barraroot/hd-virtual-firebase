import { app } from '../firebase';
import getPath from './get_path';
import { UserClass } from '../auth/user';

export default function (file, name) {

    const userInstance = new UserClass;

    let path = getPath();
    const storageRef = app.storage().ref();
    let fileRef = storageRef.child('files/'+ userInstance.user.uid + path + name);
    fileRef.put(file).then((snapshot) => {
        let folderRef = app.database().ref('files/'+ userInstance.user.uid + path);
        folderRef.push({
            type: 'file',
            title: name,
            url: snapshot.downloadURL,
            size: snapshot.totalBytes
        });
        
        let totalBytes = snapshot.totalBytes;

        let usersRef = app.database().ref('/users/'+ userInstance.user.uid + '/usage');
        usersRef.once('value', (snapshot) => {
            let size = snapshot.val() || 0;
            usersRef.set(totalBytes + size);
        }, err => console.log(err));
    })
}