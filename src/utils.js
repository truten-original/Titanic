export const getCorrectAge = (age) => {
  if (age < 1) return Math.round(age * 12) + 'm.'
  return Math.trunc(age) + 'y.'
}

export const getPersonModify = (surv) =>
  surv ? 'table__row-survive' : 'table__row-dead'

export const getElements = () => {
  const search = document.querySelector('.search-form__input')
  const table = document.querySelector('.table__body')
  const form = document.querySelector('.search-form')
  const observeEl = document.querySelector('.observe')
  const reset = document.getElementById('reset')
  return { search, table, form, observeEl, reset }
}
