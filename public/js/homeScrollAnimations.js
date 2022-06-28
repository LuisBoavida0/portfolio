let elementsAnimation = []

window.onload = function () {
    elem.contentAboutMe.style.display = "block"
    elem.contentMyWork.style.display = "block"
    elementsAnimation = elem.myWorks.children
    setInterval(() => {
        readyForTransition = true
    }, 1000);
}

function isVisible (ele, e) {
    const { top, bottom } = ele.getBoundingClientRect();
    return ( Math.abs(((top + bottom) / 2) - ((window.innerHeight + e.deltaY) / 2)) < 100)
}

let currAnimation = 0
window.onwheel = function (e) {
    for (let i = 0; i < elementsAnimation.length; i++) {
        if (currAnimation != i && isVisible(elementsAnimation[i], e)) {
            var audio = new Audio('img/audio.wav');
            audio.volume = 0.2;
            audio.play();
            elementsAnimation[currAnimation].querySelector('p').classList.remove('show')
            currAnimation = i
            elementsAnimation[i].querySelector('p').classList.add('show')
            console.log(elementsAnimation[i].querySelector('input').value)
            elem.workGif.src = "img/" + elementsAnimation[i].querySelector('input').value
            return
        }
    }
}