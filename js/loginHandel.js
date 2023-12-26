import fetchAPI from "./fetchAPI.js";
import storage from "./storage.js";

const login = async (data) => {
  // /api-user/Account/login
  const response = await fetchAPI.get("/account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
};
const logout = () => {
  storage.remove("account");
};

function eventLogin() {
  var signup = document.querySelector(".container--static .button--signup");
  var login = document.querySelector(".container--static .button--login");
  var signupContent = document.querySelector(
    ".container--sliding .slider-content.signup"
  );
  var loginContent = document.querySelector(
    ".container--sliding .slider-content.login"
  );
  var slider = document.querySelector(".container--sliding");

  // Xử lý sự kiện khi nhấp vào nút "Sign Up"
  signup.addEventListener("click", function (event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của nút (tải lại trang)
    loginContent.style.display = "none";
    signupContent.style.display = "block"; // Hiển thị phần nội dung đăng ký

    // Thực hiện animation cho slider
    slider.style.left = "30%"; // Di chuyển slider đến vị trí 30%
  });

  // Xử lý sự kiện khi nhấp vào nút "Login"
  login.addEventListener("click", function (event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của nút (tải lại trang)
    signupContent.style.display = "none";
    loginContent.style.display = "block"; // Hiển thị phần nội dung đăng nhập

    slider.style.left = "70%"; // Di chuyển slider đến vị trí 70%
  });
}

export { login, logout, eventLogin };
