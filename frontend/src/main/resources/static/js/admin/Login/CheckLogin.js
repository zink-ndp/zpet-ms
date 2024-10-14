export const $CheckLogin = () => {
  $(() => {
    let staff = JSON.parse(localStorage.getItem(`staff`));

    $("html").hide();

    if (staff == null) {
      alert("Vui lòng đăng nhập!");
      window.history.replaceState(null, null, "/admin/login");
      window.location.href = "/admin/login";
    } else {
      $("html").show();
      $(`#staff-name-text`).text("Hi, " + staff.name.split(" ").reverse()[0]);
    }
  });
};
