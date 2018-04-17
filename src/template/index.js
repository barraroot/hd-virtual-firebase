import "./style.scss";
import "font-awesome/css/font-awesome.css";
import header from "./header.html";
import content from "./content.html";
import footer from "./footer.html";
import sidebar from "./sidebar.html";

export const template = `<div id="wraper">${header}${content}${footer}</div>${sidebar}`;
export function action() {
    console.log('done');
}