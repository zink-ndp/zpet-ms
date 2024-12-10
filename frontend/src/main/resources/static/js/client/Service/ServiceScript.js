import { apiUrl } from "../../apiUrl.js";
import { formatMoney } from "../../utils.js";

export const $ServiceScript = () => {
  $(() => {
    const serviceElement = ({id, name, price}) => {
      
        return (
            `
                <div class="card bg-green-200 group rounded-lg">
                    <a href="/service-detail/${id}">
                        <img src="/images/illustration/doctor-cat2.png" class="w-full h-44 rounded-lg object-cover group-hover:scale-105 transition-all duration-300 ease" draggable="false" alt="illustration">
                    </a>
                    <div class="relative flex flex-col justify-center items-center group w-full">
                        <span class="text-bright-green text-lg font-semibold my-4">${name}</span>
                        <span class="text-center text-lg font-semibold mx-5 mb-4">${formatMoney(price.toString())}</span>
                        <div class="hidden bg-green-200 group-hover:flex justify-center items-center rounded-lg transition-opacity absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
                            <a href="/service-detail/${id}" class="main-btn-register text-center">
                                <p class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-white">Xem chi tiết</p>
                                <img src="/images/icons/bone.svg" class="w-44" draggable="false" alt="illustration">
                            </a>
                        </div>
                    </div>
                </div>
            `
        )
    };

    $.ajax({
      url: apiUrl + "/api/service/all",
      method: "GET",
      async: false,
      success: (data) => {
        let services = data;
        $("#service-list").empty();
        $("#loading-overlay").fadeOut("fast");
        services.forEach((service) => {
          $("#service-list").append(serviceElement(service));
        });
      },
      error: (error) => {
        console.error("Error:", error);
      },
    });
  });
};
