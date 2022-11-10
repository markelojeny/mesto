const popupElement = document.querySelector('.popup'); 
const profileElement = document.querySelector('.profile');

const popupCloseButtonElement = popupElement.querySelector('.popup__button-close');
const popupOpenButtonElement = profileElement.querySelector('.profile__button-edit');

const popupOpen = function() {
    popupElement.classList.add('popup_opened');
    nameInput.value = profileNickname.textContent;
    jobInput.value = profileAbout.textContent;
}

const popupClose = function() {
    popupElement.classList.remove('popup_opened');
}

const popupCloseOverlay = function(event) {
    console.log(event.target, event.currentTarget);

    if (event.target === event.currentTarget) {
        popupClose();
    }
}

popupOpenButtonElement.addEventListener('click', popupOpen);
popupCloseButtonElement.addEventListener('click', popupClose);
popupElement.addEventListener('click', popupCloseOverlay);

let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__input-name');
let jobInput = formElement.querySelector('.form__input-about');

console.log(nameInput);

let profileNickname = profileElement.querySelector('.profile__nickname');
let profileAbout = profileElement.querySelector('.profile__about');

const saveButton = formElement.querySelector('.form__button-save');

function formSubmitHandler (evt) {
    evt.preventDefault(); 

    if ((nameInput.value !== '') & (jobInput.value !== '')) {
        profileNickname.textContent = nameInput.value;
        profileAbout.textContent = jobInput.value;
    } 

    popupClose();
}

formElement.addEventListener('submit', formSubmitHandler); 