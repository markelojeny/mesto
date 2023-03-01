import { initialCards, obj } from '../utils/const.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import { placeForm, profileForm, popupOpenButtonPlace, 
  popupOpenButtonElement, placeElement, 
  popupElement, profileNickname, profileAbout, 
  imageElement } from '../utils/elements.js';
import FormValidator from '../components/FormValidator.js';

import './index.css'

const formCardValidate = new FormValidator(obj, placeForm);
const formEditValidate = new FormValidator(obj, profileForm);

//vstavka v prifile

const popupEdit = new PopupWithForm({ 
  namePopup: popupElement, 
  handleFormSubmit: handleProfileFormSubmit 
})

const profileInfo = new UserInfo({ 
  name: profileNickname,
  about: profileAbout
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
  namePopup: placeElement, 
  handleFormSubmit: handlePlaceFormSubmit
})

popupOpenButtonPlace.addEventListener('click', function() {
  formCardValidate.hideFormsError();
  popupPlace.open();
  formCardValidate.disableButton();
});

const popupImage = new PopupWithImage(imageElement);

popupImage.setEventListeners();

const createCard = function (data) {
  const carding = new Card(data, ".card-template", handleCardClick);
  return carding.generateCard(carding);
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