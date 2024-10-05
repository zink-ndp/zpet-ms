export const $CheckLogin = () => {
  $(() => {
    let customer = JSON.parse(localStorage.getItem(`customer`));

    console.log(customer);

    if (customer == null) {
      $(`#logged-out`).show();
    } else {
      $(`#logged-in`).show();
      console.log(customer.name.split(" ").reverse()[0]);

      $(`#user-button-text`).text("Hi, " + customer.name.split(" ").reverse()[0]);
    }
  });
}