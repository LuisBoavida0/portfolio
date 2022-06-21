startTemplate = {
}

eventsToUse = [
    ['aboutMeDiv', 'click', showContent, ["contentAboutMe", "about-me"]],
    ['myWorkDiv', 'click', showContent, ["contentMyWork", "my-work"]],
    ['contactsDiv', 'click', showContent, ["contentContacts", "contacts"]],
    ['returnAboutMeBtn', 'click', returnFromContent, ["contentAboutMe", "about-me"]],
    ['returnMyWorkBtn', 'click', returnFromContent, ["contentMyWork", "my-work"]],
    ['returnContactsBtn', 'click', returnFromContent, ["contentContacts", "contacts"]]
]

function showContent(e, target, targetClass) {
    elem.contentsDiv.classList.add(targetClass)
    setTimeout(() => { elem[target].classList.add("show") }, 1000)
}

function returnFromContent(e, target, targetClass) {
    elem[target].classList.remove("show")
    setTimeout(() => { elem.contentsDiv.classList.remove(targetClass) }, 1000)
}

import './homeScrollAnimations'