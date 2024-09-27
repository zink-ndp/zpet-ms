let imageLink = (name) => {
  // return `https://firebasestorage.googleapis.com/v0/b/zpet-images.appspot.com/o/pets%2F${name}?alt=media&token=1033c20d-d9db-4e24-ac5c-3824bf5345ea`;
  return `https://imgur.com/${name}`;
};

let petElement = (p) => {
  return `
        <div
          class="flex items-center space-x-3 p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-all duration-300 ease-in-out"
        >
          <img src="${imageLink(
            p.image
          )}" class="w-20 h-20 object-cover" alt="" />
          <div class="flex-grow">
            <p class="text-lg font-semibold">${p.name}</p>
            <p class="text-gray-600 text-md">${p.type} ${p.specie}</p>
          </div>
          <button
            onclick="openDetail(${p.id})"
            class="flex-shrink-0 p-1 rounded-full text-blue-500 text-sm hover:opacity-50"
          >
            Chi tiết
          </button>
        </div>
    
    `;
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
    success: function (data) {
      $(`#pet-list`).html("");
      if (data.length > 0) {
        data.forEach((element) => {
          $(`#pet-list`).append(petElement(element));
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
}

function openDetail(id) {

  // Fetch detail information
  $.ajax({
    url: `${apiUrl}/api/pet/byid?id=${id}`,
    method: "GET",
    async: false,
    success: function (p) {
      $(`#pet-detail-modal_detail`).html(`
        <img
          id="pet-detail-modal_image"
          src="${imageLink(p.images[0])}"
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
        data.forEach(p => {
          $(`#pet-detail-modal_health`).append(`
            <li
              class="py-3 px-5 rounded-md bg-slate-50 flex flex-col justify-between"
            >
              <p><b>Thời gian:</b> ${p.time}</p>
              <p><b>TÌnh trạng sức khỏe:</b> ${p.health} - ${p.weight}</p>
              <p><b>Mô tả:</b>${p.note}</p>
            </li>  
          `);
        })
      } else {
        $(`#pet-detail-modal_health`).html(`Thú cưng chưa khám sức khỏe`)
      }
    },
    error: function (error) {
      console.error(error);
    },
  });
  
  $(`#pet-detail-modal`).removeClass("hidden");
}

$(() => {
  $(`#pet-detail-modal`).hide();
  getPetList();
});
