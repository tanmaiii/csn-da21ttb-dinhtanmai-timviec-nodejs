function isValidURL(url) {
  // Sử dụng biểu thức chính quy để kiểm tra định dạng của đường link
  var urlPattern = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(:\d{1,5})?\/?(\S*)$/i;
  return urlPattern.test(url);
}

export default function checkUrl(url) {
  if (isValidURL(url)) {
    return true;
  } else {
    return false;
  }
}
