import { apmElement } from "./AppointmentElement.js";
import { apiUrl } from '../../apiUrl.js'
import { renderDOMElement } from "../../utils.js";


export function fetchAllAppointment(statusFilter, dateFilter) {
  $.ajax({
    url: `${apiUrl}/api/appointment/all?status=${statusFilter}&dateFilter=${dateFilter}`,
    method: "GET",
    success: (data) => {
      $("#appointment-list").empty();
      if (data.length > 0) {
        data.forEach((a) => {
          $("#appointment-list").append(apmElement(a));
        });
      } else {
        $("#appointment-list").append(
          `<p class="w-full h-full text-center justify-center self-center">
            Ngày này không có lịch hẹn nào
          </p>`
        );
      }
    },
  });
}

export function showDefaultAppointment(statusFilter, month, year) {
  let currentMonth = month - 1;
  let currentYear = year
  const firstDay = new Date(currentYear, currentMonth, 1).getDate();
  const lastDay = new Date(currentYear, currentMonth + 1, 0).getDate();
  let dateFilter = `${currentYear}-${
    currentMonth + 1
  }-${firstDay}_${currentYear}-${currentMonth + 1}-${lastDay}`;
  fetchAllAppointment(statusFilter, dateFilter);
  $("#text-apm-title-date").text("Lịch hẹn tháng " + (currentMonth + 1));
}

export function fetchUpcomingAppointment() {
  $.ajax({
    url: `${apiUrl}/api/appointment/all?status=0_1&upcomingAppointment=1`,
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
          $("#upcoming-appointments").append(apmElement(appointment));
        }
      }
    },
  });
}

export function updateStatus(id, status) {
  let _appointmentStatus = [
    "Đợi xác nhận",
    "Đã xác nhận",
    "Đã hoàn thành",
    "Đã hủy",
  ];
  let staff = JSON.parse(localStorage.getItem(`staff`));
  $.ajax({
    url: `${apiUrl}/api/appointment/updateStatus`,
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      status: status,
      apmId: id,
      description: `Nhân viên ${staff.name} đã cập nhật trạng thái thành ${_appointmentStatus[status]}`,
    }),
    success: (data) => {
      $("#apm-detail").addClass("hidden");

      if (status == 2){
        alert("Cập nhật hoàn thành lịch hẹn! Đang chuyển đến trang tạo hóa đơn");
        window.location.href = "/admin/invoice-create?apm="+id
      } else {
        alert("Cập nhật thành công");
        fetchUpcomingAppointment();
        fetchAllAppointment("0_1_2_3");
        showDefaultAppointment("0_1_2_3", (new Date().getMonth()+1), new Date().getFullYear())
      }

    },
  });
}

export function openAppointmentDetail(id) {
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

      let _appointmentStatus = [
        "Đợi xác nhận",
        "Đã xác nhận",
        "Đã hoàn thành",
        "Đã hủy",
      ];

      $("#apm-detail_select_status").html(
        `<option class="" value="" selected disabled cursor cursor-not-allowed>Cập nhật</option>`
      );
      if (info.status != "Đã hoàn thành"){
        _appointmentStatus.forEach((stt, index) => {
          if (stt === info.status) {
            for (let i = index + 1; i < _appointmentStatus.length; i++) {
              const optionElement = {
                type: "option",
                props: {
                  onclick: () => updateStatus(id, i),
                  value: i,
                  innerHTML: _appointmentStatus[i],
                },
              }
              $("#apm-detail_select_status").append(renderDOMElement(optionElement));
            }
          }
        });
      }
      $("#apm-detail").removeClass("hidden");
    },
  });
}


export function fetchServices() {
  $.ajax({
    url: `${apiUrl}/api/service/all`,
    method: "GET",
    async: false,
    success: (data) => {
      console.log( $("#service-apm-select-list"));
      data.forEach((service) => {
        
        $("#service-apm-select-list").append(
          `<option value="${service.id}">${service.name}</option>`
        );
      });
    },
  });
}

export function fetchCustomers() {
  $.ajax({
    url: `${apiUrl}/api/customer/all`,
    method: "GET",
    async: false,
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

