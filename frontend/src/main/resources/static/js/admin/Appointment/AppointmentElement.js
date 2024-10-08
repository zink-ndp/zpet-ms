import { renderDOMElement } from "../../utils.js";
import { openAppointmentDetail } from "./AppointmentScript.js";

export const apmElement = ({ id, count, status, time, date, note, customerName }) => {
  let textStatusStyle = "";
  switch (status) {
    case "Đợi xác nhận":
      textStatusStyle = "text-yellow-600";
      break;
    case "Đã xác nhận":
      textStatusStyle = "text-blue-600";
      break;
    case "Đã hoàn thành":
      textStatusStyle = "text-green-600";
      break;
    default:
      textStatusStyle = "text-red-600";
      break;
  }

  let element = {
    type: "div",
    props: {
      onclick: () => openAppointmentDetail(id),
      className:
        "bg-green-50 rounded-md flex items-center w-full p-4 hover:bg-green-100 cursor-pointer snap-start transition-all ease duration-300",
    },
    children: [
      {
        type: "div",
        props: {
            className: "flex flex-col space-y-1 w-full",
            innerHTML: `
                <div class="flex w-full justify-between">
                    <p class="text-sm text-left text-red-500">
                        ${count > 3 ? `Khách hàng hủy hẹn ${count} lần trong 7 ngày!` : ``}
                    </p>
                    <p class="font-semibold text-right ${textStatusStyle}">${
                    status
                    }</p>
                </div>
                <p class="font-semibold text-green-700">${time} ${
                    date
                }</p>
                <p class="">${customerName}</p>
                <p class="line-clamp-2">${
                    note != null ? note : "Không có ghi chú"
                }</p>
            `
        },
      },
    ],
  };
  return renderDOMElement(element);
};
