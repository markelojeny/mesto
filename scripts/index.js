const popupElement = document.querySelector('.popup_type_edit');
const placeElement = document.querySelector('.popup_type_place');
const imageElement = document.querySelector('.popup-image');

const profileElement = document.querySelector('.profile');

const formElement = document.querySelector('.form_type_edit');
const formPlace = document.querySelector('.form_type_place');

const nameInput = formElement.querySelector('.form__input_edit_name');
const jobInput = formElement.querySelector('.form__input_edit_about');

const profileNickname = profileElement.querySelector('.profile__nickname');
const profileAbout = profileElement.querySelector('.profile__about');

const photoElement = document.querySelector('.photo-card');
const photoCard = document.querySelector('.photo-cards');
const placeTemplate = document.querySelector('.card-template').content;

const placeNameInput = formPlace.querySelector('.form__input_add_name');
const placeLinkInput = formPlace.querySelector('.form__input_add_link');

const placeImage = imageElement.querySelector('.popup-image__picture');
const placeTitle = imageElement.querySelector('.popup-image__title');

const popupOpenButtonElement = profileElement.querySelector('.profile__button-edit');
const popupCloseButtonElement = popupElement.querySelector('.popup__button-close');


const popupCloseButtonPlace = placeElement.querySelector('.popup__button-close');
const popupOpenButtonPlace = profileElement.querySelector('.profile__button-add');

const togglePopup = function (popup) {
  popup.classList.toggle('popup_opened');
}


popupOpenButtonPlace.addEventListener('click', function() {
  placeNameInput.value = "";
  placeLinkInput.value = "";
  togglePopup(placeElement);
});
popupOpenButtonElement.addEventListener('click', function() {
  nameInput.value = profileNickname.textContent;
  jobInput.value = profileAbout.textContent;
  togglePopup(popupElement);
});


popupCloseButtonElement.addEventListener('click', function() {
  togglePopup(popupElement);
});
popupCloseButtonPlace.addEventListener('click', function() {
  togglePopup(placeElement);
});

function handleProfileFormSubmit (evt) {
  evt.preventDefault(); 
  profileNickname.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;

  togglePopup(popupElement);
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
  console.log(target);
  const currentImageElement = target.closest('.photo-card');
  currentImageElement.remove();
}

function setEventListeners (cardElement) {
  const deleteButton = cardElement.querySelector('.photo-card__button-delete');
  deleteButton.addEventListener('click', deleteHandler);
}

initialCards.forEach(function (element) {
  const cardElement = placeTemplate.cloneNode(true).children[0];

  cardElement.querySelector('.photo-card__title').textContent = element.name;
  cardElement.querySelector('.photo-card__picture').src = element.link;
  cardElement.querySelector('.photo-card__picture').alt = element.name;

  setEventListeners(cardElement);

  cardElement.querySelector('.photo-card__like').addEventListener('click', function (event) {
    event.target.classList.toggle('photo-card__like_active');
  })

  const popupOpenButtonImage = cardElement.querySelector('.photo-card__button-picture');

  popupOpenButtonImage.addEventListener('click', function() {
    placeImage.src = element.link;
    placeImage.alt = element.name;
    placeTitle.textContent = element.name;
    togglePopup(imageElement);
  });

  photoCard.prepend(cardElement);
})

const createCard = function (name, link) {
  const cardElement = placeTemplate.cloneNode(true).children[0];

  cardElement.querySelector('.photo-card__title').textContent = name.value;
  cardElement.querySelector('.photo-card__picture').src = link.value;
  cardElement.querySelector('.photo-card__picture').alt = name.value;

  setEventListeners(cardElement);

  cardElement.querySelector('.photo-card__like').addEventListener('click', function (event) {
    event.target.classList.toggle('photo-card__like_active');
  });

  const popupOpenButtonImage = cardElement.querySelector('.photo-card__button-picture');

  popupOpenButtonImage.addEventListener('click', function() {
    placeImage.src = cardElement.querySelector('.photo-card__picture').src;
    placeImage.alt = cardElement.querySelector('.photo-card__title').textContent;
    placeTitle.textContent = cardElement.querySelector('.photo-card__title').textContent;
    togglePopup(imageElement);
  });

  photoCard.prepend(cardElement);
}

function handlePlaceFormSubmit (evt) {
  evt.preventDefault(); 
  createCard(placeNameInput, placeLinkInput);
  togglePopup(placeElement);
}

const popupCloseButtonImage = imageElement.querySelector('.popup-image__button-close');

popupCloseButtonImage.addEventListener('click', function() {
  togglePopup(imageElement);
})

formPlace.addEventListener('submit', handlePlaceFormSubmit);
