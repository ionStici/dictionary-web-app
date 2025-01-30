import styles from "./../../styles/message.module.scss";
import { createElement } from "../abstract/utilities";

const Message = createElement("section", [styles.message, "opacity_0"]);
const emoji = createElement("p", [styles.message__emoji]);
const title = createElement("h2", [styles.message__title]);
const text = createElement("p", [styles.message__text]);

Message.append(emoji, title, text);
Message.hidden = true;

const setNoDefMessage = () => {
  emoji.textContent = "😕";
  title.textContent = "No Definitions Found";
  text.textContent = `Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead.`;
};

const setWelcomeMessage = () => {
  emoji.textContent = "📚";
  title.textContent = "Hello there! 👋";
  text.innerHTML = `
        <span>Dictionary Web App with theme and font switching options!</span>
        <ul class="${styles.link_wrapper}">
            <li><a class="${styles.link}" href="https://github.com/ionStici/dictionary-web-app-fem" target="_blank">🔗 GitHub Repository</a></li>
            </ul>
            `;
  // <li><a class="${styles.link}" href="https://www.frontendmentor.io/solutions/dictionary-web-app-Ji-SfmA06-" target="_blank">🔗 Frontend Mentor Link</a></li>
  // <li><a class="${styles.link}" href="https://twitter.com/ionStici_" target="_blank">🔗 Author Twitter Account</a></li>
};

export { setNoDefMessage, setWelcomeMessage };
export default Message;
