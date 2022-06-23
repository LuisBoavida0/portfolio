let elementsAnimation = []

window.onload = function () {
    elem.contentAboutMe.style.display = "block"
    elem.contentMyWork.style.display = "block"
    elem.contentContacts.style.display = "block"
    elementsAnimation = elem.myWorks.children
    setInterval(() => {
        readyForTransition = true
    }, 1000);
}

function isVisible (ele, e) {
    const { top, bottom } = ele.getBoundingClientRect();
    return ( Math.abs(((top + bottom) / 2) - ((window.innerHeight + e.deltaY) / 2)) < 100)
}

window.onwheel = function (e) {
    elementsAnimation[elementsAnimation.length - 3].classList.add("bg-primary")
    if (isVisible(elementsAnimation[elementsAnimation.length - 3], e))
        console.log("qqqq")
}