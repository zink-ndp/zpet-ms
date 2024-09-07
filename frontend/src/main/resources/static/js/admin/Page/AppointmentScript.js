$(() => {
    fetchAllAppointment('0_1_2_3')

    $("input[name=apmStatusFilter]").change((e) => {
        fetchAllAppointment(e.target.value);
        
    })

})