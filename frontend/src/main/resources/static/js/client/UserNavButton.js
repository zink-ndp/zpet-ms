import { createAppointment } from '../client/Appointment/AddAppointment.js';

export const $UserNavButton = () => {
    $(() => {
        $(`#user-button`).click(() =>{
            $(`#user-option`).toggleClass('-right-0 -right-96')
            $(`#user-button img`).toggleClass('rotate-180')
        })

    $(`#service-added-button`).click(() =>{
        $(`body`).addClass(`overflow-hidden`)
        $(`#added-service`).removeClass(`hidden`)
        createAppointment()
    })
})
}