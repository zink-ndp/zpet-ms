import { fetchAllPet, createPet } from "./PetUtils.js";

export const PetScript = () => {
  $(() => {
    fetchAllPet();

    $("#btn-add-pet").click(() => {
      createPet();
    });

    $("#pet-create-image").change((e) => {
      const files = e.target.files;
      const imagePreview = $("#pet-create_image_review");

      // Clear the preview container
      imagePreview.empty();

      // Loop through each file
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file.type.startsWith("image/")) {
          const reader = new FileReader();

          reader.onload = function (e) {
            const div = $("<div>").attr("class", "w-16 h-16");
            const img = $("<img>")
              .attr("src", e.target.result)
              .attr("class", "w-full h-full object-cover")
              .appendTo(div);

            imagePreview.append(div);
          };

          reader.readAsDataURL(file);
        }
      }
    });
  });
};
