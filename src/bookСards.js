export default class BookCards{
    constructor(basket) {
        this.basket = basket;
        this.container = document.querySelector(".contentContainer__bookCards");
        this.btnLoad = document.querySelector(".contentContainer__btnLoad");
        this.maxResults = 6;
        this.startIndex = 0;
        this.currentQuery = "Architecture";
        this.API_KEY = "AIzaSyBhwSU5oWcZJUuZ47O8AsM5DC1TPiVSOEE";
        this.initQuerySelection()
  
    }

    initQuerySelection() {
        const choiceQuery = document.querySelectorAll(".catalog__items_item");
        if (choiceQuery.length === 0) return;
        choiceQuery[0].classList.add("active");
        const defaultQuery = choiceQuery[0].textContent.trim();
        this.fetchBooks(defaultQuery);

        choiceQuery.forEach((item) => {
            item.addEventListener("click", () => {
                choiceQuery.forEach((el) => el.classList.remove("active"));
                item.classList.add("active");
                const selectedQuery = item.textContent.trim();
                this.currentQuery = selectedQuery;
                this.startIndex = 0;
                this.container.innerHTML = "";
                this.fetchBooks(selectedQuery);
            });
        });

        if (this.btnLoad) {
            this.btnLoad.addEventListener("click", () => this.fetchBooks(this.currentQuery));
          }
    }

    async fetchBooks(selectedQuery) {

        console.log("startIndex:", this.startIndex, "maxResults:", this.maxResults);
        if (this.startIndex === undefined || this.maxResults === undefined) {
            console.error("startIndex or maxResults is undefined!");
            return;
        }

        try {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${selectedQuery}&startIndex=${this.startIndex}&maxResults=${this.maxResults}&key=${this.API_KEY}`);
            console.log(response)
            const data = await response.json();
            this.renderBookCards(data.items);
            this.startIndex += this.maxResults;
        } catch (error) {
            console.error("Ошибка загрузки данных из Google Books API:", error);
        }
    }

    renderBookCards(books){

        if (!books || books.length === 0) {
            this.container.innerHTML = "<p>Книги не найдены</p>";
            return;
        }
    
        books.forEach((book) => {
            const info = book.volumeInfo || {};
            const saleInfo = book.saleInfo || {};
            
            const image = info.imageLinks?.thumbnail || "./image/book-placeholder.jpg";
            const authors = info.authors ? info.authors.join(", ") : "Unknown Author";
            const title = info.title || "No Title";
            const averageRating = this.generateStarRating(info.averageRating);
            const ratingsCount = info.ratingsCount ? `${info.ratingsCount} review` : "";
            const description = info.description ? info.description.substring(0, 100) + "..." : "No description";
            const price = saleInfo.retailPrice ? `$${saleInfo.retailPrice.amount}` : "";
            const isInBasket = this.basket.isInBasket(title);
            const btnBuy = isInBasket ? "in the cart" : "buy now";

            const bookCardElement = document.createElement("div");
            bookCardElement.className = "contentContainer__bookCards_card"
            bookCardElement.innerHTML = `
                <div class="imageTitle" style="background-image: url('${image}');"></div>
                <div class="descriptionBook">
                    <div class="author">${authors}</div>
                    <div class="title">${title}</div>
                    <div class="averageRating">${averageRating}</div>
                    <div class="ratingCount">${ratingsCount}</div>
                    <div class="description">${description}</div>
                    <div class="price">${price}</div>
                    <button class="buy">${btnBuy}</button>
                </div>`;
            
            this.container.append(bookCardElement)
        })
    }

    generateStarRating(rating) {
        if (!rating) return "";
        const roundedRating = Math.round(rating);
        let stars = "";
        for (let i = 1; i <= 5; i++) {
            const starClass = i <= roundedRating ? "star filled" : "star empty";
            stars += `<span class="${starClass}">★</span>`;
        }
        return `<div class="star-rating">${stars}</div>`;
    }
}
