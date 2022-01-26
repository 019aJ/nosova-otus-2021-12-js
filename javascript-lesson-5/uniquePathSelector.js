// Написать алгоритм и функцию getPath(), находяющую уникальный css-селектор для элемента в документе.
// Уникальный селектор может быть использован document.querySelector() и возвращать исходный элемент.
// Так чтобы document.querySelectorAll(), вызванный с этим селектором, не должен находить никаких элементов, кроме исходного.

const escapeChars = (str) => { 
    return str ? str.replace(':', '\:') : str
}

const hasUniqueId = (elem) =>
    elem.id && document.querySelectorAll('#' + escapeChars(elem.id)).length === 1 ? elem.id : null

const hasUniqueTag = (elem) =>
    document.querySelectorAll(elem.tagName).length === 1 ? elem.tagName : null

const hasUniqueClass = (elem) => {
    if (elem.classList.length > 0) {
        const selector = [...elem.classList].map(name => '.' + name).join('')
        if (document.querySelectorAll(escapeChars(selector)).length === 1) {
            return selector
        }
    }
    return null
}

const selectorForElem = (elem) => { 
    let selector = elem.tagName
    if (elem.id) {
        selector += '#' + elem.id
    }
    if (elem.classList.length > 0) {
        selector += [...elem.classList].map(name => '.' + name).join('')
    }
}

const hasUniqueChar = (elem) => {
    let query = hasUniqueId(elem) || hasUniqueClass(elem) || hasUniqueTag(elem)
    if (!query && (elem.id || elem.classList.length > 0)) {
        let selector = selectorForElem(elem)
        if (document.querySelectorAll(escapeChars(selector)).length === 1) {
            return selector
        }
    }
    return query
}

const hasUniqueCharBtwnSibling = (elem, parentSelector) => {
    let selector = parentSelector + ' > ' + selectorForElem(elem)
    return document.querySelectorAll(escapeChars(selector)).length === 1 ? selector : null
}

const charByOrderNumber = (elem, parentSelector) =>
    `${parentSelector}  >  ${elem.tagName}:nth-child(${[...elem.parentNode.children].indexOf(elem) + 1})`

const getPath = (elem) => {
    if (elem instanceof HTMLElement) {
        if ((elem.parentNode === document.documentElement)) {
            return elem.tagName
        }
        if (document.contains(elem)) {
            let elemSelector = hasUniqueChar(elem)
            if (elemSelector) {
                return escapeChars(elemSelector)
            }
            const parentSelector = getPath(elem.parentNode)
            elemSelector = hasUniqueCharBtwnSibling(elem, parentSelector)
            return escapeChars(elemSelector ? elemSelector : charByOrderNumber(elem, parentSelector))
        }
        return null
    }
    throw 'parameter not a HTMLElement'
}

module.exports = getPath;