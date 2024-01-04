

export default function checkPassword(password){

    // Biểu thức chính quy để kiểm tra chuỗi
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/;

    // Kiểm tra chuỗi theo biểu thức chính quy
    if (regex.test(password)) {
      return true;
    } else {
        return false;
    }
  };