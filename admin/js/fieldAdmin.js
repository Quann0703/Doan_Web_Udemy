import convertFormData from "./convertFormData.js";

const from = document.forms["form-field"];
const btnAddfield = document.getElementById("btnAdd");
const btnNavigation = document.querySelectorAll("button[data-id]");
const fieldID = document.querySelector("#fieldID");
const namefield = document.querySelector("#namefield");
const decribe = document.querySelector("#decribe");
const btnReload = document.querySelector("#btn__reload");

const formDataOject = {};

let total = 0;
let index = 1;
var app = angular.module("Adminfield", []);
let pageIndex = 1;
app.controller("fieldctrl", function ($scope, $http) {
  $scope.listfield;

  $scope.Createfield = (data) => {
    $http({
      method: "POST",
      data,
      url: API_url + "/api-admin/fields/create-fields",
    }).then((response) => {
      console.log("create");
      location.reload();
    });
  };

  $scope.deletefields = (id) => {
    console.log("delete");

    $http({
      method: "DELETE",
      url: API_url + "/api-admin/fields/delete-fields?fieldID=" + id,
    }).then((Response) => {
      // debugger;
      location.reload();
    });
  };

  $scope.searchfields = (data) => {
    $http({
      method: "post",
      data,
      url: API_url + "/api-admin/fields/search",
    }).then(function (response) {
      // debugger;
      $scope.listfield = response.data;
      total = Number(response.data.totalItems);
      reload(response.data.data);
      // fieldlist.forEach((item, index) => {
      //   fieldID.value = response.data[index];
      //   namefield.value = response.data[index];
      //   decribe.value = response.data[index];
      // });
    });
  };

  $scope.searchfields({
    page: pageIndex,
    pageSize: 5,
  });

  btnReload.onclick = () => {
    location.reload();
  };
  btnAddfield.onclick = () => {
    formDataOject.fieldID = Number(document.getElementById("fieldID").value);
    $scope.Createfield(formDataOject);
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
      document.querySelectorAll(".fielditem").forEach((item, index) => {
        const btndeletefield = item.querySelector(".deletefield");
        btndeletefield.onclick = (e) => {
          // $scope.deletefields(e.target.dataset.id);
          // console.log(btndeletefield.dataset.id);
          $scope.deletefields(btndeletefield.dataset.id);
        };
        item.onclick = () => {
          console.log($scope.listfield);
          fieldID.value = $scope.listfield.data[index].fieldID;
          namefield.value = $scope.listfield.data[index].namefield;
          decribe.value = $scope.listfield.data[index].decribe;
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
          $scope.searchfields({
            page: index + 1,
            pageSize: 5,
          });
          index++;
          console.log(index);
        }
      };
      btn_prev.onclick = () => {
        if (index > 1) {
          $scope.searchfields({
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
            $scope.searchfields({
              page: item.dataset.id,
              pageSize: 5,
            });
          })
      );
    }, 1000);
  }
});
