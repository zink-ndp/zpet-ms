const elementLoading = `
    <div
      id="loading-overlay"
      class="z-40 fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-white/60 backdrop-blur-md overflow-hidden"
    >
      <img
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

export const $Loading = () => {
  $("body").prepend(elementLoading);
};
