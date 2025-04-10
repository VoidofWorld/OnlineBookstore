export default class Basket {
    constructor() {
        this.basket = document.getElementById("basket");
        this.badge = document.querySelector(".badge");
        this.cartItems = this.loadFromLocalStorage();
        this.updateBadge();
    }

    init() {
        document.addEventListener("click", (e) => {
            if (e.target && e.target.classList.contains("buy")) {
                const card = e.target.closest(".contentContainer__bookCards_card");
                const title = card.querySelector(".title").textContent;

                if (this.isInBasket(title)) {
                    this.removeFromBasket(title);
                    e.target.textContent = "buy now";
                } else {
                    const author = card.querySelector(".author").textContent;
                    const price = card.querySelector(".price").textContent;
                    const imageStyle = card.querySelector(".imageTitle").style.backgroundImage;
                    const image = imageStyle.slice(5, -2);

                    this.addToBasket({ title, author, price, image });
                    e.target.textContent = "in the cart";
                }

                this.saveToLocalStorage();
                this.updateBadge();
            }
        });
    }

    isInBasket(title) {
        return this.cartItems.some(item => item.title === title);
    }

    addToBasket(book) {
        this.cartItems.push(book);
    }

    removeFromBasket(title) {
        this.cartItems = this.cartItems.filter(item => item.title !== title);
    }

    updateBadge() {
        const count = this.cartItems.length;
        this.badge.textContent = count;
        this.badge.style.display = count > 0 ? "inline-block" : "none";
    }

    saveToLocalStorage() {
        localStorage.setItem("cartItems", JSON.stringify(this.cartItems));
    }

    loadFromLocalStorage() {
        const data = localStorage.getItem("cartItems");
        return data ? JSON.parse(data) : [];
    }
}
