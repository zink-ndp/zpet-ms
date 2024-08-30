$(() => {
  let staff = JSON.parse(localStorage.getItem(`staff`));

  console.log(staff);

  $("html").hide();

  if (staff == null) {
    alert("Vui lòng đăng nhập!");
    window.history.replaceState(null, null, "/admin/login");
    window.location.href = "/admin/login";
  } else {
    $("html").show();
    console.log(staff.name.split(" ").reverse()[0]);
    $(`#staff-name-text`).text("Hi, " + staff.name.split(" ").reverse()[0]);
  }
});
