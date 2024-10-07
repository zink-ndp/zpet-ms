import { apiUrl } from "../../apiUrl.js";
import { $Loading } from "../Loading.js";

$Loading();
$(() => {
  $("#loading-overlay").addClass("hidden");
  $(`#btnLogin`).click(() => {
    $("#loading-overlay").removeClass("hidden");
    let phone = $("#phone").val();
    let password = $("#password").val();
    let role = $("input[name=role]:checked").val();

    console.log(
      JSON.stringify({
        phone: phone,
        password: password,
        role: role,
      })
    );

    $.ajax({
      url: apiUrl + "/api/staff/login",
      method: "POST",
      async: false,
      data: JSON.stringify({
        phone: phone,
        password: password,
        role: role,
      }),
      contentType: "application/json",
      success: (response) => {
        console.log(response);
        setTimeout(() => {
          $("#loading-overlay").addClass("hidden");
        }, 1000);
        if (response != "") {
          localStorage.setItem("staff", JSON.stringify(response));
          window.location.href = "/admin/";
        } else {
          alert("Tài khoản hoặc mật khẩu không đúng!");
        }
      },
      error: (error) => {
        setTimeout(() => {
          $("#loading-overlay").addClass("hidden");
        }, 1000);
        console.error(error);
      },
    });
  });
});
