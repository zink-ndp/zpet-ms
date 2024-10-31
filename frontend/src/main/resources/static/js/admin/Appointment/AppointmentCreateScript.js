import { renderCalendar } from "../../CustomCalendar.js";
import { apiUrl } from "../../apiUrl.js";
import { showDefaultAppointment } from "./AppointmentScript.js";
import { sendMessage } from "../Notification.js";

export function appointmentCreate() {

  function _processCreate() {
    let services = localStorage.getItem("services").split(",");
    let customerId = null;
    if (!$("#visitor-check").prop("checked")) {
      customerId = $("#customer-select input").val().split("-")[0];
    }
    let date = $("#datepicker-modal").val();
    date =
      date.split("-")[1] + "/" + date.split("-")[2] + "/" + date.split("-")[0];
    let time =
      $("#timepicker-modal input[name=timepicker]:checked").val() + ":00";
    let note = $("#note-modal").val();

    let data = JSON.stringify({
      id: null,
      services: services,
      customerId: customerId,
      date: date,
      time: time,
      note: note,
    });

    console.log(data);

    $.ajax({
      url: `${apiUrl}/api/appointment/create`,
      method: "POST",
      data: data,
      contentType: "application/json",
      success: (data) => {
        sendMessage(
          "/apm/update/"+customerId,
          "Bạn có lịch hẹn mới được tạo!", 
          `Lịch hẹn lúc ${time}-${date} đã được tạo!`, 
          null, 
          id,
          null,
        )
        alert("Đặt lịch thành công!");
        renderCalendar();
        showDefaultAppointment(
          "0_1_2",
          new Date().getMonth() + 1,
          new Date().getFullYear()
        );
        $("#modal-apm-create").addClass("hidden");
      },
      error: (xhr, status, error) => {
        console.log(error);
        alert("Đã xảy ra lỗi " + error);
      },
    });
  }

  $("#btn-create-appointment").click(() => _processCreate())
}

export function AppointmetCreateCheckVisitor() {
  if ($("#visitor-check").prop("checked")) {
    $("#customer-select").hide();
  } else {
    $("#customer-select").show();
  }
}
