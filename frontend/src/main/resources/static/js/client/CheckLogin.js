export const $CheckLogin = () => {
  $(() => {
    let customer = JSON.parse(localStorage.getItem(`customer`));

    console.log(customer);

    if (customer === null) {
      $(`.user-login`).empty().html(loggedElement());
    } else {
      const name = customer.name.split(" ").reverse()[0];
      $(`.nav-btn-signin p`).text("Hi, " + name)
    }
  });
}

const loggedElement = () => {
  return `
      <a class="nav-btn-signin" href="/login">Đăng nhập</a>
  `
}
