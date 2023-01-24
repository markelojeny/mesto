export default class FormValidate {
  constructor(selectors, form) {
    this._form = form;
    this._inputSelector = selectors.inputSelector;
    this._submitButtonSelector = selectors.submitButtonSelector;
    this._inactiveButtonSelector = selectors.inactiveButtonSelector;
    this._errorType = selectors.errorType;
    this._errorClass = selectors.errorClass;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }

  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
    inputElement.classList.add(this._errorType);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
    inputElement.classList.remove(this._errorType);
  }

  hideFormsError() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    })
  }

  _checkInputValidity(inputElement) {
    const isValid = inputElement.validity.valid;

    if (isValid) {
      this._hideInputError (inputElement);
    } else {
      this._showInputError (inputElement);
    }
  }

  disabledButtonState() {
    this._submitButton.classList.add(this._inactiveButtonSelector);
    this._submitButton.setAttribute("disabled", true);
  }
  
  unabledButtonState() {
    this._submitButton.classList.remove(this._inactiveButtonSelector);
    this._submitButton.removeAttribute("disabled", "");
  }

  _hasNotValidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid
    });
  }

  _toggleButtonState() {

    if (this._hasNotValidInput()) {
      this.disabledButtonState();
    } else {
      this.unabledButtonState();
    }
  }
  
  _setEventListener() {
    
    this._form.addEventListener('submit', function (event) {
      event.preventDefault();
    })

    this._toggleButtonState();
    
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      })
    })
  }

  enableValidation() {
    this._setEventListener()
  }
}