const allItems = require("./dataModel").allItems

const checkString = (item, text) => {
  if (text) {
    if (item.name.toLowerCase().includes(text)) {
      return true
    }
    if (item.description && item.description.toLowerCase().includes(text)) {
      return true
    }
    return false
  }
  return true
}

const checkFeature = (f1, f2) => {
  if (f1.name === f2.name) {
    return (
      (f1.valueNum && f2.valueNum === f1.valueNum) ||
      (f1.valueString && f2.valueString === f1.valueString) ||
      (f1.valueDate && f2.valueDate === f1.valueDate)
    )
  }
  return false
}

const checkFeatures = (item, features) => {
  if (features) {
    return (
      features.filter((f) => {
        return (
          item.features.filter((ifeature) => checkFeature(ifeature, f)).length >
          0
        )
      }).length > 0
    )
  }
  return true
}

const filterItems = (args) => {
  const textFilter =
    args.filter && args.filter.searchText
      ? args.filter.searchText.toLowerCase()
      : null
  const features = args.filter && args.filter.features
  return args.filter
    ? allItems.filter(
        (item) => checkString(item, textFilter) && checkFeatures(item, features)
      )
    : allItems
}

module.exports = filterItems
