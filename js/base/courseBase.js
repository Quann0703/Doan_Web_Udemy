import html from "../html.js";
import { formatNumber } from "../formData.js";

function courseItem({ data }) {
  return html`
    <div
      class="col l-2-4 m-5 course__index coures__active"
      href="/public/coursedetails.html?id={{x.courseID}}"
    >
      <div class="course__detail-hover-wrrap">
        <div class="course__detail-hover">
          <h3 class="course__title-detail">${data.title}</h3>
          <div class="detailcourse__courseRating-enrollmeant">
            <div class="elementItem">
              <div class="course__badges-bestseller">Bán chạy nhất</div>
            </div>
            <div class="elementItem row">
              <a href="" class="style__ratings-wapper">
                <span class="star__ratings-number rating-magin"
                  >${data.rate}</span
                >
                <div class="list__star-ratings rating-magin">
                  <i
                    class="fa-solid fa-star star__hover-detail"
                    style="color: #f69c08"
                  ></i>
                  <i
                    class="fa-solid fa-star star__hover-detail"
                    style="color: #f69c08"
                  ></i>
                  <i
                    class="fa-solid fa-star star__hover-detail"
                    style="color: #f69c08"
                  ></i>
                  <i
                    class="fa-solid fa-star star__hover-detail"
                    style="color: #f69c08"
                  ></i>
                  <i
                    class="fa-solid fa-star star__hover-detail"
                    style="color: #f69c08"
                  ></i>
                </div>
                <span class="course-rank">${data.places}</span>
              </a>
            </div>
          </div>
          <div class="buy__box-item buy-box-add-to-cart-butonn-wapper">
            <button data-id="${data.id}" class="add-to-cart-butom">
              Thêm vào giỏ hàng
            </button>

            <button class="add-to-dream-button">
              <i class="fa-solid fa-heart heart-dream"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="course__item-wrap">
        <a href="./coursedetails.html?id=${data.id}" class="detail__link">
          <div>
            <div class="course__item-img">
              <img class="item-img" src="${data.courseImg}" alt="" />
            </div>
            <h3 class="course__item-item">${data.title}</h3>
            <p class="course__item-teacher">${data.teach}</p>
            <div class="course__item-price-text">
              <div class="course__item-price-text-cost">
                <span class="course__item-price-text-persent"
                  >Giá hiện tại</span
                >
                <span>${formatNumber(data.feeCourse)}</span>
              </div>
              <div class="course__item-price-text">
                <div class="course__item-price-text-cost">
                  <span class="course__item-price-text-persent">Giá gốc</span>
                  <s>
                    <span class="course__item-price-text-persent-fee"
                      >₫&nbsp;2.399.000</span
                    >
                  </s>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  `;
}
export default courseItem;
