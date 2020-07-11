export default class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  getProfileData() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: this.headers
    })
      .then((res) => this.resJson(res))
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: this.headers
    })
      .then((res) => this.resJson(res))
  }

  postAddCard(nameCard, linkImg) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: nameCard,
        link: linkImg
      })
    })
      .then((res) => this.resJson(res))
  }

  patchProfileData(username, about) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: username,
        about: about
      })
    })
      .then((res) => this.resJson(res))
  }

  patchProfileAvatar(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: link,
      })
    })
      .then((res) => this.resJson(res))
  }

  deleteCard(id) {
    return fetch(`${this.baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then((res) => this.resJson(res))
  }

  likeCard(id, isLiked) {
    (isLiked === true) ? this.method = 'DELETE' : this.method = 'PUT';
    return fetch(`${this.baseUrl}/cards/like/${id}`, {
      method: this.method,
      headers: this.headers
    })
      .then((res) => this.resJson(res))
  }

  resJson(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

}