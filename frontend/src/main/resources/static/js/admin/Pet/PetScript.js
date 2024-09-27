let imageLink = (name) => {
  // return `https://firebasestorage.googleapis.com/v0/b/zpet-images.appspot.com/o/pets%2F${name}?alt=media&token=1033c20d-d9db-4e24-ac5c-3824bf5345ea`;
  return `https://imgur.com/${name}`;
};

let _petElement = (p) => {
  return `
        <tr onclick="openPetDetail(${
          p.id
        })" class="odd:bg-green-50 h-20 hover:bg-green-100 cursor-pointer rounded-md transition-all ease duration-300">
            <td class="text-center">${p.id}</td>
            <td>
                <img
                loading="lazy"
                src="${imageLink(p.image)}"
                alt=""
                class="h-16 w-16 object-cover rounded-md"
                />
            </td>
            <td class="text-left">${p.name}</td>
            <td class="text-center">${p.type} ${p.specie}</td>
            <td class="text-center">${p.gender}</td>
            <td class="text-left">${p.customerName}</td>
        </tr>
    `;
};

function fetchAllPet() {
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
    },
  });
}
function _changeImage(img) {
  $("#pet-detail_image").attr(
    "src",
    imageLink(img.split(".")[0].slice(0, -1) + "m." + img.split(".")[1])
  );
}

function openPetDetail(id) {
  $.ajax({
    url: `${apiUrl}/api/pet/byid?id=${id}`,
    method: "GET",
    success: (data) => {
      let pet = data;
      let img = pet.images[0];
      $("#pet-detail_image").attr("src", imageLink(img.split(".")[0].slice(0, -1) + "m." + img.split(".")[1]));
      $("#pet-detail_image-list").empty();
      for (let index = 0; index < pet.images.length; index++) {
        const img = pet.images[index];
        $("#pet-detail_image-list").append(`
            <div onclick="_changeImage('${img}')" class="w-9 h-9 cursor-pointer">
                <img src="${imageLink(
                  img
                )}" class="w-full h-full object-cover" alt="">
            </div>
        `);
      }
      $("#pet-detail_name").text(pet.name);
      $("#pet-detail_typespecie").text(pet.type + " " + pet.specie);
      $("#pet-detail_gender").text(pet.gender);
      $("#pet-detail_birthday").text(pet.birthday);
      $("#pet-detail_customer").text(pet.customerName);
      $("#pet-detail").removeClass("hidden");
    },
    error: (xhr, status, error) => {
      console.error("Error:", error);
      console.error("Status:", status);
      console.error("xhr:", xhr);
    },
  });
}

function createPet() {
  function _process() {
    let pet = {
      id: null,
      image: null,
      name: $("#pet-create_name").val(),
      typeId: $("#pet-create_pettype").val(),
      specie: $("#pet-create_typespecie").val(),
      gender: $("input[name=petgender]").val(),
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

    console.log(pet);
    console.log(images);

    // Make the AJAX request
    $.ajax({
      url: `${apiUrl}/api/pet/create`,
      method: "POST",
      contentType: "application/json",
      processData: false,
      data: JSON.stringify(pet),
      success: (response) => {
        console.log(response);

        isFirstImage = 1;
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
  $("#btn-create-pet").click(() => _process());
}
