import { apiUrl } from "../../apiUrl.js";
import { renderDOMElement } from "../../utils.js";

export const $PetScript = () => {
  $(() => {
    getPetList();
  });
};

let imageLink = (name) => {
  return `https://imgur.com/${name}`;
};

let petElement = (p) => {
  const domNode = {
    type: "div",
    props: {
      id: "myNav",
      className:
        "flex items-center space-x-3 p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-all duration-300 ease-in-out",
    },
    children: [
      {
        type: "img",
        props: {
          src: imageLink(p.image.split(".")[0].slice(0, -1) + "s." + p.image.split(".")[1]),
          className: "w-20 h-20 object-cover",
        },
      },
      {
        type: "div",
        props: {
          className: "flex-grow",
        },
        children: [
          {
            type: "p",
            props: {
              className: "text-lg font-semibold",
            },
            children: [p.name],
          },
          {
            type: "p",
            props: {
              className: "text-gray-600 text-md",
            },
            children: [p.type + " " + p.specie],
          },
        ],
      },
      {
        type: "button",
        props: {
          onClick: () => openDetail(p.id),
          className:
            "flex-shrink-0 p-1 rounded-full text-blue-500 text-sm hover:opacity-50",
        },
        children: ["Chi tiết"],
      },
    ],
  };

  return renderDOMElement(domNode);
};

function getPetList() {
  if (
    localStorage.getItem("customer") == null ||
    localStorage.getItem("customer") == undefined
  ) {
    alert("Bạn cần đăng nhập để xem danh sách");
    window.location.href = "/login";
    return;
  }
  let customerId = JSON.parse(localStorage.getItem("customer")).id;

  $.ajax({
    url: `${apiUrl}/api/pet/all?customerId=${customerId}`,
    method: "GET",
    async: false,
    success: function (data) {
      const root = document.getElementById("pet-list");
      $(`#pet-list`).html("");
      if (data.length > 0) {
        data.forEach((element) => {
          root.append(petElement(element));
        });
      } else {
        $(`#pet-list`)
          .empty()
          .append(`Chưa có thú cưng nào. Hãy đến cửa hàng để được hỗ trợ`);
      }
    },
    error: function (error) {
      console.error(error);
    },
  });
  $("#loading-overlay").addClass("hidden")
}

function openDetail(id) {
  $.ajax({
    url: `${apiUrl}/api/pet/byid?id=${id}`,
    method: "GET",
    async: false,
    success: function (p) {
      const img = p.images[0];
      $(`#pet-detail-modal_detail`).html(`
        <img
          id="pet-detail-modal_image"
          src="${imageLink(img.split(".")[0].slice(0, -1) + "m." + img.split(".")[1])}"
          class="w-40 h-40 object-cover rounded-md"
          alt=""
        />
        <div class="flex flex-col justify-center space-y-3">
          <p class="font-semibold text-lg">Tên thú cưng: ${p.name}</p>
          <p class="text-gray-600">Loại: ${p.type} ${p.specie}</p>
          <p class="text-gray-600">Giới tính: ${p.gender}</p>
          <p class="text-gray-600">Ngày sinh: ${p.birthday}</p>
        </div>  
      `);
    },
    error: function (error) {
      console.error(error);
    },
  });

  // Fetch healths information
  $.ajax({
    url: `${apiUrl}/api/pet/healths?id=${id}`,
    method: "GET",
    async: false,
    success: function (data) {
      if (data.length > 0) {
        $(`#pet-detail-modal_health`).empty();
        data.forEach((p) => {
          $(`#pet-detail-modal_health`).append(`
            <li
              class="py-3 px-5 rounded-md bg-slate-50 flex flex-col justify-between"
            >
              <p><b>Thời gian:</b> ${p.time}</p>
              <p><b>TÌnh trạng sức khỏe:</b> ${p.health} - ${p.weight}</p>
              <p><b>Mô tả:</b>${p.note}</p>
            </li>  
          `);
        });
      } else {
        $(`#pet-detail-modal_health`).html(`Thú cưng chưa khám sức khỏe`);
      }
    },
    error: function (error) {
      console.error(error);
    },
  });

  $(`#pet-detail-modal`).removeClass("hidden");
}
