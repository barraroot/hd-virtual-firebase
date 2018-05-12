import getData from './firebase_get_data';
import clickFile from './file_click';
import { UserClass } from '../auth/user';

require('./style.scss');

export default {
    el: '#main',
    template: require('./template.html'),
    afterBind() {
        let userInstance = new UserClass;
        let queryString = window.location.search.slice(1).split('&');
        queryString.forEach((item, key) => {
            item = item.split('=');
            queryString[item[0]] = item[1];
        });

        let uid = '';
        let title = '';

        if(queryString['drive']) {
            uid = queryString['drive'];
            title = queryString['email'];
        } else {
            let userInstance = new UserClass();
            uid =  userInstance.user.uid;
            title = 'Drive'
        }

        console.log(uid + ' - '+ title);

        getData({
            id: 'files/' + uid,
            title: title
        });
        clickFile();
    }
}