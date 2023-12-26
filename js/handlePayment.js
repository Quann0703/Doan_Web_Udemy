function handlepayment() {
  const panelwrap = document.querySelectorAll(".panel__wrap");
  panelwrap.forEach((item) => {
    const acdotionModule = item.querySelector(".acdotion__module");
    const checkbox = item.querySelector(".toggle__radio");
    const acdotion_collapse = acdotionModule.nextElementSibling;
    acdotionModule.onclick = () => {
      panelwrap.forEach((other) => {
        if (other !== item) {
          const otherAcdotionModule = other.querySelector(".acdotion__module");
          const otherAcdotion_collapse = otherAcdotionModule.nextElementSibling;
          const othercheckbox = other.querySelector(".toggle__radio");

          othercheckbox.classList.remove("active");
          otherAcdotion_collapse.style.display = "none";
        }
      });

      acdotion_collapse.classList.toggle("active");
      checkbox.classList.toggle("active");

      if (acdotion_collapse.classList.contains("active")) {
        acdotion_collapse.style.display = "block";
      } else {
        acdotion_collapse.style.display = "none";
      }
    };
  });
}

export default handlepayment;
