import { fetchUpcomingAppointment } from '../Appointment/AppointmentScript.js';

export const $HomeScript = () => {
    $(() => {
      fetchUpcomingAppointment();
      $("#loading-overlay").addClass("hidden");
    });
}

