import convertFormData from "./convertFormData.js";
const from = document.forms["form-category"];
const btnAddCategorys = document.getElementById("btnAdd");
const btnUpdateCategorys = document.getElementById("btn__Update");
const iDcategory = document.querySelector("#iDcategory");
const categoryname = document.querySelector("#categoryname");
const decribe = document.querySelector("#decribe");
const fieldID = document.querySelector("#fieldID");
const btnReload = document.querySelector("#btn__reload");
const formDataOject = {};
var app = angular.module("AdminCategory", []);
let pageIndex = 1;
let total = 0;
let index = 1;
app.controller("categoryctrl", function ($scope, $http) {
  $scope.categoryList;
  $scope.listIDfiled;

  $scope.LoadfieldID = function () {
    $http({
      method: "GET",
      url: API_url + "/api-admin/fields/get-all",
    }).then(function (response) {
      // debugger;
      $scope.listIDfiled = response.data;
    });
  };

  $scope.searchCategory = (data) => {
    $http({
      method: "post",
      data,
      url: API_url + "/api-admin/categorys/search",
    }).then(function (response) {
      // debugger;
      $scope.categoryList = response.data;
      total = Number(response.data.totalItems);
      reload(response.data.data);
    });
  };
  $scope.searchCategory({
    page: pageIndex,
    pageSize: 5,
  });
  btnReload.onclick = () => {
    location.reload();
  };
  $scope.CreateCategorys = (data) => {
    $http({
      method: "POST",
      data,
      url: API_url + "/api-admin/categorys/create-categorys",
    }).then((response) => {
      console.log("create");
      alert("Thêm thành công");
      location.reload();
    });
  };
  $scope.UpdateCategorys = (data) => {
    $http({
      method: "PATCH",
      data,
      url: API_url + "/api-admin/categorys/update-course",
    }).then((response) => {
      debugger;
      alert("sửa thành công");
      console.log("update");
      location.reload();
    });
  };
  $scope.LoadfieldID();
  $scope.deleteCategorys = (id) => {
    console.log("delete");

    $http({
      method: "DELETE",
      url: API_url + "/api-admin/categorys/delete-categorys?IDcategory=" + id,
    }).then((Response) => {
      // debugger;
      alert("xóa thành công");
      location.reload();
    });
  };
  btnAddCategorys.onclick = () => {
    formDataOject.idDcategory = Number(
      document.getElementById("iDcategory").value
    );
    $scope.CreateCategorys(formDataOject);
  };
  btnUpdateCategorys.onclick = () => {
    formDataOject.idDcategory = Number(
      document.getElementById("iDcategory").value
    );
    $scope.UpdateCategorys(formDataOject);
  };
  from.onsubmit = (e) => {
    e.preventDefault();
    const data = new FormData(from);
    data.forEach((value, key) => {
      formDataOject[key] = value;
    });
    Object.assign(formDataOject, convertFormData(from));
  };
  function reload(data) {
    setTimeout(() => {
      document.querySelectorAll(".categoryitem").forEach((item, index) => {
        const btndeleteCategory = item.querySelector(".deleteCategory");
        btndeleteCategory.onclick = (e) => {
          // $scope.deletefields(e.target.dataset.id);
          console.log(btndeleteCategory.dataset.id);
          $scope.deleteCategorys(btndeleteCategory.dataset.id);
        };
        item.onclick = () => {
          console.log(index);
          iDcategory.value = $scope.categoryList.data[index].iDcategory;
          fieldID.value = $scope.categoryList.data[index].fieldID;
          categoryname.value = $scope.categoryList.data[index].categoryname;
          decribe.value = $scope.categoryList.data[index].decribe;
        };
      });

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
          $scope.searchCategory({
            page: index + 1,
            pageSize: 5,
          });
          index++;
          console.log(index);
        }
      };
      btn_prev.onclick = () => {
        if (index > 1) {
          $scope.searchCategory({
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
            $scope.searchCategory({
              page: item.dataset.id,
              pageSize: 5,
            });
          })
      );
    }, 1000);
  }
});
