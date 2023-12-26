import html from "../html.js";
import { formatNumber } from "../formData.js";

function cartItem({ data }) {
  return html`
    <div class="style__shoping-item-wrapper">
      <div class="shoping__item-container shoping__item-with-inline">
        <div class="shoping__item-img">
          <div class="shoping__item-img-wrapper">
            <img
              class="shopping-item--course-image"
              src="${data.courseImg}"
              alt=""
              height="68"
              width="120"
              loading="lazy"
            />
          </div>
        </div>
        <div class="shoping__item-header">
          <h3 class="shopping-item--course-title">
            <a href=""> ${data.title} </a>
          </h3>
          <div class="shoping__item-instructor">
            <span class="shopping-item--instructor-list"> ${data.teach} </span>
          </div>
        </div>
        <div class="shoping__item-badges">
          <div class="course__badges-best-sales">Bán chạy nhất</div>
        </div>
        <div class="shoping__item-rating">
          <div class="star__rating-warrper">
            <span class="star__rating-rank"> ${data.rate} </span>
            <i class="fa-solid fa-star" style="color: #f69c08"></i>
            <i class="fa-solid fa-star" style="color: #f69c08"></i>
            <i class="fa-solid fa-star" style="color: #f69c08"></i>
            <i class="fa-solid fa-star" style="color: #f69c08"></i>
            <i class="fa-solid fa-star" style="color: #f69c08"></i>
            <span class="shoping__item-review"> (${data.places}) </span>
          </div>
        </div>
        <div class="shoping__item-meta">
          <span class="item-meta-hourse">Tổng số 18.5 giờ • </span>
          <span class="item-meta-number-lesson">140 bài giảng • </span>
          <span class="item-meta-level">Tất cả trình độ</span>
        </div>
        <div class="shoping__item-action">
          <button data-id="${data.id}" type="button" class="action__remove">
            <span>Xóa</span>
          </button>
          <button type="button" class="action__saves-for-later">
            <span>Lưu để mua sau</span>
          </button>
          <button type="button" class="action__action-move-wishlist">
            <span>Chuyển vào danh sách mong ước</span>
          </button>
        </div>
        <div class="shoping__item-price">
          <div class="shoping__price-discount">
            <div class="shoping__price-part">
              <span><span> ₫&nbsp;${formatNumber(data.feeCourse)} </span></span>
            </div>
            <div class="shoping__price-curent">
              <span
                ><s><span>₫&nbsp;2.399.000</span></s></span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
function cartHome({ data }) {
  return html`
    <div class="shop__like">
      <div class="shop__like-img">
        <img src="${data.courseImg}" alt="" />
      </div>
      <div class="shop__like-titile">
        <h3>${data.title}</h3>
        <p>${data.teach}</p>
        <h4>${formatNumber(data.feeCourse)}</h4>
      </div>
    </div>
    <hr />
  `;
}

function cartPayment({ data }) {
  return `
    <li  class="oder__item">
      <div class="oder__item-summary">
        <img
          src="${data.courseImg}"
          width="50"
          height="50"
          class="order-items-list--shopping-list-item-img"
        />
        <span>${data.title}</span>
      </div>
      <div class="oder__item-price">
        <div class="item-price">
          <span>₫&nbsp;${formatNumber(data.feeCourse)}</span>
        </div>
      </div>
    </li>
  `;
}
export { cartItem, cartHome, cartPayment };
