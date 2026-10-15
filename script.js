const nameInput = document.getElementById("name");
const studentIdInput = document.getElementById("studentId");
const scoreInput = document.getElementById("score");
const classNameInput = document.getElementById("className");
const btnAdd = document.getElementById("btnAdd");
const tableBody = document.getElementById("studentTableBody");
const rankSelect = document.getElementById("rank");

// 1. Chức năng Thêm sinh viên
btnAdd.addEventListener("click", function () {
    const name = nameInput.value.trim();
    const studentId = studentIdInput.value.trim();
    const score = scoreInput.value.trim();
    const className = classNameInput.value.trim();

    if (!name || !studentId || !score || !className) {
        alert("Vui Lòng Nhập Đủ Thông Tin");
        return;
    }

    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${studentId}</td>
        <td>${name}</td>
        <td>${className}</td>
        <td>${score}</td>
        <td><input type="button" value="Xóa" onclick="deleteRow(this)"></td>
    `;

    tableBody.appendChild(newRow);
    updateStats();

    // Xóa trắng ô nhập sau khi thêm
    nameInput.value = "";
    studentIdInput.value = "";
    scoreInput.value = "";
    classNameInput.value = "";
    nameInput.focus();
});

// 2. Chức năng Xóa dòng
function deleteRow(btn) {
    const row = btn.parentElement.parentElement;
    row.remove();
    updateStats();
}

// 3. Chức năng Lọc theo xếp loại
rankSelect.addEventListener("change", function () {
    const selectedRank = rankSelect.value; 
    const allRows = tableBody.querySelectorAll("tr"); 

    allRows.forEach(function (row) {
        const scoreText = row.cells[3].innerText;
        const score = parseFloat(scoreText); 
        let currentRank = "";

        if (score >= 8.0) {
            currentRank = "gioi";
        } else if (score >= 6.5) {
            currentRank = "kha";
        } else {
            currentRank = "trungBinh";
        }

        if (selectedRank === "all" || selectedRank === currentRank) {
            row.style.display = "";   
        } else {
            row.style.display = "none";
        }
    });
});

// 4. Hàm cập nhật thống kê (Tổng SV & Điểm trung bình)
function updateStats() {
    const allRows = tableBody.querySelectorAll("tr");
    const total = allRows.length;
    let sumScore = 0;

    allRows.forEach(function(row) {
        const score = parseFloat(row.cells[3].innerText);
        sumScore += score;
    });

    const avg = total > 0 ? (sumScore / total).toFixed(2) : "0.0";

    document.getElementById("totalStudents").innerText = total;
    document.getElementById("avgScore").innerText = avg;
}

// Gọi 1 lần đầu để cập nhật số liệu cho các dòng có sẵn
updateStats();