import { viewDetail } from "../client/Appointment/AppointmentScript.js";
import { renderDOMElement } from "../utils.js";
import { openAppointmentDetail } from "./Appointment/AppointmentScript.js";
import { openInvoiceDetail } from "../client/Invoice/InvoiceUtils.js";
import { clearNotification } from "./Notification.js";

const itemSidebar = (name, href, active) => {
  return `
       <a
          id="aside-item-home"
          class="hover:bg-green-100 transition-all duration-200 ease-in-out px-5 py-3 rounded-md font-semibold 
          ${active ? "bg-green-100 text-green-500" : "text-gray-600"}"
          href="${href}"
          >${name}</a
        >
    `;
};

export const openAppointmentNoti = (id) => {
  openAppointmentDetail(id);
  viewDetail(id);
}


export const itemNotification = (title, content, apmId, invId) => {

  const element = {
    type: "div",
    props: {
      onclick: () => {
        apmId ? openAppointmentNoti(apmId) : '';
        invId ? openInvoiceDetail(invId) : '';
        clearNotification(apmId ? apmId : invId)
      },
      id: `noti-apm-${apmId ? apmId : invId}`,
      className: "w-full h-fit flex flex-col p-5 border-b-[1px] border-gray-200 hover:bg-green-50 transition-all duration-200 ease-in-out cursor-pointer",
      innerHTML: `
        <div class="flex flex-col">
          <p class="text-sm font-extrabold">
            ${title}
          </p>
          <p class="text-sm font-semibold text-gray-700 line-clamp-2">
            ${content}
          </p>
        </div>
      `
    },
  }
  return renderDOMElement(element)
}

export const createSidebar = (current) => {
  
let items = [];

const staff = JSON.parse(localStorage.getItem("staff"));

if (staff === null) {
  alert("Vui lòng đăng nhập!")
  window.location.href = "/admin/login"
}

if (staff.isManager === 1) {
  items = [
    {
      item: "home",
      name: "Trang chủ",
      href: "/admin/",
    },
    {
      item: "appointment",
      name: "Lịch hẹn",
      href: "/admin/appointment",
    },
    {
      item: "invoice",
      name: "Hóa đơn",
      href: "/admin/invoice",
    },
    {
      item: "pet",
      name: "Thú cưng",
      href: "/admin/pet",
    },
    {
      item: "customer",
      name: "Khách hàng",
      href: "/admin/customer",
    },
    {
      item: "staff",
      name: "Nhân viên",
      href: "/admin/staff",
    },
    {
      item: "service",
      name: "Dịch vụ",
      href: "/admin/service",
    },
  ];
} else {
  items = [
    {
      item: "appointment",
      name: "Lịch hẹn",
      href: "/admin/appointment",
    },
    {
      item: "invoice",
      name: "Hóa đơn",
      href: "/admin/invoice",
    },
    {
      item: "pet",
      name: "Thú cưng",
      href: "/admin/pet",
    },
    {
      item: "customer",
      name: "Khách hàng",
      href: "/admin/customer",
    },
  ];
}
  let data = "";
  items.forEach(({ item, name, href }) => {
    data += itemSidebar(name, href, current == item);
  });
  const sideBar = `
        <div
          id="noti-panel"
          class="hidden top-0 left-[17%] bg-white rounded-md shadow-lg m-4 w-1/5 h-fit max-h-96 z-50 overflow-y-scroll"
        >
          <div class=" p-4 w-full flex justify-between">
            <p class="text-lg font-bold">Thông báo</p>
            <button id="noti-btn-clear" class="rounded-full p-2 w-fit hover:bg-red-50 text-red-500 text-xs italic">
              Xóa tất cả
            </button>
          </div>
          <div id="noti-list" class="flex flex-col">
            <div id="noti-empty" class="w-full h-20 flex items-center justify-center">
                Không có thông báo mới
            </div>
          </div>
        </div>
        <aside class="fixed flex flex-col justify-between left-0 top-0 h-[calc(100%-32px)] w-1/6 px-4 py-8 m-4 rounded-lg bg-white shadow-lg">
            <div class="flex flex-col space-y-6">
                <div class="flex justify-between items-center mt-2 mb-3">
                  <a
                    href="/admin/"
                    class="logo cursor-pointer font-bold text-black text-center text-4xl w-fit"
                  >
                    <img
                      id="nav-brand-logo"
                      class="nav-brand-logo mx-auto"
                      draggable="false"
                      alt="logo"
                    />
                  </a>
                  <button id="nav-noti-btn" class="relative group bg-green-200 hover:bg-green-500 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ease-in-out">
                    <img src="/images/icons/bell.svg" alt="" class="w-5 h-5 text-green-700 group-hover:text-white" />
                    <div id="noti-new-indicator" class="hidden top-0 right-0 animate-ping bg-red-500 rounded-full h-2 w-2">&nbsp</div>
                  </button>
                </div>
                ${data}
            </div>
            <div class="flex flex-col space-y-6">
                <p id="staff-name-text" class="w-full text-center">
                    Hi, Vinh
                </p>
                <a
                    id="aside-item-logout"
                    class="hover:bg-red-100 transition-all duration-200 ease-in-out px-5 py-3 rounded-md font-semibold text-red-500"
                    href="/admin/logout"
                >
                    Đăng xuất
                </a>
            </div>
        </aside>
    `;
  $("body").prepend(sideBar);
  $("#nav-noti-btn").click(() => {
    $("#noti-panel").toggleClass("hidden fixed");
  });
  $("#noti-btn-clear").click(() => {
    $("#noti-list").html(`
      <div id="noti-empty" class="w-full h-20 flex items-center justify-center">
          Không có thông báo mới
      </div>  
    `);
    $("#noti-empty").removeClass('hidden');
    $("#noti-new-indicator").addClass('hidden').removeClass('absolute');
  });
};
