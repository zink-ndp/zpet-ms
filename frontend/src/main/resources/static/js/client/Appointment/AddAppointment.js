import { apiUrl } from "../../apiUrl.js";
import { nonEmpty } from "../../utils.js";
import { showServices } from "../ShowServices.js"

export const $AddAppointment = () => {
  $(() => {
    $(`#btn-create-appointment`).click(() => {
      let customer = localStorage.getItem("customer");
      if (customer == null) {
        alert("Vui lòng đăng nhập !");
        window.location.href = "/login";
      } else {
        processAppointment();
      }
    });
  });
};

const serviceInApointmentElement = (id) => {
  let s = [];

  $.ajax({
    url: apiUrl + "/api/service/all?id=" + id,
    type: "GET",
    async: false,
    success: function (data) {
      s = [...data];
    },
    error: function (error) {
      console.error("Error:", error);
      return;
    },
  });

  const service = s[0]
  // Create the <li> element
  const li = document.createElement("li");
  li.classList.add(
    "py-3",
    "px-5",
    "rounded-md",
    "bg-slate-50",
    "flex",
    "text-black",
    "justify-between"
  );

  // Create the <p> element and set the text content
  const p = document.createElement("p");
  p.textContent = service.name;
  li.appendChild(p);

  // Create the <button> element
  const button = document.createElement("button");
  button.classList.add("hover:bg-red-300/25", "p-1", "rounded-full");

  // Add event listener instead of onclick attribute
  button.addEventListener("click", function () {
    removeService(service.id); // Call removeService when the button is clicked
  });

  // Create the <img> element
  const img = document.createElement("img");
  img.src = "/images/icons/close.svg";
  img.classList.add("h-4", "w-4");
  img.alt = "";

  // Append the <img> to the button
  button.appendChild(img);

  // Append the button to the <li>
  li.appendChild(button);

  return li;
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
    $(`#service-added-button`).hide();
  } else {
    localStorage.setItem("services", JSON.stringify(newObject));
    $(`#service-added-button p`).text(newObject.length);
  }
  createAppointment();
  showServices();
}

export function createAppointment() {
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
  let customer = JSON.parse(localStorage.getItem("customer"));
  if (customer === null) {
    alert("Vui lòng đăng nhập để đặt lịch hẹn!");
    window.location.href = '/login'
  }
  let customerId = customer.id;
  let services = JSON.parse(localStorage.getItem("services"));
  let date = $("#datepicker-modal").val();
  let time = $("input[name=timepicker]").val();
  let note = $("#note-modal").val();
  console.log(customerId,services, date, time, note);

  if (!nonEmpty(customerId,services, date, time)) {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }

  let requestData = JSON.stringify({
    customerId: customerId,
    services: services,
    date: date,
    time: time,
    note: note,
  });
  console.log(requestData);
  $.ajax({
    url: apiUrl + "/api/appointment/create",
    type: "POST",
    data: requestData,
    contentType: "application/json",
    success: function () {
      alert("Đặt lịch thành công!");
      localStorage.removeItem("services");
      window.location.href = "/appointments";
    },
    error: function (error) {
      console.error("Error:", error);
    },
  });
}
