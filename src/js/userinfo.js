export default class UserInfo {
  constructor({ avatarElement, usernameElement, aboutElement }) {
    this.avatarElement = avatarElement;
    this.usernameElement = usernameElement;
    this.aboutElement = aboutElement;
  }

  setUserInfo(username, about, avatar = null) {
    this._username = username;
    this._about = about;
    this._avatar = avatar;
    this.updateUserInfo();
  }

  getUserInfo() {
    this._userData = {
      username: this._username,
      about: this._about,
      avatarLink: this._avatar
    }
    return this._userData;
  }

  updateUserInfo() {
    this.usernameElement.textContent = this._username;
    this.aboutElement.textContent = this._about;
    if (this._avatar != null) {
      this.avatarElement.style.backgroundImage = `url('${this._avatar}')`;
    }
  }
}
