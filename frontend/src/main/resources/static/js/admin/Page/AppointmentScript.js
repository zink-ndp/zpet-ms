$(() => {
  fetchAllAppointment("0_1_2_3");

  $("#btn-create-apm").click(() => {
    appointmentCreate();
  });

  function _checkVisitor() {
    if ($("#visitor-check").prop("checked")) {
      $("#customer-select").hide();
      console.log("checked");
    } else {
      $("#customer-select").show();
      console.log("Not checked");
    }
  }

  _checkVisitor();

  $("#visitor-check").change(_checkVisitor);
});
