/* ==========================================================
   CENTRO SOCIALE DI DOGANA
   App Core v2
   ========================================================== */

"use strict";

/* ==========================================================
   Helpers
   ========================================================== */

const $ = (selector, context = document) => context.querySelector(selector);

const $$ = (selector, context = document) =>
    [...context.querySelectorAll(selector)];

/* ==========================================================
   Scroll Header
   ========================================================== */

function initAnchorLinks() {

    $$('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const target = $(link.getAttribute("href"));

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });

}

/* ==========================================================
   Reveal
   ========================================================== */

function initReveal() {

    const items = $$("section");

    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-visible");

            observer.unobserve(entry.target);

        });

    }, {
        threshold: 0.15
    });

    items.forEach(section => observer.observe(section));

}

/* ==========================================================
   Init
   ========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    document.documentElement.classList.add("js");

    initAnchorLinks();
    initReveal();

});
