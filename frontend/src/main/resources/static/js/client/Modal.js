function closeModal() {
  $(".modal").addClass("hidden");
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
