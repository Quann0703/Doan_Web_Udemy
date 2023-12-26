import { login, logout, eventLogin } from "./loginHandel.js";
import storage from "./storage.js";
eventLogin();
function handleform() {
  const form = document.forms["login"];
  const btnlogin = document.querySelector("#btn-login");
  console.log(form);
  console.log(btnlogin);
  btnlogin.onclick = async function () {
    console.log(123);
    var username = form.elements.username.value;
    var password = form.elements.password.value;
    if (username === "" || password === "") {
      alert("Bạn chưa nhập đủ thông tin tài khoản!");
      return;
    }
    var formData = {
      username,
      password,
    };

    const fetchdt = await login(formData);
    if (!fetchdt) {
      alert("bạn nhập sai tài khoản hoặc mật khẩu");
      form.elements.username.value = "";
      form.elements.username.focus();
      form.elements.password.value = "";
      return;
    }

    storage.set("account", fetchdt);
    fetchdt
      ? location.assign("../public/")
      : location.assign("../admin/TongQuan.html");
    console.log(fetchdt.typeID);
  };
}
handleform();
