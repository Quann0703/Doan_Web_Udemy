import html from "./html.js";
import courseItem from "./base/courseBase.js";
import * as homeRender from "./homeRender.js";
import { cartHome } from "./base/cartBase.js";
const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
async function Home() {
  const course = await homeRender.getCourse();
  return html`
    <div class="container__wrap">
      ${course.newCourse
        ? html`
            <div class="component__magin">
              <h2 class="home__page-section">Những khóa học mới</h2>
              <div class="row list__course">
                ${course.newCourse.map((data) => courseItem({ data: data }))}
              </div>
            </div>
          `
        : ""}
      ${course.courseTeach
        ? html`
            <div class="component__magin">
              <h2 class="home__page-section">
                Những khóa học của giáo viên : Jonas Schmedtmann
              </h2>
              <div class="row list__course">
                ${course.courseTeach.map((data) => courseItem({ data: data }))}
              </div>
            </div>
          `
        : ""}
      ${course.courseFree
        ? html`
            <div class="component__magin">
              <h2 class="home__page-section">Những khóa học miễn phí</h2>
              <div class="row list__course">
                ${course.courseFree.map((data) => courseItem({ data: data }))}
              </div>
            </div>
          `
        : ""}
      ${course.courseLanguage
        ? html`
            <div class="component__magin">
              <h2 class="home__page-section">
                Những khóa học có ngôn ngữ tiếng việt
              </h2>
              <div class="row list__course">
                ${course.courseLanguage.map((data) =>
                  courseItem({ data: data })
                )}
              </div>
            </div>
          `
        : ""}
      ${course.coursePro
        ? html`
            <div class="component__magin">
              <h2 class="home__page-section">Những khóa học mất phí</h2>
              <div class="row list__course">
                ${course.coursePro.map((data) => courseItem({ data: data }))}
              </div>
            </div>
          `
        : ""}
    </div>
  `;
}

async function cartRender() {
  totalFee();
  return html` ${cartItems.map((data) => cartHome({ data: data }))} `;
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

  const amountElements = document.querySelectorAll(".shop__total-chrage h2");
  amountElements.forEach((amountElement) => {
    amountElement.innerHTML = "Tổng: " + formattedFee;
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
totalFee();
function addCart(item) {
  console.log("Đang thêm vào giỏ hàng:", item);
  item.quantity = 1; // Đặt số lượng mặc định cho sản phẩm

  var cartItems = JSON.parse(localStorage.getItem("cart")) || []; // Lấy danh sách sản phẩm từ localStorage hoặc khởi tạo mảng rỗng nếu chưa có
  let existingItem = cartItems.find((x) => x.id === item.id); // Tìm sản phẩm đã tồn tại trong giỏ hàng

  if (existingItem) {
    // Nếu sản phẩm đã tồn tại trong giỏ hàng
    console.log("Sản phẩm đã tồn tại trong giỏ hàng.");
    // Bạn có thể cập nhật số lượng của sản phẩm đã tồn tại ở đây nếu cần
    // Ví dụ: existingItem.quantity += 1;
  } else {
    console.log("Thêm sản phẩm mới vào giỏ hàng.");
    // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm mới
    cartItems.push(item);
  }

  // Lưu danh sách sản phẩm đã cập nhật vào localStorage
  localStorage.setItem("cart", JSON.stringify(cartItems));
  console.log("Danh sách sản phẩm trong giỏ hàng:", cartItems);

  alert("Đã thêm vào giỏ hàng thành công!");
  let confirmAddtoCart = confirm("Bạn có muốn xem giỏ hàng không?");
  if (confirmAddtoCart) {
    window.location.replace("./cart.html");
  }
}
async function addToCart() {
  const courses = await homeRender.getAllCourse();
  setTimeout(() => {
    const courseList = document.querySelectorAll(".list__course");
    courseList.forEach((item) => {
      const courseItems = item.querySelectorAll(".course__index");
      courseItems.forEach((e) => {
        const btnAddtoCart = e.querySelectorAll("button.add-to-cart-butom");
        btnAddtoCart.forEach((ele) => {
          ele.onclick = () => {
            const course = courses.find((x) => x.id == ele.dataset.id);
            addCart(course);
          };
        });
      });
    });
  }, 1000);
}

function search() {
  const seachpress = document.querySelector(".seach__press");
  seachpress.addEventListener("click", function (event) {
    event.preventDefault();
    location.assign("/public/searchs.html");
  });
}

export { Home, addToCart, cartRender, search };
