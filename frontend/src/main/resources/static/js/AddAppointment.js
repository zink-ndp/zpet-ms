$(() => {

  $(`#add-service-1`).click(() => {
    let newObject = [];
    let storage = localStorage.getItem("services");
    let oldObject = JSON.parse(storage);
    if (localStorage.getItem("services") != null) {
      for (let obj in oldObject) {
        newObject.push(oldObject[obj]);
      }
      newObject.push("1");
    } else {
      newObject.push("1");
      $(`#service-added-button`).show();
    }
    localStorage.setItem("services", JSON.stringify(newObject));
    $(`#service-added-button p`).text(newObject.length);
  });
});
