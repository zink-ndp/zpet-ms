const serviceInApointmentElement = (id) => {
  let s = [];

  $.ajax({
    url: apiUrl+"/api/service/all?id=" + id,
    type: "GET",
    async: false,
    success: function (data) {
      s = data;
    },
    error: function (error) {
      console.error("Error:", error);
    },
  });

  return `
          <li class="py-3 px-5 rounded-md bg-slate-50 flex justify-between">
          <p>${s[0].name}</p>
          <button onclick="removeService(${s[0].id})" class="hover:bg-red-300/25 p-1 rounded-full">
              <img src="/images/icons/close.svg" class="h-4 w-4" alt="" />
          </button>
          </li>    
      `;
};

function removeService(id) {
  let newObject = [];
  let storage = localStorage.getItem("services");
  let oldObject = JSON.parse(storage);
  let filteredObject = oldObject.filter((obj) => obj != id);
  for (let obj in filteredObject) {
    newObject.push(filteredObject[obj]);
  }
  if (newObject.length == 0) {
    localStorage.removeItem("services");
    $(`#service-added-button`).hide()
  } else {
      localStorage.setItem("services", JSON.stringify(newObject));
      $(`#service-added-button p`).text(newObject.length);
  }
  createAppointment()
  showServices()
}

function createAppointment() {
  $(`#added-service-modal`).empty();
  let storage = localStorage.getItem("services");
  let oldObject = JSON.parse(storage);
  for (let obj in oldObject) {
    $(`#added-service-modal`).append(
      serviceInApointmentElement(oldObject[obj])
    );
  }
 
}

function processAppointment() {
  let customer = localStorage.getItem('customer')

  let customerId = JSON.parse(customer).id;
  let services = JSON.parse(localStorage.getItem("services"));
  let date = $("#datepicker-modal").val();
  let time = $("#timepicker-modal").val();
  let note = $("#note-modal").val();
  console.log(customerId, services, date, time, note);

  if (!nonEmpty(customerId, services, date, time)) {
    alert("Vui lòng nhập đầy đủ thông tin")
    return
  }

  let requestData = JSON.stringify({
    customerId: customerId,
    services: services,
    date: date,
    time: time,
    note: note,
  })
  console.log(requestData);
  $.ajax({
    url: apiUrl+"/api/appointment/create",
    type: "POST",
    data: requestData,
    contentType: "application/json",
    success: function (data) {
      alert("Đặt lịch thành công!")
      localStorage.removeItem("services");
      window.location.href = "/appointments"
    },
    error: function (error) {
      console.error("Error:", error);
    },
  })

}

export const $AddAppointment = () => {
  $(() => {



    $(`#btn-create-appointment`).click(() => {
      let customer = localStorage.getItem('customer')
      if (customer == null) {
        alert("Vui lòng đăng nhập !")
        window.location.href = "/login"
      } else {
        processAppointment()
      }
    })
  })
}
