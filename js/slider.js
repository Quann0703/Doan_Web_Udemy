const silder = document.querySelector(".slider");
const silderMain = document.querySelector(".slider-main");
const silderItems = document.querySelectorAll(".slider-item");
const nextBtn = document.querySelector(".slider-next");
const prevBtn = document.querySelector(".slider-prev");
const dotItems = document.querySelectorAll(".slider-dot-item");
const silderLenght = silderItems.length;
let positionX = 0;
let index = 0;

function handleSlider() {
  const sliderItemWith = silderItems[0].offsetWidth;
  nextBtn.addEventListener("click", () => {
    handlechangeSlide(1);
  });
  prevBtn.addEventListener("click", () => {
    handlechangeSlide(-1);
  });
  [...dotItems].forEach((item) => {
    item.addEventListener("click", (e) => {
      [...dotItems].forEach((el) => {
        el.classList.remove("active");
      });
      e.target.classList.add("active");
      const slideIndex = parseInt(e.target.dataset.index);
      index = slideIndex;
      positionX = -1 * index * sliderItemWith;
      silderMain.style = `transform: translateX(${positionX}px)`;
    });
  });
  setInterval(() => {
    if (index == silderLenght - 1) {
      index = 0;
      positionX = -1 * index * sliderItemWith;
      silderMain.style = `transform: translateX(0px)`;
      [...dotItems].forEach((el) => {
        el.classList.remove("active");
      });
      dotItems[index].classList.add("active");
    } else {
      index++;
      positionX = -1 * index * sliderItemWith;
      silderMain.style = `transform: translateX(${positionX}px)`;
      [...dotItems].forEach((el) => {
        el.classList.remove("active");
      });
      dotItems[index].classList.add("active");
    }
  }, 5000);
  function handlechangeSlide(direction) {
    if (direction === 1) {
      ++index;
      console.log(index);
      if (index > silderLenght - 1) {
        index = 0;
        silderMain.style = `transform: translateX(0px)`;
        [...dotItems].forEach((el) => {
          el.classList.remove("active");
        });
        dotItems[index].classList.add("active");
        return;
      }
      positionX = -1 * index * sliderItemWith;
      silderMain.style = `transform: translateX(${positionX}px)`;
    } else if (direction === -1) {
      --index;
      if (index < 0) {
        console.log(index);
        index = silderLenght - 1;
        positionX = -1 * index * sliderItemWith;
        silderMain.style = `transform: translateX(${positionX}px)`;
        [...dotItems].forEach((el) => {
          el.classList.remove("active");
        });
        dotItems[index].classList.add("active");
        return;
      }
      positionX = -1 * index * sliderItemWith;
      silderMain.style = `transform: translateX(${positionX}px)`;
    }
    [...dotItems].forEach((el) => {
      el.classList.remove("active");
    });
    dotItems[index].classList.add("active");
  }
}
export default handleSlider;
