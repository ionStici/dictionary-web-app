import styles from './../../styles/header.module.scss';
import logoImg from './../../assets/images/logo.svg';
import arrowImg from './../../assets/images/icon-arrow-down.svg';
import { createElement, setSrcAlt } from '../abstract/utilities';
import { switchTheme, changeFont, selectFont } from '../store/store';
import { dispatch, subscribe } from '../store/store';

const moonIcon = `<svg class="${styles.moonIcon}" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><path fill="none" stroke="#838383" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"/></svg>`;

const Header = createElement('header', [styles.header]);
const box = createElement('div', [styles.box]);

const logo = createElement('img', [styles.logo]);
setSrcAlt(logo, logoImg, 'Logo');
logo.setAttribute('tabindex', '0');
const goHome = () => (window.location.href = '/');
logo.addEventListener('click', goHome);
logo.addEventListener('keydown', e => (e.key === 'Enter' ? goHome() : ''));

Header.appendChild(logo);
Header.appendChild(box);

// // // // // // // // // // // // // // //

const dropdown = createElement('div', [styles.dd]);
dropdown.dataset.nav = 'close';
dropdown.setAttribute('role', 'button');
dropdown.setAttribute('tabindex', '0');

const title = createElement('p', [styles.dd__title], 'Sans Serif');
subscribe(() => (title.textContent = selectFont()));

const arrow = createElement('img', [styles.dd__icon]);
setSrcAlt(arrow, arrowImg);

const list = createElement('ul', [styles.dd__ul]);

const items = ['Sans Serif', 'Serif', 'Mono'].map(text => {
    const item = createElement('li', [styles.dd__li], text);
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    list.append(item);
    return item;
});

dropdown.append(title);
dropdown.append(list);
dropdown.append(arrow);

// // // // // // // // // // // // // // //

const toggle = createElement('div', [styles.themeToggler]);
toggle.setAttribute('role', 'button');
toggle.setAttribute('tabindex', '0');

const toggler = createElement('div', [styles.toggler]);
const circle = createElement('div', [styles.circle]);
toggler.append(circle);

const iconBox = createElement('div', [styles.iconBox]);
iconBox.innerHTML = moonIcon;

toggle.append(toggler);
toggle.append(iconBox);

// // // // // // // // // // // // // // //

box.append(dropdown);
box.append(toggle);

// // // // // // // // // // // // // // //

const toggleTheme = () => dispatch(switchTheme());
toggle.addEventListener('click', toggleTheme);
toggle.addEventListener('keydown', e => {
    e.key === 'Enter' ? toggleTheme() : undefined;
    e.key === 'Escape' ? toggle.blur() : undefined;
});

// // // // // // // // // // // // // // //

const dropdownEvent = function () {
    if (dropdown.dataset.nav === 'close') {
        list.style.display = 'revert';
        dropdown.dataset.nav = 'open';
        return;
    }

    if (dropdown.dataset.nav === 'open') {
        list.style.display = 'none';
        dropdown.dataset.nav = 'close';
        return;
    }
};

dropdown.addEventListener('click', dropdownEvent);
dropdown.addEventListener('keydown', ({ key, target }) => {
    if (key === 'Enter' && target === dropdown) dropdownEvent();
    if (key === 'Escape' && target === dropdown) dropdownEvent();
});

// // // // // // // // // // // // // // //

items.forEach(item => {
    item.addEventListener('click', ({ target }) =>
        dispatch(changeFont(target.textContent))
    );

    item.addEventListener('keydown', ({ key, target }) => {
        if (key === 'Escape') dropdownEvent();
        if (key === 'Enter') dispatch(changeFont(target.textContent));
    });
});

// // // // // // // // // // // // // // //

export default Header;
