export const closePopupOverlay = function(event) { 
  if (event.target === event.currentTarget) { 
    closePopup(event.target);
  }
}
  
export function closeByPopupByEsc (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  } 
}

export const openPopup = function (popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('mousedown', closePopupOverlay);
  document.addEventListener('keydown', closeByPopupByEsc);
}
  
export const closePopup = function (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByPopupByEsc);
  popup.removeEventListener('mousedown', closePopupOverlay); 
}