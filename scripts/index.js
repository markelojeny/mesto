const popupElement = document.querySelector('.popup_type_edit');
const placeElement = document.querySelector('.popup_type_place');
const imageElement = document.querySelector('.popup_type_image');

const profileElement = document.querySelector('.profile');

const formElement = document.querySelector('.form_type_edit');
const formPlace = document.querySelector('.form_type_place');

const nameInput = formElement.querySelector('.form__input_edit_name');
const jobInput = formElement.querySelector('.form__input_edit_about');

const profileNickname = profileElement.querySelector('.profile__nickname');
const profileAbout = profileElement.querySelector('.profile__about');

const photoCard = document.querySelector('.photo-cards');
const placeTemplate = document.querySelector('.card-template').content;

const placeNameInput = formPlace.querySelector('.form__input_add_name');
const placeLinkInput = formPlace.querySelector('.form__input_add_link');

const placeImage = imageElement.querySelector('.popup__picture');
const placeTitle = imageElement.querySelector('.popup__title_type_image');

const popupOpenButtonElement = profileElement.querySelector('.profile__button-edit');
const popupCloseButtonElement = popupElement.querySelector('.popup__button-close');
const popupSubmitButtonElement = formElement.querySelector('.form__button-save');

const popupCloseButtonPlace = placeElement.querySelector('.popup__button-close');
const popupOpenButtonPlace = profileElement.querySelector('.profile__button-add');
const popupSubmitButtonPlace = formPlace.querySelector('.form__button-save');

const closePopupOverlay = function(event) { 
  if (event.target === event.currentTarget) { 
    closePopup(event.target);
  }
}

function closeByPopupByEsc (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  } 
}

const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('mousedown', closePopupOverlay);
  document.addEventListener('keydown', closeByPopupByEsc);
}

const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByPopupByEsc);
  popup.removeEventListener('mousedown', closePopupOverlay); 
}

popupOpenButtonPlace.addEventListener('click', function() {
  disabledButtonState (popupSubmitButtonPlace, obj)
  placeNameInput.value = "";
  placeLinkInput.value = "";
  openPopup(placeElement);
});

popupOpenButtonElement.addEventListener('click', function() {
  unabledButtonState (popupSubmitButtonElement, obj);
  nameInput.value = profileNickname.textContent;
  jobInput.value = profileAbout.textContent;
  openPopup(popupElement);
});


popupCloseButtonElement.addEventListener('click', function() {
  closePopup(popupElement);
});
popupCloseButtonPlace.addEventListener('click', function() {
  closePopup(placeElement);
});

function handleProfileFormSubmit (evt) {
  evt.preventDefault(); 
  profileNickname.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;

  closePopup(popupElement);
}

formElement.addEventListener('submit', handleProfileFormSubmit); 

const initialCards = [
  {
    name: '??????????',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: '?????????????????????? ??????????????',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: '??????????????',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: '????????????????',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: '???????????????????????? ??????????',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: '????????????',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

function deleteHandler(event) {
  const target = event.target;
  const currentImageElement = target.closest('.photo-card');
  currentImageElement.remove();
}

function setEventListeners (element) {
  const deleteButton = element.querySelector('.photo-card__button-delete');
  deleteButton.addEventListener('click', deleteHandler);
}

const createCard = function (data) {
  const cardElement = placeTemplate.cloneNode(true);

  cardElement.querySelector('.photo-card__title').textContent = data.name;
  cardElement.querySelector('.photo-card__picture').src = data.link;
  cardElement.querySelector('.photo-card__picture').alt = data.name;

  setEventListeners(cardElement);

  cardElement.querySelector('.photo-card__like').addEventListener('click', function (event) {
    event.target.classList.toggle('photo-card__like_active');
  });

  const popupOpenButtonImage = cardElement.querySelector('.photo-card__button-picture');

  popupOpenButtonImage.addEventListener('click', function() {
    placeImage.src = data.link;
    placeImage.alt = data.name;
    placeTitle.textContent = data.name;
    openPopup(imageElement);
  });

  return cardElement;
}

function renderCard (data, cardsContainer) {
  const cardElement = createCard(data);
  cardsContainer.prepend(cardElement);
}


initialCards.forEach(function (element) {
  renderCard(element, photoCard);
})

function handlePlaceFormSubmit (evt) {
  evt.preventDefault(); 
  renderCard ({name: placeNameInput.value, link: placeLinkInput.value}, photoCard);
  closePopup(placeElement);
}

const popupCloseButtonImage = imageElement.querySelector('.popup__button-close');

popupCloseButtonImage.addEventListener('click', function() {
  closePopup(imageElement);
})

formPlace.addEventListener('submit', handlePlaceFormSubmit);

enableValidation(obj);

