export default class Popup {
    constructor(namePopup) {
        this._namePopup = namePopup;
        this._buttonClose = this._namePopup.querySelector('.popup__button-close');
        //this._element = document.querySelector('.popup_opened');
    }

    open() {
        this._namePopup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    close() {
        this._namePopup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
        this._namePopup.removeEventListener('mousedown', this._handleOverlayClose.bind(this));
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

        this._namePopup.addEventListener('mousedown', this._handleOverlayClose.bind(this));
    }
}