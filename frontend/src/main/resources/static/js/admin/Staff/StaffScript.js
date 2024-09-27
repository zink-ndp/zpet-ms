let _staffElement = (s) => {
  return `
        <tr class="h-14 odd:bg-green-50">
            <td class="ms-2">${s.id}</td>
            <td class="">
                <div class="mx-auto py-1 px-2 rounded-full text-sm text-white font-semibold w-fit h-fit ${
                  s.isManager == 1 ? "bg-green-500" : "bg-blue-500"
                }">${s.isManager == 1 ? "Manager" : "Staff"}</div>
            </td>
            <td class="text-left">${s.name}</td>
            <td class="text-left">${s.phone}</td>
            <td class="text-left">${s.email}</td>
            <td class="text-center">${s.joinedDate}</td>
            <td class="text-center text-sm font-semibold ${
              s.isWorking == 1 ? "text-green-500" : "text-red-500"
            }">${s.isWorking == 1 ? "Working" : "Unemployed"}</td>
            <td class="text-left"><button onclick="openStaffDetail(${
              s.id
            })" class="text-xs text-blue-500">Edit</button></td>
        </tr>
    `;
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

function fetchAllStaff(keyword) {
  $.ajax({
    url: `${apiUrl}/api/staff/all?keyword=${keyword}`,
    method: "GET",
    success: (data) => {
      console.log(data);
      $("#staffs-table").empty();
      let staffList = data;
      for (let i = 0; i < staffList.length; i++) {
        let staff = staffList[i];
        let staffElement = _staffElement(staff);
        $("#staffs-table").append(staffElement);
      }
    },
  });
}

function staffAdd() {
  $("#et-staff-add_name").val("");
  $("#et-staff-add_phone").val("");
  $("#et-staff-add_email").val("");
  $("#et-staff-add_password").val("");
  $("#et-staff-add_repassword").val("");

  function _processAdd() {
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
        $("#staff-add").hide();
        fetchAllStaff("");
      },
    });
  }

  $("#staff-add").removeClass("hidden");

  $("#btn-staff_add").click(() => {
    _processAdd();
  });
}

function staffUpdate(id) {
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
    password: '',
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
      $("#staff-detail").hide();
      fetchAllStaff("");
    },
  })
}
