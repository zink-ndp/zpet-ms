// isLimit value is 0 (unlimited - admin) or 1 (limited - staff)
export const $CheckLogin = (isLimit) => {
  $(() => {
    $("html").hide();

    let staff = JSON.parse(localStorage.getItem(`staff`));

    if (staff === null) {

      alert("Vui lòng đăng nhập!");
      window.history.replaceState(null, null, "/admin/login");
      window.location.href = "/admin/login";
    } else {
      
      if (isLimit && staff.isManager === 0) {
        alert("Bạn không được phép truy cập trang này!");
        window.history.replaceState(null, null, "/admin/login");
        window.location.href = "/admin/appointment";
      }
      $("html").show();
      $(`#staff-name-text`).text("Hi, " + staff.name.split(" ").reverse()[0]);
    }

  });
};
