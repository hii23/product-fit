let swiperPartners = new Swiper('.swiper', {
    navigation: {
        nextEl: '.partners__union_right',
        prevEl: '.partners__union_left',
    },
    watchOverflow: true,
    breakpoints: {
        1366: {
            slidesPerView: 5,
            spaceBetween: 10,

        },
        1200: {
            slidesPerView: 4,
            spaceBetween: 10
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 10
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 10
        },
        675: {
            slidesPerView: 1,
            spaceBetween: 20
        },
    },

});

const navigationDisable = (slider, leftBtn, rightBtn, stopStyle) => {
    let stop = 0;
    slider.on('realIndexChange', function (e) {
        if (stop == 2) {
            document.querySelector(`.${leftBtn}`).classList.remove(stopStyle);
            document.querySelector(`.${rightBtn}`).classList.remove(stopStyle);
            stop = false;
        }
        slider.on('reachEnd', function () {
            document.querySelector(`.${rightBtn}`).classList.add(stopStyle)
            stop = 1;
        });
        slider.on('reachBeginning', function () {
            document.querySelector(`.${leftBtn}`).classList.add(stopStyle)
            stop = 1;
        });
        if (stop == 1) {
            stop++
        }

    })

}
const sliderAction = document.querySelector('.action__swiper');
let swiperAction;

function mobileSliderAction() {
    if (window.innerWidth <= 1280) {

        swiperAction = new Swiper(sliderAction, {
            spaceBetween: 48,
            centeredSlides: true,
            autoplay: {
                delay: 3000,
            },
            loop: true,
            slidesPerView: 'auto',
            slideClass: 'action__item',
            wrapperClass: 'action__wrapper',
            navigation: {
                nextEl: ".partners__right",
                prevEl: ".partners__left",
            },
        })

    }

    if (window.innerWidth > 1280) {
        if (sliderAction.classList.contains('swiper-initialized')) {
            swiperAction.destroy();
        }
    }
}
const sliderProject = document.querySelector('.project__swiper');
let swiperProject;

function mobileSliderProject() {
    if (window.innerWidth <= 800) {

        swiperProject = new Swiper(sliderProject, {
            spaceBetween: 48,
            centeredSlides: true,
            loop: true,

            slidesPerView: 'auto',
            slideClass: 'project__item',
            wrapperClass: 'project__items',
            navigation: {
                nextEl: ".project__union_right",
                prevEl: ".project__union_left",
            },
        })

    }
    if (window.innerWidth > 800) {
        if (sliderProject.classList.contains('swiper-initialized')) {
            swiperProject.destroy();
        }
    }
}


navigationDisable(swiperPartners, 'partners__union_left', 'partners__union_right', 'partners__union_stop')


const sliderSkills = document.querySelector('.skills__inner');
let swiperSkills;

function mobileSliderSkills() {
    if (window.innerWidth <= 1280) {

        swiperSkills = new Swiper(sliderSkills, {
            spaceBetween: 48,
            centeredSlides: true,
            autoplay: {
                delay: 3000,
            },
            loop: true,
            slidesPerView: 'auto',
            slideClass: 'skills__box',
            wrapperClass: 'skills__items',
        })

    }

    if (window.innerWidth > 1280) {
        if (sliderSkills.classList.contains('swiper-initialized')) {
            swiperSkills.destroy();
        }
    }
}

mobileSliderSkills();
mobileSliderProject();
mobileSliderAction();
window.onresize = () => {
    mobileSliderProject();
    mobileSliderAction();
    mobileSliderSkills();
    if (window.innerWidth <= 920) {
        document.getElementById("logo").src = "images/logo-mobile.svg";
    } else {
        document.getElementById("logo").src = "images/logo.svg";
    }
}