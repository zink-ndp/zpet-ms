
function fetchUpcomingAppointment() {
  let _appointmentElement = (a) => {
    let textStatusStyle = "";
    switch (a.status) {
      case "Đợi xác nhận":
        textStatusStyle = "text-yellow-600";
        break;
      default:
        textStatusStyle = "text-blue-600";
        break;
    }
    return `
               <div onclick="openAppointmentDetail(${
                 a.id
               })" class="bg-green-50 rounded-md flex items-center w-[400px] p-4 hover:bg-green-100 cursor-pointer snap-start">
                  <div class="flex flex-col space-y-1 w-[400px]">
                      <p class="font-semibold text-right ${textStatusStyle}">${
      a.status
    }</p>
                      <p class="font-semibold text-green-700">${a.time} ${
      a.date
    }</p>
                      <p class="">${a.customerName}</p>
                      <p class="line-clamp-2">${
                        a.note != null ? a.note : "Không có ghi chú"
                      }</p>
                  </div>
              </div>
          `;
  };

  $.ajax({
    url: `${apiUrl}/api/appointment/all?status=0_1`,
    method: "GET",
    success: (data) => {
      if (!data || data.length == 0) {
        $("#upcoming-appointments").html(
          `<p class="text-center content-center w-full h-full">Không có lịch hẹn nào sắp tới</p>`
        );
      } else {
        $("#upcoming-appointments").empty();
        for (let index = 0; index < data.length; index++) {
          const appointment = data[index];
          $("#upcoming-appointments").append(_appointmentElement(appointment));
        }
      }
    },
  });
}

function openAppointmentDetail(id) {
  $.ajax({
    url: `${apiUrl}/api/appointment/detail?id=${id}`,
    method: "GET",
    success: (data) => {
      let info = data.info;
      let history = data.history;
      let service = data.service;

      $("#apm-detail_status").html(info.status);
      $("#apm-detail_time").html(info.date + " " + info.time);
      $("#apm-detail_customerName").html(info.customerName);
      $("#apm-detail_customerPhone").html(info.customerPhone);
      $("#apm-detail_note").html(
        info.note != null ? info.note : "Không có ghi chú"
      );

      $("#apm-detail_services").empty();
      service.forEach((srv, index) => {
        $("#apm-detail_services").append(`
                    <li class="m-3">${index + 1}. ${srv.name}</li>`);
      });

      $("#apm-detail_history").empty();
      history.forEach((h) => {
        $("#apm-detail_history").append(`
                    <div class="m-3 p-2 bg-gray-50">
                        <div class="flex w-full justify-between">
                            <p>Thời điểm: ${h.attime}</p>
                            <p>Trạng thái: ${h.status}</p>
                        </div>
                        <p>Mô tả: ${h.description}</p>
                    </div>
                `);
      });

      let appointmentStatus = [
        "Đợi xác nhận",
        "Đã xác nhận",
        "Đã hoàn thành",
        "Đã hủy",
      ];

      $("#apm-detail_select_status").html(`<option class="" value="" selected disabled cursor cursor-not-allowed>Cập nhật</option>`)
      appointmentStatus.forEach((stt, index)  => {
        if (stt === info.status){
            for (let i=index+1; i < appointmentStatus.length; i++) {
                $("#apm-detail_select_status").append(`<option class="" value="${i}">${appointmentStatus[i]}</option>`)
            }
            return;
        }
      })

      $("#apm-detail").show();
    },
  });
}
