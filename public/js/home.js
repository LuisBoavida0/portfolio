startTemplate = {
}

eventsToUse = [
    ['aboutMeDiv', 'click', showContent, ["contentAboutMe", "about-me"]],
    ['myWorkDiv', 'click', showContent, ["contentMyWork", "my-work"]],
    ['returnAboutMeBtn', 'click', returnFromContent, ["contentAboutMe", "about-me"]],
    ['returnMyWorkBtn', 'click', returnFromContent, ["contentMyWork", "my-work"]],
    ['returnContactsBtn', 'click', returnFromContent, ["contentContacts", "contacts"]]
]

function showContent(e, target, targetClass) {
    currTarget = target
    elem.contentsDiv.classList.add(targetClass)
    setTimeout(() => { elem[target].classList.add("show") }, 1000)
}

function returnFromContent(e, target, targetClass) {
    elem[target].classList.remove("show")
    setTimeout(() => { elem.contentsDiv.classList.remove(targetClass) }, 1000)
}

import './homeScrollAnimations'