export default class Popup {
    constructor(selector) {
        this._selector = selector;
        this._buttonClose = this._selector.querySelector('.popup__button-close');
        //this._element = this._selector = document.querySelector('.popup_opened');
    }

    open() {
        this._selector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    close() {
        this._selector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
        this._selector.removeEventListener('mousedown', (evt) => {
            if (evt.target === evt.currentTarget) { 
                this.close(evt.target);
            }
        })
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
          } 
    }

    setEventListeners() {

        this._buttonClose.addEventListener('click', this.close());

        this._selector.addEventListener('mousedown', (evt) => {
            if (evt.target === evt.currentTarget) { 
                this.close(evt.target);
            }
        })
    }
}