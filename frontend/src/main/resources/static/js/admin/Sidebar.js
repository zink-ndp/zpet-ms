const items = [
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
    item: "staff",
    name: "Thú cưng",
    href: "/admin/pet",
  },
  {
    item: "staff",
    name: "Khách hàng",
    href: "/admin/staff",
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
  {
    item: "voucher",
    name: "Khuyến mãi",
    href: "/admin/voucher",
  },
];

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

export const createSidebar = (current) => {
//   let staff = JSON.parse(localStorage.getItem("staff"));
//   if (staff === null) {
//     alert("Vui lòng đăng nhập!");
//     window.location.href = "/admin/login";
//   }

  let data = "";
  items.forEach(({ item, name, href }) => {
    data += itemSidebar(name, href, current == item);
  });
  const sideBar = `
        <aside class="fixed flex flex-col justify-between left-0 top-0 h-full w-1/6 px-4 py-8 m-4 rounded-lg bg-white shadow-lg">
            <div class="flex flex-col space-y-6">
                <a
                    href="/admin/"
                    class="logo cursor-pointer font-bold text-black text-center text-4xl w-full"
                >
                    <img
                        id="nav-brand-logo"
                        class="nav-brand-logo mx-auto"
                        draggable="false"
                        alt="logo"
                    />
                </a>
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
};
