import { apiUrl } from '../../apiUrl.js';

export const $login = () => {
  $(() => {
    $(`#btnLogin`).click(() => {
      let phone = $("#phone").val();
      let password = $("#password").val();

      $.ajax({
        url: apiUrl + "/api/customer/login",
        method: "POST",
        data: JSON.stringify({
          phone: phone,
          password: password,
        }),
        contentType: "application/json",
        success: (response) => {
          console.log(response);
          if (response != "") {
            localStorage.setItem("customer", JSON.stringify(response));
            window.location.href = "/";
          } else {
            alert("Tài khoản hoặc mật khẩu không đúng!");
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
    });
  });
};
