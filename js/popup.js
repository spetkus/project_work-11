class Popup {
  constructor(popupElement, buttonClose) {
    this.popupElement = popupElement;
    this.buttonClose = buttonClose;
  }

  open() {
    this.popupElement.classList.add('popup_is-opened');
    this.setEventListeners();
  }

  close = () => {
    this.popupElement.classList.remove('popup_is-opened');
    this.removeEventListeners();
  }

  escListener = () => {
    this.evt = event;
    (this.evt.code === 'Escape') ? this.close() : false;
  }

  setEventListeners() {
    this.buttonClose.addEventListener('click', this.close);
    addEventListener('keydown', this.escListener);
  }

  removeEventListeners() {
    this.buttonClose.removeEventListener('click', this.close);
    removeEventListener('keydown', this.escListener);
  }
}
