class PopupForm extends Popup {

  constructor(popupElement, buttonClose, form) {
    super(popupElement, buttonClose);
    this.form = form;
  }

  renderLoading(isLoading) {
    const button = this.form.querySelector('.popup__button');
    if (isLoading) {
      this.btnName = button.textContent;
      button.classList.toggle('popup__button_loading_font-size');
      button.textContent = 'Загрузка...';
    } else {
      button.textContent = this.btnName;
      button.classList.toggle('popup__button_loading_font-size');
      this.btnName = null;
    }
  }
}