import { API, broadcast } from "./util";

export default class FollowToggle {
  constructor(toggleButton) {
    // Your code here
    this.toggleButton = toggleButton
    this.toggleButton.addEventListener('click', this.handleClick.bind(this))

  }

  async handleClick(event) {
    // Your code here
    event.preventDefault()
    if (this.followState === 'followed') {
      this.unfollow()
    } else if (this.followState === 'unfollowed') {
      this.follow()
    }
  }

  async follow() {
    this.followState = "following"
    await API.followUser(this.toggleButton.dataset.userId)
    this.followState = "followed"
  }

  async unfollow() {
    this.followState = "unfollowing"
    await API.unfollowUser(this.toggleButton.dataset.userId)
    this.followState = "unfollowed"

  }

  render() {
    debugger
    switch (this.followState) {
      case "followed":
        this.toggleButton.removeAttribute("disabled");
        this.toggleButton.innerText = "Unfollow!";
        break;
      case "unfollowed":
        this.toggleButton.removeAttribute("disabled");
        this.toggleButton.innerText = "Follow!";
        break;
      case "following":
        this.toggleButton.disabled = true;
        this.toggleButton.innerText = "Following...";
        break;
      case "unfollowing":
        this.toggleButton.disabled = true;
        this.toggleButton.innerText = "Unfollowing...";
        break;
    }
  }

  get followState() {
    return this.toggleButton.dataset.followState;
  }

  set followState(newState) {
    this.toggleButton.dataset.followState = newState;
    this.render();
  }
}