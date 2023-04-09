import Popup from './Popup.js';
export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, handleDeleteCard) {
      super(popupSelector);
      this._card = {};
      this._handleDeleteCard = handleDeleteCard;
      this._form = this._popupSelector.querySelector('.form');
    }
    
    open(cardID, card) {
      super.open();
      this._cardID = cardID;
      this._card = card;
    }

    handleSubmitForm() {
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleDeleteCard(this._cardID, this._card);
      });
    }

    setEventListeners() {
      super.setEventListeners();
      this.handleSubmitForm();
    }
}