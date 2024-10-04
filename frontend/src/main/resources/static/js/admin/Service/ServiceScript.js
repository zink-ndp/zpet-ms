let _serviceElement = (s) => {
  return `
          <tr class="h-14 odd:bg-green-50">
              <td class="ms-2">${s.id}</td>
              <td class="text-left">${s.name}</td>
              <td class="text-left">${s.description}</td>
              <td class="text-center">${s.price}</td>
              <td class="text-center">${s.rating != null ? s.rating : 0}</td>
              <td class="text-center text-sm font-semibold">
                <label class="inline-flex items-center cursor-pointer">
                  <input
                    onchange="updateAvailability(${s.id})"
                    id="status-switch-${
                      s.id
                    }" type="checkbox" value="" class="sr-only peer" ${
    s.isAvailable == 1 ? "checked" : ""
  }>
                  <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                </label>
              </td>
              <td>
                <button onclick="openServiceDetail(${
                  s.id
                })" class="text-blue-500 text-xs cursor-pointer">Edit</button>
              </td>
          </tr>
      `;
};

function updateAvailability(id) {
  $.ajax({
    url: `${apiUrl}/api/service/updateAvailable?id=${id}`,
    method: "POST",
    success: (data) => {
      console.log(data);
      fetchAllService("");
    },
    error: (xhr, status, error) => {
      console.error(xhr.responseText);
    },
  });
}

function openServiceDetail(id) {
  $.ajax({
    url: `${apiUrl}/api/service/all?id=${id}`,
    method: "GET",
    success: (data) => {
      console.log(data);
      const s = data[0];
      $("#et-service_id").val(s.id);
      $("#et-service_name").val(s.name);
      $("#et-service_description").val(s.description);
      $("#et-service_price").val(s.price);
      if (s.isAvailable === 1) {
        $("#et-service_state option[value=1]").prop("selected", true);
      } else {
        $("#et-service_state option[value=0]").prop("selected", true);
      }
      $("#service-detail").removeClass("hidden");

      function _updateProcess(id) {
        const data = JSON.stringify({
          id: id,
          name: $("#et-service_name").val(),
          description: $("#et-service_description").val(),
          price: $("#et-service_price").val(),
          isAvailable: $("#et-service_state option:selected").val(),
        });
        $.ajax({
          url: `${apiUrl}/api/service/update`,
          method: "POST",
          contentType: "application/json",
          data: data,
          success: (response) => {
            console.log(response);
            alert("Đã cập nhật dịch vụ");
            $("#service-detail").addClass("hidden");
            fetchAllService("");
          },
        });
      }

      $("#btn-service_update").click(() => _updateProcess(id));
    },
  });
}

function showAddress(addresses) {
  console.log(addresses);
  // TO-DO: Create Modal with Map for showing
}

function fetchAllService(keyword) {
  $.ajax({
    url: `${apiUrl}/api/service/all?keyword=${keyword}`,
    method: "GET",
    success: (data) => {
      console.log(data);
      $("#services-table").empty();
      let serviceList = data;
      for (let i = 0; i < serviceList.length; i++) {
        let service = serviceList[i];
        let serviceElement = _serviceElement(service);
        $("#services-table").append(serviceElement);
      }
    },
  });
}

function serviceAdd() {
  $("#et-service-add_name").val("");
  $("#et-service-add_phone").val("");
  $("#et-service-add_email").val("");
  $("#et-service-add_password").val("");
  $("#et-service-add_repassword").val("");

  function _processAdd() {
    let name = $("#et-service-add_name").val();
    let phone = $("#et-service-add_phone").val();

    let dataAdd = JSON.stringify({
      name: name,
      phone: phone,
    });

    $.ajax({
      url: `${apiUrl}/api/service/add`,
      method: "POST",
      data: dataAdd,
      contentType: "application/json",
      success: (data) => {
        alert("Thêm khách hàng thành công!");
        $("#service-add").addClass("hidden");
        fetchAllService("");
      },
    });
  }

  $("#service-add").removeClass("hidden");

  $("#btn-service_add").click(() => {
    _processAdd();
  });
}
