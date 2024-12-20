import { apiUrl } from "../../apiUrl.js";
import { renderDOMElement, nonEmpty } from "../../utils.js";
import { Timeline } from "../../Timeline.js"

let imageLink = (name) => {
  return `https://imgur.com/${name}`;
};

let _petElement = ({id, image, name, type, specie, gender, customerName}) => {

  const element = {
    type: "tr",
    props: {
      onclick: () => openPetDetail(id),
      className: `odd:bg-green-50 h-20 hover:bg-green-100 cursor-pointer rounded-md transition-all ease duration-300`,
    },
    children: [
      {
        type: "td",
        props: {
          className: "text-center",
          innerHTML: id,
        }
      }, 
      {
        type: "td",
        children: [
          {
            type: "img",
            props: {
              loading: "lazy",
              src: imageLink(image.split(".")[0].slice(0, -1) + "s." + image.split(".")[1]),
              className: `h-16 w-16 object-cover rounded-md`
            },
          }
        ]
      },
      {
        type: "td",
        props: {
          className: "text-left",
          innerHTML: name,
        }
      }, 
      {
        type: "td",
        props: {
          className: "text-center",
          innerHTML: specie,
        }
      }, 
      {
        type: "td",
        props: {
          className: "text-center",
          innerHTML: gender,
        }
      }, 
      {
        type: "td",
        props: {
          className: "text-left",
          innerHTML: customerName,
        }
      }, 
    ]
  }

  return renderDOMElement(element);

};

export function fetchAllPet() {
  $.ajax({
    url: `${apiUrl}/api/pet/all`,
    method: "GET",
    success: (data) => {
      $("#pet-table-body").empty();
      let petList = data;
      for (let i = 0; i < petList.length; i++) {
        let pet = petList[i];
        let petElement = _petElement(pet);
        $("#pet-table-body").append(petElement);
      }
      $("#loading-overlay").addClass("hidden");
    },
  });
}
function _changeImage(img) {
  $("#pet-detail_image").attr(
    "src",
    imageLink(img.split(".")[0].slice(0, -1) + "m." + img.split(".")[1])
  );
}

function updateHealth(id) {
  const health = $("#pethealth-health").val();
  const weight = $("#pethealth-weight").val();
  const note = $("#pethealth-note").val();

  const data = JSON.stringify({
    time: null,
    id: id,
    health: health,
    weight: weight,
    note: note,
  })

  if (!nonEmpty(id, health, weight)) {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }

  $.ajax({
    url: `${apiUrl}/api/pet/update-health`,
    method: "POST",
    async: false,
    contentType: "application/json",
    data: data,
    success: (data) => {
      fetchHealths(id);
      $("#pethealth-health").val("");
      $("#pethealth-weight").val("");
      $("#pethealth-note").val("");
    },
  });
}

function fetchHealths(id) {
  $.ajax({
    url: `${apiUrl}/api/pet/healths?id=${id}`,
    method: "GET",
    async: false,
    success: function (data) {
      if (data.length > 0) {
        $(`#pet-detail_history`).empty();
        data.forEach((p, index) => {
          const {time, health, weight, note} = data[index]; 
          $(`#pet-detail_history`).append(Timeline(time, health+` (${weight} kg)`, note));
        });
      } else {
        $(`#pet-detail_history`).html(`Thú cưng chưa khám sức khỏe`);
      }
    },
    error: function (error) {
      console.error(error);
    },
  });
}

const updateButton = (id) => {
  const element = {
    type: "button",
    props: {
      onclick: () => updateHealth(id),
      className: "bg-green-500 hover:bg-green-700 text-white p-2 rounded-md transition-all duration-100 ease-linear",
    },
    children: ["Cập nhật"],
  }
  return renderDOMElement(element);
}

export function openPetDetail(id) {
  $.ajax({
    url: `${apiUrl}/api/pet/byid?id=${id}`,
    method: "GET",
    async: false,
    success: (data) => {
      let pet = data;
      let img = pet.images[0];
      $("#pet-detail_image").attr(
        "src",
        imageLink(img.split(".")[0].slice(0, -1) + "m." + img.split(".")[1])
      );
      $("#pet-detail_image-list").empty();
      for (let index = 0; index < pet.images.length; index++) {
        const img = pet.images[index];

        const element = {
          type: "div",
          props: {
            onclick: () => _changeImage(img),
            className: `w-9 h-9 cursor-pointer`,
          },
          children: [
            {
              type: "img",
              props: {
                src: imageLink(img),
                className: `w-full h-full object-cover`
              }
            }
          ]
        }

        $("#pet-detail_image-list").append(renderDOMElement(element));
      }
      $("#pet-detail_name").text(pet.name);
      $("#pet-detail_typespecie").text(pet.type + " " + pet.specie);
      $("#pet-detail_gender").text(pet.gender);
      $("#pet-detail_birthday").text(pet.birthday);
      $("#pet-detail_customer").text(pet.customerName);
      $("#pet-detail").removeClass("hidden");
      
      // Fetch healths information
      fetchHealths(id);
    },
    error: (xhr, status, error) => {
      console.error("Error:", error);
      console.error("Status:", status);
      console.error("xhr:", xhr);
    },
  });

  $("#btn-update-health").html(updateButton(id));

}

export function createPet() {
  function _process() {
    let pet = {
      id: null,
      image: null,
      name: $("#pet-create_name").val(),
      typeId: $("#pet-create_pettype").val(),
      specie: $("#pet-create_typespecie").val(),
      gender: $("input[name=petgender]:checked").val(),
      birthday: $("#pet-create_birthday").val(),
      customerId: $("#pet-create_customer").val().split("-")[0],
    };
    let files = $("#pet-create-image")[0].files;
    let images = Array.from(files);

    if (
      !nonEmpty(pet.name, pet.typeId, pet.gender, pet.birthday, pet.customerId)
    ) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    if (!nonEmpty(images)) {
      alert("Vui lòng chọn ảnh cho thú cưng");
      return;
    }

    // Make the AJAX request
    $.ajax({
      url: `${apiUrl}/api/pet/create`,
      method: "POST",
      contentType: "application/json",
      processData: false,
      async: false,
      data: JSON.stringify(pet),
      success: (response) => {
        console.log(response);
        let isFirstImage = 1;
        images.map((image) => {
          const imageFD = new FormData();
          imageFD.append("image", image);
          imageFD.append("firstImage", isFirstImage);
          try {
            $.ajax({
              url: `${apiUrl}/api/pet/uploadImages`,
              method: "POST",
              contentType: false,
              processData: false,
              async: false,
              data: imageFD,
              success: (response) => {
                console.log("Images uploaded successfully:", response);
              },
              error: (jqXHR, textStatus, errorThrown) => {
                console.error("Error:", textStatus, errorThrown);
              },
            });
          } catch (error) {
            console.log("Upload Error:", error);
            // throw new Error("Upload Error:", error);
          }
          isFirstImage = 0;
        });
        alert("Tạo thú cưng thành công");
        fetchAllPet();
        $("#loading-overlay").addClass("hidden");
        $(".modal").addClass("hidden");
      },
      error: (jqXHR, textStatus, errorThrown) => {
        console.error("Error:", textStatus, errorThrown);
      },
    });
  }

  $.ajax({
    url: `${apiUrl}/api/customer/all`,
    method: "GET",
    success: (data) => {
      $("#customer-select-list")
        .html("")
        .append(
          `<option value="" disabled selected>- Chọn khách hàng -</option>`
        );
      data.forEach((customer) => {
        $("#customer-select-list").append(
          `<option value="${customer.id}-${customer.name}">${customer.id} - ${customer.name} - ${customer.phone}</option>`
        );
      });
    },
  });
  $("#pet-create").removeClass("hidden");
  $("#btn-create-pet").click(() => {
    $("#loading-overlay").removeClass("hidden");
    _process()
    $("#loading-overlay").addClass("hidden");
  });
}
