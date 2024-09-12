$(() => {

    fetchAllCustomer('')
    $("#search").keypress(() => {
        let searchValue = $("#search").val();
        // fetchAllAppointment(searchValue);
    })

    $("#btn-add-customer").click(() => {
        customerAdd()
    })

    $("#btn-customer_update").click(() => {
        customerUpdate($("#btn-customer_update").siblings("input[id=et-customer_id]").val());
    })

})