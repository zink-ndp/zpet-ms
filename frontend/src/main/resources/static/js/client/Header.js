export const $addHeader = () => {
  const customer = localStorage.getItem("customer");
  const elementNavbar = `
    <div
        id="noti-panel"
        class="hidden top-16 right-16 bg-white rounded-md shadow-lg m-4 w-[600px] h-fit max-h-96 z-50 overflow-y-scroll"
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
    <nav
        id="navbar"
        class="fixed top-0 flex w-screen h-fit px-2 lg:px-24 xl:px-24 2xl:px-24 py-6 z-10 backdrop-blur-lg bg-soft-blue/70 overflow-hidden"
        >
        <div
            class="flex flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row justify-center sm:justify-center md:justify-center lg:justify-between xl:justify-between 2xl:justify-between item-center w-full h-fit gap-5"
        >
            <div class="flex flex-row w-full lg:w-fit xl:w-fit 2xl:w-fit">
            <a href="/">
            <img
                id="nav-brand-logo"
                class="nav-brand-logo mx-auto"
                draggable="false"
                alt="logo"
            />
            </a>
            <button id="nav-hamburger-btn">
                <img src="/images/icons/hamburger-menu.svg" />
            </button>
            </div>
            <ul
            id="nav-btn-group-mobile"
            class="hidden flex flex-col lg:hidden xl:hidden 2xl:hidden"
            >
            <li>
                <a class="nav-btn" href="/">Trang chủ</a>
            </li>
            <li>
                <a class="nav-btn" href="/pets">Thú cưng</a>
            </li>
            <li>
                <a class="nav-btn" href="/appointments">Lịch hẹn</a>
            </li>
            <li>
                <a class="nav-btn" href="/invoices">Hoá đơn</a>
            </li>
            <li class="flex w-fit user-login">
                <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                class="nav-btn-signin"
                type="button"
                >
                <p>Hi, User</p>
                <svg
                    class="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                    />
                </svg>
                </button>
            </li>
            </ul>
            <div id="nav-btn-group-container" class="w-fit h-fit">
            <ul id="nav-btn-group-large">
                <li>
                <button
                    id="service-added-button"
                    class="relative w-10 h-10 rounded-md hover:bg-white/25 flex items-center justify-center"
                >
                    <p
                    id="service-quantity"
                    class="w-4 h-4 bg-green-700 rounded-full text-white text-xs absolute -top-1 -right-1"
                    >
                    1
                    </p>
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="size-6 text-green-700"
                    >
                    <path
                        d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                    />
                    <path
                        fill-rule="evenodd"
                        d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                        clip-rule="evenodd"
                    />
                    </svg>
                </button>
                </li>
                <li>
                    <a class="nav-btn" href="/">Trang chủ</a>
                </li>
                <li>
                    <a class="nav-btn" href="/pets">Thú cưng</a>
                </li>
                <li>
                    <a class="nav-btn" href="/appointments">Lịch hẹn</a>
                </li>
                <li>
                    <a class="nav-btn" href="/invoices">Hoá đơn</a>
                </li>
                <li class="flex w-fit user-login">
                <button
                    id="dropdownDefaultButton"
                    data-dropdown-toggle="dropdown"
                    class="nav-btn-signin"
                    type="button"
                >
                    <p>Hi, User</p>
                    <svg
                    class="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                    >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 4 4 4-4"
                    />
                    </svg>
                </button>
                </li>

                ${
                  customer != null
                    ? `
                    <li>
                        <button id="nav-noti-btn" class="relative group bg-green-200 hover:bg-green-500 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ease-in-out">
                            <img src="/images/icons/bell.svg" alt="" class="w-5 h-5 text-green-700 group-hover:text-white" />
                            <div id="noti-new-indicator" class="hidden top-0 right-0 animate-ping bg-red-500 rounded-full h-2 w-2">&nbsp</div>
                        </button>
                    </li>    
                `
                    : ``
                }
            </ul>
            </div>
        </div>
      </nav>
    `;

  const elementDropdown = `
    <div
        id="dropdown"
        class="z-40 hidden backdrop-blur-lg bg-soft-blue/70 rounded-lg shadow w-44"
        >
        <ul
        class="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownDefaultButton"
        >
        <li>
            <a
            href="/account"
            class="block px-4 py-2 text-gray-800 hover:opacity-75"
            >Tài khoản</a
            >
        </li>
        <li>
            <a
            href="/logout"
            class="block px-4 py-2 text-red-500 hover:opacity-75"
            >Đăng xuất</a
            >
        </li>
        </ul>
    </div>
  `;

  const elementLoading = `
    <div
      id="loading-overlay"
      class="z-40 fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-white/60 backdrop-blur-md overflow-hidden"
    >
      <img
        defer
        class="lg:w-1/4 w-3/4 img animate-bounce"
        src="/images/illustration/cute-smiling-cat.svg"
        alt=""
      />

      <div
        class="font-sans px-10 py-3 text-4xl font-bold leading-none text-center text-green-800 bg-green-200 rounded-full animate-pulse"
      >
        Đang tải...
      </div>
    </div>
  `;

  $("body").prepend(elementNavbar);
  $("body").prepend(elementDropdown);
  $("body").prepend(elementLoading);
  $("#nav-noti-btn").click(() => {
    $("#noti-panel").toggleClass("hidden fixed");
  });
  $("#noti-btn-clear").click(() => {
    $("#noti-list").html(`
        <div id="noti-empty" class="w-full h-20 flex items-center justify-center">
            Không có thông báo mới
        </div>  
      `);
    $("#noti-empty").removeClass("hidden");
    $("#noti-new-indicator").addClass("hidden").removeClass("absolute");
  });
};
