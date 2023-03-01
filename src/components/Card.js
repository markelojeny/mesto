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
      this._deleteButton = this._element.querySelector('.photo-card__button-delete');
      this._buttonLike = this._element.querySelector('.photo-card__like');
      this._zommImage = this._element.querySelector('.photo-card__button-picture');

      this._cardTitle.textContent = this._name;
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;

      this._setEventListeners();
  
      return this._element;
     }
    
    _setDeleteHandler() {
      this._deleteButton.addEventListener('click', () => {
        this._element.remove();
      });
    }

    _toggleLike() {
      this._buttonLike.addEventListener('click', (event) => {
        event.target.classList.toggle('photo-card__like_active');
      });
    }

    _handleZoomImage() {
      this._zommImage.addEventListener('click', () => {
        this._handleCardClick(this._name, this._link)
      });
    }

    _setEventListeners() {
      this._toggleLike();
      this._setDeleteHandler();
      this._handleZoomImage();
    }
  }