import { apiUrl } from "../../apiUrl.js";
import { nonEmpty } from "../../utils.js";
import { Timeline } from "../../Timeline.js";
import { sendMessage } from "../Notification.js";

const apmElement = ({ id, status, date, time, note }) => {
  let color = "";
  switch (status) {
    case "Đợi xác nhận":
      color = "yellow";
      break;
    case "Đã xác nhận":
      color = "blue";
      break;
    case "Đã hoàn thành":
      color = "green";
      break;
    case "Đã hủy":
      color = "red";
      break;
    default:
      break;
  }
  // Create the main div element
  const containerDiv = document.createElement("div");
  containerDiv.classList.add(
    "flex",
    "items-center",
    "space-x-3",
    "p-3",
    "h-20",
    "rounded-md",
    "bg-gray-50",
    "hover:bg-gray-100",
    "transition-all",
    "duration-300",
    "ease-in-out"
  );

  // Create the flex-grow div for date and note
  const infoDiv = document.createElement("div");
  infoDiv.classList.add("flex-grow");

  // Create the p element for date and time
  const dateP = document.createElement("p");
  dateP.classList.add("text-lg", "font-semibold");
  dateP.textContent = `${date} - ${time}`;

  // Create the p element for the note
  const noteP = document.createElement("p");
  noteP.classList.add("text-gray-600", "text-md", "line-clamp-1");
  noteP.textContent = `Ghi chú: ${note ? note : "Không có ghi chú"}`;

  // Append date and note to the info div
  infoDiv.appendChild(dateP);
  infoDiv.appendChild(noteP);

  // Append info div to the container
  containerDiv.appendChild(infoDiv);

  // Conditionally add the button or text depending on the status
  if (status === "Đợi xác nhận") {
    const cancelButton = document.createElement("button");
    cancelButton.classList.add(
      "border-[1px]",
      "border-red-500",
      "flex-shrink-0",
      "p-1",
      "rounded-md",
      "font-bold",
      "text-red-500",
      "text-sm",
      "hover:opacity-50"
    );
    cancelButton.textContent = "Hủy hẹn";

    // Add event listener for cancel button
    cancelButton.addEventListener("click", function () {
      cancelAppointment(id);
    });

    containerDiv.appendChild(cancelButton);
  } else if (status === "Đã xác nhận") {
    const confirmedText = document.createElement("p");
    confirmedText.classList.add("text-red-500", "italic", "text-xs");
    confirmedText.innerHTML = `Để hủy lịch hẹn đã xác nhận<br>Hãy gọi đến số 037 789 9959`;
    containerDiv.appendChild(confirmedText);
  }

  // Create the status element
  const statusP = document.createElement("p");
  statusP.classList.add(
    "flex-shrink-0",
    "text-sm",
    `bg-${color}-100`,
    `text-${color}-700`,
    "p-2",
    "rounded-md"
  );
  statusP.textContent = status;

  // Append the status element to the container
  containerDiv.appendChild(statusP);

  // Create the details button
  const detailsButton = document.createElement("button");
  detailsButton.classList.add(
    "flex-shrink-0",
    "p-1",
    "rounded-full",
    "text-blue-500",
    "text-sm",
    "hover:opacity-50"
  );
  detailsButton.textContent = "Chi tiết";

  // Add event listener for details button
  detailsButton.addEventListener("click", function () {
    viewDetail(id);
  });

  // Append the details button to the container
  containerDiv.appendChild(detailsButton);

  return containerDiv;
};

export function viewDetail(id) {
  $(`#appointment-detail`).removeClass("hidden");
  $.ajax({
    url: apiUrl + "/api/appointment/detail?id=" + id,
    method: "GET",
    success: function (data) {
      console.log(data);

      $(`#detail-time`).text(data.info.date + " - " + data.info.time);
      $(`#detail-status`).text(data.info.status);
      $(`#detail-note`).text(
        data.info.note != null ? data.info.note : "Không có ghi chú"
      );
      $(`#detail-customer-name`).text(data.info.customerName);
      $(`#detail-history`).empty();
      data.history.forEach(({ attime, status, description }) => {
        $(`#detail-history`).append(Timeline(attime, status, description));
      });
    },
    error: function (error) {
      console.error(error);
    },
  });
}

export function loadCurrentAppointments(customer) {
  $.ajax({
    url:
      apiUrl +
      "/api/appointment/all?status=0_1&customerId=" +
      JSON.parse(customer).id,
    method: "GET",
    success: function (data) {
      if (data.length == 0 || data == null) {
        $(`#appointment-current-list`).html(`
                        <p class="text-center">
                            Không có lịch hẹn nào. Hãy
                            <span class="text-green-600 underline cursor-pointer"
                                ><a href="/">đặt hẹn</a></span
                            >
                            ngay nhé!
                        </p>`);
      } else {
        $(`#appointment-current-list`).empty();
        data.forEach((apm) => {
          $(`#appointment-current-list`).append(apmElement(apm));
        });
      }
    },
    error: function (error) {
      console.error(error);
    },
  });
}

function loadAppointment(customer) {
  let status = $(`#status`).val();
  let dateFrom = $(`#dateFrom`).val();
  let dateTo = $(`#dateTo`).val();
  let dateFilter = "";
  if (nonEmpty(dateFrom, dateTo)) {
    dateFilter = dateFrom + "_" + dateTo;
    console.log(dateFilter);
  }
  $.ajax({
    url:
      apiUrl +
      `/api/appointment/all?dateFilter=${dateFilter}&status=${status}&customerId=` +
      JSON.parse(customer).id,
    method: "GET",
    async: false,
    success: function (data) {
      if (data.length == 0 || data == null) {
        $(`#appointment-history-list`).html(`
                        <p class="text-center">
                            Không có lịch hẹn nào. Hãy
                            <span class="text-green-600 underline cursor-pointer"
                                ><a href="/">đặt hẹn</a></span
                            >
                            ngay nhé!
                        </p>`);
      } else {
        $(`#appointment-history-list`).empty();
        data.forEach((apm) => {
          $(`#appointment-history-list`).append(apmElement(apm));
        });
      }
    },
    error: function (error) {
      console.error(error);
    },
  });
  $("#loading-overlay").addClass("hidden");
}

function cancelAppointment(id) {
  $("#cance-reason").attr("checked", "false");
  $("#creason-other_content").val("");
  $("#cancel-appointment").removeClass("hidden");
  $("#cancel-form").submit((e) => {
    e.preventDefault();

    let reason = "";

    $("input[name='cancel-reason']:checked").each((index, rs) => {
      reason += rs.value + "; ";
    });

    const dataRequest = JSON.stringify({
      apmId: id,
      status: 3,
      description: reason,
    });

    $.ajax({
      url: apiUrl + "/api/appointment/updateStatus",
      method: "POST",
      contentType: "application/json",
      data: dataRequest,
      success: function (data) {
        let customer = localStorage.getItem("customer");
        sendMessage(
          "/apm/news",
          "Hủy lịch hẹn",
          "Khách hàng " + JSON.parse(customer).name + " đã hủy lịch: " + reason,
          null,
          id
        );
        alert("Hủy lịch hẹn thành công!");
        $("#cancel-appointment").addClass("hidden");
        loadCurrentAppointments(customer);
        loadAppointment(customer);
      },
      error: function (error) {
        console.error(error);
        alert("Hủy lịch hẹn thất bại!");
      },
    });
  });
}

export const $appointmentUtils = () => {
  $(() => {
    let customer = localStorage.getItem("customer");
    if (customer == null) {
      alert("Vui lòng đăng nhập !");
      window.location.href = "/login";
    }

    loadCurrentAppointments(customer);

    loadAppointment(customer);

    $(`#status`).change(() => {
      loadAppointment(customer);
    });

    $(`#dateFrom`).focusout(() => {
      loadAppointment(customer);
    });

    $(`#dateTo`).focusout(() => {
      loadAppointment(customer);
    });

    if ($(`#creason-other`).prop("checked")) {
      $("#creason-other_content").removeClass("hidden");
    } else {
      $("#creason-other_content").addClass("hidden");
    }

    $("#creason-other").change(() => {
      $("#creason-other_content").toggleClass("hidden");
    });
  });
};
