export const $Animation =  () => {
    $(() => {

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
}
export const $ToggleHamburger = () => {
    $(() => {
        $(document).ready(function(){
            $("#nav-hamburger-btn").click(function(){
                $("#nav-btn-group-mobile").toggleClass('hidden');
            });
        });
    })
}