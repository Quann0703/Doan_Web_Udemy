import convertFormData from "./convertFormData.js";
import { lessonHandle, dataArray } from "./handleLesson.js";
const from = document.forms["from-course"];
const btnSubmitCourse = document.getElementById("btnSubmit");
const btnReload = document.querySelector("#btn__reload");
const search = document.querySelector("#search-course");
const btnSeach = document.querySelector(".btnSeach");
const courseID = document.querySelector("#courseID");
const couresImg = document.querySelector("#couresImg");
const title = document.querySelector("#title");
const language = document.querySelector("#language");
const evaluate = document.querySelector("#evaluate");
const feecoures = document.querySelector("#feecoures");
const status = document.querySelector("#status");
const decribe = document.querySelector("#decribe");
const btnUpdateLesson = document.querySelector(".btn-update-lesson");
const searchTypeLesson = document.querySelector(".input__text-seacher");
const btnsearchLesson = document.querySelector(".search-lesson");
const formDataOject = {};
var app = angular.module("AdminCourse", []);
let pageIndex = 1;
let total = 0;
let index = 1;
app.controller("Coursectrl", function ($scope, $http) {
  $scope.listCourse;
  $scope.listTeacherID;
  $scope.listTopicID;
  $scope.LoadTeacherID = () => {
    $http({
      method: "GET",
      url: API_url + "/api-admin/teach/get-all",
    }).then(function (response) {
      // debugger;
      $scope.listTeacherID = response.data;
    });
  };
  $scope.LoadTopicID = () => {
    $http({
      method: "GET",
      url: API_url + "/api-admin/topic/get-all",
    }).then(function (response) {
      // debugger;
      $scope.listTopicID = response.data;
    });
  };

  $scope.CreateCourse = (data) => {
    $http({
      method: "POST",
      data,
      url: API_url + "/api-admin/Course/create-course",
    }).then((response) => {
      console.log("create");
      alert("Thêm thành công");
      location.reload();
    });
  };
  $scope.UpdateCourse = (data) => {
    $http({
      method: "PATCH",
      data,
      url: API_url + "/api-admin/Course/update-course",
    }).then((response) => {
      debugger;
      alert("sửa thành công");
      console.log("update");
      location.reload();
    });
  };
  $scope.deleteCourse = (id) => {
    $http({
      method: "DELETE",
      url: API_url + "/api-admin/Course/delete-course?id=" + id,
    }).then((Response) => {
      // debugger;
      console.log("delete");
      alert("xóa thành công");
      location.reload();
    });
  };
  //lấy khóa học theo couseid
  $scope.course;
  $scope.listLesson;
  let lessonList = [];
  $scope.courseByID = (id) => {
    $http({
      url: API_url + "/api-admin/Course/get-by-id?id=" + id,
      method: "GET",
    }).then((response) => {
      // debugger;
      ($scope.course = response.data),
        ($scope.listLesson = response.data.list_json_lessons);
      lessonList = $scope.listCourse && [...$scope.listLesson];
    });
  };

  $scope.searchCourse = (data) => {
    $http({
      method: "post",
      data,
      url: API_url + "/api-admin/Course/search",
    }).then(function (response) {
      // debugger;
      $scope.listCourse = response.data;
      total = Number(response.data.totalItems);
      reload(response.data.data, {
        courseByID: $scope.courseByID,
        deleteCourse: $scope.deleteCourse,
        searchCourse: $scope.searchCourse,
      });
    });
  };

  $scope.searchCourse({
    page: pageIndex,
    pageSize: 5,
  });
  $scope.LoadTeacherID();
  $scope.LoadTopicID();
  btnSubmitCourse.onclick = () => {
    formDataOject.courseID = document.getElementById("courseID").value;
    if (formDataOject.courseID === "0") {
      $scope.CreateCourse(formDataOject);
      console.log(123);
    } else {
      $scope.UpdateCourse(formDataOject);
      console.log(231);
    }
  };
  //nút load lại trang
  btnReload.onclick = () => {
    location.reload();
  };
  //nut tìm kiếm
  btnSeach.onclick = () => {
    $scope.searchCourse({
      page: pageIndex,
      pageSize: 5,
      title: search.value,
    });
  };
  //Tim kiếm bài học
  btnsearchLesson.onclick = () => {
    $scope.listLesson = lessonList.filter((x) =>
      x.lessonName.includes(searchTypeLesson.value)
    );
    console.log($scope.listLesson);
    $scope.$digest();
  };
  //nút lưu bài học
  btnUpdateLesson.onclick = () => {
    Object.assign(formDataOject, convertFormData(from));
    formDataOject.list_json_lessons = dataArray;
    console.log(formDataOject);
    $scope.UpdateCourse(formDataOject);
  };

  from.onsubmit = (e) => {
    e.preventDefault();
    Object.assign(formDataOject, convertFormData(from));
  };
  function reload(data, { courseByID, searchCourse, deleteCourse }) {
    setTimeout(() => {
      document.querySelectorAll(".Courseitem").forEach((item, index) => {
        const btnDelete = item.querySelector(".deleteCourse");
        const btndetail = item.querySelector(".detailCourse");
        const btnExit = document.querySelector(".btn-exit-form");
        btnDelete.onclick = () => {
          $scope.deleteCourse(btnDelete.dataset.id);
        };
        btndetail.onclick = (e) => {
          document.querySelector(".lesson_wrapper").style.display = "block";
          document.querySelector(".overlay").style.display = "block";
          $scope.courseByID(btndetail.dataset.id);
          console.log(btndetail.dataset.id);
          lessonHandle();
        };
        btnExit.onclick = () => {
          document.querySelector(".lesson_wrapper").style.display = "none";
          document.querySelector(".overlay").style.display = "none";
        };
        item.onclick = () => {
          console.log(data[index].courseID);
          courseID.value = data[index].courseID;
          couresImg.value = data[index].couresImg;
          title.value = data[index].title;
          feecoures.value = data[index].feecoures;
          status.value = data[index].status;
          decribe.value = data[index].decribe;
          language.value = data[index].language;
          evaluate.value = data[index].evaluate;

          //đẩy mã khóa học lên url
          var urlObject = new URL(window.location.href);
          urlObject.searchParams.set("c", data[index].courseID);
          window.history.replaceState(null, null, urlObject.toString());
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
          $scope.searchCourse({
            page: index + 1,
            pageSize: 5,
          });
          index++;
          console.log(index);
        }
      };
      btn_prev.onclick = () => {
        if (index > 1) {
          $scope.searchCourse({
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
            $scope.searchCourse({
              page: item.dataset.id,
              pageSize: 5,
            });
          })
      );
    }, 1000);
  }
});
