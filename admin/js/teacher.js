import convertFormData from "./convertFormData.js";
const from = document.forms["form-teacher"];
const btnAddTeacher = document.getElementById("btnAdd");
const btnUpdateTeacher = document.getElementById("btn__Update");
const teachID = document.querySelector("#teachID");
const tcname = document.querySelector("#tcname");
const phonenumber = document.querySelector("#phonenumber");
const email = document.querySelector("#email");
const evaluate = document.querySelector("#Evaluate");
const job = document.querySelector("#job");
const totalCouse = document.querySelector("#totalCouse");
const numberstudent = document.querySelector("#numberstudent");
const decribe = document.querySelector("#decribe");
const btnReload = document.querySelector("#btn__reload");
const formDataOject = {};
var app = angular.module("Adminteacher", []);
let pageIndex = 1;
let total = 0;
let index = 1;
app.controller("teacherctrl", function ($scope, $http) {
  $scope.TeacherList;

  $scope.searchTeacher = (data) => {
    $http({
      method: "post",
      data,
      url: API_url + "/api-admin/teach/search",
    }).then(function (response) {
      // debugger;
      $scope.TeacherList = response.data;
      total = Number(response.data.totalItems);
      reload(response.data.data);
    });
  };
  $scope.searchTeacher({
    page: pageIndex,
    pageSize: 5,
  });
  btnReload.onclick = () => {
    location.reload();
  };
  $scope.CreateTeacher = (data) => {
    $http({
      method: "POST",
      data,
      url: API_url + "/api-admin/teach/create-teach",
    }).then((response) => {
      console.log("create");
      alert("Thêm thành công");
      location.reload();
    });
  };
  $scope.Updateteacher = (data) => {
    $http({
      method: "PATCH",
      data,
      url: API_url + "/api-admin/teach/update-course",
    }).then((response) => {
      debugger;
      alert("sửa thành công");
      console.log("update");
      location.reload();
    });
  };

  $scope.deleteteacher = (id) => {
    $http({
      method: "DELETE",
      url: API_url + "/api-admin/teach/delete-teach?teachID=" + id,
    }).then((Response) => {
      // debugger;
      console.log("delete");
      alert("xóa thành công");
      location.reload();
    });
  };
  btnAddTeacher.onclick = () => {
    formDataOject.teachID = Number(document.getElementById("teachID").value);
    $scope.CreateTeacher(formDataOject);
  };
  btnUpdateTeacher.onclick = () => {
    formDataOject.teachID = Number(document.getElementById("teachID").value);
    $scope.Updateteacher(formDataOject);
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
      document.querySelectorAll(".Teacheritem").forEach((item, index) => {
        const btndeleteTeacher = item.querySelector(".deleteTeacher");
        btndeleteTeacher.onclick = (e) => {
          // $scope.deletefields(e.target.dataset.id);
          console.log(btndeleteTeacher.dataset.id);
          $scope.deleteteacher(btndeleteTeacher.dataset.id);
        };
        item.onclick = () => {
          console.log($scope.TeacherList.data[index]);

          teachID.value = $scope.TeacherList.data[index].teachID;
          tcname.value = $scope.TeacherList.data[index].tcname;
          phonenumber.value = $scope.TeacherList.data[index].phonenumber;
          email.value = $scope.TeacherList.data[index].email;
          evaluate.value = $scope.TeacherList.data[index].evaluate;
          job.value = $scope.TeacherList.data[index].job;
          totalCouse.value = $scope.TeacherList.data[index].totalCouse;
          numberstudent.value = $scope.TeacherList.data[index].numberstudent;
          decribe.value = $scope.TeacherList.data[index].decribe;
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
          $scope.searchTeacher({
            page: index + 1,
            pageSize: 5,
          });
          index++;
          console.log(index);
        }
      };
      btn_prev.onclick = () => {
        if (index > 1) {
          $scope.searchTeacher({
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
            $scope.searchTeacher({
              page: item.dataset.id,
              pageSize: 5,
            });
          })
      );
    }, 1000);
  }
});
