function nonEmpty() {
  for (var i = 0; i < arguments.length; i++) {
    if (arguments[i] == "" || arguments[i].length == 0 || arguments[i] == null){
        return false;
    }
  }
  return true;
}
