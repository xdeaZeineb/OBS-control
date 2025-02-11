function getFormattedFilename(template) {
  const now = new Date();
  const formatted = template
    .replace("%CCYY", now.getFullYear())
    .replace("%MM", String(now.getMonth() + 1).padStart(2, "0"))
    .replace("%DD", String(now.getDate()).padStart(2, "0"))
    .replace("%hh", String(now.getHours()).padStart(2, "0"))
    .replace("%mm", String(now.getMinutes()).padStart(2, "0"))
    .replace("%ss", String(now.getSeconds()).padStart(2, "0"));
  return formatted;
}

module.exports = {
  getFormattedFilename,
};
