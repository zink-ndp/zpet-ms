import { apiUrl } from "../../apiUrl.js";

export const createPieChart = (type) => {
  $(() => {

    let seriesData = [];
    let labelsData = [];

    $.ajax({
        url: `${apiUrl}/api/analysis/countService?type=${type}`,
        method: "GET",
        async: false,
        success: (data) => {
          data.forEach((item) => {
            const { name, count } = item
            seriesData.push(count);
            labelsData.push(name);
          });
        }
    })

    var options = {
      series: seriesData,
      labels: labelsData, 
      chart: {
        type: "polarArea",
      },
      stroke: {
        colors: ["#fff"],
      },
      fill: {
        opacity: 0.8,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };

    $("#pie-chart").empty();
    setTimeout(() => {
      var chart = new ApexCharts(document.querySelector("#pie-chart"), options);
      chart.render();
    }, 200);
  });
};
