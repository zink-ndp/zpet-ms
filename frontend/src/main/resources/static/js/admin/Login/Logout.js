localStorage.removeItem("staff");
window.history.replaceState(null, null, "/admin/login");
window.location.href = "/admin/login";
