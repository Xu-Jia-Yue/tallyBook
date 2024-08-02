const useMoneyCount = (dataList) => {
  const pay = dataList
    .filter((item) => item.type === 'pay')
    .reduce((s, i) => s + i.money, 0)
  const income = dataList
    .filter((item) => item.type === 'income')
    .reduce((s, i) => s + i.money, 0)
  return {
    pay,
    income,
  }
}
export default useMoneyCount
