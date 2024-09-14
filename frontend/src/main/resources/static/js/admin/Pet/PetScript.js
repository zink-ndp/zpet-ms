let imageLink = (name) => {
    return `https://firebasestorage.googleapis.com/v0/b/zpet-images.appspot.com/o/pets%2F${name}?alt=media&token=1033c20d-d9db-4e24-ac5c-3824bf5345ea`;
  };

let _petElement = (p) => {
  return `
        <tr onclick="openPetDetail(${p.id})" class="odd:bg-green-50 h-20 hover:bg-green-100 cursor-pointer rounded-md transition-all ease duration-300">
            <td class="text-center">${p.id}</td>
            <td>
                <img
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
function _changeImage(img){
    $("#pet-detail_image").attr("src",imageLink(`${img}`))
}

function openPetDetail(id) {


  $.ajax({
    url: `${apiUrl}/api/pet/byid?id=${id}`,
    method: "GET",
    success: (data) => {
      let pet = data;
      $("#pet-detail_image").attr("src",imageLink(pet.images[0]))
      $("#pet-detail_image-list").empty();
      for (let index = 0; index < pet.images.length; index++) {
        const img = pet.images[index];
        $("#pet-detail_image-list").append(`
            <div onclick="_changeImage('${img}')" class="w-9 h-9 cursor-pointer">
                <img src="${imageLink(img)}" class="w-full h-full object-cover" alt="">
            </div>
        `)
      }
      $("#pet-detail_name").text(pet.name);
      $("#pet-detail_typespecie").text(pet.type+" "+pet.specie);
      $("#pet-detail_gender").text(pet.gender);
      $("#pet-detail_birthday").text(pet.birthday);
      $("#pet-detail_customer").text(pet.customerName);
      $("#pet-detail").show();
    },
    error: (xhr, status, error) => {
      console.error("Error:", error);
      console.error("Status:", status);
      console.error("xhr:", xhr);
    },
  })
}