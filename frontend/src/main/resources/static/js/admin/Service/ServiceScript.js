import { fetchAllService, serviceAdd } from "./ServiceUtils.js";

export const $ServiceScript = () => {
  $(() => {
    fetchAllService("");
    $("#search").keypress(() => {
      let searchValue = $("#search").val();
      // fetchAllAppointment(searchValue);
    });
    $("#btn-add-service").click(() => {
      serviceAdd();
    });
  });
};
