import { getStylePrice } from '../api/product'

export function queryStylePrice(list) {
  const styleList = []
  list.forEach(({
    style,
    styleNo,
  }) => {
    style.forEach(item => {
      styleList.push({
        styleNo,
        styleId: item.styleId,
        styleSize: item.styleSize,
      })
    })
  })
  return getStylePrice({
    styleList,
  })
}
