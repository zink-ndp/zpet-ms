export function nonEmpty() {
  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i] == "" || arguments[i] == null){
        return false;
    }
  }
  return true;
}
