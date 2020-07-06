class FormValidator {
  constructor(form, errorMessage) {
    this.form = form
    this.errorMessage = errorMessage;
  }

  init() {
    this.button = this.form.querySelector('.popup__button');
    this.allInputsArray = Array.from(this.form.elements).filter((el) => { return el.tagName.toLowerCase() === 'input'; });
    this.errorElementsArray = this.form.querySelectorAll('.popup__error');
    this.setEventListeners();
  }

  validateFormInput() {
    // Можно лучше
    // Собрать в методе init объект из из подстрочников, где ключом будет
    // id инпута, а занчением -- элемент подстрочника
    // тогда не надо будет искать, а просто обратиться errorObject[input.id]
    this.errorElementsArray.forEach((el) => {
      if (el.id === `${this.input.id}-error`) {
        this.errorElement = el;
      }
    });

    if (this.input.validity.valueMissing) {
      this.input.setCustomValidity(this.errorMessage.required)
      this.errorElement.textContent = this.input.validationMessage;
    } else if (this.input.validity.typeMismatch && this.input.type === 'url') {
      this.input.setCustomValidity(this.errorMessage.urlLink)
      this.errorElement.textContent = this.input.validationMessage;
    } else if ((this.input.validity.tooShort || this.input.validity.tooLong) && this.input.type === 'text') {
      this.input.setCustomValidity(this.errorMessage.lenghtString)
      this.errorElement.textContent = this.input.validationMessage;
    } else {
      this.errorElement.textContent = this.input.setCustomValidity('');
    }

  }

  validateFormButton() {

    if (this.resultСhecking === false) {
      this.button.setAttribute('disabled', true);
      this.button.classList.add('popup__button_disabled');
    } else {
      this.button.removeAttribute('disabled');
      this.button.classList.remove('popup__button_disabled');
    }

  }

  validateForms() {

    if (this.input != null) {
      this.validateFormInput(this.input);
    }
    this.resultСhecking = this.allInputsArray.every(elem => elem.validity.valid);
    this.validateFormButton(this.button, this.resultСhecking);

  }

  setEventListeners() {

    this.form.addEventListener('input', (event) => {
      this.input = event.target;
      this.validateForms();
    });

  }

  resetForms() {

    this.allInputsArray.forEach((item) => { item.setCustomValidity('') });
    this.errorElementsArray.forEach((item) => { item.textContent = "" });
    this.form.reset();
    this.input = null;

  }

}

  // [ИСПРАВЛЕНО]
  // Надо исправить
  // Класс придется переделать
  // Класс принимает на вход форму и объект с текстом ошибок
  // помимо всего прочего, что вам необходимо для валидации у класса должен быть метод init() в котором
  // вы ОДИН раз соберете в переменные класса: кнопку, массив инпутов, массив элементов ошибок
  // теперь вы обращаетесь только к переменным
  // Также в методе init вызовите установку слушатулей (которая будет в отдельном методе)
  // Обращений вроде .nextElementSibling/.parentNode быть не должно
  // Если надо найти элемент ошибки для инпута, то ищите в элементе формы
  // Инпуты и подстрочники с ошибками следует связать друг с другом
  // Например, даем инпуту id = "userinfo", а соответствующему элементу для ошибок id = "userinfo-error"
  // Теперь, пользуясь таким паттерном мы можем всегда зная id инпута узнать id подстрочника.