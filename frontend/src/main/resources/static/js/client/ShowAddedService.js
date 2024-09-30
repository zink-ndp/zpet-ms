export const $ShowAddedService = () => {
  $(() => {
    if (localStorage.getItem("services") == null) {
      $(`#service-added-button`).hide();
    } else {
      let storage = JSON.parse(localStorage.getItem("services"));
      let quantity = 0;
      for (let item in storage) {
        quantity++;
      }
      $(`#service-added-button`).show();

      $(`#service-added-button p`).text(quantity);
    }
  })
}