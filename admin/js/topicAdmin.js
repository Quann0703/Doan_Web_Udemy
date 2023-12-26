import convertFormData from "./convertFormData.js";
const from = document.forms["form-topics"];
const btnAddtopic = document.getElementById("btnAdd");
const iDcategory = document.querySelector("#iDcategory");
const topicname = document.querySelector("#topicName");
const decribe = document.querySelector("#decribe");
const topicID = document.querySelector("#topicID");
const btnReload = document.querySelector("#btn__reload");
const formDataOject = {};
var app = angular.module("AdminTopic", []);
let pageIndex = 1;
let total = 0;
let index = 1;
app.controller("Topicctrl", function ($scope, $http) {
  $scope.topicList;
  $scope.listcategorysId;

  $scope.LoadcategorysID = function () {
    $http({
      method: "GET",
      url: API_url + "/api-admin/categorys/get-all",
    }).then(function (response) {
      // debugger;
      $scope.listcategorysId = response.data;
    });
  };

  $scope.searchtopic = (data) => {
    $http({
      method: "post",
      data,
      url: API_url + "/api-admin/topic/search",
    }).then(function (response) {
      // debugger;
      $scope.topicList = response.data;
      total = Number(response.data.totalItems);
      reload(response.data.data);
    });
  };
  $scope.searchtopic({
    page: pageIndex,
    pageSize: 5,
  });
  btnReload.onclick = () => {
    location.reload();
  };
  $scope.Createtopic = (data) => {
    $http({
      method: "POST",
      data,
      url: API_url + "/api-admin/topic/create-topic",
    }).then((response) => {
      console.log("create");
      alert("Thêm thành công");
      location.reload();
    });
  };
  $scope.LoadcategorysID();
  $scope.deletetopic = (id) => {
    console.log("delete");

    $http({
      method: "DELETE",
      url: API_url + "/api-admin/topic/delete-topic?topicID=" + id,
    }).then((Response) => {
      // debugger;
      alert("xóa thành công");
      location.reload();
    });
  };
  btnAddtopic.onclick = () => {
    formDataOject.topicID = Number(document.getElementById("topicID").value);
    $scope.Createtopic(formDataOject);
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
        const btndeletetopic = item.querySelector(".deletetopic");
        btndeletetopic.onclick = (e) => {
          // $scope.deletefields(e.target.dataset.id);
          console.log(btndeletetopic.dataset.id);
          $scope.deletetopic(btndeletetopic.dataset.id);
        };
        item.onclick = () => {
          console.log($scope.topicList.data[index]);
          topicID.value = $scope.topicList.data[index].topicID;
          topicname.value = $scope.topicList.data[index].topicName;
          iDcategory.value = $scope.topicList.data[index].iDcategory;
          decribe.value = $scope.topicList.data[index].decribe;
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

      function controler() {
        btn_prev.onclick = function () {
          if (index > 1) {
            index--;
            console.log(index);
            $scope.searchtopic({
              page: index,
              pageSize: 5,
            });
          }
        };

        btn_next.onclick = function () {
          if (index < totalPages) {
            index++;
            console.log(index);
            $scope.searchtopic({
              page: index,
              pageSize: 5,
            });
          }
        };
      }
      controler();
      const btnNavigation = document.querySelectorAll("button[data-id]");
      btnNavigation.forEach(
        (item) =>
          (item.onclick = () => {
            $scope.searchtopic({
              page: item.dataset.id,
              pageSize: 5,
            });
          })
      );
    }, 1000);
  }
});
