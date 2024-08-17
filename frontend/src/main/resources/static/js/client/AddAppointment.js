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
              <img src="/images/close.svg" class="h-4 w-4" alt="" />
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
