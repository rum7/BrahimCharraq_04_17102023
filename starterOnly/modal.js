// Burger menu
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalBtnClose = document.querySelector(".bground .close");
const signupForm = document.getElementById('signupForm')

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
modalBtnClose.addEventListener('click', closeModal)

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// signup form checking data
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const formData = new FormData(signupForm)
  // const values = [...formData.entries()];
  // console.log('values: ', values)

  const firstname = checkFormName("first", formData.get("first"))
  const lastname = checkFormName("last", formData.get("last"))
  const email = checkFormEmail(formData.get("email"))
  const birthdate = checkFormBirthdate(formData.get("birthdate"))
  const quantity = checkFormQuantity(formData.get("quantity"))
  const location = checkFormLocation(formData.get("location"))
  const checkbox1 = checkFormCondition(formData.get("checkbox1"))
  // const checkbox2 = checkFormCondition(formData.get("checkbox2"))

  const valideForm = firstname && lastname && email && birthdate && quantity && location && checkbox1
  if (valideForm) {
    console.log('Merci de votre participation!')
    signupForm.reset()
  } else {
    console.log("Le formulaire contient des erreurs!")
  }
})

function handleErrorMessage(label, message) {
  console.log('label: ', label)
  console.log('message d\'erreur: ', message)
  console.log('----------------------------------')
}

function checkFormName(label, value) {
  if (value.trim().length >= 2) return true

  const message = "Veuillez entrer 2 caractères ou plus."
  handleErrorMessage(label, message)
  return false
}

function checkFormEmail(email) {
  const pattern = /^[\w._-]+@[\w._-]+\.[\w._-]+/
  const regex = new RegExp(pattern)
  const testEmail = regex.test(email)
  if(testEmail) return true

  const message = 'L\'adresse email doit être valide.'
  handleErrorMessage('email', message)
  return false
}

function checkFormBirthdate(birthdate) {
  const pattern = /\d{2,4}\-\d{1,2}\-\d{1,2}/
  const regex = new RegExp(pattern)
  const testBirthdate = regex.test(birthdate)
  if (testBirthdate) return true

  const message = 'Indiquez votre date de naissance.'
  handleErrorMessage('birthdate', message)
  return false
}

function checkFormQuantity(quantity) {
  const pattern = /\d{1,2}/
  const regex = new RegExp(pattern)
  const testQuantity = regex.test(quantity)
  if (testQuantity && (quantity >= 0 && quantity <= 99)) return true

  const message = 'Veuillez entrer un nombre entre 0 et 99.'
  handleErrorMessage('quantity', message)
  return false
}

function checkFormLocation(location) {
  if (location !== null) return true

  const message = 'Veuillez sélectionner un tournoi svp.'
  handleErrorMessage("location", message)
  return false
}

function checkFormCondition(condition) {
  if (condition === 'on') return true

  const message = 'Veuillez accepter les termes et conditions svp.'
  handleErrorMessage("checkbox1", message)
  return false
}