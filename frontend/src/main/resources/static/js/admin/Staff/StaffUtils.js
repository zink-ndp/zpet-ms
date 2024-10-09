import { apiUrl } from "../../apiUrl.js";
import { renderDOMElement } from "../../utils.js";

let _staffElement = ({
  id,
  isManager,
  name,
  phone,
  email,
  joinedDate,
  isWorking,
}) => {
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
          className: "",
        },
        children: [
          {
            type: "div",
            props: {
              className: `mx-auto py-1 px-2 rounded-full text-sm text-white font-semibold w-fit h-fit ${
                isManager == 1 ? "bg-green-500" : "bg-blue-500"
              }`,
            },
            children: [isManager == 1 ? "Manager" : "Staff"],
          },
        ],
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
          className: "text-left",
        },
        children: [email],
      },
      {
        type: "td",
        props: {
          className: "text-center",
        },
        children: [joinedDate],
      },
      {
        type: "td",
        props: {
          className: `text-center text-sm font-semibold ${
            isWorking == 1 ? "text-green-500" : "text-red-500"
          }`,
        },
        children: [isWorking == 1 ? "Working" : "Unemployed"],
      },
      {
        type: "td",
        props: {
          id: "td-" + id,
          className: "text-left",
        },
        children: [
          {
            type: "button",
            props: {
              onClick: () => openStaffDetail(id),
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

function openStaffDetail(id) {
  $.ajax({
    url: `${apiUrl}/api/staff/byid?id=${id}`,
    method: "GET",
    success: (data) => {
      console.log(data);
      $("#et-staff_id").val(data.id);
      $("#et-staff_name").val(data.name);
      $("#et-staff_phone").val(data.phone);
      $("#et-staff_email").val(data.email);
      $("#et-staff_joined-date").val(data.joinedDate);
      if (data.isManager == 1) {
        $("#et-staff_role option[value=1]").prop("selected", true);
      } else {
        $("#et-staff_role option[value=0]").prop("selected", true);
      }
      if (data.isWorking == 1) {
        $("#et-staff_state option[value=1]").prop("selected", true);
      } else {
        $("#et-staff_state option[value=0]").prop("selected", true);
      }
      $("#staff-detail").removeClass("hidden");
    },
  });
}

export function fetchAllStaff(keyword) {
  $("#loading-overlay").removeClass("hidden");
  $.ajax({
    url: `${apiUrl}/api/staff/all?keyword=${keyword}`,
    method: "GET",
    success: (data) => {
      console.log(data);
      $("#staffs-table").empty();
      let staffList = data;
      for (let i = 0; i < staffList.length; i++) {
        $("#staffs-table").append(_staffElement(staffList[i]));
      }
      $("#loading-overlay").addClass("hidden");
    },
  });
}

export function staffAdd() {
  $("#et-staff-add_name").val("");
  $("#et-staff-add_phone").val("");
  $("#et-staff-add_email").val("");
  $("#et-staff-add_password").val("");
  $("#et-staff-add_repassword").val("");

  function _processAdd() {
    $("#loading-overlay").removeClass("hidden");
    let pw = $("#et-staff-add_password").val();
    let rpw = $("#et-staff-add_repassword").val();
    if (pw != rpw) {
      alert("Mật khẩu không trùng khớp!");
      return;
    }
    let name = $("#et-staff-add_name").val();
    let phone = $("#et-staff-add_phone").val();
    let email = $("#et-staff-add_email").val();
    let role = $("#et-staff-add_role option:selected").val();
    let state = $("#et-staff-add_state option:selected").val();

    let dataAdd = JSON.stringify({
      name: name,
      phone: phone,
      email: email,
      password: pw,
      isManager: role,
      isWorking: state,
    });

    $.ajax({
      url: `${apiUrl}/api/staff/add`,
      method: "POST",
      data: dataAdd,
      contentType: "application/json",
      success: (data) => {
        alert("Thêm nhân viên thành công!");
        $("#staff-add").addClass("hidden");
        fetchAllStaff("");
        $("#loading-overlay").addClass("hidden");
      },
    });
  }

  $("#staff-add").removeClass("hidden");

  $("#btn-staff_add").click(() => {
    _processAdd();
  });
}

export function staffUpdate(id) {
  $("#loading-overlay").removeClass("hidden");
  let name = $("#et-staff_name").val();
  let phone = $("#et-staff_phone").val();
  let email = $("#et-staff_email").val();
  let role = $("#et-staff_role option:selected").val();
  let state = $("#et-staff_state option:selected").val();

  let dataUpdate = JSON.stringify({
    id: id,
    name: name,
    phone: phone,
    email: email,
    password: "",
    isManager: role,
    isWorking: state,
  });

  console.log(dataUpdate);

  $.ajax({
    url: `${apiUrl}/api/staff/update`,
    method: "POST",
    data: dataUpdate,
    contentType: "application/json",
    success: (data) => {
      alert("Cập nhật nhân viên thành công!");
      $("#staff-detail").addClass("hidden");
      fetchAllStaff("");
      $("#loading-overlay").addClass("hidden");
    },
  });
}
