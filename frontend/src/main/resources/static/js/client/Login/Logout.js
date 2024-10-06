export const logout = () => {

  setTimeout(() => {
    localStorage.removeItem("customer");
    window.history.replaceState(null, null, "/");
    window.location.href = "/";

  }, 1500);


};
