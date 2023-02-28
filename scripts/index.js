import { openPopup, closePopup } from './utils.js'; 
import { initialCards, obj } from './const.js';
import Card from './Card.js';
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';
import { placeForm, profileForm, popupOpenButtonPlace,  
  placeNameInput, placeLinkInput, popupOpenButtonElement, 
  popupCloseButtonElement, popupCloseZoomImage, 
  popupCloseButtonPlace, nameInput, jobInput, placeElement, 
  popupElement, photoCard, profileNickname, profileAbout, 
  imageElement, placeImage, placeTitle } from './elements.js';
import FormValidator from './FormValidator.js';

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
  console.log(name);
  console.log(link);
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