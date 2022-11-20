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


const popupCloseButtonPlace = placeElement.querySelector('.popup__button-close');
const popupOpenButtonPlace = profileElement.querySelector('.profile__button-add');

const openPopup = function (popup) {
  popup.classList.add('popup_opened');
}

const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
}

popupOpenButtonPlace.addEventListener('click', function() {
  placeNameInput.value = "";
  placeLinkInput.value = "";
  openPopup(placeElement);
});
popupOpenButtonElement.addEventListener('click', function() {
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
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

function deleteHandler(event) {
  const target = event.target;
  const currentImageElement = target.closest('.photo-card');
  currentImageElement.remove();
}

function makePhoto(element) {
  placeImage.src = element.querySelector('.photo-card__picture').src;
  placeImage.alt = element.querySelector('.photo-card__title').textContent;
  placeTitle.textContent = element.querySelector('.photo-card__title').textContent;
  openPopup(imageElement);
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
