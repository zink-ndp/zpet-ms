let _customerElement = (s) => {
    return `
          <tr class="h-14 odd:bg-green-50">
              <td class="ms-2">${s.id}</td>
              <td class="text-left">${s.name}</td>
              <td class="text-left">${s.phone}</td>
              <td class="text-center">${s.dateCreated}</td>
              <td class="text-center text-sm font-semibold ${
                s.isActive === 1 ? "text-green-500" : "text-red-500"
              }">${s.isActive === 1 ? "Active" : "Disabled"}</td>
              <td class="text-left"><button onclick="openCustomerDetail(${
                s.id
              })" class="text-xs text-blue-500">Edit</button></td>
          </tr>
      `;
  };
  
  function openCustomerDetail(id) {
    $.ajax({
      url: `${apiUrl}/api/customer/byid?id=${id}`,
      method: "GET",
      success: (data) => {
        console.log(data);
        $("#et-customer_id").val(data.id);
        $("#et-customer_point").val(data.points.length === 0 ? "0" : data.points);
        $("#et-customer_name").val(data.name);
        $("#et-customer_phone").val(data.phone);
        $("#et-customer_joined-date").val(data.joinedDate);
        if (data.isActive === 1) {
          $("#et-customer_state option[value=1]").prop("selected", true);
        } else {
          $("#et-customer_state option[value=0]").prop("selected", true);
        }
        $("#customer-detail").removeClass("hidden");
      },
    });
  }
  
function showAddress(addresses){
    console.log(addresses);
    // TO-DO: Create Modal with Map for showing 
}

  function fetchAllCustomer(keyword) {
    $.ajax({
      url: `${apiUrl}/api/customer/all?keyword=${keyword}`,
      method: "GET",
      success: (data) => {
        console.log(data);
        $("#customers-table").empty();
        let customerList = data;
        for (let i = 0; i < customerList.length; i++) {
          let customer = customerList[i];
          let customerElement = _customerElement(customer);
          $("#customers-table").append(customerElement);
        }
      },
    });
  }
  
  function customerAdd() {
    $("#et-customer-add_name").val("");
    $("#et-customer-add_phone").val("");
    $("#et-customer-add_email").val("");
    $("#et-customer-add_password").val("");
    $("#et-customer-add_repassword").val("");
  
    function _processAdd() {
      let name = $("#et-customer-add_name").val();
      let phone = $("#et-customer-add_phone").val();
  
      let dataAdd = JSON.stringify({
        name: name,
        phone: phone,
      });
  
      $.ajax({
        url: `${apiUrl}/api/customer/add`,
        method: "POST",
        data: dataAdd,
        contentType: "application/json",
        success: (data) => {
          alert("Thêm khách hàng thành công!");
          $("#customer-add").addClass("hidden");
          fetchAllCustomer("");
        },
      });
    }
  
    $("#customer-add").removeClass("hidden");
  
    $("#btn-customer_add").click(() => {
      _processAdd();
    });
  }
  
  function customerUpdate(id) {
    let name = $("#et-customer_name").val();
    let phone = $("#et-customer_phone").val();
    let email = $("#et-customer_email").val();
    let role = $("#et-customer_role option:selected").val();
    let state = $("#et-customer_state option:selected").val();
  
    let dataUpdate = JSON.stringify({
      id: id,
      name: name,
      phone: phone,
      email: email,
      password: '',
      isManager: role,
      isWorking: state,
    });
  
    console.log(dataUpdate);
    
  
    $.ajax({
      url: `${apiUrl}/api/customer/update`,
      method: "POST",
      data: dataUpdate,
      contentType: "application/json",
      success: (data) => {
        alert("Cập nhật khách hàng thành công!");
        $("#customer-detail").addClass("hidden");
        fetchAllCustomer("");
      },
    })
  }
  