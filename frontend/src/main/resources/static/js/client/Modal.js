export const $CloseModal = () => {
  $(".modal").hide();
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
