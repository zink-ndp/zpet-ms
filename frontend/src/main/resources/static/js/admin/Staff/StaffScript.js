import { fetchAllStaff, staffAdd, staffUpdate } from "./StaffUtils.js";

export const $StaffScript = () => {
  $(() => {
    fetchAllStaff("");
    $("#search").keypress(() => {
      let searchValue = $("#search").val();
      fetchAllAppointment(searchValue);
    });

    $("#btn-add-staff").click(() => {
      staffAdd();
    });

    $("#btn-staff_update").click(() => {
      staffUpdate(
        $("#btn-staff_update").siblings("input[id=et-staff_id]").val()
      );
    });
  });
};
