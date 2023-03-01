import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupPicture = this._popupSelector.querySelector('.popup__picture');
        this._popupFigcaption = this._popupSelector.querySelector('.popup__title_type_image');
    }

    open(name, link) {
        super.open();
        this._popupPicture.src = link;
        this._popupPicture.alt = name;
        this._popupFigcaption.textContent = name;
    }
}