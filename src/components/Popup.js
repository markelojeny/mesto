export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._buttonClose = this._popupSelector.querySelector('.popup__button-close');
        this._handleEscClose = this._handleEscClose.bind(this);
        //this._element = document.querySelector('.popup_opened');
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
          } 
    }

    _handleOverlayClose(evt) {
        if (evt.target === evt.currentTarget) { 
            this.close(evt.target);
        }
    }

    setEventListeners() {

        this._buttonClose.addEventListener('click', () => {
            this.close()
        });

        this._popupSelector.addEventListener('mousedown', this._handleOverlayClose.bind(this));
    }
}