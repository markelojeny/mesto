import Popup from './Popup.js';
export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector, api) {
      super(popupSelector);
      this._card = {};
      this._api = api;
      this._form = this._popupSelector.querySelector('.form');
    }
    
    open(cardID, card) {
      super.open();
      this._cardID = cardID;
      this._card = card;
    }

    _handleDeleteCard() {
      this._api.deleteCard(this._cardID)
      .then(() => {
      this._card.remove();
      this.close();
      })
      .catch((err) => console.log(err));
    }

    setEventListeners() {
      super.setEventListeners();
      this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleDeleteCard();
        });
    }
}