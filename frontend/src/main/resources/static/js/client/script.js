$(() => {

    let customer = JSON.parse(localStorage.getItem(`customer`))

    console.log(customer);
    

    if (customer == null) {
        window.location.reload();
        $(`#logged-out`).show()
    } else {
        $(`#logged-in`).show()
        console.log(customer.name.split(' ').reverse()[0]);
        
        $(`#user-button-text`).text("Hi, " + customer.name.split(' ').reverse()[0])
    }

    $(document).on("scroll", () => {
        const scrollTop = $(window).scrollTop()
        
        if (scrollTop > 420) {
            $('#logo').removeClass('opacity-0')
            $(`nav`).addClass('bg-green-500').removeClass('bg-transparent')
        } else {
            $('#logo').addClass('opacity-0')
            $(`nav`).removeClass('bg-green-500').addClass('bg-transparent')
        }
    })

})