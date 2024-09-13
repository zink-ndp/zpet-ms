$(() => {
  showDefaultAppointment("0_1_2_3");

  $("#btn-create-apm").click(() => {
    appointmentCreate();
  });

  function _checkVisitor() {
    if ($("#visitor-check").prop("checked")) {
      $("#customer-select").hide();
    } else {
      $("#customer-select").show();
    }
  }

  _checkVisitor();

  $("input[name=apmStatusFilter]").change(() => {
    let statusFilter = $("input[name=apmStatusFilter]:checked").val();
    showDefaultAppointment(statusFilter);
  })

  $("#visitor-check").change(_checkVisitor);
});
