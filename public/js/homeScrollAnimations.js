let currAnimation = -1
let elementsAnimation = []
let readyForTransition = false

window.onload = function () {
    elem.contentAboutMe.style.display = "block"
    elem.contentMyWork.style.display = "block"
    elem.contentContacts.style.display = "block"
    elementsAnimation = elem.contentMyWork.children

    nextSlide()
    setInterval(() => {
        readyForTransition = true
    }, 1000);
}

const nextSlide = () => {
    if (elementsAnimation.length - 1 === currAnimation) return

    if (currAnimation > -1) {
        elementsAnimation[currAnimation].classList.remove("show")
        elementsAnimation[currAnimation].classList.add("next")
    }
    currAnimation += 1
    elementsAnimation[currAnimation].classList.add("show")
}

const prevSlide = () => {
    if (1 > currAnimation) return

    if (currAnimation > -1) elementsAnimation[currAnimation].classList.remove("show")
    currAnimation -= 1
    elementsAnimation[currAnimation].classList.add("show")
    elementsAnimation[currAnimation].classList.remove("next")
}

window.onwheel = function (e) {
    if (!readyForTransition) return

    if (e.deltaY < 0) prevSlide()
    else nextSlide()

    readyForTransition = false
}