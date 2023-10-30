// Burger menu
function editNav() {
  const myTopnav = document.getElementById("myTopnav")
  const myBurgerIcon = document.querySelector(".myBurgerIcon")
  const myBody = document.body
  if (myTopnav.className === "topnav") {
    myTopnav.classList.add("responsive")
    myBurgerIcon.classList.add("active")
    myBody.classList.add("noScroll")
  } else {
    myTopnav.classList.remove("responsive")
    myBurgerIcon.classList.remove("active")
    myBody.classList.remove("noScroll")
  }
}

// DOM Elements
const modalBody = document.querySelector('.modal-body')
const modalbg = document.querySelector(".bground")
const modalBtn = document.querySelectorAll(".modal-btn")
const modalBtnClose = document.querySelector(".bground .close")
const signupForm = document.getElementById('signupForm')

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal))

// launch modal form
function launchModal() {
  modalbg.style.display = "flex"
}

// close modal event
modalBtnClose.addEventListener('click', closeModal)

// close modal form
function closeModal() {
  modalbg.style.display = "none"
}

// display or hide error message
function handleErrorMessage(label, message, statement) {
  const nameNode = document.getElementById(`${label}`)
  const nameNodeParent = nameNode.parentNode

  if(statement === "error") {
    nameNodeParent.dataset.error = message
    nameNodeParent.dataset.errorVisible="true"
  }else{
    nameNodeParent.removeAttribute('data-error')
    nameNodeParent.removeAttribute('data-error-visible')
  }
}

// check firstname and lastname value
function checkFormName(label, value) {
  if (value.trim().length >= 2) {
    handleErrorMessage(label)
    return true
  }

  const message = "Veuillez entrer 2 caractères ou plus."
  handleErrorMessage(label, message, "error")
  return false
}

// check email value
function checkFormEmail(email) {
  const pattern = /^[\w._-]+@[\w._-]+\.[\w._-]+/
  const regex = new RegExp(pattern)
  const testEmail = regex.test(email)
  if(testEmail) {
    handleErrorMessage('email')
    return true
  }

  const message = 'L\'adresse email doit être valide.'
  handleErrorMessage('email', message, "error")
  return false
}

// check birthdate value
function checkFormBirthdate(birthdate) {
  const pattern = /\d{2,4}\-\d{1,2}\-\d{1,2}/
  const regex = new RegExp(pattern)
  const testBirthdate = regex.test(birthdate)
  if (testBirthdate) {
    handleErrorMessage('birthdate')
    return true
  }

  const message = 'Indiquez votre date de naissance.'
  handleErrorMessage('birthdate', message, "error")
  return false
}

// check quantity value
function checkFormQuantity(quantity) {
  const pattern = /\d{1,2}/
  const regex = new RegExp(pattern)
  const testQuantity = regex.test(quantity)
  if (testQuantity && (quantity >= 0 && quantity <= 99)) {
    handleErrorMessage('quantity')
    return true
  }

  const message = 'Veuillez entrer un nombre entre 0 et 99.'
  handleErrorMessage('quantity', message, "error")
  return false
}

// check location value
function checkFormLocation(location) {
  if (location !== null) {
    handleErrorMessage('location1')
    return true
  }

  const message = 'Veuillez sélectionner un tournoi svp.'
  handleErrorMessage("location1", message, "error")
  return false
}

// check term conditions value
function checkFormCondition(condition) {
  if (condition === 'on') {
    handleErrorMessage("checkbox1")
    return true
  }

  const message = 'Veuillez accepter les termes et conditions svp.'
  handleErrorMessage("checkbox1", message, "error")
  return false
}

function registeredMessage() {
  signupForm.style.display = "none"
  modalBody.insertAdjacentHTML("beforeend", `
    <div class="form-confirmation">
      <p class="msg-confirmation">Merci pour<br> votre inscription</p>
      <button class="btn-submit button btn-close-form">Fermer</button>
    </div>
  `)
}

function endingForm() {
  closeModal()
  const modalConfirmation = document.querySelector('.form-confirmation')
  modalConfirmation.remove()
  signupForm.reset()
  signupForm.removeAttribute('style')
}

// signup form checking data
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const formData = new FormData(signupForm)
  // const values = [...formData.entries()]
  // console.log('values: ', values)

  const firstname = checkFormName("first", formData.get("first"))
  const lastname = checkFormName("last", formData.get("last"))
  const email = checkFormEmail(formData.get("email"))
  const birthdate = checkFormBirthdate(formData.get("birthdate"))
  const quantity = checkFormQuantity(formData.get("quantity"))
  const location = checkFormLocation(formData.get("location"))
  const checkbox1 = checkFormCondition(formData.get("checkbox1"))

  const valideForm = firstname && lastname && email && birthdate && quantity && location && checkbox1
  if (valideForm) {
    console.log('Merci pour votre inscription!')
    registeredMessage()
    const modalConfirmationBtnClose = document.querySelector('.btn-close-form')
    modalConfirmationBtnClose.addEventListener('click', endingForm)
  } else {
    console.log("Le formulaire contient des erreurs!")
  }
})