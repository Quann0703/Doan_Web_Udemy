var app = angular.module("Udemy", []);
const key = "title";
const value = window.location.search.substring(
  window.location.search.indexOf(key) + key.length + 1
);
const decodedValue = decodeURIComponent(value);

function titlesearch(data) {
  const title = document.querySelector(".search__title");
  title.innerHTML = data.totalItems + "\nkết quả cho " + decodedValue;
}
