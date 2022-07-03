let elementsAnimation = []

window.onload = function () {
    elem.contentAboutMe.style.display = "block"
    elem.contentMyWork.style.display = "block"
    elementsAnimation = elem.myWorks.children

    elem.workGif.onclick = function() { window.open(elementsAnimation[0].querySelector('input').value, '_blank') }
    setInterval(() => {
        readyForTransition = true
    }, 1000);
}

function isVisible (ele) {
    const { top, bottom } = ele.getBoundingClientRect();
    return ( Math.abs(((top + bottom) / 2) - (window.innerHeight / 2)) < 100)
}

myWorkScroll = () => {
    for (let i = 0; i < elementsAnimation.length; i++) {
        if (currAnimation != i && isVisible(elementsAnimation[i])) {
            var audio = new Audio('img/audio.wav');
            audio.volume = 0.2;
            audio.play();
            elementsAnimation[currAnimation].querySelector('p').classList.remove('show')
            currAnimation = i
            elementsAnimation[i].querySelector('p').classList.add('show')
            console.log(elementsAnimation[i].querySelector('input').value)
            elem.workGif.src = elementsAnimation[i].querySelector('input').value
            elem.workGif.onclick = function() { window.open(elementsAnimation[i].querySelector('input').value, '_blank') }
            return
        }
    }
}

let currAnimation = 0