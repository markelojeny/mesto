import { initialCards, obj } from '../utils/const.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import { placeForm, profileForm, popupOpenButtonPlace, 
  popupOpenButtonElement, profileNickname, profileAbout } from '../utils/elements.js';
import FormValidator from '../components/FormValidator.js';

import './index.css'

const formCardValidate = new FormValidator(obj, placeForm);
const formEditValidate = new FormValidator(obj, profileForm);

//vstavka v prifile

const popupEdit = new PopupWithForm({ 
  popupSelector: '.popup_type_edit', 
  handleFormSubmit: handleProfileFormSubmit 
})

const profileInfo = new UserInfo({ 
  name: '.profile__nickname',
  about: '.profile__about'
 })

popupEdit.setEventListeners();

popupOpenButtonElement.addEventListener('click', function() {
  formEditValidate.hideFormsError();
  const { name, about } = profileInfo.getUserInfo();
  popupEdit.setInputValue({ 
    nickname: name,
    about: about
   }) 
  popupEdit.open();
});

function handleProfileFormSubmit ({ nickname, about }) {
  profileInfo.setUserInfo({ 
    name: nickname,
    about: about
   }) 
  popupEdit.close();
}


//vstavka foto

const popupPlace = new PopupWithForm({
  popupSelector: '.popup_type_place', 
  handleFormSubmit: handlePlaceFormSubmit
})

popupOpenButtonPlace.addEventListener('click', function() {
  formCardValidate.hideFormsError();
  popupPlace.open();
  formCardValidate.disableButton();
});

const popupImage = new PopupWithImage('.popup_type_image');

popupImage.setEventListeners();

const createCard = function (data) {
  const card = new Card(data, ".card-template", handleCardClick);
  return card.generateCard();
}

function handleCardClick(name, link) {
  popupImage.open(name, link);
}

const cardList = new Section({ 
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item))
  }
}, '.photo-cards');

cardList.renderItems();
  
function handlePlaceFormSubmit ({ placeName, placeLink }) {
  cardList.addItem(createCard({ 
    name: placeName, 
    link: placeLink }));
  popupPlace.close();
}

popupPlace.setEventListeners();
  
formCardValidate.enableValidation();
formEditValidate.enableValidation();