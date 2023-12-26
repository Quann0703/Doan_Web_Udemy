import handlepayment from "./handlePayment.js";
import html from "./html.js";
import { cartPayment } from "./base/cartBase.js";
const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const oderlist = document.querySelector(".oder__list");
const btnbougth = document.querySelector(".btn__bougth");

handlepayment();

function cartRender() {
  totalFee();
  return html` ${cartItems.map((data) => cartPayment({ data: data }))} `;
}

function totalFee() {
  if (cartItems.length === 0) {
    return; // Nếu giỏ hàng rỗng, không cần tính toán hoặc cập nhật gì cả
  }

  let handlefee = cartItems.reduce((fee, curentfee) => {
    return fee + Number(curentfee.feeCourse.replace(/\./g, ""));
  }, 0);

  const formattedFee = handlefee.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const totalpayment = document.querySelector(".total__payment");
  if (totalpayment) {
    totalpayment.innerHTML = formattedFee;
  }

  const totalcurent = document.querySelector(".total__curent");
  if (totalcurent) {
    totalcurent.innerHTML = formattedFee;
  }
}
function paymentCourse() {
  btnbougth.onclick = () => {
    localStorage.removeItem("cart");
    location.reload();
  };
}
setTimeout(() => {
  paymentCourse();
}, 1000);

function LoadHome() {
  oderlist.innerHTML = cartRender();
}
LoadHome();
