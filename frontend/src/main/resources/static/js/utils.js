export function nonEmpty() {
  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i] == "" || arguments[i] == null || arguments[i].length == 0){
        return false;
    }
  }
  return true;
}

function validateEmail(email) {
  var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function formatMoney(string) {
  let money = string.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "đ";
  return money;
}
