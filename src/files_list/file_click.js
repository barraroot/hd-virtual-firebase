import getData from './firebase_get_data';

export default function() {
    let onClickEvent = (e) => {
        e.preventDefault();
        let element = e.target;

        if(e.target.tagName == 'I') {
            element =  e.target.parentElement;
        }

        if(element.tagName == 'A') {
            if(element.dataset.type === 'file') {
                let link = document.createElement('A');
                link.setAttribute('href', element.getAttribute('href'));
                link.setAttribute('target', '_blank');
                link.click();
            }
            if(element.dataset.type === 'folder-open') {
                getData({
                    id: element.dataset.fid,
                    title: element.dataset.title
                });
            }
        }
    }

    document.querySelector('#main').addEventListener('click', onClickEvent);
}