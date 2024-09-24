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
      [...data].forEach(({ id, name, phone }) => {
        $("#phone-select-list").append(
          `<option value="${phone}">${id} - ${name} - ${phone}</option>`
        );
      });
    },
  });
}

let _invoiceElement = ({ id, createTime, total }) => {
  return `
  <div onclick="openInvoiceDetail(${id})" id="invoice-element-${id}" class="invoice-element rounded-md flex items-center border-b-[1px] border-gray-200 px-4 py-3 mt-2 text-gray-600 hover:bg-slate-200">
    <p class="text-md text-green-500 font-semibold">Invoice #${id}</p>
    <p class="ms-3 text-sm text-gray-600 flex-grow">${createTime}</p>
    <p class="text-green-500 text-md font-semibold">${formatMoney(
      total.toString()
    )}</p> 
  </div>`;
};

function fetchInvoices() {
  $.ajax({
    url: `${apiUrl}/api/invoice/`,
    method: "GET",
    async: false,
    success: (data) => {
      $("#invoices-list").empty();
      data.forEach((invoice) => {
        $("#invoices-list").append(_invoiceElement(invoice));
      });
    },
  });
}

function openInvoiceDetail(id) {

  let _serviceElement = ({ name, price }) => {
    return `
        <tr class="border-b-2 border-gray-400">
            <td class="p-3 font-semibold">
                ${name}
            </td>
            <td class="p-3 text-right">
                ${formatMoney(price.toString())}
            </td>
        </tr>
        `;
  };

  $("#default-invoice-detail").hide();
  $("#showing-invoice-detail").removeClass("hidden");
  $(".invoice-element").removeClass("bg-green-100");
  $("#invoice-element-" + id).addClass("bg-green-100");
  $.ajax({
    url: `${apiUrl}/api/invoice/byid?id=${id}`,
    method: "GET",
    async: false,
    success: (data) => {
      const invoice = data.invoice;
      const customer = data.customer;
      const services = data.services
      $("#invoice-detail_date").text(invoice.createTime)
      $("#invoice-detail_invoice-id").text(invoice.id)
      $("#invoice-detail_staff-id").text(invoice.staffId)
      $("#invoice-detail_customer-name").text(customer.name)
      $("#invoice-detail_table").empty()
      for (let index = 0; index < services.length; index++) {
          const service = services[index];
          $("#invoice-detail_table").append(_serviceElement(service))
      }  
    },
  });
}
