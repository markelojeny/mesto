import Popup from './Popup.js';
export default class PopupWithPopup extends Popup {
    constructor(selector) {
        super(selector)
        this._popupPicture = this._selector.querySelector('.popup__title_type_image');
        this._popupFigcaption = this._selector.querySelector('.popup__picture');
        super(open);
    }

    _getInputValues() {
        placeImage.src = this._link;
        placeImage.alt = this._name;
        placeTitle.textContent = this._name;
        open();
    }

}

function open(name, link) {
    this._popupPicture.src = link;
    this._popupPicture.alt = name;
    this._popupFigcaption.textContent = name;
    super.open(name, link);
  }