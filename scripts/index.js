import { openPopup, closePopup } from './utils.js'; 
import { initialCards, obj } from './const.js';
import Card from './Card.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithPopup from './PopupWithPopup.js';
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

const popupPlace = new PopupWithForm({
    selector: placeElement, 
    handleFormSubmit: handlePlaceFormSubmit
})

popupPlace.setEventListeners();

const popupEdit = new PopupWithForm({
  selector: popupElement, 
  handleFormSubmit: handleProfileFormSubmit
})

popupEdit.setEventListeners();

popupOpenButtonPlace.addEventListener('click', function() {
  formCardValidate.hideFormsError();
  popupPlace.open();
  formCardValidate.disableButton();
});
  
popupOpenButtonElement.addEventListener('click', function() {
  formEditValidate.hideFormsError();
  popupEdit.open();
});
  
  
popupCloseButtonElement.addEventListener('click', function() {
  popupPlace.close();
});
popupCloseButtonPlace.addEventListener('click', function() {
  popupEdit.close();
});
  
function handleProfileFormSubmit (evt) {
  evt.preventDefault(); 
  profileNickname.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup(popupElement);
}

function handleCardClick(name, link) {
  placeImage.src = link;
  placeImage.alt = name;
  placeTitle.textContent = name;
  openPopup(imageElement);
}
  
profileForm.addEventListener('submit', handleProfileFormSubmit); 

const createCard = function (data) {
  const carding = new Card(data, ".card-template", handleCardClick);
  return carding.generateCard(carding);
}
  
const renderCard = (card) => {
  photoCard.prepend(card);
}
  
  
initialCards.forEach((element) => {
  renderCard(createCard(element));
})
  
function handlePlaceFormSubmit (evt) {
  evt.preventDefault(); 
  const data = {name: placeNameInput.value, link: placeLinkInput.value};
  renderCard(createCard(data));
  placeElement.close();
}

popupCloseZoomImage.addEventListener('click', function() {
  closePopup(imageElement);
});
  
placeForm.addEventListener('submit', handlePlaceFormSubmit);
  
formCardValidate.enableValidation();
formEditValidate.enableValidation();