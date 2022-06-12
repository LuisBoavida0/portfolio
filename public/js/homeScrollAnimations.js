startTemplate = {
}

eventsToUse = [
]

let currAnimation = -1
let elementsAnimation = {}
let readyForTransition = false
window.onload = function () {
    elementsAnimation = [
        {
            elem: elem.contentTeste,
            class: "show",
            next: 'next'
        },
        {
            elem: elem.contentTeste2,
            class: "show",
            next: 'next'
        },
        {
            elem: elem.contentTeste3,
            class: "show",
            next: 'next'
        },
    ]

    nextSlide()
    setInterval(() => {
        readyForTransition = true
    }, 1000);
}

const nextSlide = () => {
    if (elementsAnimation.length - 1 === currAnimation) return

    if (currAnimation > -1) {
        elementsAnimation[currAnimation].elem.classList.remove(elementsAnimation[currAnimation].class)
        elementsAnimation[currAnimation].elem.classList.add(elementsAnimation[currAnimation].next)
    }
    currAnimation += 1
    elementsAnimation[currAnimation].elem.classList.add(elementsAnimation[currAnimation].class)
}

const prevSlide = () => {
    if (1 > currAnimation) return

    if (currAnimation > -1) elementsAnimation[currAnimation].elem.classList.remove(elementsAnimation[currAnimation].class)
    currAnimation -= 1
    elementsAnimation[currAnimation].elem.classList.add(elementsAnimation[currAnimation].class)
    elementsAnimation[currAnimation].elem.classList.remove(elementsAnimation[currAnimation].next)
}

const elementShownByScroll = (element, deltaY) => {
    var hT = element.offsetTop,
        hH = element.offsetHeight,
        wH = window.innerHeight,
        wS = window.scrollY + deltaY;
    if ((wS > (hT + hH - wH)) && window.scrollY < (hT + hH)) {
        console.log("scrolledTo")
    }
}

window.onwheel = function (e) {
    //elementShownByScroll(elem.contentTeste4, e.deltaY)

    if (!readyForTransition) return

    if (e.deltaY < 0) prevSlide()
    else nextSlide()

    readyForTransition = false
}