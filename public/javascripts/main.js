const discoverBtn = document.querySelector('.hero button')
const discoverContent = document.getElementById('about')
const toTopBtn = document.getElementById('to-top-btn')

if (discoverBtn) {
  discoverBtn.addEventListener('click', () => {
    const pos = discoverContent.getBoundingClientRect().top
    window.scrollTo({ top: pos })
  })
}

toTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0 })
})

window.addEventListener('scroll', () => {
  window.scrollY > window.innerHeight / 2 ? toTopBtn.classList.add('show-x') : toTopBtn.classList.remove('show-x')
})
