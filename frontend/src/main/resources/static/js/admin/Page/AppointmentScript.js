$(() => {
  showDefaultAppointment("0_1_2_3", new Date().getMonth() + 1, new Date().getFullYear());

  $("#btn-create-apm").click(() => {
    $("#modal-apm-create").removeClass("hidden");
    appointmentCreate();
  });

  $("input[name=apmStatusFilter]").change(() => {
    let statusFilter = $("input[name=apmStatusFilter]:checked").val();
    showDefaultAppointment(statusFilter, new Date().getMonth() + 1, new Date().getFullYear());
  });

  fetchServices();
  fetchCustomers();
  if ($("#service-apm-select-list").length > 0) {
    new MultiSelectTag("service-apm-select-list", {
      placeholder: "Select service",
      tagColor: {
        textColor: "#00c400",
        borderColor: "#00c400",
        bgColor: "#d4ffd4",
      },
      onChange: function (values) {
        values = values.map((v) => v.value);
        localStorage.setItem("services", values);
      },
    });
  }
});
