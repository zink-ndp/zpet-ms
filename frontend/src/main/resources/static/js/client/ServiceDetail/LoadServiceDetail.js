import { apiUrl } from "../../apiUrl.js";

export const $ServiceDetailUtils = () => {
  $(() => {
    let id =
      window.location.href.split("/")[
        window.location.href.split("/").length - 1
      ];

    if (id == undefined) window.location.href = "/404";

    $.ajax({
      url: `${apiUrl}/api/service/all?id=${id}`,
      method: "GET",
      success: (data) => {
        if (data.length == 0) window.location.href = "/404";
        console.log(data);
        showServiceDetail(data[0]);
        showServiceRates(data[0].id);
      },
      error: (error) => {
        console.error(error);
        window.location.href = "/404";
      },
    });
  });
};

function addToAppointment(id) {
  let customer = JSON.parse(localStorage.getItem("customer"));
  if (customer === null) {
    alert("Vui lòng đăng nhập để đặt lịch hẹn!");
    window.location.href = "/login";
  }
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
  location.reload();
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
  location.reload();
}

const mainButtonServiceDetail = (isAdded) => {
  return `
        <button
            id="main-btn"
            data-added=${isAdded ? "true" : "false"}
            class="${
              isAdded ? `bg-red-500` : `bg-green-500`
            } hover:opacity-75 w-40 p-2 rounded-lg text-white font-semibold ms-auto"
        >
            ${isAdded ? `Xóa đặt lịch` : `Đặt lịch ngay`}
        </button>
    `;
};

function showServiceDetail(s) {
  $(`#name-text`).text(s.name);
  $(`#description-text`).text(s.description);
  $(`#price-text`).text(s.price);
  $(`#rating-text`).text(s.rating);
  let storage = JSON.parse(localStorage.getItem("services"));

  $(`#name-text`).siblings("button").remove();

  if (storage !== null) {
    let isAddedLoop = false;
    for (let i in storage) {
      if (storage[i] == s.id) {
        isAddedLoop = true;
        break;
      }
    }
    if (isAddedLoop) {
      $(`#name-text`).parent().append(mainButtonServiceDetail(true));
    } else {
      $(`#name-text`).parent().append(mainButtonServiceDetail(false));
    }
  } else {
    $(`#name-text`).parent().append(mainButtonServiceDetail(false));
  }

  $(`#main-btn`).click(() => {
    if ($(`#main-btn`).attr("data-added") == "false") {
      addToAppointment(s.id);
    } else {
      removeFromAppointment(s.id);
    }
  });
}

const rateElement = (r) => {
  return `
      <div class="flex">
        <div class="h-12 w-12 rounded-full bg-gray-500"></div>
        <div class="flex flex-col flex-1 ms-4">
        <div class="flex items-center w-full">
            <p class="text-md font-semibold">${r.customerName}</p>
            <div class="text-sm text-gray-400 ms-3 mt-1 flex items-center">
                Đã đánh giá: &nbsp;
                <span>${r.star}</span>
                <img src="/images/icons/star-solid.svg" class="h-6 w-6 ms-1" />
            </div>
            <p class="text-sm text-gray-400 font-semibold">${r.dateTime}</p>
        </div>
        <p class="text-gray-600">
            ${r.comment != null ? r.comment : "Không có đánh giá"}
        </p>
        </div>
    </div>
    `;
};

function showServiceRates(id) {
  $(`#rate-list`).empty();
  $.ajax({
    url: `${apiUrl}/api/service/rates?id=${id}`,
    method: "GET",
    success: (data) => {
      console.log(data);
      if (data.length == 0) {
        $(`#rate-list`).append(
          `<div class="w-full h-full justify-center item-center"><p class="text-center">Chưa có đánh giá nào.</p></div>`
        );
        return;
      }
      for (let rate of data) {
        $(`#rate-list`).append(rateElement(rate));
      }
    },
    error: (error) => {
      console.error(error);
    },
  });
}
