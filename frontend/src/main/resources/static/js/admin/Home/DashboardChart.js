import { apiUrl } from '../../apiUrl.js'
import { formatMoney } from '../../utils.js'

let monthsOfYear = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  
  function createValuesData(values, data) {
    for (let i = 0; i < values.length; i++) {
      let isExist = false;
      for (let j = 0; j < data.length; j++) {
        if (data[j].title == values[i]) {
          values[i] = data[j].total;
          isExist = true;
        }
      }
      if (!isExist) values[i] = 0;
    }
    return values;
  }
  
  function getDateBeforeToday(days) {
    const today = new Date();
    today.setDate(today.getDate() - days);
    return today;
  }
  
  function getDateOfWeek(w, y) {
    var d = 1 + (w - 1) * 7;
    return new Date(y, 0, d);
  }
  
  function getAnalysicData(type) {
    let analysisData = [];
    $.ajax({
      url: `${apiUrl}/api/analysis/?type=${type}`,
      method: "GET",
      async: false,
      success: (data) => {
        analysisData = data;
      },
    });
    return analysisData;
  }
  
  export function createChart(type) {
    let data = getAnalysicData(type);
  
    let labelsText = [];
    let values = [];
  
    let d = new Date();
    let currentDate = new Date();
    let fromDate;
  
    switch (type) {
      case "d":
        labelsText = [];
        values = [];
  
        fromDate = getDateBeforeToday(6);
        do {
          let day = new Date(fromDate);
          // labelsText.push(day.toISOString());
          labelsText.push(day.getDate() + "/" + (day.getMonth()+1));
          values.push(day.getDate());
          fromDate.setDate(day.getDate() + 1);
        } while (fromDate <= currentDate);
  
        values = createValuesData(values, data);
  
        $("#textUnderChart").text(monthsOfYear[d.getUTCMonth() - 1]);
        break;
  
      case "w":
        labelsText = [];
        values = [];
  
        //Get Week of year
        let yearStart = new Date(d.getFullYear(), 0, 1);
        let dayOfYear = (currentDate - yearStart + 1) / 86400000;
        let week = Math.ceil(dayOfYear / 7) - 1;
  
        for (let i = 12; i >= 1; i--) {
          labelsText.push("W" + (13 - i));
          values.push(week - i + 1);
        }
  
        values = createValuesData(values, data);
  
        $("#textUnderChart").text(monthsOfYear[d.getUTCMonth() - 1]);
        break;
  
      case "m":
        labelsText = [];
        values = [];
  
        let fromMonth = d.getMonth() + 2;
  
        for (let i = 1; i <= 12; i++) {
          if (fromMonth > 12) fromMonth = 1;
          let crMonthText = monthsOfYear[fromMonth - 1];
          labelsText[i - 1] = crMonthText;
          values[i - 1] = fromMonth;
          fromMonth += 1;
        }
        values = createValuesData(values, data);
  
        $("#textUnderChart").text(d.getUTCFullYear());
        break;
  
      default:
        labelsText = [];
        values = [];
        break;
    }
  
    values = values.map((v) => v / 1000000);
  
  
    var options = {
      series: [
        {
          name: "Sale",
          data: values,
        },
      ],
      chart: {
        height: 300,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "text",
        categories: labelsText,
      },
      yaxis: {
        opposite: true,
        labels: {
          align: "right",
        },
      },
      grid: {
        strokeDashArray: 1,
      },
      tooltip: {
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          return `<div class="p-1 bg-black/80 text-white">
              <span>
                ${formatMoney((series[seriesIndex][dataPointIndex] * 1000000).toString())}
              </span> 
            </div>`;
        },
      },
      colors: ["#00ff00", "#00ff00", "#00ff00"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 1,
          stops: [0, 90, 100],
        },
      },
    };
  
    $("#chart").empty();
    setTimeout(() => {
      var chart = new ApexCharts(document.querySelector("#chart"), options);
      chart.render();
    }, 200);
  }
  