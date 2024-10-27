import { apiUrl } from "./apiUrl.js";
import {
  showDefaultAppointment,
  fetchAllAppointment,
} from "./admin/Appointment/AppointmentScript.js";

const daysContainer = document.querySelector(".days");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const todayBtn = document.querySelector(".today");
const month = document.querySelector(".month");

const months = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

const date = new Date();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();

export const renderCalendar = () => {
  date.setDate(1);
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const lastDayIndex = lastDay.getDay();
  const lastDayDate = lastDay.getDate();
  const prevLastDay = new Date(currentYear, currentMonth, 0);
  const prevLastDayDate = prevLastDay.getDate();
  const nextDays = 7 - lastDayIndex - 1;

  month.innerHTML = `${months[currentMonth]} ${currentYear}`;

  function _checkDayCount(day, month, year) {
    let dayCount = 0;
    $.ajax({
      url: `${apiUrl}/api/appointment/dayCount?month=${month}&year=${year}`,
      method: "GET",
      async: false,
      success: (data) => {
        dayCount = data;
      },
      error: (xhr, status, error) => {
        console.log(xhr);
        console.log(status);
        console.log(error);
      },
    });
    for (let i = 0; i < dayCount.length; i++) {
      if (dayCount[i].day === day) {
        return dayCount[i].count;
      }
    }
    return 0;
  }

  let days = "";

  for (let x = firstDay.getDay(); x > 0; x--) {
    days += `<div class="day prev">${prevLastDayDate - x + 1}</div>`;
  }

  let chosenDays = 0;
  for (let i = 1; i <= lastDayDate; i++) {
    chosenDays = currentYear + "-" + (currentMonth + 1) + "-" + i;
    if (
      i === new Date().getDate() &&
      currentMonth === new Date().getMonth() &&
      currentYear === new Date().getFullYear()
    ) {
      days += `<button type="button" id="${chosenDays}" class="calendar-day day-in-month flex flex-col items-center justify-between day today">${i}`;
    } else {
      days += `<button type="button" id="${chosenDays}" class="calendar-day day-in-month flex flex-col items-center justify-between day">${i}`;
    }

    if (_checkDayCount(i, currentMonth + 1, currentYear) != 0) {
      days += `<p class="text-xs bg-yellow-400 text-white rounded-full h-6 w-6 pt-1 text-center cursor-pointer">${_checkDayCount(
        i,
        currentMonth + 1,
        currentYear
      )}</p>`;
    }
    days += `</button>`;
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next">${j}</div>`;
  }
  daysContainer.innerHTML = days;
};

export function showApmListOfDay(day) {
  console.log(day);
  
  $("#text-apm-title-date").text(
    "Lịch hẹn " +
      day.split("-")[2] +
      "-" +
      day.split("-")[1] +
      "-" +
      day.split("-")[0]
  );
  $(".calendar-day").removeClass("chosenDay").addClass("day");
  $(`#${day}`).removeClass("day").addClass("chosenDay");
  fetchAllAppointment("0_1_2_3", day + "_" + day);
}

nextBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
  showDefaultAppointment("0_1_2_3", currentMonth + 1, currentYear);
});

prevBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
  showDefaultAppointment("0_1_2_3", currentMonth + 1, currentYear);
});

todayBtn.addEventListener("click", () => {
  currentMonth = date.getMonth();
  currentYear = date.getFullYear();
  renderCalendar();
  showDefaultAppointment("0_1_2_3", currentMonth + 1, currentYear);
});

renderCalendar();
