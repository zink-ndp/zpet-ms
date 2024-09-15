$(() => {
  fetchServices();
  fetchCustomers();

  let staff = JSON.parse(localStorage.getItem("staff"));

  let customerId = null;
  let tempTotal = 0;
  let total = 0;
  let services = [];
  let date = new Date();
  let today =
    date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear();

  $("#text-invoice_createDate").text(
    today.split("-")[1] + "/" + today.split("-")[0] + "/" + today.split("-")[2]
  );
  $("#text-invoice_staff").text(staff.name);

  $("#text-invoice_phone").change(() => {
    console.log($("#text-invoice_phone").val());
    let phone = $("#text-invoice_phone").val();
    $.ajax({
      url: `${apiUrl}/api/customer/byphone?phone=${phone}`,
      method: "GET",
      success: (data) => {
        customerId = data.id;
        $("#text-invoice_customer").val(data.name);
        $("#text-customer-null-alert").addClass("hidden");
      },
      error: (error) => {
        console.error(error);
        $("#text-customer-null-alert").removeClass("hidden");
        $("#text-invoice_customer").val("");
      },
    });
  });

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
    },
  });

  $("#btn-invoice_prrocess").click(() => {

    
    let dataCreate = {
        id: null,
        customerId: customerId,
        staffId: staff.id,
        total: tempTotal,
        services: services,
        addressId: null,
        voucherId: null,
        shipFeeId: null,
      };

      console.log(dataCreate);
      
  

    if (!nonEmpty(customerId, staff.id, services)) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (customerId == null) {
      let cName = $("#text-invoice_customer").val();
      let cPhone = $("#text-invoice_phone").val();

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
          success: (data) => {
            alert("Thêm khách hàng thành công!");
            $("#customer-add").hide();
            fetchAllCustomer("");
          },
        });
      } else {
        alert("Vui lòng điền đầy đủ thông tin!");
      }
    }

    $.ajax({
      url: `${apiUrl}/api/invoice/create`,
      method: "POST",
      data: JSON.stringify(dataCreate),
      contentType: "application/json",
      success: (data) => {
        alert("Tạo hóa đơn thành công!");
        window.location.href = "/invoice";
      },
    });
  });
});
