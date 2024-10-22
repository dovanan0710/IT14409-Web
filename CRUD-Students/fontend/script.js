const apiUrl = 'http://localhost:3000/api';

// Thêm sự kiện submit cho form
document.getElementById('studentForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const studentId = document.getElementById('studentId').value;
    const name = document.getElementById('name').value;
    const roll = document.getElementById('roll').value;
    const birthday = document.getElementById('birthday').value;
    const address = document.getElementById('address').value;

    try {
        if (studentId) {
            // Cập nhật sinh viên hiện có
            const response = await fetch(`${apiUrl}/update`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: studentId, Name: name, Roll: roll, Birthday: birthday, Address: address })
            });

            if (!response.ok) {
                throw new Error('Failed to update student');
            }
        } else {
            // Thêm sinh viên mới
            const response = await fetch(`${apiUrl}/save`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ StudentId: Date.now(), Name: name, Roll: roll, Birthday: birthday, Address: address })
            });

            if (!response.ok) {
                throw new Error('Failed to save student');
            }
        }

        document.getElementById('studentForm').reset();
        fetchStudents(); // Cập nhật danh sách sinh viên
    } catch (error) {
        console.error('Error:', error);
        alert(error.message); // Hiển thị thông báo lỗi
    }
});

// Hàm fetchStudents để lấy danh sách sinh viên
async function fetchStudents() {
    try {
        const response = await fetch(`${apiUrl}/findall`);
        if (!response.ok) {
            throw new Error('Failed to fetch students');
        }

        const students = await response.json();
        const tbody = document.querySelector('#studentsTable tbody');
        tbody.innerHTML = '';

        students.forEach(student => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${student.StudentId}</td>
                <td>${student.Name}</td>
                <td>${student.Roll}</td>
                <td>${new Date(student.Birthday).toLocaleDateString()}</td>
                <td>${student.Address}</td>
                <td>
                    <button onclick="editStudent('${student._id}', '${student.Name}', ${student.Roll}, '${student.Birthday}', '${student.Address}')">Edit</button>
                    <button onclick="deleteStudent('${student._id}')">Delete</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error fetching students:', error);
        alert(error.message); // Hiển thị thông báo lỗi
    }
}

// Hàm editStudent để chỉnh sửa thông tin sinh viên
async function editStudent(id, name, roll, birthday, address) {
    document.getElementById('studentId').value = id;
    document.getElementById('name').value = name;
    document.getElementById('roll').value = roll;
    document.getElementById('birthday').value = birthday;
    document.getElementById('address').value = address;
}

// Hàm deleteStudent để xóa sinh viên
async function deleteStudent(id) {
    try {
        const response = await fetch(`${apiUrl}/delete`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: id })
        });

        if (!response.ok) {
            throw new Error('Failed to delete student');
        }

        fetchStudents(); // Cập nhật danh sách sinh viên
    } catch (error) {
        console.error('Error deleting student:', error);
        alert(error.message); // Hiển thị thông báo lỗi
    }
}

// Fetch students when the page loads
fetchStudents();
