document.getElementById("registrationForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Ngăn không cho form submit reload trang

    // Lấy giá trị từ form
    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();

    // Đặt lại các thông báo lỗi 
    document.getElementById("nameError").innerText = "";
    document.getElementById("phoneError").innerText = "";
    document.getElementById("emailError").innerText = "";

    let valid = true;

    // Kiểm tra tên không rỗng
    if (name === "") {
        document.getElementById("nameError").innerText = "Tên không được để trống";
        valid = false;
    }

    // Kiểm tra số điện thoại có đúng 10 hoặc 11 số
    let phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(phone)) {
        document.getElementById("phoneError").innerText = "Số điện thoại phải có 10 hoặc 11 số";
        valid = false;
    }

    // Kiểm tra định dạng email
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById("emailError").innerText = "Email không hợp lệ";
        valid = false;
    }

    // Nếu tất cả hợp lệ
    if (valid) {
        alert("Đăng ký thành công!");
    }
});
