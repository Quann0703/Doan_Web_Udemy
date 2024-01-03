import * as homeRender from "./homeRender.js";
import courseItem from "./base/courseBase.js";
import html from "./html.js";
const key = "cs";
const value = window.location.search.substring(
  window.location.search.indexOf(key) + key.length + 1
);
const listSearch = document.querySelector(".list__course");

const decodedValue = decodeURIComponent(value);
console.log(decodedValue);

function titlesearch(data) {
  const title = document.querySelector(".search__title");
  title.innerHTML = data.totalItems + "\nkết quả cho " + decodedValue;
}

async function searchCourses() {
  const courses = await homeRender.getAllCourse();
  console.log(courses);
  let data = courses.filter((x) => {
    return x.title.includes(decodedValue);
  });
  return data;
}

async function searchRender() {
  let dataSearch = await searchCourses();
  return html` ${dataSearch.map((data) => courseItem({ data: data }))} `;
}

async function LoadSearch() {
  listSearch.innerHTML = await searchRender();
}
LoadSearch();
