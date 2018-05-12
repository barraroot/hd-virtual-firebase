export default function (snapshot) {
    let data = snapshot.val();
    if(!data) {
        document.querySelector('#main .files').innerHTML = "Nenhuma pasta ou arquivo para este usuário.";
        return;
    }

    data = Object.entries(data);
    let partial = require('./partial.html');

    let folders = [];
    let files = [];
    data.forEach((item, key) => {
        if(typeof item[1] != 'object') {
            data.splice(key);
        }

        if(item[1].type == 'folder-open') {
            folders.push(item);
        } else {
            files.push(item);
        }
    });

    folders.sort((a,b) => a[1].title.localeCompare(b[1].title));
    files.sort((a,b) => a[1].title.localeCompare(b[1].title));
    data = folders.concat(files);
    let html = '';
    for (let index in data) {

        if (typeof data[index][1] !== 'object') {
            continue;
        }

        html += partial
            .replace(/{{fid}}/g, data[index][0])
            .replace(/{{type}}/g, data[index][1].type)
            .replace(/{{url}}/g, data[index][1].url)
            .replace(/{{title}}/g, data[index][1].title)
    }

    document.querySelector('#main .files').innerHTML = '' + html;
}