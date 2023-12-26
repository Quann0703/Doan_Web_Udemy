import fetchApi from "./fetchAPI.js";
const getCourse = async function () {
  const response = await fetchApi.get("/home");
  return await response.json();
};

const getAllCourse = async function () {
  const response = await fetchApi.get("/course");
  return await response.json();
};
export { getCourse, getAllCourse };
