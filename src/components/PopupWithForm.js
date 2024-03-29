import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupSelector.querySelector('.form');
        this._saveButton = this._form.querySelector('.form__button-save')
        this._inputList = this._form.querySelectorAll('.form__input');
    }

    getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    setInputValue(data) {
        this._inputList.forEach(input => {
            input.value = data[input.name];
        });
    }

    close() {
        super.close();
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this.renderLoading(true);
          this._handleFormSubmit(this.getInputValues())
        });
    }
    
    renderLoading(isLoading) {
        if (isLoading) {
            this._saveButton.textContent = "Сохранение...";
        } else {
            this._saveButton.textContent = "Сохранить";
        }
    }

}