function nameToSlug(name) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\s\W]+/g, "-")
    .toLowerCase();
}

export default nameToSlug;
