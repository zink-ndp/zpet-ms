export const $CloseModal = () => {
  $(".modal").addClass("hidden");
  $(`body`).removeClass(`overflow-hidden`);
};

export const $ModalToggle = () => {
  $(() => {
    $(".modal-close").click(() => {
      $CloseModal();
    });

    $(".modal-overlay").click(() => {
      $CloseModal();
    });
  });
};
