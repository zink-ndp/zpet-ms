import { fetchUpcomingAppointment } from '../Appointment/AppointmentScript.js';
import { createChart } from './DashboardChart.js';
import { createTopService, createTopCustomer } from './GetTop.js';

export const $HomeScript = () => {
    $(() => {
      fetchUpcomingAppointment();
      $("#loading-overlay").addClass("hidden");

      createChart("m");
      createTopService("m");
      createTopCustomer("m");

      $("input[name=filter]").change(() => {
        createChart($("input[name=filter]:checked").val());
        createTopService($("input[name=filter]:checked").val());
        createTopCustomer($("input[name=filter]:checked").val());
      });
    });
}

