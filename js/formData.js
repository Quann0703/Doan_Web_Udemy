function formatDate(params) {
  var updatedAtDate = new Date(params);
  return `${updatedAtDate.getDate()}/${
    updatedAtDate.getMonth() + 1
  }/${updatedAtDate.getFullYear()}`;
}

function formatNumber(params) {
  return params.toLocaleString().replace(/,/g, ".");
}

export { formatDate, formatNumber };
