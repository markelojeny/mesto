import { openPopup, closePopup } from './utils.js'; 
import { initialCards, obj } from './const.js';
import Card from './Card.js';
import { placeForm, profileForm, popupOpenButtonPlace,  placeNameInput, placeLinkInput, popupOpenButtonElement, popupCloseButtonElement, popupCloseZoomImage, popupCloseButtonPlace, nameInput, jobInput, placeElement, popupElement, photoCard, profileNickname, profileAbout, imageElement, placeImage, placeTitle } from './elements.js';
import FormValidator from './FormValidator.js';

const formCardValidate = new FormValidator (obj, placeForm);
const formEditValidate = new FormValidator (obj, profileForm);

popupOpenButtonPlace.addEventListener('click', function() {
  placeNameInput.value = "";
  placeLinkInput.value = "";
  formCardValidate.hideFormsError();
  openPopup(placeElement);
  formCardValidate.disableButton();
});
  
popupOpenButtonElement.addEventListener('click', function() {
  nameInput.value = profileNickname.textContent;
  jobInput.value = profileAbout.textContent;
  formEditValidate.hideFormsError();
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
  closePopup(placeElement);
}

popupCloseZoomImage.addEventListener('click', function() {
  closePopup(imageElement);
});
  
placeForm.addEventListener('submit', handlePlaceFormSubmit);
  
formCardValidate.enableValidation();
formEditValidate.enableValidation();