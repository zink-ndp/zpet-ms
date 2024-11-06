import { nonEmpty, renderDOMElement } from "../../utils.js";
import { apiUrl } from "../../apiUrl.js";

const customer = localStorage.getItem("customer");
let customerId = ''
if (customer) {
  customerId = JSON.parse(localStorage.getItem("customer")).id;
}


let starChosen = [];

const serviceRating = (id, name, isRated) => {
  let rateElement = `
        <div
              data-service-id="${id}"
              class="service m-2 flex flex-col bg-green-50 p-4 rounded-md space-y-3"
            >
              <div class="flex justify-between">
                <p class="font-semibold">${name}</p>`;

  if (!isRated)
    rateElement += `<div class="stars flex space-x-1 cursor-pointer">
                  <!-- 5 stars for Product 1 -->
                  <button
                    type="button"
                    class="star text-gray-400 hover:text-yellow-400"
                    data-value="1"
                  >
                    ★
                  </button>
                  <button
                    type="button"
                    class="star text-gray-400 hover:text-yellow-400"
                    data-value="2"
                  >
                    ★
                  </button>
                  <button
                    type="button"
                    class="star text-gray-400 hover:text-yellow-400"
                    data-value="3"
                  >
                    ★
                  </button>
                  <button
                    type="button"
                    class="star text-gray-400 hover:text-yellow-400"
                    data-value="4"
                  >
                    ★
                  </button>
                  <button
                    type="button"
                    class="star text-gray-400 hover:text-yellow-400"
                    data-value="5"
                  >
                    ★
                  </button>
                </div>`;

  rateElement += `</div>`;

  if (!isRated){
      rateElement += `<div class="flex gap-2">
                  <div class="bg-transparent rounded-lg w-full flex-1">
                    <div class="relative bg-inherit">
                      <input
                        type="text"
                        id="rate-service-${id}"
                        name="rate-service-${id}"
                        class="relative peer w-full bg-transparent h-10 rounded-lg text-black placeholder-transparent ring-[1px] px-2 ring-gray-500 focus:ring-green-500 focus:outline-none focus:border-rose-600"
                        placeholder="Nội dung đánh giá"
                      />
                      <label
                        for="rate-service-${id}"
                        class="absolute cursor-text left-0 -top-3 text-sm text-green-500 bg-green-50 mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-green-500 ring-green-500 peer-focus:text-sm transition-all"
                      >
                        Nội dung đánh giá
                      </label>
                    </div>
                  </div>
                  <div id="button-area-${id}"></div>
                </div>
              </div>
      `;
  } else {
    rateElement += `
        <p
        class="text-gray-700"
        >
        Bạn đã đánh giá dịch vụ lần này!
        </p>
    `
  }
  return rateElement;
};

const sendRatingButton = (invoiceId, id) => {
  const element = {
    type: "button",
    props: {
      onclick: () => {
        sendRating(invoiceId, id);
      },
      className:
        "bg-green-500 text-white p-2 rounded-md hover:opacity-75 transition-all duration-200 ease-linear",
      innerHTML: "Đánh giá",
    },
  };
  return renderDOMElement(element);
};

function sendRating(invoiceId, id) {
  const star = starChosen[id];
  const comment = $(`#rate-service-${id}`).val();
  if (!nonEmpty(star)) {
    alert("Vui lòng đánh giá dịch vụ");
    return;
  }
  const data = JSON.stringify({
    id: null,
    serviceId: id,
    star: star,
    comment: comment,
    customerId: customerId,
    invoiceId: invoiceId,
  });
  console.log(data);
  $.ajax({
    url: `${apiUrl}/api/service/rate`,
    method: "POST",
    async: false,
    contentType: "application/json",
    data: data,
    success: (data) => {
      alert("Đánh giá dịch vụ thành công");
      $(`div[data-service-id=${id}]`).fadeOut();
    },
    error: (e) => {
      console.log(e);
    },
  });
}

function highlightStars(stars, value) {
  stars.forEach((star) => {
    if (star.getAttribute("data-value") <= value) {
      star.classList.add("text-yellow-400");
      star.classList.remove("text-gray-400");
    } else {
      star.classList.add("text-gray-400");
      star.classList.remove("text-yellow-400");
    }
  });
}

function resetStars(stars) {
  stars.forEach((star) => {
    star.classList.add("text-gray-400");
    star.classList.remove("text-yellow-400");
  });
}

export const Rating = (invoiceId, servicesData) => {
  $(() => {
    $("#list-service-rating").empty();
    servicesData.forEach(({ id, name, isRated }) => {
      $("#list-service-rating").append(serviceRating(id, name, isRated));
      $(`#button-area-${id}`).html(sendRatingButton(invoiceId, id));
    });

    const services = document.querySelectorAll(".service");

    services.forEach((service, index) => {
      const stars = service.querySelectorAll(".star");
      let selectedRating = 0;

      stars.forEach((star) => {
        // Hover event
        star.addEventListener("mouseover", () => {
          const value = star.getAttribute("data-value");
          highlightStars(stars, value);
        });

        // Click event
        star.addEventListener("click", () => {
          selectedRating = star.getAttribute("data-value");
          starChosen[service.getAttribute("data-service-id")] =
            parseInt(selectedRating); // Save the chosen value to the array
          console.log(`Product ${index + 1} chosen rating: ${selectedRating}`);
          console.log("Current starChosen array:", starChosen);
          highlightStars(stars, selectedRating);
        });

        // Remove hover highlight when mouse leaves
        star.addEventListener("mouseout", () => {
          if (selectedRating === 0) {
            resetStars(stars);
          } else {
            highlightStars(stars, selectedRating);
          }
        });
      });
    });
  });
};
