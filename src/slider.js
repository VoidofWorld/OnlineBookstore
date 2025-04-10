export default class Slider {
  constructor() {
      this.sliderImages = document.querySelector(".contentSlider__slider_images");
      this.sliderDots = document.querySelector(".contentSlider__slider_dots");
      this.images = [
          { url: "./image/banner1.jpg" },
          { url: "./image/banner2.jpg" },
          { url: "./image/banner3.jpg" }
      ];
      
      if (!this.sliderImages || !this.sliderDots) {
        console.error("Элементы слайдера не найдены!");
        return;
      }
      
      this.currentIndex = 0;
      this.intervalTime = 5000;
      
      this.initSlider();
  }

  initSlider() {
      if (!this.images.length) return;
      this.initImages();
      this.initDots();
      this.startAutoSlide();
  }

  initImages() {
      this.sliderImages.innerHTML = "";
      this.images.forEach((image, index) => {
          const imageDiv = `<div class="contentSlider__slider_image n${index} ${index === 0 ? "active" : ""}" 
              style="background-image: url(${image.url});" 
              data-index="${index}"></div>`;
          this.sliderImages.insertAdjacentHTML("beforeend", imageDiv);
      });
  }

  initDots() {
      this.sliderDots.innerHTML = "";
      this.images.forEach((_, index) => {
          const dot = `<div class="contentSlider__dot n${index} ${index === 0 ? "active" : ""}" data-index="${index}"></div>`;
          this.sliderDots.insertAdjacentHTML("beforeend", dot);
      });
      
      this.sliderDots.querySelectorAll(".contentSlider__dot").forEach(dot => {
          dot.addEventListener("click", () => {
              this.moveSlider(parseInt(dot.dataset.index));
            this.resetAutoSlide();
          });
      });
  }

  moveSlider(num) {
      const currentActiveImage = this.sliderImages.querySelector(".active");
      const newActiveImage = this.sliderImages.querySelector(`.n${num}`);
      
      if (currentActiveImage) currentActiveImage.classList.remove("active");
      if (newActiveImage) newActiveImage.classList.add("active");
      
      const currentActiveDot = this.sliderDots.querySelector(".active");
      const newActiveDot = this.sliderDots.querySelector(`.n${num}`);
      
      if (currentActiveDot) currentActiveDot.classList.remove("active");
      if (newActiveDot) newActiveDot.classList.add("active");
      
      this.currentIndex = num;
  }
  
   startAutoSlide() {
       this.autoSlideInterval = setInterval(() => {
          this.currentIndex = (this.currentIndex + 1) % this.images.length;
          this.moveSlider(this.currentIndex);
      }, this.intervalTime);
  }
  
  resetAutoSlide() {
      clearInterval(this.autoSlideInterval);
      this.startAutoSlide();
  }
}