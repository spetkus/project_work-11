class CardList {

  constructor(container) {
    this.container = container;
  }

  addCard(card) {
    this._card = card;
    this.container.appendChild(this._card.cardElement);
    this._card.setEventListeners();
  }

  render(array) {
    this.cardArray = array;
    this.cardArray.forEach(item => {
      this.addCard(item);
    });
  }

}