(function () {


  /* ОСНОВНЫЕ ПЕРЕМЕННЫЕ (КНОПКИ, ПОПАП ОКНА, ФОРМЫ) */

  const buttonAddCard = document.querySelector('.user-info__add-button');
  const addCardPopup = document.querySelector('.popup-new-card');
  const buttonCloseInAddingCardPopup = addCardPopup.querySelector(`.popup__close`);

  const buttonEditCard = document.querySelector('.user-info__edit-button');
  const editUserPopup = document.querySelector('.popup-edit-profile');
  const buttonCloseInEditProfilePopup = editUserPopup.querySelector(`.popup__close`);

  const buttonEditAvatar = document.querySelector('.user-info__photo');
  const editAvatarPopup = document.querySelector('.popup-avatar-edit');
  const buttonCloseInEditAvatarPopup = editAvatarPopup.querySelector(`.popup__close`);

  const imagePopup = document.querySelector('.popup-open-image');
  const buttonCloseInImagePopup = imagePopup.querySelector(`.popup__close`);

  const formNewCard = document.forms.new;
  const formEditProfile = document.forms.edit;
  const formEditProfileAvatar = document.forms.editavatar;



  /*  ИНИЦИАЛИЗАЦИЯ API */

  const api = new Api({
    baseUrl: 'https://praktikum.tk/cohort11',
    headers: {
      authorization: 'd409416e-f3a9-4123-ae57-e43bb97b78e9',
      'Content-Type': 'application/json'
    }
  });



  /* ПОЛУЧЕНИЕ И УСТАНОВКА ДАННЫХ О ПОЛЬЗОВАТЕЛЕ С СЕРВЕРА */

  const usernameElement = document.querySelector('.user-info__name');
  const aboutElement = document.querySelector('.user-info__job');
  const avatarElement = document.querySelector('.user-info__photo');

  const informationOnUser = new UserInfo({ avatarElement, usernameElement, aboutElement });

  let userId;
  api.getProfileData()
    .then((content) => {
      informationOnUser.setUserInfo(content.name, content.about, content.avatar)
      // Можно лучше
      // id можно тоже хранить в классе UserInfo
      userId = content._id;
    })
    .catch((err) => {
      console.log(err);
    });



  /* ИНИЦИАЛИЗАЦИЯ ВАЛИДАЦИЯ */

  const errorMessage = {
    required: 'Это обязательное поле',
    lenghtString: 'Должно быть от 2 до 30 символов',
    urlLink: 'Здесь должна быть ссылка'
  }

  const validationFormNewCard = new FormValidator(formNewCard, errorMessage);
  const validationFormEditProfile = new FormValidator(formEditProfile, errorMessage);
  const validationFormEditAvatar = new FormValidator(formEditProfileAvatar, errorMessage);

  validationFormNewCard.init();
  validationFormEditProfile.init();
  validationFormEditAvatar.init();



  /* ИНИЦИАЛИЗАЦИЯ ПОПАП ОКОН */

  const popupZoom = new Popup(imagePopup, buttonCloseInImagePopup);

  const zoomUrl = (url) => {
    popupZoom.popupElement.querySelector('.popup__image-full').src = url;
    popupZoom.open();
  }

  const popupAdd = new PopupForm(addCardPopup, buttonCloseInAddingCardPopup, formNewCard);
  const popupEdit = new PopupForm(editUserPopup, buttonCloseInEditProfilePopup, formEditProfile);
  const popupAvatar = new PopupForm(editAvatarPopup, buttonCloseInEditAvatarPopup, formEditProfileAvatar);


  /* ВЫВОД КАРТОЧЕК ИЗ МАССИВА ПОЛУЧЕННОГО ОТ API ПРИ ПЕРВИЧНОЙ ЗАГРУЗКЕ / ВЫВОД НОВОЙ ДОБАВЛЕННОЙ КАРТОЧКИ */


  const container = new CardList(document.querySelector(`.places-list`));

  function initialCards(array) {
    const cardArray = array.map(item => {
      const card = new Card(item, api, userId, zoomUrl);
      card.create();
      return card;
    });
    container.render(cardArray);
  }

  api.getInitialCards()
    .then((content) => {
      initialCards(content);
    })
    .catch((err) => {
      console.log(err);
    });



  /* СЛУШАТЕЛИ СОБЫТЫЙ И ВЫЗОВЫ МЕТОДОВ API */


  buttonAddCard.addEventListener('click', () => {
    validationFormNewCard.resetForms();
    validationFormNewCard.validateForms();
    popupAdd.open();
  })

  buttonEditCard.addEventListener('click', () => {
    validationFormEditProfile.resetForms();
    const userData = informationOnUser.getUserInfo();
    formEditProfile.querySelector('input[name="name"]').value = userData.username;
    formEditProfile.querySelector('input[name="about"]').value = userData.about;
    validationFormEditProfile.validateForms();
    popupEdit.open();
  })

  buttonEditAvatar.addEventListener('click', () => {
    validationFormEditAvatar.resetForms();
    validationFormEditAvatar.validateForms();
    popupAvatar.open();
  })


  formNewCard.addEventListener('submit', (event) => {
    event.preventDefault();
    popupAdd.renderLoading(true)
    const name = formNewCard.elements.name.value;
    const link = formNewCard.elements.link.value;
    api.postAddCard(name, link)
      .then((content) => {
        const newCard = new Card(content, api, userId, zoomUrl);
        newCard.create();
        container.addCard(newCard)
        popupAdd.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAdd.renderLoading(false)
      });
  });

  formEditProfile.addEventListener('submit', (event) => {
    event.preventDefault();
    popupEdit.renderLoading(true)
    const username = formEditProfile.elements.name.value;
    const about = formEditProfile.elements.about.value;
    api.patchProfileData(username, about)
      .then((content) => {
        informationOnUser.setUserInfo(content.name, content.about)
        popupEdit.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupEdit.renderLoading(false);
      });
  });

  formEditProfileAvatar.addEventListener('submit', (event) => {
    event.preventDefault();
    popupAvatar.renderLoading(true)
    const link = formEditProfileAvatar.elements.link.value;
    api.patchProfileAvatar(link)
      .then((content) => {
        informationOnUser.setUserInfo(content.name, content.about, content.avatar)
        popupAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupAvatar.renderLoading(false)
      });
  });


})();

// Добрый день!

// Хорошая работа и очень классная работа над замечаниями!

// ## Итог

// - класс Api реализован согласно поставленной задаче
// - информация о пользователе  (имя, подпись и аватар) подгружаются с сервера (GET запрос)
// - имя и о себе можно отредактировать (отправляется PATCH запрос, новые данные)
// - карточки подгружаются с сервера (GET запрос)
// - обязательный функционал работает без багов
// - корректная работа с асинхронным кодом
// - DOM изменяется только после того, как запрос успешно выполнен
// - ошибки сервера обрабатываются
// - сделаны дополнительные задания!!!

// Работа принята!

// ## Можно лучше

// Большое количество параметров лучше передвать в метод или в конструктор через деструктуризацию.

// Например в коде:
// ~~~
// const newClass = new Class({ windowOne, userForm, popupObj })
// ~~~
// А внутри класса:
// ~~~
// constructor ({ userForm, popupObj, windowOne }) {...}
// ~~~
// И тогда порядок переменных будет неважен, это удобно

// Исправьте критические замечания и присылайте