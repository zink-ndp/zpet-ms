$(() => {
    if (localStorage.getItem("services") == null) {
        $(`#service-added-button`).hide();
      } else {
        let storage = localStorage.getItem("services");
        let quantity = 0;
        for (let item in storage) {
          console.log(item);
          quantity++;
        }
        $(`#service-added-button`).show();
    
        $(`#service-added-button p`).text(quantity);
      }
})