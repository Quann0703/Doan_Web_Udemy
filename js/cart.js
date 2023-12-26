import html from "./html.js";
import { cartItem } from "./base/cartBase.js";
const listCart = document.querySelector(".style__shoping-list-wrapper");
// load cart data from localStorage
const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const totalcourse = document.querySelector(".style__shoping-list-title");
console.log(totalcourse);
totalcourse.innerHTML = cartItems.length + "\tkhóa học trong giỏ hàng";

async function cartRender() {
  return html` ${cartItems.map((data) => cartItem({ data: data }))} `;
}
setTimeout(() => {
  function totalFee() {
    if (cartItems != []) {
      let handlefee = cartItems.reduce((fee, curentfee) => {
        return fee + Number(curentfee.feeCourse.replace(/\./g, ""));
      }, 0);
      console.log(handlefee);
      const amount = document.querySelector(".total-part span");
      amount.innerHTML =
        "đ\t" + handlefee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  }
  totalFee();
  function removeItem(index) {
    let confirmRemove = confirm("Bạn có muốn xóa khỏi giỏ hàng không?");
    if (confirmRemove) {
      // Lấy danh sách sản phẩm từ localStorage
      let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

      // Xóa sản phẩm tại index được chỉ định
      cartItems.splice(index, 1);

      // Cập nhật lại danh sách sản phẩm trong localStorage
      localStorage.setItem("cart", JSON.stringify(cartItems));

      // Tải lại trang để cập nhật giao diện giỏ hàng
      location.reload();
    }
  }

  const actionRemove = document.querySelectorAll(".action__remove");
  actionRemove.forEach((item, index) => {
    item.onclick = () => {
      console.log(index); // Hiển thị chỉ số của sản phẩm cần xóa
      removeItem(index);
    };
  });
}, 1000);

async function LoadCart() {
  listCart.innerHTML = await cartRender();
}
LoadCart();
