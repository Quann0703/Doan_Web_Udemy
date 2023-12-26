function openBTN() {
  document.getElementById("button-left").style.width = "250px";
}

function closeBTN() {
  document.getElementById("button-left").style.width = "0";
}

function LoadUser() {
  var u = JSON.parse(localStorage.getItem("user")) || [];

  $("#ten_nv").html(u.tennv);
  $("#manv").html(u.manv);
  $("#tennv").html(u.tennv);
  $("#emailnv").html(u.emailnv);
  $("#sdtnv").html(u.sdtnv);
  $("#quyen").html(u.quyen);
  // $('#mknv').html(x.mknv);
}

function TTTaiKhoan() {
  window.location.href = "../admin/TTTaiKhoan.html";
}

function LogOut() {
  localStorage.setItem("user", null);
  window.location.href = "../admin/login.html";
}

function TongQuan() {
  window.location.href = "../admin/TongQuan.html";
}

function LoaiSanPham() {
  window.location.href = "../admin/LoaiSanPham.html";
}

function categorys() {
  window.location.href = "../admin/categorys.html";
}

function topic() {
  window.location.href = "../admin/topic.html";
}

function teacher() {
  window.location.href = "../admin/teacher.html";
}

function khoahoc() {
  window.location.href = "../admin/Khoahoc.html";
}

function KhachHang() {
  window.location.href = "../admin/KhachHang.html";
}

function HoaDon() {
  window.location.href = "../admin/HoaDonBan.html";
}

function ThietLap() {
  window.location.href = "../admin/ThietLap.html";
}
