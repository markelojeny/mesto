const obj = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__button-save',
    inactiveButtonSelector: 'form__button-save_inactive',
    errorForm: '.form__error',
    errorType: 'form__input_type_error',
    errorClass: 'form__error_active'
}

function checkInputValidity (inputElement, obj) {
  const isValid = inputElement.validity.valid;

  if (isValid) {
    hideInputError (inputElement, obj);
  } else {
    showInputError (inputElement, inputElement.validationMessage, obj);
  }
}

function showInputError (inputElement, errorMessage, obj) {
  const inputName = inputElement.getAttribute('name');
  const errorElement = document.getElementById(`${inputName}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorClass);
  inputElement.classList.add(obj.errorType);
}

function hideInputError (inputElement, obj) {
  const inputName = inputElement.getAttribute('name');
  const errorElement = document.getElementById(`${inputName}-error`);
  errorElement.textContent = "";
  errorElement.classList.remove(obj.errorClass);
  inputElement.classList.remove(obj.errorType);
}

function disabledButtonState (buttonElement, obj) {
  buttonElement.setAttribute("disabled", true);
  buttonElement.classList.add(obj.inactiveButtonSelector);
}

function unabledButtonState (buttonElement, obj) {
  buttonElement.removeAttribute("disabled");
  buttonElement.classList.remove(obj.inactiveButtonSelector);
}

function toggleButtonState (inputList, buttonElement, obj) {
  const hasNotValidInput = inputList.some(inputElement => !inputElement.validity.valid);

  if (hasNotValidInput) {
    disabledButtonState (buttonElement, obj)
  } else {
    unabledButtonState (buttonElement, obj)
  }
}

function setEventListener (formElement, obj) {
  formElement.addEventListener('submit', function (event) {
    event.preventDefault();
  })
  
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const submitButton = formElement.querySelector(obj.submitButtonSelector);
  toggleButtonState(inputList, submitButton, obj);
  
  inputList.forEach(function (inputElement) {
    inputElement.addEventListener('input', function () {
      checkInputValidity(inputElement, obj);
      toggleButtonState(inputList, submitButton, obj);
    })
  })
}

function enableValidation (obj) {
  const formList = document.querySelectorAll(obj.formSelector);
  formList.forEach(function (formElement) {
    setEventListener(formElement, obj);
  })
}