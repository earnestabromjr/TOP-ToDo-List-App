import './styles.css';
import { load_page } from './load_page.js';
import { load_menu } from "./menu.js";
import { load_contact } from "./contact.js";

document.addEventListener('DOMContentLoaded', () => {
    load_page();
});

const home_btn = document.getElementById('home');
home_btn.addEventListener('click', () => {
    load_page();
})

const menu_btn = document.getElementById("menu");
menu_btn.addEventListener('click', () => {
    const content = document.querySelector('#content');
    content.innerHTML = '';
    load_menu();
});

const contact_btn = document.querySelector('#contact');
contact_btn.addEventListener('click', () => {
   const content = document.querySelector('#content');
   content.innerHTML = '';
   load_contact();
});