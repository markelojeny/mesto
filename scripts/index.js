const popupElement = document.querySelector('.popup_type_edit');
const placeElement = document.querySelector('.popup_type_place');
const imageElement = document.querySelector('.popup-image');

const profileElement = document.querySelector('.profile');
const cardElement = document.querySelector('.photo-card');

const photoCard = document.querySelector('.photo-cards');
const placeTemplate = document.querySelector('.card-template').content;

const popupCloseButtonElement = popupElement.querySelector('.popup__button-close_type_edit');
const popupCloseButtonPlace = placeElement.querySelector('.popup__button-close_type_place');

const popupOpenButtonElement = profileElement.querySelector('.profile__button-edit');
const popupOpenButtonPlace = profileElement.querySelector('.profile__button-add');

const formElement = document.querySelector('.form_type_edit');
const formPlace = document.querySelector('.form_type_place');

let nameInput = formElement.querySelector('.form__input_edit_name');
let jobInput = formElement.querySelector('.form__input_edit_about');

let profileNickname = profileElement.querySelector('.profile__nickname');
let profileAbout = profileElement.querySelector('.profile__about');

let placeNameInput = formPlace.querySelector('.form__input_add_name');
let placeLinkInput = formPlace.querySelector('.form__input_add_link');

const placeImage = imageElement.querySelector('.popup-image__picture');
const placeTitle = imageElement.querySelector('.popup-image__title');

const openPopup = function() {
  popupElement.classList.add('popup_opened');
  nameInput.value = profileNickname.textContent;
  jobInput.value = profileAbout.textContent;
}

const openPlace = function() {
  placeElement.classList.add('popup_opened');
  placeNameInput.value = "";
  placeLinkInput.value = "";
}

const closePopup = function() {
  popupElement.classList.remove('popup_opened');
}

const closePlace = function() {
  placeElement.classList.remove('popup_opened');
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);

popupOpenButtonPlace.addEventListener('click', openPlace);
popupCloseButtonPlace.addEventListener('click', closePlace);

function formSubmitHandler (evt) {
  evt.preventDefault(); 
  profileNickname.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;

  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler); 


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

function setEventListeners (cardElement) {
  const deleteButton = cardElement.querySelector('.photo-card__button-delete');
  deleteButton.addEventListener('click', deleteHandler);
}

initialCards.forEach(function (element) {
  const cardElement = placeTemplate.cloneNode(true);

  cardElement.querySelector('.photo-card__title').textContent = element.name;
  cardElement.querySelector('.photo-card__picture').src = element.link;
  cardElement.querySelector('.photo-card__picture').alt = element.name;

  setEventListeners(cardElement);

  cardElement.querySelector('.photo-card__like').addEventListener('click', function (event) {
    event.target.classList.toggle('photo-card__like_active');
  })

  const popupOpenButtonImage = cardElement.querySelector('.photo-card__button-picture');

  const imageOpen = function() {
    imageElement.classList.add('popup_opened');
    placeImage.src = element.link;
    placeImage.alt = element.name;
    placeTitle.textContent = element.name;
  }

  popupOpenButtonImage.addEventListener('click', imageOpen);

  photoCard.prepend(cardElement);
})


function formSubmitHandlerPlace (evt) {
  evt.preventDefault(); 
  const cardElement = placeTemplate.cloneNode(true).children[0];

  cardElement.querySelector('.photo-card__title').textContent = placeNameInput.value;
  cardElement.querySelector('.photo-card__picture').src = placeLinkInput.value;
  cardElement.querySelector('.photo-card__picture').alt = placeNameInput.value;

  setEventListeners(cardElement);

  cardElement.querySelector('.photo-card__like').addEventListener('click', function (event) {
    event.target.classList.toggle('photo-card__like_active');
  })

  const popupOpenButtonImage = cardElement.querySelector('.photo-card__button-picture');

  const imageOpen = function() {
    imageElement.classList.add('popup_opened');
    placeImage.src = cardElement.querySelector('.photo-card__picture').src;
    placeImage.alt = cardElement.querySelector('.photo-card__title').textContent;
    placeTitle.textContent = cardElement.querySelector('.photo-card__title').textContent;
  }

  popupOpenButtonImage.addEventListener('click', imageOpen);

  photoCard.prepend(cardElement);

  closePlace();
}

const popupCloseButtonImage = imageElement.querySelector('.popup-image__button-close');

  const closeImage = function() {
    imageElement.classList.remove('popup_opened');
  }

popupCloseButtonImage.addEventListener('click', closeImage);

formPlace.addEventListener('submit', formSubmitHandlerPlace);



