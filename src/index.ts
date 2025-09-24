import "../public/styles/const.css";
import "../public/styles/fonts.css";
import "../public/styles/global.css";
import "../public/styles/styled.css";

const app = document.getElementById("app");
const banner = document.querySelector(".banner");
const bannerClose = document.querySelector(".banner__close");

const handleClose = () => {
  if (app && banner) {
    banner.remove();
    app.innerText = "banner was removed";
  }
};

bannerClose?.addEventListener("click", handleClose, { once: true });
