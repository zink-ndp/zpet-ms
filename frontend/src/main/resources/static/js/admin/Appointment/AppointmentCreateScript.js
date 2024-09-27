function _checkVisitor() {
  if ($("#visitor-check").prop("checked")) {
    $("#customer-select").hide();
  } else {
    $("#customer-select").show();
  }
}

function fetchServices() {
  $.ajax({
    url: `${apiUrl}/api/service/all`,
    method: "GET",
    success: (data) => {
      $("#service-select-list").html("");
      data.forEach((service) => {
        $("#service-select-list").append(
          `<option value="${service.id}">${service.name}</option>`
        );
      });
    },
  });
}

function fetchCustomers() {
  $.ajax({
    url: `${apiUrl}/api/customer/all`,
    method: "GET",
    success: (data) => {
      $("#customer-select-list").html("").append(`<option value="" disabled selected>- Chọn khách hàng -</option>`);
      data.forEach((customer) => {
        $("#customer-select-list").append(
          `<option value="${customer.id}-${customer.name}">${customer.id} - ${customer.name} - ${customer.phone}</option>`
        );
      });
    },
  });
}

function appointmentCreate() {
  function _processCreate() {
    let services = localStorage.getItem("services").split(",");
    let customerId = null;
    if (!$("#visitor-check").prop("checked")){
      customerId = $("#customer-select input").val().split("-")[0];
    }
    let date = $("#datepicker-modal").val();
    let time = $("#timepicker-modal input[name=timepicker]:checked").val()+":00";
    let note = $("#note-modal").val();
    
    let data = JSON.stringify({
      id: null,
      services: services,
      customerId: customerId,
      date: date,
      time: time,
      note: note,
    })

    console.log(data);
    

    $.ajax({
      url: `${apiUrl}/api/appointment/create`,
      method: "POST",
      data: data,
      contentType: "application/json",
      success: (data) => {
        alert("Đặt lịch thành công!");
        renderCalendar();
        showDefaultAppointment("0_1_2_3", (new Date().getMonth()+1), new Date().getFullYear())
        $("#modal-apm-create").addClass("hidden");
      },
      error: (xhr, status, error) => {
        console.log(error);
        alert("Đã xảy ra lỗi " + error);
      },
    })
    
  }
  $("#service-select-list").empty();
  new MultiSelectTag("service-select-list", {
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

  $("#btn-create-appointment").click(() => _processCreate());
}

$(() => {
  _checkVisitor();
  $("#visitor-check").change(_checkVisitor);
  fetchServices();
  fetchCustomers();
});
