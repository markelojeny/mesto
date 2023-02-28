import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor(namePopup) {
        super(namePopup);
        this._popupPicture = this._namePopup.querySelector('.popup__picture');
        this._popupFigcaption = this._namePopup.querySelector('.popup__title_type_image');
    }

    open(name, link) {
        super.open();
        this._popupPicture.src = link;
        this._popupPicture.alt = name;
        this._popupFigcaption.textContent = name;
    }
}