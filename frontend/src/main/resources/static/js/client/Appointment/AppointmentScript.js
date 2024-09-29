const apmElement = (apm) => {
  let color = "";
  switch (apm.status) {
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
  let returnElement = `
        <div
          class="flex items-center space-x-3 p-3 h-20 rounded-md bg-gray-50 hover:bg-gray-100 transition-all duration-300 ease-in-out"
        >
          <div class="flex-grow">
            <p class="text-lg font-semibold">${apm.date} - ${apm.time}</p>
            <p class="text-gray-600 text-md line-clamp-1">
              Ghi chú: ${apm.note ? apm.note : "Không có ghi chú"}
            </p>
          </div>
  `;
  if (apm.status == "Đợi xác nhận") {
    returnElement += `
      <button
        onclick="cancelAppointment(${apm.id})"
        class="border-[1px] border-red-500 flex-shrink-0 p-1 rounded-md font-bold text-red-500 text-sm hover:opacity-50"
      >
        Hủy hẹn
      </button>
    `;
  } else if (apm.status == "Đã xác nhận"){
    returnElement += `<p class="text-red-500 italic text-xs">Để hủy lịch hẹn đã xác nhận<br>Hãy gọi đến số 037 789 9959</p>`
  }

  returnElement += `
      <p
        class="flex-shrink-0 text-sm bg-${color}-100 text-${color}-700 p-2 rounded-md"
      >
        ${apm.status}
      </p>
      <button
        onclick="viewDetail(${apm.id})"
        class="flex-shrink-0 p-1 rounded-full text-blue-500 text-sm hover:opacity-50"
      >
        Chi tiết
      </button>
    </div>
    `;

  return returnElement;
};

function viewDetail(id) {
  $(`#appointment-detail`).removeClass("hidden");
  $.ajax({
    url: apiUrl + "/api/appointment/detail?id=" + id,
    method: "GET",
    success: function (data) {
      $(`#detail-time`).text(data.info.date + " - " + data.info.time);
      $(`#detail-status`).text(data.info.status);
      $(`#detail-note`).text(
        data.info.note != null ? data.info.note : "Không có ghi chú"
      );
      $(`#detail-customer-name`).text(data.info.customerName);
      $(`#detail-history`).empty();
      data.history.forEach((h) => {
        $(`#detail-history`).append(`
            <div class="flex-wrap">
                <p>${h.attime}: ${h.status}</p>
                <p class="text-sm text-gray-500">${h.description}</p>
            </div>
        `);
      });
    },
    error: function (error) {
      console.error(error);
    },
  });
}

function loadCurrentAppointments(customer) {
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
}

function cancelAppointment(id) {
  $("#cance-reason").attr("checked", "false");
  $("#creason-other_content").val("")
  $("#cancel-appointment").removeClass("hidden");
  $("#cancel-form").submit((e) => {
    e.preventDefault();

    let reason = '';
    
    $("input[name='cancel-reason']:checked").each((index, rs) => {
      reason += rs.value + "; "
    })

    // TO-DO
    // if ($(`#creason-other`).prop("checked")) {
    //   console.log();
      
    //   reason += $("#creason-other_content").val();
    // } 

    const dataRequest = JSON.stringify({
      apmId: id,
      status: 3,
      description: reason,
    })

    $.ajax({
      url: apiUrl + "/api/appointment/updateStatus",
      method: "POST",
      contentType: "application/json",
      data: dataRequest,
      success: function (data) {
        alert("Hủy lịch hẹn thành công!");
        $("#cancel-appointment").addClass("hidden");
        let customer = localStorage.getItem("customer");
        loadCurrentAppointments(customer);
        loadAppointment(customer)
      },
      error: function (error) {
        console.error(error);
        alert("Hủy lịch hẹn thất bại!");
      },
    });

  })
}

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
  })

});
