
export const $DatePickerConfig = () => {
  $(() => {
    const d = new Date();
    const minDatePicker =
      d.getFullYear() +
      "-" +
      (d.getMonth() + 1) +
      "-" +
      (d.getDate() < 10 ? "0" + d.getDate() : d.getDate());

    const maxDatePicker =
      d.getFullYear() +
      "-" +
      (d.getMonth() + 2) +
      "-" +
      (d.getDate() < 10 ? "0" + d.getDate() : d.getDate());

    $(".datepicker-input").attr("min", minDatePicker);
    $(".datepicker-input").attr("max", maxDatePicker);
  });
};
