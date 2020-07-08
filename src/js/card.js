export default class Card {

  constructor(cardData, api, userId, zoomUrl) {
    this.name = cardData.name;
    this.link = cardData.link;
    this.likes = cardData.likes;
    this.cardId = cardData._id;
    this.ownerId = cardData.owner._id;
    this.userId = userId;
    this.zoomUrl = zoomUrl;
    this._api = api;
  }

  create() {

    const templateCard = `
        <div class="place-card">
          <div class="place-card__image"></div>
          <button class="place-card__delete-icon"></button>
          <div class="place-card__description">
            <h3 class="place-card__name"></h3>
            <div class="place-card__like-container">
              <button class="place-card__like-icon"></button>
              <span class="place-card__like-count"></span>
            </div>
          </div>
        </div>`;

    const assemblyCard = document.createElement('div');
    assemblyCard.insertAdjacentHTML('afterbegin', templateCard);

    const dataCard = assemblyCard.firstElementChild;
    dataCard.querySelector('.place-card__name').textContent = this.name;
    dataCard.querySelector('.place-card__image').style.backgroundImage = `url(${this.link})`;
    dataCard.querySelector('.place-card__image').dataset.img = this.link;
    dataCard.querySelector('.place-card__like-count').textContent = this.likes.length;

    this.likeIcon = dataCard.querySelector('.place-card__like-icon');
    this.deleteIcon = dataCard.querySelector('.place-card__delete-icon');
    this.zoomImage = dataCard.querySelector('.place-card__image');

    if (this.userId != this.ownerId) {
      dataCard.querySelector('.place-card__delete-icon').remove()
    }

    if (this.likes.length > 0) {
      const likeMe = this.likes.filter((el) => { return el._id === this.userId });
      if (likeMe.length) {
        this.likeIcon.classList.toggle('place-card__like-icon_liked')
      }
    }

    this.cardElement = dataCard;

    return dataCard;
  }

  like = () => {
    const likeSet = (this.likeIcon.classList.contains("place-card__like-icon_liked")) ? true : false;
    this._api.likeCard(this.cardId, likeSet)
      .then((content) => {
        this.cardElement.querySelector('.place-card__like-count').textContent = content.likes.length;
        this.likeIcon.classList.toggle('place-card__like-icon_liked');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  zoom = () => {
    this.zoomUrl(this.link)
  }

  remove = () => {
    if (confirm('Вы действительно хотите удалить карточку?')) {
      this._api.deleteCard(this.cardId)
        .then(() => {
          this.cardElement.closest('.place-card').remove();
          this.removeEventListeners();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  setEventListeners() {
    this.deleteIcon.addEventListener('click', this.remove);
    this.likeIcon.addEventListener('click', this.like);
    this.zoomImage.addEventListener('click', this.zoom);
  }

  removeEventListeners() {
    this.deleteIcon.removeEventListener('click', this.remove);
    this.likeIcon.removeEventListener('click', this.like);
    this.zoomImage.removeEventListener('click', this.zoom);
  }

}
