import { fetchCustomers, fetchServices } from "./InvoiceUtils.js";
import { formatMoney, nonEmpty } from "../../utils.js";
import { apiUrl } from "../../apiUrl.js";

export const InvoiceCreateScript = () => {
  $(() => {
    fetchServices();
    fetchCustomers();

    $("#loading-overlay").addClass("hidden");

    $("#text-invoice_customer").val("");
    $("#text-invoice_phone").val("");
    $("#cb-use-point").prop("checked", false);

    // Invoice Create

    let staff = JSON.parse(localStorage.getItem("staff"));

    let customerId = null;
    let tempTotal = 0;
    let total = 0;
    let isUsingPoint = false;
    let point = null;
    let services = [];
    let currentPoint = 0;
    let date = new Date();
    let today =
      date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear();

    $("#text-invoice_createDate").text(
      today.split("-")[1] +
        "/" +
        today.split("-")[0] +
        "/" +
        today.split("-")[2]
    );
    $("#text-invoice_staff").text(staff.name);

    $("#text-invoice_phone").change(() => {
      let phone = $("#text-invoice_phone").val();
      $.ajax({
        url: `${apiUrl}/api/customer/byphone?phone=${phone}`,
        method: "GET",
        async: false,
        success: (data) => {
          customerId = data.id;
          $("#text-invoice_customer").val(data.name);
          $("#text-customer-null-alert").addClass("hidden");
          $("label[for=cb-use-point]").html(`Sử dụng điểm (Hiện có ${data.point} điểm)`);
          $("#cb-use-point").prop("disabled", false);
          $("#cb-use-point").prop("max", data.point);
          currentPoint = data.point;
        },
        error: (error) => {
          console.error(error);
          $("#text-customer-null-alert").removeClass("hidden");
          $("#text-invoice_customer").val("");
        },
      });
    });

    $("#btn-check-point").click(() => {
      let usePoint = parseInt($("#point-to-use").val());
      if (usePoint > currentPoint) {
        alert("Không đủ điểm để sử dụng");
        return;
      }
      tempTotal -= usePoint;
      $("#text-temp-total").text(formatMoney(tempTotal.toString()));
      $("#text-point").text((tempTotal * 0.001).toString());
      isUsingPoint = true;
      point = $("#point-to-use").val();
    });

    // If an appointment is finished

    let urlParams = new URLSearchParams(window.location.search);
    let apmId = urlParams.get("apm");

    if (apmId) {
      $.ajax({
        url: `${apiUrl}/api/appointment/detail?id=${apmId}`,
        method: "GET",
        async: false,
        success: (data) => {
          let { info, service } = data;
          customerId = info.customerId;
          $("#text-invoice_phone").val(info.customerPhone);
          $("#text-invoice_customer").val(info.customerName);
          $.ajax({
            url: `${apiUrl}/api/customer/byphone?phone=${info.customerPhone}`,
            method: "GET",
            async: false,
            success: (data) => {
              customerId = data.id;
              $("#text-invoice_customer").val(data.name);
              $("#text-customer-null-alert").addClass("hidden");
              $("label[for=cb-use-point]").html(`Sử dụng điểm (Hiện có ${data.point} điểm)`);
              $("#cb-use-point").prop("disabled", false);
              $("#cb-use-point").prop("max", data.point);
              currentPoint = data.point;
            },
            error: (error) => {
              console.error(error);
              $("#text-customer-null-alert").removeClass("hidden");
              $("#text-invoice_customer").val("");
            },
          });
        },
        error: (error) => {
          console.error(error);
          alert("Lịch hẹn không tồn tại");
          window.location.href = "/admin/invoice";
        },
      });
    }

    if ($("#service-select-list").length > 0) {
      new MultiSelectTag("service-select-list", {
        placeholder: "Select service",
        tagColor: {
          textColor: "#00c400",
          borderColor: "#00c400",
          bgColor: "#d4ffd4",
        },
        onChange: function (values) {
          let ids = values.map((v) => v.value);
          services = ids;
          let prices = values.map((v) => parseInt(v.label.split("-")[1]));
          tempTotal = prices.reduce((a, b) => a + b, 0);
          $("#text-temp-total").text(formatMoney(tempTotal.toString()));
          $("#text-point").text((tempTotal * 0.001).toString());
          isUsingPoint = false;
          $("#cb-use-point").prop("checked", false);
        },
      });
    }

    $("#cb-use-point").change((e) => {
      if (e.target.checked) {
        $("#use-point-area").addClass("flex").removeClass("hidden");
      } else {
        $("#use-point-area").addClass("hidden").removeClass("flex");
        point=null;
      }
    });

    $("#btn-invoice_prrocess").click(() => {
      if (!nonEmpty(services)) {
        alert("Vui lòng chọn dịch vụ!");
        return;
      }

      let dataCreate = {
        id: null,
        customerId: customerId,
        staffId: staff.id,
        total: tempTotal,
        services: services,
        addressId: null,
        voucherId: null,
        shipFeeId: null,
        point: point
      };

      console.log(dataCreate);

      function _process(data) {
        $("#loading-overlay").removeClass("hidden");
        if (isUsingPoint) {
          $.ajax({
            url: `${apiUrl}/api/customer/updatePoint`,
            method: "POST",
            data: JSON.stringify({
              time: "",
              customerId: customerId,
              change: $("#point-to-use").val(),
              isEarn: 0,
              total: 0,
            }),
            contentType: "application/json",
            async: false,
            success: (data) => {},
          });
        }

        setTimeout(() => {
          $.ajax({
            url: `${apiUrl}/api/invoice/create`,
            method: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            async: false,
            success: (data) => {
              $("#loading-overlay").addClass("hidden");
              alert("Tạo hóa đơn thành công!");
              window.location.href = "/admin/invoice";
            },
          });
        }, 1000);
      }

      let cName = $("#text-invoice_customer").val();
      let cPhone = $("#text-invoice_phone").val();
      if (customerId == null) {
        if (nonEmpty(cName, cPhone)) {
          let dataAdd = JSON.stringify({
            name: cName,
            phone: cPhone,
          });

          $.ajax({
            url: `${apiUrl}/api/customer/add`,
            method: "POST",
            data: dataAdd,
            contentType: "application/json",
            async: false,
            success: (data) => {
              alert("Thêm khách hàng thành công!");
            },
          });
        } else {
          alert("Vui lòng điền đầy đủ thông tin!");
        }
      }

      if (nonEmpty(cName, cPhone)) {
        _process(dataCreate);
      } else {
        alert("Vui lòng điền đầy đủ thông tin!");
      }
    });
  });
};
