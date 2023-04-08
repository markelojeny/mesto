import '../pages/index.css';

import { obj, apiConfig } from '../utils/const.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import { placeForm, profileForm, popupOpenButtonPlace, 
  popupOpenButtonElement, popupOpenButtonAvatar, avatarForm } from '../utils/elements.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js'

const formCardValidate = new FormValidator(obj, placeForm);
const formEditValidate = new FormValidator(obj, profileForm);
const formAvatarValidate = new FormValidator(obj, avatarForm);

const api = new Api(apiConfig);

let userId;

Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
.then((res) => {
  profileInfo.setInitialProfileInfo(res[0]);
  userId = res[0]._id;
  cardList.renderItems(res[1].reverse());
})
.catch((error) => {
  console.log(`Ошибка ${error} при добавлении дефолтных карточек`)
})

const profileInfo = new UserInfo({ 
  name: '.profile__nickname',
  about: '.profile__about',
  avatar: '.profile__avatar'
})

//vstavka v prifile

const popupEdit = new PopupWithForm('.popup_type_edit', (object) => {
  api.editUser(popupEdit.getInputValues())
  .then(() => {
    profileInfo.setUserInfo({ 
      name: object.nickname,
      about: object.about
    });
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    popupEdit.renderLoading(false);
    popupEdit.close();
  })
})

popupEdit.setEventListeners();

popupOpenButtonElement.addEventListener('click', function() {
  formEditValidate.hideFormsError();
  const { name, about } = profileInfo.getUserInfo();
  popupEdit.setInputValue({ 
    nickname: name,
    about: about
   }); 
  popupEdit.open();
});

//vstavka avatara

const popupAvatar = new PopupWithForm('.popup_type_avatar', (avatar) => {
  api.changeAvatar(avatar)
  .then(() => {
    profileInfo.setUserAvatar(avatar);
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    popupAvatar.renderLoading(false);
    popupAvatar.close();
  })
})

popupAvatar.setEventListeners();

popupOpenButtonAvatar.addEventListener('click', function() {
  formAvatarValidate.disableButton();
  formAvatarValidate.hideFormsError();
  const { avatar } = profileInfo.getUserInfo();
  popupAvatar.setInputValue({ 
    avatar: avatar
  }); 
  popupAvatar.open();
});

//function handleAvatarFormSubmit ({ avatar }) {
  //profileInfo.setUserInfo({ 
    //avatar: avatar
   //}) 
   //popupAvatar.close();
//}

//vstavka foto

const popupPlace = new PopupWithForm('.popup_type_place', (objectImage) => {
  api.addCard(objectImage)
  .then((res) => {
    cardList.addItem(createCard(res));
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() => {
    popupPlace.renderLoading(false);
    popupPlace.close();
  })
})

popupOpenButtonPlace.addEventListener('click', function() {
  formCardValidate.hideFormsError();
  popupPlace.open();
  formCardValidate.disableButton();
});

const popupImage = new PopupWithImage('.popup_type_image');

popupImage.setEventListeners();

const popupDelete = new PopupWithConfirmation('.popup_type_agreement', api);
popupDelete.setEventListeners();

const createCard = function (data) {
  const card = new Card(data, 
    ".card-template", 
    handleCardClick,
    handleCardDelete,
    api,
    userId
    );
  return card.generateCard();
}

function handleCardClick(name, link) {
  popupImage.open(name, link);
}

function handleCardDelete(id, card) {
  popupDelete.open(id, card);
}

const cardList = new Section({ 
  renderer: (item) => {
    cardList.addItem(createCard(item))
  }
}, '.photo-cards');

popupPlace.setEventListeners();
  
formCardValidate.enableValidation();
formEditValidate.enableValidation();
formAvatarValidate.enableValidation();