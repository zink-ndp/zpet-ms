$(() => {

    $(`#btnLogin`).click(() => {
        let phone = $("#phone").val();
        let password = $("#password").val();
        let role = $("input[name=role]:checked").val();

        console.log(JSON.stringify({
            phone: phone,
            password: password,
            role: role
        }));
        

        $.ajax({
            url: apiUrl+"/api/staff/login",
            method: "POST",
            data: JSON.stringify({
                phone: phone,
                password: password,
                role: role
            }),
            contentType: "application/json",
            success: (response) => {
                console.log(response);
                if (response != "") {
                    localStorage.setItem("staff", JSON.stringify(response))
                    window.location.href = "/admin/";
                } else {
                    alert("Tài khoản hoặc mật khẩu không đúng!");
                }
            },
            error: (error) => {
                console.error(error);
            }
        })

    })

})