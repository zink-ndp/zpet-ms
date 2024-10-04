$(() => {

    fetchAllService('')
    $("#search").keypress(() => {
        let searchValue = $("#search").val();
        // fetchAllAppointment(searchValue);
    })

    $("#btn-add-service").click(() => {
        serviceAdd()
    })

})