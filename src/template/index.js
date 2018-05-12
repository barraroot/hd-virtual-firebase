import "./style.scss";
import "font-awesome/css/font-awesome.css";
import header from "./header.html";
import content from "./content.html";
import footer from "./footer.html";
import sidebar from "./sidebar.html";
import sharer from './sharer';
import './shared';
require('./usage');

export default {
    el: '#app',
    template: `<div id="wrapper">
                            ${header}${content}${footer}
                         </div>
                         ${sidebar}`,
    afterBind() {
        let openMenu = document.querySelector('#header .menu-icon');
        let closeMenu = document.getElementById('wrapper');

        let closeMenuEvent = function (e) {
            e.preventDefault();
            let body = document.querySelector('body');

            body.className = body.className.replace('show-menu', '');

            closeMenu.removeEventListener('click', closeMenuEvent, true);
        };

        let openMenuEvent = function (e) {
            e.preventDefault();
            let body = document.querySelector('body');
            body.className += " show-menu";
            body.className = body.className.trim();

            closeMenu.addEventListener('click', closeMenuEvent, true);
        };

        openMenu.addEventListener('click', openMenuEvent, true);

        document.getElementById('addSharer').addEventListener('submit', function (e) {
            e.preventDefault();
            sharer(document.getElementById('addSharerInput').value);
        })
    }
}