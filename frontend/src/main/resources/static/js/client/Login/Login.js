import { apiUrl } from "../../apiUrl.js";
import { nonEmpty, renderDOMElement } from "../../utils.js";

export const $login = () => {
  const passwordInputElement = () => {
    return `
      <div class="flex space-x-4">
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Mật khẩu"
          class="w-full h-12 px-4 py-2 rounded-md bg-white backdrop-blur-sm ring-1 ring-gray-300 focus:ring-green-500 outline-none"
        />
      </div>
    `;
  };

  const createPasswordsElement = () => {
    return `
      <div class="flex space-x-4">
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Mật khẩu mới"
          class="w-full h-12 px-4 py-2 rounded-md bg-white backdrop-blur-sm ring-1 ring-gray-300 focus:ring-green-500 outline-none"
        />
      </div>
      <div class="flex space-x-4">
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Xác nhận mật khẩu"
          class="w-full h-12 px-4 py-2 rounded-md bg-white backdrop-blur-sm ring-1 ring-gray-300 focus:ring-green-500 outline-none"
        />
      </div>
    `;
  };

  const logAnotherButton = () => {
    const element = {
      type: "button",
      props: {
        id: "btnLogAnother",
        className: "text-green-500 hover:text-green-600 w-full text-center p-2",
        onclick: () => {
          logAnother();
        },
      },
      children: ["Đăng nhập với tài khoản khác"],
    };
    return renderDOMElement(element);
  };

  const checkPhoneButton = () => {
    const element = {
      type: "button",
      props: {
        id: "btnCheckPhone",
        className: "bg-green-500 text-white text-lg w-full h-12 p-2 rounded-md",
        onclick: () => {
          checkPhone();
        },
      },
      children: ["Đăng nhập"],
    };
    return renderDOMElement(element);
  };

  const loginButton = () => {
    const element = {
      type: "button",
      props: {
        id: "btnLogin",
        className: "bg-green-500 text-white text-lg w-full h-12 p-2 rounded-md",
        onclick: () => {
          login();
        },
      },
      children: ["Đăng nhập"],
    };
    return renderDOMElement(element);
  };

  const createPasswordButton = (id) => {
    const element = {
      type: "button",
      props: {
        id: "btnLogin",
        className: "bg-green-500 text-white text-lg w-full h-12 p-2 rounded-md",
        onclick: () => {
          createPassword(id);
        },
      },
      children: ["Tạo mật khẩu và đăng nhập"],
    };
    return renderDOMElement(element);
  };

  function login() {
    let phone = $("#phone").val();
    let password = $("#password").val();
    console.log(phone, password);
    
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
  }

  function checkPhone() {
    let phone = $("#phone").val();
    $.ajax({
      url: apiUrl + "/api/customer/byphone?phone=" + phone,
      method: "GET",
      async: false,
      success: (response) => {
        console.log(response);
        if (response == null || response.length == 0 || response=="") {
          alert("Số điện thoại không tồn tại!");
        } else {
          if (response.hasPassword) {
            $("#phone").attr("disabled", "disabled");
            $("#addition-input").html(passwordInputElement());
            $("#addition-input").append(logAnotherButton());
            $("#login-button-place").html(loginButton());
          } else {
            alert("Chào bạn mới! Hãy tạo mật khẩu của bạn nhé!");
            $("#phone").attr("disabled", "disabled");
            $("#addition-input").html(createPasswordsElement());
            $("#addition-input").append(logAnotherButton());
            $("#login-button-place").html(createPasswordButton(response.id));
          }
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  function createPassword(id) {
    const password = $("#password").val();
    const confirmPassword = $("#confirmPassword").val();
    if (!nonEmpty(password, confirmPassword)){
      alert("Vui lòng nhập đầy đủ thông tin!");
    } else if (password != confirmPassword) {
      alert("Mật khẩu và xác nhận mật khẩu không trùng khớp!");
      return;
    } else {
      $.ajax({
        url: apiUrl + `/api/customer/update?id=${id}&password=${password}`,
        method: "POST",
        success: (response) => {
          console.log(response);
          alert("Tạo mật khẩu thành công!");
          setTimeout(() => {
            login();
          }, 500);
        },
        error: (error) => {
          alert("Loi gi ne:"+error.message)
        },
      });
    }
  }

  function logAnother() {
    $("#phone").removeAttr("disabled");
    $("#addition-input").html("");
    $("#login-button-place").html(checkPhoneButton());
    $("#password").val("");
    $("#btnLogAnother").hide();
    $("#btnCheckPhone").show();
  }

  $(() => {
    $("#login-button-place").html(checkPhoneButton());
  });
};
