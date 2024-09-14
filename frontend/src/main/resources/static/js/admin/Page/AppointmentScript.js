$(() => {
  showDefaultAppointment("0_1_2_3", new Date().getMonth() + 1);

  $("#modal-apm-create").hide().removeClass("hidden");
  $("#btn-create-apm").click(() => {
    $("#modal-apm-create").show();
    appointmentCreate();
  });

  $("input[name=apmStatusFilter]").change(() => {
    let statusFilter = $("input[name=apmStatusFilter]:checked").val();
    showDefaultAppointment(statusFilter, new Date().getMonth() + 1);
  });
});
