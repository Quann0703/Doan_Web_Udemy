function handledetailCourse() {
  const curriculum_items = document.querySelectorAll(
    ".CurriculumOfCourse_panel"
  );
  curriculum_items.forEach((item) => {
    const Curriculum_heading = item.querySelector(
      ".CurriculumOfCourse_panel-heading"
    );
    const icon = item.querySelector("i");

    const Curriculum_collapse = Curriculum_heading.nextElementSibling;
    Curriculum_heading.onclick = () => {
      curriculum_items.forEach((other) => {
        if (other !== item) {
          const otherCurriculum_heading = other.querySelector(
            ".CurriculumOfCourse_panel-heading"
          );
          const othericon = other.querySelector("i");
          const otherCurriculum_collapse =
            otherCurriculum_heading.nextElementSibling;
          //   otherCurriculum_collapse.classList.remove(".active");
          othericon.classList.remove(".active");
          otherCurriculum_collapse.style.display = "none";
        }
      });
      Curriculum_collapse.classList.toggle("active");
      icon.classList.toggle("active");
      if (Curriculum_collapse.classList.contains("active")) {
        // Curriculum_collapse.style.maxHeight =
        //   Curriculum_collapse.scrollHeight + "px";
        Curriculum_collapse.style.display = "block";
      } else {
        // Curriculum_collapse.style.maxHeight = "0";
        Curriculum_collapse.style.display = "none";
      }
    };
  });
}
export default handledetailCourse;
