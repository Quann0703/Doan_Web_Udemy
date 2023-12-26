import convertFormData from "./convertFormData.js";
import { detailinvoicesHandle, dataArray } from "./handlelistInvoicesDetail.js";
const from = document.forms["from-Invoices"];
const btnSubmitinvoices = document.getElementById("btnSubmit");
const btnReload = document.querySelector("#btn__reload");
const search = document.querySelector("#search-Invoices");
const btnSeach = document.querySelector(".btnSeach");
const btnUpdateinvoicesDetailId = document.querySelector(
  ".btn-update-Invoices"
);
//truy xuất đến các thẻ input trong thẻ form
const invoiceId = document.querySelector("#invoicesId");
const userID = document.querySelector("#userID");
const totalcoins = document.querySelector("#totalcoins");
const createDate = document.querySelector("#createDate");
const condition = document.querySelector("#condition");
const formDataOject = {};
var app = angular.module("AdminHD", []);
let pageIndex = 1;
let total = 0;
let index = 1;
app.controller("invoicesctrl", ($scope, $http) => {
  $scope.listinvoices;
  $scope.searchInvoices = (data) => {
    $http({
      method: "post",
      data,
      url: API_url + "/api-admin/Invoices/search",
    }).then(function (response) {
      // debugger;
      $scope.listinvoices = response.data;
      total = Number(response.data.totalItems);
      reload(response.data.data, {
        invoicesId: $scope.InvoicesByID,
        deleteinvoices: $scope.deleteinvoices,
        searchInvoices: $scope.searchInvoices,
      });
    });
  };

  $scope.Updateinvoices = (data) => {
    $http({
      method: "PATCH",
      data,
      url: API_url + "/api-admin/Invoices/update-Invoices",
    }).then((response) => {
      debugger;
      alert("sửa thành công");
      console.log("update");
      location.reload();
    });
  };

  $scope.deleteinvoices = (id) => {
    $http({
      method: "DELETE",
      url: API_url + "/api-admin/Invoices/delete-Invoices?invoicesId=" + id,
    }).then((Response) => {
      // debugger;
      console.log("delete");
      alert("xóa thành công");
      location.reload();
    });
  };

  $scope.invoices;
  $scope.listInvoicesDetail;
  let InvoicesDetailList = [];
  $scope.InvoicesByID = (id) => {
    $http({
      url: API_url + "/api-admin/Invoices/get-by-id?invoicesId=" + id,
      method: "GET",
    })
      .then((response) => {
        if (response.data && response.data.list_json_InvoicesDetail) {
          $scope.invoices = response.data;
          $scope.listInvoicesDetail = response.data.list_json_InvoicesDetail;

          // Lưu trữ list_json_InvoicesDetail vào Local Storage
          localStorage.setItem(
            "invoicesDetail",
            JSON.stringify($scope.listInvoicesDetail)
          );

          // Gán dữ liệu vào InvoicesDetailList nếu cần
          InvoicesDetailList = [...$scope.listInvoicesDetail];
        } else {
          console.error("Không có dữ liệu hoặc dữ liệu không hợp lệ từ API.");
        }
      })
      .catch((error) => {
        console.error("Đã xảy ra lỗi khi gọi API: ", error);
      });
  };
  $scope.Totalinvoices;
  $scope.searchInvoicestotal = (data) => {
    $http({
      method: "post",
      data,
      url: API_url + "/api-admin/Invoices/search",
    }).then(function (response) {
      // debugger;
      $scope.Totalinvoices = response.data;
    });
  };
  $scope.searchInvoices({
    page: pageIndex,
    pageSize: 5,
  });

  $scope.searchInvoicestotal({
    page: pageIndex,
    pageSize: 50,
  });

  $scope.listTempPurchasedCourses;
  $scope.CreateTempPurchasedCourses = (data) => {
    $http({
      method: "POST",
      data,
      url:
        API_url + "/api-admin/TempPurchasedCourses/create-TempPurchasedCourses",
    }).then((response) => {
      // debugger;
      console.log("đăng ký thành công");
    });
  };
  btnReload.onclick = () => {
    location.reload();
  };

  //sửa hóa đơn
  btnSubmitinvoices.onclick = () => {
    formDataOject.invoicesId = document.getElementById("invoicesId").value;
    $scope.Updateinvoices(formDataOject);
  };
  //nút tìm kiếm hóa đơn
  btnSeach.onclick = () => {
    console.log(search.value);
    $scope.searchInvoices({
      page: pageIndex,
      pageSize: 5,
      name: search.value,
    });
  };
  //nút lưu chi tiết hóa đơn
  btnUpdateinvoicesDetailId.onclick = () => {
    Object.assign(formDataOject, convertFormData(from));
    formDataOject.list_json_InvoicesDetail = dataArray;
    console.log(formDataOject);
    $scope.Updateinvoices(formDataOject);
  };
  from.onsubmit = (e) => {
    e.preventDefault();
    Object.assign(formDataOject, convertFormData(from));
  };
  function reload(data, { invoicesId, searchInvoices, deleteinvoices }) {
    setTimeout(() => {
      document.querySelectorAll(".invoicesitem").forEach((item, index) => {
        const btnDelete = item.querySelector(".deleteinvoices");
        const btndetail = item.querySelector(".detailinvoices");
        const btnExit = document.querySelector(".btn-exit-form");
        btnDelete.onclick = () => {
          $scope.deleteinvoices(btnDelete.dataset.id);
        };
        btndetail.onclick = (e) => {
          document.querySelector(".Invoices_wrapper").style.display = "block";
          document.querySelector(".overlay").style.display = "block";
          $scope.InvoicesByID(btndetail.dataset.id);
          console.log(btndetail.dataset.id);
          detailinvoicesHandle();
        };
        btnExit.onclick = () => {
          document.querySelector(".Invoices_wrapper").style.display = "none";
          document.querySelector(".overlay").style.display = "none";
        };
        item.onclick = () => {
          invoiceId.value = data[index].invoicesId;
          userID.value = data[index].userID;
          totalcoins.value = data[index].totalcoins;
          createDate.value = data[index].createDate;
          condition.value = data[index].condition;

          //đẩy mã khóa học lên url
          var urlObject = new URL(window.location.href);
          urlObject.searchParams.set("c", data[index].invoicesId);
          window.history.replaceState(null, null, urlObject.toString());
        };
        item.addEventListener("click", () => {
          if (data[index].condition === "Đã duyệt") {
            var dataRegister = {
              userID: data[index].userID,
              list_json_Register: [],
            };
            setTimeout(() => {
              $scope.InvoicesByID(item.dataset.id);
              var detailHD =
                JSON.parse(localStorage.getItem("invoicesDetail")) || [];
              if (detailHD) {
                var desireinvoicesId = data[index].invoicesId;
                var foundInvoice = detailHD.find(
                  (invoice) => invoice.invoicesId === desireinvoicesId
                );
                detailHD.forEach((item) => {
                  var courseregister = {
                    courseID: item.courseID,
                  };
                  dataRegister.list_json_Register.push(courseregister);
                });
              }
              console.log(dataRegister);
              $scope.CreateTempPurchasedCourses(dataRegister);
            }, 100);
          }
        });
      });
      const totalPages = Math.ceil(total / 5);
      //thêm sô nút bằng sô totalpages
      document.querySelector(".navigation").innerHTML = "";
      for (let index = 0; index < totalPages; index++) {
        document.querySelector(".navigation").innerHTML += `<button data-id="${
          index + 1
        }" class="btn-primary">${index + 1}</button>`;
      }
      const btn_next = document.querySelector(".btn-next");
      const btn_prev = document.querySelector(".btn-prev");
      btn_next.onclick = () => {
        if (index < totalPages) {
          $scope.searchInvoices({
            page: index + 1,
            pageSize: 5,
          });
          index++;
          console.log(index);
        }
      };
      btn_prev.onclick = () => {
        if (index > 1) {
          $scope.searchInvoices({
            page: index - 1,
            pageSize: 5,
          });
          index--;
          console.log(index);
        }
      };
      const btnNavigation = document.querySelectorAll("button[data-id]");
      btnNavigation.forEach(
        (item) =>
          (item.onclick = () => {
            $scope.searchInvoices({
              page: item.dataset.id,
              pageSize: 5,
            });
          })
      );
    }, 1000);
  }
});
