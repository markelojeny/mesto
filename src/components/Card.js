export default class Card {userId
    constructor(data, templateSelector, handleCardClick, handleCardDelete, handleCardLike, userId) {
      this._data = data;
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick;
      this._handleCardDelete = handleCardDelete;
      this._cardId = data._id;
      this._owner = data.owner;
      this._likes = data.likes;
      this._handleCardLike = handleCardLike;
      this.userId = userId;
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
      this._buttonZoom = this._element.querySelector('.photo-card__button-picture');

      this._likeSection = this._element.querySelector('.like');
      this._buttonLike = this._likeSection.querySelector('.like__button');
      this._likeNumber = this._likeSection.querySelector('.like__number');
      this._cardTitle.textContent = this._name;
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
      this._likeNumber.textContent = this._likes.length;

      if (this.userId !== this._owner._id) {
        this._buttonDelete.classList.add("photo-card__button-delete_hidden");
      }
      this._likes.forEach((item) => {
        if(item._id === this.userId) {
          this._buttonLike.classList.add("like__button_active");
        }
      })

      this._setEventListeners();
  
      return this._element;
    }

    countLikes(res) {
      this._likeNumber.textContent = `${res.likes.length}`;
    }

    setLike() {
      this._buttonLike.classList.add('like__button_active');
    }

    removeLike() {
      this._buttonLike.classList.remove('like__button_active');
    }

    _zoomImage() {
      this._handleCardClick(this._name, this._link)
    }

    _setEventListeners() {

      this._buttonLike.addEventListener('click', () => this._handleCardLike(this._cardId, this._buttonLike));
      this._buttonDelete.addEventListener('click', () => this._handleCardDelete(this._cardId, this._element));
      this._buttonZoom.addEventListener('click', () => this._zoomImage());

      if (this._ownerId !== this.userID) {
        this._buttonDelete.remove();
      }
    }
  }