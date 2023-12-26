const hd_login = document.querySelector(".hd__login");
const profile = document.querySelector(".sub_login_wrap");
const body = document.querySelector("body");
const hd__teching = document.querySelector(".hd__teching-udemy");
const hd__business = document.querySelector(".hd__business-udemy");
const business__wrap = document.querySelector(".business__wrap");
const teching__wrap = document.querySelector(".teching__wrap");
const hd__process = document.querySelector(".hd__process-udemy");
const process__wrap = document.querySelector(".process__wrap");
const hd__heart = document.querySelector(".hd_action-icon .hd__heart");
const heart__wrap = document.querySelector(".heart__warp");
const hd__shop = document.querySelector(".hd_action-icon .hd__shop");
const shop__wrap = document.querySelector(".shop__warp");
const hd__bell = document.querySelector(".hd_action-icon .hd__bell");
const bell__wrap = document.querySelector(".bell__warp");

var isProfileVisible = false;

function handleheader() {
  hd_login.addEventListener("click", () => {
    if (!isProfileVisible) {
      // Nếu hiện tại không hiển thị, thì hiển thị lên
      profile.style.cssText = "visibility: visible; opacity: 1;";
      isProfileVisible = true;
    } else {
      // Nếu hiện tại đã hiển thị, thì ẩn đi
      profile.style.cssText = "visibility: hidden; opacity: 0;";
      isProfileVisible = false;
    }
  });

  body.addEventListener("click", (e) => {
    if (e.target.closest(".hd__login") === hd_login) {
      return;
    }
    // if (e.target.closest('.hd__business-udemy') === hd__business){
    //     return
    // }
    // if(ishdbusinessVisible){
    //     business__wrap.style.cssText = "visibility: hidden; opacity: 0;";
    //     isProfileVisible = false;
    // }
    if (isProfileVisible) {
      profile.style.cssText = "visibility: hidden; opacity: 0;";
      isProfileVisible = false;
    }
  });
  // hd__business.addEventListener("click", () => {
  //     if (!ishdbusinessVisible) {
  //         business__wrap.style.cssText = "visibility: visible; opacity: 1;";
  //         ishdbusinessVisible = true;
  //     } else {
  //         business__wrap.style.cssText = "visibility: hidden; opacity: 0;";
  //         ishdbusinessVisible = false;
  //     }
  // });
  //Sự kiện hover hd__business
  hd__business.addEventListener("mouseover", () => {
    business__wrap.style.cssText = "visibility: visible; opacity: 1;";
  });

  hd__business.addEventListener("mouseout", () => {
    business__wrap.style.cssText = "visibility: hidden; opacity: 0;";
  });
  //Sự kiện hover hd__teching
  hd__teching.addEventListener("mouseover", () => {
    teching__wrap.style.cssText = "visibility: visible; opacity: 1;";
  });

  hd__teching.addEventListener("mouseout", () => {
    teching__wrap.style.cssText = "visibility: hidden; opacity: 0;";
  });
  // Sự kiện hover process
  hd__process.addEventListener("mouseover", () => {
    process__wrap.style.cssText = "visibility: visible; opacity: 1;";
  });

  hd__process.addEventListener("mouseout", () => {
    process__wrap.style.cssText = "visibility: hidden; opacity: 0;";
  });
  // sự kiện nhấn heart
  hd__heart.addEventListener("mouseover", () => {
    heart__wrap.style.cssText = "visibility: visible; opacity: 1;";
  });

  hd__heart.addEventListener("mouseout", () => {
    heart__wrap.style.cssText = "visibility: hidden; opacity: 0;";
  });
  // sự kiện nhấn giỏ hàng
  hd__shop.addEventListener("mouseover", () => {
    shop__wrap.style.cssText = "visibility: visible; opacity: 1;";
  });

  hd__shop.addEventListener("mouseout", () => {
    shop__wrap.style.cssText = "visibility: hidden; opacity: 0;";
  });
  //sự kiện nhấn thông báo
  hd__bell.addEventListener("mouseover", () => {
    bell__wrap.style.cssText = "visibility: visible; opacity: 1;";
  });

  hd__bell.addEventListener("mouseout", () => {
    bell__wrap.style.cssText = "visibility: hidden; opacity: 0;";
  });
}
export default handleheader;
