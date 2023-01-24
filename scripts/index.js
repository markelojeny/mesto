import { openPopup, closePopup } from './utils.js'; 
import { initialCards, obj } from './const.js';
import Card from './Card.js';
import { formCard, editCard, popupOpenButtonPlace,  placeNameInput, placeLinkInput, formElement, popupOpenButtonElement, popupCloseButtonElement, popupCloseButtonPlace, nameInput, jobInput, placeElement, popupElement, photoCard, formPlace, profileNickname, profileAbout, imageElement, placeImage, placeTitle } from './elements.js';
import FormValidate from './FormValidator.js';

const formCardValidate = new FormValidate (obj, formCard);
const formEditValidate = new FormValidate (obj, editCard);

popupOpenButtonPlace.addEventListener('click', function() {
  placeNameInput.value = "";
  placeLinkInput.value = "";
  formCardValidate.hideFormsError();
  openPopup(placeElement);
  formCardValidate.disabledButtonState();
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
  
formElement.addEventListener('submit', handleProfileFormSubmit); 

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
  
formPlace.addEventListener('submit', handlePlaceFormSubmit);
  
formCardValidate.enableValidation();
formEditValidate.enableValidation();