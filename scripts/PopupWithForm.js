import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
    constructor(selector, handleFormSubmit) {
        super(selector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._selector.querySelector('.form');
    }

    _getInputValues() {
        this._inputList = this._selector.querySelectorAll('.form__input');
        this._formValues = {};
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        return this._formValues;
    }

    close() {
        super.close();
        this._form.reset();
    }

    _setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._handleFormSubmit(this._getInputValues());
        });
      } 

}