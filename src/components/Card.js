export default class Card {
    constructor(data, templateSelector, handleCardClick) {
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick;
    }
  
    _getTemplate() {
      const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.photo-card')
      .cloneNode(true);
  
      return cardElement;
    }
  
    generateCard() {
      this._element = this._getTemplate();
      
      this._cardTitle = this._element.querySelector('.photo-card__title');
      this._cardImage = this._element.querySelector('.photo-card__picture');
      this._buttonDelete = this._element.querySelector('.photo-card__button-delete');
      this._buttonLike = this._element.querySelector('.photo-card__like');
      this._buttonZoom = this._element.querySelector('.photo-card__button-picture');

      this._cardTitle.textContent = this._name;
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;

      this._setEventListeners();
  
      return this._element;
     }
    
    _remove() {
      this._element.remove();
      this._element = null;
    }

    _toggleLike() {
      this._buttonLike.classList.toggle('photo-card__like_active');
    }

    _zoomImage() {
      this._handleCardClick(this._name, this._link)
    }

    _setEventListeners() {
      this._buttonLike.addEventListener('click', () => this._toggleLike());
      this._buttonDelete.addEventListener('click', () => this._remove());
      this._buttonZoom.addEventListener('click', () => this._zoomImage());
    }
  }