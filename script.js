/*==================================================
  SIHLE NAILS
  Luxury Nail Studio
  script.js
==================================================*/

"use strict";

/*==============================
SELECTORS
==============================*/

const header = document.querySelector(".header");
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const backToTop = document.querySelector(".back-to-top");
const loader = document.querySelector(".loader");
const cursor = document.querySelector(".cursor-glow");

const revealElements = document.querySelectorAll(
`
.section-header,
.hero-content,
.hero-image,
.info-card,
.service-card,
.gallery-item,
.why-card,
.price-card,
.testimonial-card,
.faq-item,
.tip-card,
.contact-card,
.map-card,
.cta-card,
.about-story,
.about-values,
.meet-artist,
.luxury-experience,
.about-stats
`
);

const faqItems = document.querySelectorAll(".faq-item");

const galleryImages = document.querySelectorAll(".gallery-item img");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox img");
const lightboxClose = document.querySelector(".lightbox-close");

const testimonialTrack = document.querySelector(".testimonial-track");
const testimonialCards = document.querySelectorAll(".testimonial-card");
const dots = document.querySelectorAll(".dot");

const buttons = document.querySelectorAll(
".primary-btn,.secondary-btn,.book-btn"
);

/*==============================
WINDOW LOAD
==============================*/

window.addEventListener("load", () => {

    setTimeout(() => {

        loader.style.opacity = "0";
        loader.style.visibility = "hidden";

    }, 700);

});

/*==============================
STICKY HEADER
==============================*/

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});

/*==============================
MOBILE MENU
==============================*/

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    menuBtn.classList.toggle("active");

});

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");
        menuBtn.classList.remove("active");

    });

});

/*==============================
SMOOTH SCROLL
==============================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if(target){

            target.scrollIntoView({

                behavior:"smooth",
                block:"start"

            });

        }

    });

});

/*==============================
SCROLL REVEAL
==============================*/

const revealObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add("active");

        }

    });

},{
    threshold:.15
});

revealElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});

/*==============================
BACK TO TOP
==============================*/

window.addEventListener("scroll",()=>{

    if(window.scrollY > 600){

        backToTop.classList.add("show");

    }else{

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click",()=>{

    window.scrollTo({

        top:0,
        behavior:"smooth"

    });

});

/*==============================
CUSTOM CURSOR
==============================*/

window.addEventListener("mousemove",(e)=>{

    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

});

document.querySelectorAll("a,button").forEach(item=>{

    item.addEventListener("mouseenter",()=>{

        cursor.style.width="42px";
        cursor.style.height="42px";

    });

    item.addEventListener("mouseleave",()=>{

        cursor.style.width="22px";
        cursor.style.height="22px";

    });

});

/*==============================
FAQ ACCORDION
==============================*/

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        faqItems.forEach(faq => {

            if (faq !== item) {

                faq.classList.remove("active");

            }

        });

        item.classList.toggle("active");

    });

});

/*==============================
GALLERY LIGHTBOX
==============================*/

galleryImages.forEach(image => {

    image.addEventListener("click", () => {

        lightbox.classList.add("active");

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        document.body.style.overflow = "hidden";

    });

});

lightboxClose.addEventListener("click", closeLightbox);

lightbox.addEventListener("click", e => {

    if (e.target === lightbox) {

        closeLightbox();

    }

});

document.addEventListener("keydown", e => {

    if (e.key === "Escape") {

        closeLightbox();

    }

});

function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}

/*==============================
TESTIMONIAL SLIDER
==============================*/

let currentSlide = 0;

function showSlide(index){

    testimonialTrack.style.transform =
    `translateX(-${index * 100}%)`;

    dots.forEach(dot=>dot.classList.remove("active"));

    dots[index].classList.add("active");

}

dots.forEach((dot,index)=>{

    dot.addEventListener("click",()=>{

        currentSlide=index;

        showSlide(currentSlide);

    });

});

setInterval(()=>{

    currentSlide++;

    if(currentSlide >= testimonialCards.length){

        currentSlide=0;

    }

    showSlide(currentSlide);

},5000);

/*==============================
BUTTON RIPPLE EFFECT
==============================*/

buttons.forEach(button => {

    button.addEventListener("click", function(e){

        const ripple = document.createElement("span");

        ripple.classList.add("ripple");

        const rect = this.getBoundingClientRect();

        const size = Math.max(rect.width, rect.height);

        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;

        ripple.style.left =
        `${e.clientX - rect.left - size / 2}px`;

        ripple.style.top =
        `${e.clientY - rect.top - size / 2}px`;

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        },700);

    });

});

/*==============================
FLOATING PARALLAX
==============================*/

const floatingElements = document.querySelectorAll(
".gradient-one, .gradient-two, .gradient-three, .floating-circle"
);

window.addEventListener("mousemove", e => {

    const x = (e.clientX / window.innerWidth - 0.5) * 18;
    const y = (e.clientY / window.innerHeight - 0.5) * 18;

    floatingElements.forEach((element,index)=>{

        const speed = (index + 1) * 0.18;

        element.style.transform =
        `translate(${x * speed}px, ${y * speed}px)`;

    });

});

/*==============================
SPARKLE GENERATOR
==============================*/

function createSparkle(){

    const sparkle = document.createElement("span");

    sparkle.style.position = "fixed";
    sparkle.style.left = Math.random() * 100 + "vw";
    sparkle.style.top = "100vh";

    sparkle.style.width = "6px";
    sparkle.style.height = "6px";

    sparkle.style.borderRadius = "50%";

    sparkle.style.pointerEvents = "none";

    sparkle.style.background = "#ffffff";

    sparkle.style.boxShadow =
    "0 0 10px #fff,0 0 22px #ffd8e8";

    sparkle.style.zIndex = "2";

    document.body.appendChild(sparkle);

    sparkle.animate(

        [

            {
                transform:"translateY(0) scale(.4)",
                opacity:0
            },

            {
                opacity:1,
                offset:.15
            },

            {
                transform:"translateY(-120vh) scale(1.2)",
                opacity:0
            }

        ],

        {

            duration:10000 + Math.random()*6000,

            easing:"linear"

        }

    ).onfinish = () => sparkle.remove();

}

setInterval(createSparkle,900);

/*==============================
END OF SCRIPT.JS
==============================*/