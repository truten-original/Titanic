import { getCorrectAge, getElements, getPersonModify } from './utils'
import { baseurl } from './constants'
import './styles.css'

let passengersArr = []
let currentVisibleArr = []
let startIndex = 0
let lastIndex = 50
const { table, observeEl, form, search, reset } = getElements()

const renderPassengers = (data) => {
  table.innerHTML = ''
  data.forEach((item) => {
    const row = document.createElement('tr')
    row.classList.add(getPersonModify(item.survived))
    row.innerHTML = `
    <td class='table__item'>${item.name}</td>
    <td>${item.gender}</td>
    <td>${getCorrectAge(item.age)}</td>
    <td>${item.survived ? 'alive' : 'dead'}</td>
    <td>${item.ticket}</td>
  `
    table.appendChild(row)
  })
}
const options = {
  threschold: 0.25,
}
const observer = new IntersectionObserver((e) => {
  if (e[0].isIntersecting) {
    startIndex = lastIndex
    lastIndex += 50
    currentVisibleArr = [
      ...currentVisibleArr,
      ...passengersArr.slice(startIndex, lastIndex),
    ]
    renderPassengers(currentVisibleArr)
  }
}, options)

const loadData = () => {
  fetch(baseurl)
    .then((res) => res.json())
    .then((data) => {
      passengersArr = data
      currentVisibleArr = passengersArr.slice(startIndex, lastIndex)
      renderPassengers(currentVisibleArr)
      observer.observe(observeEl)
    })
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const searchText = search.value.toLowerCase()
  const filteredPassengers = passengersArr.filter((p) => {
    return (
      p.name.toLowerCase().includes(searchText) ||
      p.gender.toLowerCase().includes(searchText) ||
      p.age.toString().includes(searchText) ||
      (p.survived ? 'alive' : 'dead').includes(searchText)
    )
  })
  table.innerHTML = ''
  renderPassengers(filteredPassengers)
  observer.unobserve(observeEl)
})

reset.addEventListener('click', () => {
  table.innerHTML = ''
  renderPassengers(currentVisibleArr)
  search.value = ''
  observer.observe(observeEl)
})

loadData()
