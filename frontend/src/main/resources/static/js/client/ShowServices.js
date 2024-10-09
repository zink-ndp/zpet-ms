import { apiUrl } from "../apiUrl.js";
import { formatMoney } from "../utils.js";

export const $ShowService = () => {
  $(() => {
    showServices();
  });
};

export function showServices() {
  const serviceElement = (service) => {
    let addedToAppointment = false;
    if (localStorage.getItem("services") != null) {
      let storage = localStorage.getItem("services");
      let oldObject = JSON.parse(storage);
      for (let obj in oldObject) {
        if (oldObject[obj] == service.id) {
          addedToAppointment = true;
          break;
        }
      }
    }

    // Create the main div element for the card
    const cardDiv = document.createElement("div");
    cardDiv.classList.add(
      "card",
      addedToAppointment ? "bg-soft-peach" : "bg-green-200",
      "group"
    );

    // Create the anchor element
    const anchor = document.createElement("a");
    anchor.href = `/service-detail/${service.id}`;

    // Create the img element
    const img = document.createElement("img");
    img.src = "/images/illustration/doctor-cat2.png";
    img.classList.add(
      "w-64",
      "h-44",
      "rounded-lg",
      "mt-4",
      "object-cover",
      "group-hover:scale-105",
      "transition-all",
      "duration-300",
      "ease"
    );
    img.draggable = false;
    img.alt = "illustration";

    // Append the img to the anchor
    anchor.appendChild(img);

    // Create the inner div element (container for content)
    const contentDiv = document.createElement("div");
    contentDiv.classList.add(
      "relative",
      "flex",
      "flex-col",
      "justify-center",
      "items-center",
      "group",
      "w-full"
    );

    // Create the span for the service name
    const nameSpan = document.createElement("span");
    nameSpan.classList.add(
      "text-bright-green",
      "text-2xl",
      "font-semibold",
      "my-4"
    );
    nameSpan.textContent = service.name;

    // Create the span for the price
    const priceSpan = document.createElement("span");
    priceSpan.classList.add(
      "text-center",
      "text-lg",
      "font-semibold",
      "mx-5",
      "mb-4"
    );
    priceSpan.textContent = formatMoney(service.price.toString());

    // Create the overlay div
    const overlayDiv = document.createElement("div");
    overlayDiv.classList.add(
      "hidden",
      addedToAppointment ? "bg-soft-peach" : "bg-green-200",
      "group-hover:flex",
      "justify-center",
      "items-center",
      "rounded-lg",
      "transition-opacity",
      "absolute",
      "top-1/2",
      "left-1/2",
      "transform",
      "-translate-x-1/2",
      "-translate-y-1/2",
      "w-full",
      "h-full"
    );

    // Create the button element
    const button = document.createElement("button");
    button.classList.add("main-btn-register");

    // Set the button event listener based on appointment status
    button.addEventListener("click", function () {
      if (addedToAppointment) {
        removeFromAppointment(service.id);
      } else {
        addToAppointment(service.id);
      }
    });

    // Create the inner p element for the button label
    const buttonText = document.createElement("p");
    buttonText.classList.add(
      "absolute",
      "top-1/2",
      "left-1/2",
      "transform",
      "-translate-x-1/2",
      "-translate-y-1/2",
      "w-full",
      "text-white"
    );
    buttonText.textContent = addedToAppointment ? "Hủy lịch" : "Đặt lịch";

    // Create the image inside the button
    const buttonImg = document.createElement("img");
    buttonImg.src = "/images/icons/bone.svg";
    buttonImg.classList.add("w-44");
    buttonImg.draggable = false;
    buttonImg.alt = "illustration";

    // Append the button text and image to the button
    button.appendChild(buttonText);
    button.appendChild(buttonImg);

    // Append the button to the overlay div
    overlayDiv.appendChild(button);

    // Append everything to the content div
    contentDiv.appendChild(nameSpan);
    contentDiv.appendChild(priceSpan);
    contentDiv.appendChild(overlayDiv);

    // Append the anchor and content div to the main card div
    cardDiv.appendChild(anchor);
    cardDiv.appendChild(contentDiv);

    return cardDiv;
  };
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

export function addToAppointment(id) {
  let customer = localStorage.getItem("customer");
  if (customer === null) {
    alert("Vui lòng đăng nhập để đặt lịch hẹn!");
    window.location.href = "/login";
  } else {
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
}

export function removeFromAppointment(id) {
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
