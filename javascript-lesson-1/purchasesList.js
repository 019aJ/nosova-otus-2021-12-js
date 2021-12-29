/*
Написать функцию maxItemAssociation(), получающую исторические данные покупок пользователей и возвращающую максимальный список рекомендаций.
Входные данные - массив исторических покупок пользователей [["a", "b"], ["a", "c"], ["d", "e"]]. 
Надо найти максимальную группу рекомендаций. Группа рекомендаций - это продукты, 
которые был куплены другими пользователями при условии, если они пересекаются с исходным списком.
Если количество рекомендаций в группах одинаковое - вернуть первую группу из отсортированных в лексикографическом порядке.
*/

function maxItemAssociation(purchases, minSupportValue = 1) {
    if (!purchases || purchases.length === 0) {
        return []
    }
    /*FP Tree algorithm*/
    //1. frequency of each individual item
    const frequency = fillFrequency(purchases)
    const purchasesWithFrequency = addFrequencyToPurchases(purchases, frequency)
    //2. order items in every transaction in frequency descending order and items with support lesser than minimum support eliminated.
    const sortedPurchases = sortPurchases(eliminatePurchases(purchasesWithFrequency, minSupportValue))
    //3. build FP-Tree
    const fpTreeRoot = fpTree(sortedPurchases)
    //4. get max set
    const set = maxSet(fpTreeRoot)
    const names = []
    setToArray(set, names)
    return names.sort((a, b) => a.localeCompare(b))
}

function fillFrequency(purchases) {
    const frequency = {}
    purchases.forEach(userPurchases => {
        if (userPurchases) {
            userPurchases.forEach(purchase => {
                if (!frequency[purchase]) {
                    frequency[purchase] = 1
                }
                else {
                    frequency[purchase] += 1
                }
            })
        }
    });
    const result = Object.keys(frequency).map(key => {
        return { name: key, frequency: frequency[key] }
    })
    return result
}

function sortDesc(frequency) {
    return frequency.sort((a, b) => a.frequency < b.frequency ? 1 : a.frequency > b.frequency ? -1 : a.name.localeCompare(b.name))
}

function addFrequencyToPurchases(purchases, frequency) {
    return purchases.map(userPurchases => userPurchases.map(purchase => frequency.filter(x => x.name === purchase)[0]))
}

function eliminatePurchases(purchases, minSupportValue = 1) {
    if (minSupportValue > 1) {
        return purchases.map(userPurchases => userPurchases.filter(p => p.frequency >= minSupportValue))
            .filter(x => x && x.length > 0)
    }
    return purchases
}

function sortPurchases(purchases) {
    return purchases.map(userPurchases => sortDesc(userPurchases))
}

function findParent(fpTreeRoot, userPurchases, index) {
    const filtered = fpTreeRoot.children.filter(child => child.element.name === userPurchases[index].name)
    if (filtered.length > 0) {
        filtered[0].counter += 1
        return findParent(filtered[0], userPurchases, ++index)
    }
    return { currentFpTreeNode: fpTreeRoot, startIndex: index }
}

function fpTree(purchases) {
    fpTreeRoot = { element: null, children: [], counter: 1 }
    purchases.forEach(userPurchases => {
        let { currentFpTreeNode, startIndex } = findParent(fpTreeRoot, userPurchases, 0)
        for (let index = startIndex; index < userPurchases.length; index++) {
            const element = userPurchases[index]
            const fpTreeNode = { element: element, children: [], counter: 1 }
            currentFpTreeNode.children.push(fpTreeNode)
            currentFpTreeNode = fpTreeNode
        }
    })
    return fpTreeRoot
}

function calcChild(node, count) {
    let cnt = count = node.children.length
    node.children.forEach(element => {
        cnt += calcChild(element, 0)
    });
    return cnt
}

function maxSet(fpTreeRoot) {
    //группы это дочерние узлы к корню + то что ниже их
    if (!fpTreeRoot.children || fpTreeRoot.children.length === 0) {
        return null
    }
    let maxLength = 0
    let maxGroupRoot = fpTreeRoot.children[0]
    fpTreeRoot.children.forEach(element => {
        const cnt = calcChild(element, 0)
        if (cnt > maxLength) {
            maxLength = cnt
            maxGroupRoot = element
        }
    });
    return maxGroupRoot
}

function setToArray(node, array) {
    if (!array.includes(node.element.name)) {
        array.push(node.element.name)
    }
    node.children.forEach(child => {
        setToArray(child, array)
    })
}

///////TEST

const input1 = [["f", "a", "c", "d", "g", "i", "m", "p"],
["a", "b", "c", "f", "l", "m", "o"],
["b", "f", "h", "j", "o"],
["b", "c", "k", "s", "p"],
["a", "f", "c", "e", "l", "p", "m", "n"]] //-->['a', 'b', 'c', 'd', 'e', 'f', 'g', 'i', 'k', 'l', 'm', 'n', 'o', 'p', 's']
const input2 = [["a", "b"], ["a", "c"], ["d", "e"]] //-->['a', 'b', 'c']
const input3 = [["q", "w", 'a'], ["a", "b"], ["a", "c"], ["q", "e"], ["q", "r"]] //-->['a', 'b', 'c', 'q', 'w']
const input4 = [["a"], ["c"], ["b"]]//-->['a']

console.log(maxItemAssociation([]))
console.log(maxItemAssociation(input1))
console.log(maxItemAssociation(input2))
console.log(maxItemAssociation(input3))
console.log(maxItemAssociation(input4))