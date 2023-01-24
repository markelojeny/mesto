import { closePopupOverlay, closeByPopupByEsc } from './utils.js';
import { imageElement } from './elements.js';

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
    
    _deleteHandler() {
      this._deleteButton.addEventListener('click', () => {
        this._element.remove();
      });
    }

    _toggleLike() {
      this._buttonLike.addEventListener('click', (event) => {
        event.target.classList.toggle('photo-card__like_active');
      });
    }

    _handleOpenPopup() {
      imageElement.classList.add('popup_opened');
      imageElement.addEventListener('mousedown', closePopupOverlay);
      document.addEventListener('keydown', closeByPopupByEsc);
    }

    _handleClosePopup() {
      imageElement.classList.remove('popup_opened');
      document.removeEventListener('keydown', closeByPopupByEsc);
      imageElement.removeEventListener('mousedown', closePopupOverlay); 
    }

    _handleZoomImage() {
      this._zommImage.addEventListener('click', () => {
        this._handleCardClick(this.name, this._link)
      });
    }

    _setEventListeners() {

      this._toggleLike();
      this._deleteHandler();
      this._handleZoomImage();
      

      imageElement.querySelector('.popup__button-close').addEventListener('click', () => {
        this._handleClosePopup();
      })

    }
  }