import { apiUrl } from "../../apiUrl.js";
import { renderDOMElement } from "../../utils.js";

let _customerElement = ({id, name, phone, dateCreated, isActive}) => {

  const element = {
    type: "tr",
    props: {
      className: "h-14 odd:bg-green-50",
    },
    children: [
      {
        type: "td",
        props: {
          className: "ms-2",
          innerHTML: id,
        },
      },
      {
        type: "td",
        props: {
          className: "text-left",
        },
        children: [name],
      },
      {
        type: "td",
        props: {
          className: "text-left",
        },
        children: [phone],
      },
      {
        type: "td",
        props: {
          className: "text-center",
        },
        children: [dateCreated],
      },
      {
        type: "td",
        props: {
          className: `text-center text-sm font-semibold ${
            isActive === 1 ? "text-green-500" : "text-red-500"
          }`,
        },
        children: [isActive === 1 ? "Active" : "Disabled"],
      },
      {
        type: "td",
        props: {
          className: "text-left",
        },
        children: [
          {
            type: "button",
            props: {
              onClick: () => openCustomerDetail(id),
              className: "text-xs text-blue-500",
            },
            children: ["Edit"],
          },
        ],
      },
    ],
  };
  
  return renderDOMElement(element);
};

function openCustomerDetail(id) {
  $.ajax({
    url: `${apiUrl}/api/customer/byid?id=${id}`,
    method: "GET",
    success: (data) => {
      console.log(data);
      $("#et-customer_id").val(data.id);
      $("#et-customer_point").val(data.points.length === 0 ? "0" : data.points[0].total);
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

function showAddress(addresses) {
  console.log(addresses);
  // TO-DO: Create Modal with Map for showing
}

export function fetchAllCustomer(keyword) {
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
      $("#loading-overlay").addClass("hidden");
    },
  });
}

export function customerAdd() {
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

export function customerUpdate(id) {
  let name = $("#et-customer_name").val();
  let phone = $("#et-customer_phone").val();
  let isActive = $("#et-customer_state option:selected").val();

  $.ajax({
    url: `${apiUrl}/api/customer/update?id=${id}&name=${name}&phone=${phone}&isActive=${isActive}`,
    method: "POST",
    success: () => {
      alert("Cập nhật khách hàng thành công!");
      $("#customer-detail").addClass("hidden");
      fetchAllCustomer("");
    },
  });
}
