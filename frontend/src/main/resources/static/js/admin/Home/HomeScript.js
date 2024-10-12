import { fetchUpcomingAppointment } from '../Appointment/AppointmentScript.js';
import { createChart } from './DashboardChart.js';
import { createPieChart } from './PieChart.js';
import { createTopService, createTopCustomer } from './GetTop.js';

export const $HomeScript = () => {
    $(() => {
      fetchUpcomingAppointment();

      $("#filterMonth").prop("checked", true);
      
      createChart("m");
      createPieChart("m");
      createTopService("m");
      createTopCustomer("m");

      $("#loading-overlay").addClass("hidden");
      
      $("input[name=filter]").change(() => {
        createChart($("input[name=filter]:checked").val());
        createPieChart($("input[name=filter]:checked").val());
        createTopService($("input[name=filter]:checked").val());
        createTopCustomer($("input[name=filter]:checked").val());
      });
    });
}

