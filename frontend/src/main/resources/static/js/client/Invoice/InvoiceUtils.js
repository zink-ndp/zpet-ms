import { apiUrl } from "../../apiUrl.js";
import { formatMoney, renderDOMElement } from "../../utils.js";

export const $InvoiceUtils = () => {
  $(() => {
    fetchAllInvoice();
  });
};

function fetchAllInvoice() {
  $("#loading-overlay").removeClass("hidden");
  const customer = JSON.parse(localStorage.getItem("customer"));
  if (customer === null) {
    alert("Vui lòng đăng nhập!");
    window.location.href = "/login";
  }
  $.ajax({
    url: apiUrl + "/api/invoice/?customerId=" + customer.id,
    method: "GET",
    async: false,
    success: function (invoices) {
      $("#invoices-list").empty();
      if (invoices.length == 0) {
        $("#invoices-list").append(
          `<p class="w-full text-md text-gray-800">Chưa có hóa đơn nào!</p>`
        );
      } else {
        invoices.forEach((inv) => {
          const _invoiceElement = {
            type: "div",
            props: {
              id: "inv-" + inv.id,
              className:
                "invoice-item group hover:bg-green-50 py-5 px-8 rounded-md bg-white flex flex-col text-black",
              onclick: () => openInvoiceDetail(inv.id),
            },
            children: [
              {
                type: "div",
                props: {
                  className: "rounded-md flex flex-col ",
                  innerHTML: `<p><b>Mã hóa đơn: #</b>${inv.id}</p><br>
                                    <p><b>Ngày tạo: </b>${inv.createTime}</p>`,
                },
              },
              {
                type: "div",
                props: {
                  className: "w-full flex justify-between mt-2",
                  innerHTML: `<p>Tích lũy: ${inv.total / 1000} điểm</p><br>
                                    <p class="font-bold text-green-500 text-lg">${formatMoney(
                                      inv.total.toString()
                                    )}</p>`,
                },
              },
            ],
          };

          $("#invoices-list").append(renderDOMElement(_invoiceElement));
        });
      }
    },
    error: function (error) {
      console.error(error);
    },
  });
  $("#loading-overlay").addClass("hidden");
}

function openInvoiceDetail(id) {
  $("#invoice-detail").removeClass("hidden");

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
      const services = data.services;
      $("#invoice-detail_date").text(invoice.createTime);
      $("#invoice-detail_invoice-id").text(invoice.id);
      $("#invoice-detail_staff-id").text(invoice.staffId);
      $("#invoice-detail_customer-name").text(customer.name);
      $("#invoice-detail_table").empty();

      let total = 0;
      let allTotal = 0;

      for (let index = 0; index < services.length; index++) {
        const service = services[index];
        $("#invoice-detail_table").append(_serviceElement(service));
        total += service.price;
      }
      allTotal += total;
      $("#invoice-detail_total").text(formatMoney(total.toString()));
      $("#invoice-detail_allTotal").text(formatMoney(allTotal.toString()));
    },
  });
}
