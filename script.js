/* =====================================================
   GURLEEN — INTERACTIVE CONFESSION
   ===================================================== */


/* =====================================================
   BASIC ELEMENTS
===================================================== */

const pages = [
    document.getElementById("page-intro"),
    document.getElementById("page-garden"),
    document.getElementById("page-memory"),
    document.getElementById("page-rizz"),
    document.getElementById("page-lotus"),
    document.getElementById("page-proposal")
];

const backgrounds = [
    document.querySelector(".layer-intro"),
    document.querySelector(".layer-garden"),
    document.querySelector(".layer-memory"),
    document.querySelector(".layer-rizz"),
    document.querySelector(".layer-lotus"),
    document.querySelector(".layer-proposal")
];

const progressDots =
    document.querySelectorAll(".progress-dot");

const backButton =
    document.getElementById("backButton");

let currentPage = 0;


/* =====================================================
   BACKGROUND START
===================================================== */

backgrounds[0].classList.add("active");


/* =====================================================
   PAGE NAVIGATION
===================================================== */

function goToPage(number) {

    if (number < 0 || number >= pages.length) {
        return;
    }

    const oldPage = pages[currentPage];
    const newPage = pages[number];

    if (oldPage === newPage) {
        return;
    }

    oldPage.classList.remove("active");
    oldPage.classList.add("leaving");

    setTimeout(() => {
        oldPage.classList.remove("leaving");
    }, 900);


    newPage.classList.add("active");


    /* Change background */

    backgrounds.forEach((background, index) => {

        background.classList.toggle(
            "active",
            index === number
        );

    });


    /* Progress */

    progressDots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === number
        );

    });


    currentPage = number;


    /* Back button */

    if (currentPage === 0) {

        backButton.classList.add("hidden");

    } else {

        backButton.classList.remove("hidden");

    }

}


/* =====================================================
   BACK BUTTON
===================================================== */

backButton.addEventListener("click", () => {

    if (currentPage > 0) {
        goToPage(currentPage - 1);
    }

});


/* =====================================================
   PAGE 1 → PAGE 2
===================================================== */

const startButton =
    document.getElementById("startButton");

startButton.addEventListener("click", () => {

    createPetalBurst(
        window.innerWidth / 2,
        window.innerHeight / 2,
        20
    );

    goToPage(1);

});


/* =====================================================
   GARDEN FLOWERS
===================================================== */

const flowers =
    document.querySelectorAll(".flower-object");

const gardenMessage =
    document.getElementById("gardenMessage");

const gardenNext =
    document.getElementById("gardenNext");

let foundLotus = false;


flowers.forEach((flower) => {

    flower.addEventListener("click", () => {

        const type =
            flower.dataset.flower;


        /* LILY */

        if (type === "lily") {

            gardenMessage.innerHTML =
                "Beautiful choice... but this one isn't hiding the secret. 🌷";

            flower.style.transform =
                "translateY(-8px) rotate(-3deg)";

        }


        /* WHITE FLOWER */

        else if (type === "white") {

            gardenMessage.innerHTML =
                "Almost... I think another flower wants your attention. ✨";

            flower.style.transform =
                "translateY(-8px) rotate(3deg)";

        }


        /* LOTUS */

        else if (type === "lotus") {

            foundLotus = true;

            flower.style.transform =
                "translateX(-50%) translateY(-15px) scale(1.08)";

            gardenMessage.innerHTML =
                "You found it. I had a feeling you'd choose the lotus. 🪷";

            createPetalBurst(
                window.innerWidth / 2,
                window.innerHeight / 2,
                15
            );

            gardenNext.classList.remove("hidden");

        }

    });

});


/* =====================================================
   GARDEN → MEMORY
===================================================== */

gardenNext.addEventListener("click", () => {

    if (!foundLotus) {
        return;
    }

    goToPage(2);

});


/* =====================================================
   MEMORY CARDS
===================================================== */

const memoryCards =
    document.querySelectorAll(".memory-card");

const memoryMessage =
    document.getElementById("memoryMessage");

const memoryNext =
    document.getElementById("memoryNext");

let openedCards = 0;


memoryCards.forEach((card) => {

    card.addEventListener("click", () => {

        if (card.classList.contains("opened")) {
            return;
        }

        card.classList.add("opened");

        openedCards++;

        memoryMessage.textContent =
            card.dataset.message;


        if (openedCards >= 3) {

            memoryNext.classList.remove("hidden");

        }

    });

});


/* =====================================================
   MEMORY → RIZZ
===================================================== */

memoryNext.addEventListener("click", () => {

    if (openedCards < 3) {
        return;
    }

    goToPage(3);

    startRizz();

});


/* =====================================================
   RIZZ SEQUENCE
===================================================== */

const rizzLine =
    document.getElementById("rizzLine");

const rizzButton =
    document.getElementById("rizzButton");


const rizzLines = [

    "I tried to find the perfect words...",

    "Then I realized something.",

    "The perfect words probably don't exist.",

    "Because how do you perfectly describe someone who makes you smile?",

    "So I'll just be honest.",

    "I really, really like you. ♡"

];


let rizzIndex = 0;


function startRizz() {

    rizzIndex = 0;

    rizzLine.textContent =
        rizzLines[0];

    rizzButton.innerHTML =
        `<span>Tell me more</span>
         <span class="button-arrow">→</span>`;

}


rizzButton.addEventListener("click", () => {

    rizzIndex++;


    if (rizzIndex < rizzLines.length) {

        rizzLine.style.animation = "none";

        void rizzLine.offsetWidth;

        rizzLine.style.animation =
            "rizzIn .8s ease";

        rizzLine.textContent =
            rizzLines[rizzIndex];

    }


    else {

        rizzButton.innerHTML =
            `<span>One last thing...</span>
             <span class="button-arrow">→</span>`;

        rizzButton.onclick = () => {

            goToPage(4);

            resetRizzButton();

        };

    }

});


function resetRizzButton() {

    rizzButton.onclick = null;

    rizzIndex = 0;

    rizzButton.innerHTML =
        `<span>Continue</span>
         <span class="button-arrow">→</span>`;

}


/* =====================================================
   LOTUS
===================================================== */

const bigLotus =
    document.getElementById("bigLotus");

const lotusHint =
    document.getElementById("lotusHint");

const proposalButton =
    document.getElementById("proposalButton");

let lotusOpened = false;


bigLotus.addEventListener("click", () => {

    if (lotusOpened) {
        return;
    }

    lotusOpened = true;

    bigLotus.classList.add("open");

    lotusHint.textContent =
        "Something was waiting inside...";

    createPetalBurst(
        window.innerWidth / 2,
        window.innerHeight / 2,
        35
    );


    setTimeout(() => {

        lotusHint.textContent =
            "Ready?";

        proposalButton.classList.remove("hidden");

    }, 1200);

});


/* =====================================================
   LOTUS → PROPOSAL
===================================================== */

proposalButton.addEventListener("click", () => {

    if (!lotusOpened) {
        return;
    }

    goToPage(5);

});


/* =====================================================
   YES BUTTON
===================================================== */

const yesButton =
    document.getElementById("yesButton");

const successOverlay =
    document.getElementById("successOverlay");


yesButton.addEventListener("click", () => {

    /* Big celebration */

    createConfetti(160);

    createPetalBurst(
        window.innerWidth / 2,
        window.innerHeight / 2,
        100
    );


    /* Show success */

    setTimeout(() => {

        successOverlay.classList.add("show");

    }, 500);

});


/* =====================================================
   "I NEED SOME TIME"
===================================================== */

const maybeButton =
    document.getElementById("maybeButton");

const proposalNote =
    document.getElementById("proposalNote");


maybeButton.addEventListener("click", () => {

    proposalNote.textContent =
        "Of course. Take all the time you need. 🌷";

    maybeButton.style.transform =
        "scale(.97)";

    setTimeout(() => {

        maybeButton.style.transform =
            "";

    }, 200);

});


/* =====================================================
   STARS
===================================================== */

const stars =
    document.getElementById("stars");

for (let i = 0; i < 130; i++) {

    const star =
        document.createElement("span");

    star.className = "star";

    star.style.left =
        Math.random() * 100 + "%";

    star.style.top =
        Math.random() * 70 + "%";

    const size =
        Math.random() * 2 + 1;

    star.style.width =
        size + "px";

    star.style.height =
        size + "px";

    star.style.animationDelay =
        Math.random() * 4 + "s";

    star.style.animationDuration =
        Math.random() * 3 + 2 + "s";

    stars.appendChild(star);

}


/* =====================================================
   FIREFLIES
===================================================== */

const fireflies =
    document.getElementById("fireflies");

for (let i = 0; i < 30; i++) {

    const firefly =
        document.createElement("span");

    firefly.className = "firefly";

    firefly.style.left =
        Math.random() * 100 + "%";

    firefly.style.top =
        25 + Math.random() * 65 + "%";

    firefly.style.animationDelay =
        Math.random() * 6 + "s";

    firefly.style.animationDuration =
        Math.random() * 5 + 5 + "s";

    fireflies.appendChild(firefly);

}


/* =====================================================
   PETAL BURST
===================================================== */

function createPetalBurst(x, y, amount) {

    const container =
        document.getElementById("petals");

    for (let i = 0; i < amount; i++) {

        const petal =
            document.createElement("span");

        petal.style.position =
            "absolute";

        petal.style.left =
            x + "px";

        petal.style.top =
            y + "px";

        petal.style.width =
            Math.random() * 8 + 5 + "px";

        petal.style.height =
            Math.random() * 12 + 8 + "px";

        petal.style.borderRadius =
            "80% 20% 80% 20%";

        petal.style.background =
            Math.random() > .5
                ? "#ffb7d5"
                : "#ffd8e8";

        petal.style.boxShadow =
            "0 0 10px rgba(255,170,210,.5)";

        petal.style.transform =
            "rotate(" +
            Math.random() * 360 +
            "deg)";

        petal.style.transition =
            "transform 1.8s ease-out, opacity 1.8s ease-out";

        container.appendChild(petal);


        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            100 + Math.random() * 350;

        const endX =
            Math.cos(angle) * distance;

        const endY =
            Math.sin(angle) * distance;


        requestAnimationFrame(() => {

            petal.style.transform =
                `translate(${endX}px, ${endY}px)
                 rotate(${Math.random() * 720}deg)`;

            petal.style.opacity =
                "0";

        });


        setTimeout(() => {

            petal.remove();

        }, 2000);

    }

}


/* =====================================================
   CONFETTI
===================================================== */

function createConfetti(amount) {

    const container =
        document.getElementById("confetti");

    const symbols = [
        "✦",
        "♡",
        "✧",
        "❀",
        "•"
    ];

    for (let i = 0; i < amount; i++) {

        const piece =
            document.createElement("span");

        piece.className =
            "confetti-piece";

        piece.textContent =
            symbols[
                Math.floor(
                    Math.random() * symbols.length
                )
            ];

        piece.style.left =
            Math.random() * 100 + "%";

        piece.style.fontSize =
            Math.random() * 10 + 8 + "px";

        piece.style.color =
            [
                "#ffd0df",
                "#ffe7a7",
                "#ffffff",
                "#f7a9c4"
            ][
                Math.floor(Math.random() * 4)
            ];

        piece.style.animationDelay =
            Math.random() * 1.2 + "s";

        piece.style.animationDuration =
            Math.random() * 2 + 3 + "s";

        container.appendChild(piece);


        setTimeout(() => {

            piece.remove();

        }, 5500);

    }

}


/* =====================================================
   MOUSE PARALLAX
===================================================== */

document.addEventListener(
    "mousemove",
    (event) => {

        const x =
            event.clientX / window.innerWidth - .5;

        const y =
            event.clientY / window.innerHeight - .5;


        document
            .querySelectorAll(".page.active")
            .forEach((page) => {

                page.style.setProperty(
                    "--mouse-x",
                    `${x * 10}px`
                );

                page.style.setProperty(
                    "--mouse-y",
                    `${y * 10}px`
                );

            });

    }
);


/* =====================================================
   KEYBOARD NAVIGATION
===================================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            currentPage > 0
        ) {

            goToPage(currentPage - 1);

        }

    }
);


/* =====================================================
   INITIAL STATE
===================================================== */

goToPage(0);

console.log(
    "🌸 Gurleen experience loaded."
);