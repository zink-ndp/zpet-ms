import { fetchUpcomingAppointment } from '../Appointment/AppointmentScript.js';
import { createChart } from './DashboardChart.js';

export const $HomeScript = () => {
    $(() => {
      fetchUpcomingAppointment();
      $("#loading-overlay").addClass("hidden");
      createChart("m");
      $("input[name=filter]").change(() => {
        createChart($("input[name=filter]:checked").val());
      });
    });
}

