export default class UserInfo {
    constructor({ name, about, avatar }) {
        this._name = document.querySelector(name);
        this._about = document.querySelector(about);
        this._avatar = document.querySelector(avatar);
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._about.textContent,
            avatar: this._avatar.src
        } 
    }

    setUserInfo({ name, about }) {
        this._name.textContent = name;
        this._about.textContent = about;
    }

    setUserAvatar({ avatar }) {
        this._avatar.src = avatar;
    }

    setInitialProfileInfo(data) {
        this._avatar.src = data.avatar;
        this._name.textContent = data.name;
        this._about.textContent = data.about;
    }
}