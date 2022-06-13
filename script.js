'use strict';

// Navbar close and open ================
const navSlide = () => {
    const burger = document.querySelector('.nav__burger'),
        nav = document.querySelector('.nav'),
        navLinks = document.querySelectorAll('.nav__item');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('fa-xmark');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = ''
            } else {
                link.style.animation = `navLinkFade .5s ease forwards ${index / 7 + .5}s`
            }
        })
    });
}
navSlide();

// Popup close and open ================
const popup = () => {
    const body = document.querySelector('body'),
        popupLinks = document.querySelectorAll('.popup__link'),
        lockPadding = document.querySelectorAll('.lock__padding');
    let unlock = true;
    const timeout = 800;

    if (popupLinks.length > 0) {
        for (let i = 0; i < popupLinks.length; i++) {
            const popupLink = popupLinks[i];
            popupLink.addEventListener('click', function (e) {
                const popupName = popupLink.getAttribute('href').replace('#', '');
                const currentPopup = document.getElementById(popupName);
                popupOpen(currentPopup);
                e.preventDefault()
            })
        }
    }
// Popup Close Icon ===================
    const popupCloseIcon = document.querySelectorAll('.close-popup');
    if (popupCloseIcon.length > 0) {
        for (let i = 0; i < popupCloseIcon.length; i++) {
            const el = popupCloseIcon[i];
            el.addEventListener('click', function (e) {
                popupClose(el.closest('.popup'));
                e.preventDefault();
            })
        }
    }
// Popup open ======================
    function popupOpen(currentPopup) {
        if (currentPopup && unlock) {
            const popupActive = document.querySelector('.popup.open');
            if (popupActive) {
                popupClose(popupActive, false);
            } else {
                bodyLock();
            }
            currentPopup.classList.add('open');
            currentPopup.addEventListener('click', function (e) {
                if (!e.target.closest('.popup__content')) {
                    popupClose(e.target.closest('.popup'))
                }
            })
        }
    }
// Popup close ======================
    function popupClose(popupActive, doUnlock = true) {
        if (unlock) {
            popupActive.classList.remove('open');
            if (doUnlock) {
                bodyUnlock();
            }
        }
    }
//Body lock ========================
    function bodyLock() {
        const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
        if (lockPadding.length > 0) {
            for (let i = 0; i < lockPadding.length; i++) {
                const el = lockPadding[i];
                el.style.paddingRight = lockPaddingValue;
            }
            body.style.paddingRight = lockPaddingValue;
            body.classList.add('lock');

            unlock = false;
            setTimeout( function () {
                unlock = true;
            }, timeout)
        }
    }
// Body unlock ======================
    function bodyUnlock() {
        setTimeout(function () {
            if (lockPadding.length > 0) {
                for (let i = 0; i < lockPadding.length; i++) {
                    const el = lockPadding[i];
                    el.style.paddingRight = '0px';
                }
            }
            body.style.paddingRight = '0px';
            body.classList.remove('lock');
        }, timeout);

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, timeout)
    }

    document.addEventListener('keydown', function (e) {
        if (e.which === 27) {
            const popupActive = document.querySelector('.popup.open');
            popupClose(popupActive);
        }
    })
}
popup();

// Swiper
const swiper = new Swiper('.swiper', {
    // Optional parameters
    speed: 800,
    loop: true,
    grabCursor: true,
    lazy: true,
    autoHeight: true,
    effect: 'creative',

    creativeEffect: {
        prev: {
            shadow: true,
            translate: ["-20%", 0, -1],
        },
        next: {
            translate: ["100%", 0, 0],
        },
    },



    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
    },
});
swiper()


