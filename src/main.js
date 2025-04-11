import "./styles.scss";
import Basket from "./basket";
import BookCards from "./bookСards";
import Slider from "./slider";

class Main {
constructor() {
    this.slider = new Slider();
    this.basket = new Basket ();
    this.bookCards = new BookCards(this.basket);
    this.basket.init();
}
}
document.addEventListener("DOMContentLoaded", function () {
    new Main(); 
});
