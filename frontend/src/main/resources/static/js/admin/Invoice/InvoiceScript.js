function fetchServices() {
  $.ajax({
    url: `${apiUrl}/api/service/all`,
    method: "GET",
    async: false,
    success: (data) => {
      $("#service-select-list").html("");
      data.forEach((service) => {
        $("#service-select-list").append(
          `<option value="${service.id}">${service.name}-${service.price}</option>`
        );
      });
    },
  });
}

function fetchCustomers() {
  $.ajax({
    url: `${apiUrl}/api/customer/all`,
    method: "GET",
    async: false,
    success: (data) => {
      $("#phone-select-list")
        .html("")
        .append(
          `<option value="" disabled selected>- Chọn khách hàng -</option>`
        );
      data.forEach((customer) => {
        $("#phone-select-list").append(
          `<option value="${customer.phone}">${customer.id} - ${customer.name} - ${customer.phone}</option>`
        );
      });
    },
  });
}
