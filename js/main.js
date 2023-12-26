import handleEven from "./handleEven.js";
import { Home, addToCart, cartRender, search } from "./course.js";

const HomeWrap = document.querySelector(".homeCourse");
const CartHome = document.querySelector(".listCart-home");
handleEven();
async function LoadHome() {
  HomeWrap.innerHTML = await Home();
  CartHome.innerHTML = await cartRender();
}
LoadHome();
addToCart();
search();
