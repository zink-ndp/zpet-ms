function closeModal() {
  $(".modal").hide();
  $(`body`).removeClass(`overflow-hidden`);
}

$(() => {
  $(".modal-close").click(() => {
    closeModal();
  });

  $(".modal-overlay").click(() => {
    closeModal();
  });
});
