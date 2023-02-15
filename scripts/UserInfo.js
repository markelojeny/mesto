export default class UserInfo {
    constructor({ name, about }) {
        this._name = document.querySelector(name);
        this._about = document.querySelector(about);
    }

    getUserInfo() {
        this._data = {
            profileNickname: this._name.textContent,
            profileAbout: this._about.textContent
        } 

        return this._data;
    }

    setUserInfo({ inputName, inputAbout }) {
        this._name.textContent = inputName;
        this._about.textContent = inputAbout;
    }
}