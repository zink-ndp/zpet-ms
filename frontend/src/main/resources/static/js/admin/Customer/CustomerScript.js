import { fetchAllCustomer, customerAdd, customerUpdate } from './CustomerUtils.js';

export const $CutomerScript = () => {
  $(() => {
    fetchAllCustomer("");
    $("#search").keypress(() => {
      let searchValue = $("#search").val();
    });

    $("#btn-add-customer").click(() => {
      customerAdd();
    });

    $("#btn-customer_update").click(() => {
      customerUpdate(
        $("#btn-customer_update").siblings("input[id=et-customer_id]").val()
      );
    });
  });
};
