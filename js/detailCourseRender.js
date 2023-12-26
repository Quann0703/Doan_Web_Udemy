import fetchApi from "./fetchAPI.js";
import handledetailCourse from "./detailcourse.js";
import html from "./html.js";
import { formatNumber } from "./formData.js";

const detailCourse__render = document.querySelector(".detailCourse__render");
const infomation__render = document.querySelector(".information__course");
const urlObject = new URL(window.location.href);
const id = urlObject.searchParams.get("id");

const getCourse = async function () {
  const response = await fetchApi.get("/course");
  return await response.json();
};

async function detailCourse() {
  const courses = await getCourse();
  const course = courses.find((x) => x.id == id);
  console.log(course);
  return html`
    <div class="detailcoures__wapper">
      <h1 class="coursedetail__courseName">${course.title}</h1>
      <div class="coursedetail__textcontent">${course.describe}</div>
      <div class="detailcourse__courseRating-enrollmeant">
        <div class="elementItem">
          <div class="course__badges-bestseller">Bán chạy nhất</div>
        </div>
        <div class="elementItem row">
          <a href="" class="style__ratings-wapper">
            <span class="star__ratings-number rating-magin">
              ${course.rate}
            </span>
            <div class="list__star-ratings row rating-magin">
              <i class="fa-solid fa-star" style="color: #f69c08"></i>
              <i class="fa-solid fa-star" style="color: #f69c08"></i>
              <i class="fa-solid fa-star" style="color: #f69c08"></i>
              <i class="fa-solid fa-star" style="color: #f69c08"></i>
              <i class="fa-solid fa-star" style="color: #f69c08"></i>
            </div>
            <span class="course-rank">(5880 xếp hạng)</span>
          </a>
          <div class="erollment">47.490 học viên</div>
        </div>
      </div>
      <div class="detailcourse__course-item">
        <div class="intructor-link">
          <span class="instructor-name">
            <span class="instructor-text">Được tạo bởi</span>
            <a href="" class="link__instructor-heading"> ${course.teach} </a>
          </span>
        </div>
      </div>
    </div>
  `;
}

async function detailInformation() {
  const courses = await getCourse();
  const course = courses.find((x) => x.id == id);
  return html`
    <div class="sidebar__container-context">
      <div class="sidebar__container-introduction-asset">
        <div class="intro__asset-wrapper">
          <div class="intro__asset">
            <button
              type="button"
              class="intro-asset--placeholder"
              aria-label="Phát video xem trước khóa học"
            >
              <span class="intro-asset--img-aspect">
                <img
                  class="intro-asset--img"
                  src="${course.courseImg}"
                  alt=""
                />
              </span>
              <span class="intro-asset-overlay cover-overlay"></span>
              <span class="intro-play-overlay">
                <i class="fa-regular fa-circle-play icon-play"></i>
              </span>
              <span class="intro-asset-overlay intro-asset-text">
                xem trước khóa học này
              </span>
            </button>
          </div>
        </div>
      </div>
      <div class="sideber__container-purchase-section">
        <div class="purchase__section-container">
          <div class="purchase__section-generic">
            <div class="purchase__section-buy-boxman">
              <div class="buy-buy-box-main">
                <div class="buy__box-item"></div>
                <div class="buy__box-item">
                  <div class="price__text-container">
                    <div class="price__text-part">
                      <span class="ud-sr-only">Giá hiện tại</span>
                      <span>
                        <span class="courseFee">
                          ${formatNumber(course.feeCourse)}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="buy__box-item buy-box-discount">
                  <span>Giảm 86%</span>
                </div>
                <div class="buy__box-item buy-box-add-to-cart-butonn-wapper">
                  <div class="add-to-cart">
                    <button class="add-to-cart-butom">Thêm vào giỏ hàng</button>
                  </div>
                  <div class="add-to-dream">
                    <button class="add-to-dream-button">
                      <i class="fa-solid fa-heart heart-dream"></i>
                    </button>
                  </div>
                </div>
                <div class="buy__box-item buy-botton">
                  <span>Mua ngay</span>
                </div>
              </div>
            </div>
            <div class="purchase__section-local-incentive">
              <div class="money__back-guarantee">
                <span class="money-back">Đảm bảo hoàn tiền trong 30 ngày</span>
              </div>
            </div>
            <div class="purchase__section-available-coupons"></div>
            <div class="purchase__section-local-incentive">
              <div class="incentive__hide-on-tablet">
                <div class="incentive__container">
                  <h2 class="incentive__header">Khóa học này bảo gồm:</h2>
                  <ul class="incentive-list">
                    <li>
                      <div class="incentive__list-item">
                        <i class="fa-solid fa-tv incentive-icon"></i>
                        <div class="incentive__list-item-content">
                          <span>67 giờ video theo yêu cầu</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="incentive__list-item">
                        <i class="fa-regular fa-file incentive-icon"></i>
                        <div class="incentive__list-item-content">
                          <span>6 Bài viết</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="incentive__list-item">
                        <i
                          class="fa-solid fa-file-arrow-down incentive-icon"
                        ></i>
                        <div class="incentive__list-item-content">
                          <span>1 Tài nguyên có thể tải xuống</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="incentive__list-item">
                        <i class="fa-solid fa-mobile incentive-icon"></i>
                        <div class="incentive__list-item-content">
                          <span>Truy cập trên thiết bị di động và TV</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="incentive__list-item">
                        <i class="fa-solid fa-infinity incentive-icon"></i>
                        <div class="incentive__list-item-content">
                          <span>Truy cập suốt đời</span>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div class="incentive__list-item">
                        <i class="fa-solid fa-award incentive-icon"></i>
                        <div class="incentive__list-item-content">
                          <span>Giấy chứng nhận hoàn thành</span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="purchase__section-ctas">
              <div class="purchase__section-wrapper">
                <div class="purchase__section-multiple">
                  <button class="purchase__section-share">
                    <span>Chia sẻ</span>
                  </button>
                  <a href="" class="purchase__section-link-gift">
                    <span>Tặng khóa học này</span>
                  </a>
                  <button class="purchase__setion-coupon">
                    <span>Áp Dụng cuopon</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

async function LoadDetail() {
  detailCourse__render.innerHTML = await detailCourse();
  infomation__render.innerHTML = await detailInformation();
}
LoadDetail();
handledetailCourse();
