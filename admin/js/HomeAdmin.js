import convertFormData from "./convertFormData.js";
import { formatNumber } from "../../js/formData.js";
const from = document.forms["form-Statistic"];
const btnSubmit = document.getElementById("btnSubmit");
const btnReload = document.querySelector("#btn__reload");
const formDataObject = {};
let total = 0;
const date = new Date();
let index = 1;
var app = angular.module("AdminHome", []);
app.controller("StatisticCtrl", function ($scope, $http) {
  $scope.Revenue;
  $scope.Total;
  $scope.month = date.getMonth() + 1;
  let pageIndex = 1;
  $scope.listItem;
  $scope.getStatistic = async (data) => {
    await $http({
      method: "POST",
      data,
      url: API_url + "/api-admin/Invoices/statistic-sale",
    }).then((Response) => {
      //   debugger;
      $scope.listItem = Response.data;
      $scope.Total = Response.totalItems;
      $scope.Revenue = formatNumber(Response.data.revenue);
      reload({ getStatistic: $scope.getStatistic });
    });
  };
  //hiện ra số khóa học
  $scope.listCourse;
  $scope.searchCourse = async (data) => {
    await $http({
      method: "post",
      data,
      url: API_url + "/api-admin/Course/search",
    }).then(function (response) {
      // debugger;
      $scope.listCourse = response.data;
    });
  };
  //hiện ra sô thể loại
  $scope.categoryList;
  $scope.searchCategory = (data) => {
    $http({
      method: "post",
      data,
      url: API_url + "/api-admin/categorys/search",
    }).then(function (response) {
      // debugger;
      $scope.categoryList = response.data;
      total = Number(response.data.totalItems);
    });
  };
  //hiện ra sô chủ đề
  $scope.topicList;
  $scope.searchtopic = (data) => {
    $http({
      method: "post",
      data,
      url: API_url + "/api-admin/topic/search",
    }).then(function (response) {
      $scope.topicList = response.data;
    });
  };
  //hiện ra số lượng lĩnh vực
  $scope.listfield;
  $scope.searchfields = (data) => {
    $http({
      method: "post",
      data,
      url: API_url + "/api-admin/fields/search",
    }).then(function (response) {
      // debugger;
      $scope.listfield = response.data;
    });
  };
  //hiện ra số lượng hóa đơn
  $scope.listinvoices;
  $scope.searchInvoices = (data) => {
    $http({
      method: "post",
      data,
      url: API_url + "/api-admin/Invoices/search",
    }).then(function (response) {
      // debugger;
      $scope.listinvoices = response.data;
    });
  };
  $scope.searchInvoices({
    page: pageIndex,
    pageSize: 5,
  });
  $scope.searchfields({
    page: pageIndex,
    pageSize: 25,
  });
  $scope.searchtopic({
    page: pageIndex,
    pageSize: 25,
  });
  $scope.searchCategory({
    page: pageIndex,
    pageSize: 25,
  });
  $scope.searchCourse({
    page: pageIndex,
    pageSize: 25,
  });
  $scope.getStatistic({
    page: 1,
    pageSize: 5,
    month: date.getMonth,
    year: date.getFullYear,
  });
  btnSubmit.onclick = (e) => {
    $scope.month = formDataObject.month;
    console.log(formDataObject.month);
    console.log(formDataObject.year);
    $scope.getStatistic({
      page: 1,
      pageSize: 5,
      month: formDataObject.month,
      year: formDataObject.year,
    });
  };
  btnReload.onclick = () => {
    location.reload();
  };
  from.onsubmit = (e) => {
    e.preventDefault();
    Object.assign(formDataObject, convertFormData(from));
  };

  // setTimeout(() => {
  //   const dataFromLocalStorage = JSON.parse(
  //     localStorage.getItem("invoicesDetail")
  //   );
  //   let totalCourseIDs = 0;
  //   if (dataFromLocalStorage && Array.isArray(dataFromLocalStorage)) {
  //     dataFromLocalStorage.forEach((item) => {
  //       if (item.hasOwnProperty("courseID")) {
  //         totalCourseIDs += 1;
  //       }
  //       console.log(totalCourseIDs);
  //     });
  //   }
  // }, 1000);
  function reload({ GetStatistic }) {
    setTimeout(() => {
      const totalPages = Math.ceil(total / 5);

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
          $scope.getStatistic({
            page: index + 1,
            pageSize: 5,
          });
          index++;
          console.log(index);
        }
      };
      btn_prev.onclick = () => {
        if (index > 1) {
          $scope.getStatistic({
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
            $scope.getStatistic({
              page: item.dataset.id,
              pageSize: 5,
            });
          })
      );
    }, 1000);
  }
});
