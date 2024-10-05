export const $CloseModal = () => {
  $(".modal").addClass("hidden");
  $(`body`).removeClass(`overflow-hidden`);
}

$(() => {
  $(".modal-close").click(() => {
    $CloseModal();
  });

  $(".modal-overlay").click(() => {
    $CloseModal();
  });
});
