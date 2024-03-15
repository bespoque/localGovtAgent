const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const getDate = (date: any) => {
  let monthValue = month[new Date(date.replace(' ', 'T')).getMonth()].slice(
    0,
    3
  )
  let dateValue = new Date(date.replace(' ', 'T')).getDate()
  let yearValue = new Date(date.replace(' ', 'T')).getFullYear()

  return `${monthValue} ${dateValue}, ${yearValue}`
}
