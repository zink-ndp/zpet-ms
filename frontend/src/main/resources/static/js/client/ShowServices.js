const serviceElement = (s) => {
  let adddedToAppointment = false;
  if (localStorage.getItem("services") != null) {
    let storage = localStorage.getItem("services");
    let oldObject = JSON.parse(storage);
    for (let obj in oldObject) {
      if (oldObject[obj] == s.id) {
        adddedToAppointment = true;
        break;
      }
    }
  }
  return `
        <div
        
          class="bg-white shadow-md rounded-md w-full h-44 p-4 flex flex-col"
        >
          <div class="flex w-full space-x-4">
            <img
              src="/images/hero.jpg"
              class="h-20 w-20 object-cover rounded-md"
              alt=""
            />
            <div class="flex flex-col space-y-2 justify-center">
              <a href="/service-detail/${
                s.id
              }" class="font-semibold text-green-500 text-xl">${s.name}</a>
              <p class="text-black font-semibold text-lg">${s.price}</p>
            </div>
          </div>
          <div class="flex items-center justify-between mt-2">
            <div class="flex space-x-1">
                ${
                  s.rating != null
                    ? `Đánh giá: &nbsp;
              <p>${s.rating}</p>
              <img src="/images/star_solid.svg" class="h-6 w-6" />`
                    : ``
                }
              
            </div>
            <button
              id="add-service-${s.id}"
              onclick="${
                adddedToAppointment
                  ? `removeFromAppointment(${s.id})`
                  : `addToAppointment(${s.id})`
              }"
              class="px-8 py-2 rounded-md ${
                adddedToAppointment ? `bg-red-500` : `bg-green-500`
              } text-white hover:opacity-75 transition-all duration-300 ease-in-out"
            >
              ${adddedToAppointment ? `Hủy lịch hẹn` : `Đặt lịch hẹn`}
            </button>
          </div>
        </div>
    `;
};

function showServices() {
  $.ajax({
    url: apiUrl + "/api/service/all",
    method: "GET",
    async: false,
    success: (data) => {
      let services = data;
      $("#grid-service").empty();
      services.forEach((service) => {
        $("#grid-service").append(serviceElement(service));
      });
    },
    error: (error) => {
      console.error("Error:", error);
    },
  });
}

function addToAppointment(id) {
  let newObject = [];
  if (localStorage.getItem("services") != null) {
    let storage = localStorage.getItem("services");
    let oldObject = JSON.parse(storage);
    for (let obj in oldObject) {
      newObject.push(oldObject[obj]);
    }
    newObject.push(id);
  } else {
    newObject.push(id);
    $(`#service-added-button`).show();
  }
  localStorage.setItem("services", JSON.stringify(newObject));
  $(`#service-added-button p`).text(newObject.length);
  alert("Đặt lịch hẹn thành công!");
  showServices();
}

function removeFromAppointment(id) {
  let newObject = [];
  let storage = localStorage.getItem("services");
  let oldObject = JSON.parse(storage);
  let filteredObject = oldObject.filter((obj) => obj != id);
  for (let obj in filteredObject) {
    newObject.push(filteredObject[obj]);
  }
  if (newObject.length == 0) {
    $(`#service-added-button`).hide();
    localStorage.removeItem("services");
  } else {
    localStorage.setItem("services", JSON.stringify(newObject));
    $(`#service-added-button p`).text(newObject.length);
  }
  alert("Xóa dịch vụ khỏi lịch hẹn thành công!");
  showServices();
}

$(() => {
  showServices();
});
