import { renderCalendar } from "../../CustomCalendar.js";

export function appointmentCreate() {
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

  $("#btn-create-appointment").click(() => _processCreate());
}

export function AppointmetCreateCheckVisitor() {
  if ($("#visitor-check").prop("checked")) {
    $("#customer-select").hide();
  } else {
    $("#customer-select").show();
  }
}
