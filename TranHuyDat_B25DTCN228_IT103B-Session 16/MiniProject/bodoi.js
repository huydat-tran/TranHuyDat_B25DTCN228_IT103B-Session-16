let employees = [];
let idEmployee = 1;
let isUpdated = null;
const tbody = document.querySelector("#tbody");
const tfooter = document.querySelector(".tfooter");
const badge = document.querySelector(".badge");
const title = document.querySelector("#mainTitle");
const errorFullname = document.querySelector("#error-fullName");
const errorEmail = document.querySelector("#error-email");
const errorDob = document.querySelector("#error-dob");
const footer = document.querySelector(".footer span");
const errorPosition = document.querySelector("#error-position");
const form = document.querySelector("#formEmployee");
const formSubmit = document.querySelector("#submitForm");
const cancelBtn = document.querySelector("#cancelEdit");
console.log(formSubmit);

const renderEmployees = (employees) => {
  if (!Array.isArray(employees)) return "";

  return employees
    .map((e) => {
      return `
     <tr data-id="${e.id}">
                <td>${e.id}</td>
                <td>${e.fullName}</td>
                <td>${e.email}</td>
                <td>${e.dob}</td>
                <td>${e.position}</td>
                 <td class="action">
                  <button class="btn-edit">Sửa</button>
                  <button class="btn-delete">Xóa</button>
                </td>
              </tr>
   `;
    })
    .join("");
};

const updateUI = () => {
  tbody.innerHTML = renderEmployees(employees);

  badge.textContent = `${employees.length} nhân viên`;
  footer.textContent = `Tổng số nhân viên ${employees.length}`;
};

const validateForm = (fullName, email, dob, position) => {
  let isValid = true;
  errorFullname.textContent = "";
  errorEmail.textContent = "";
  errorDob.textContent = "";
  errorPosition.textContent = "";

  if (fullName === "") {
    errorFullname.textContent = "Không được để trống";
    isValid = false;
  }
  if (email === "") {
    errorEmail.textContent = "Không được để trống";
    isValid = false;
  } else {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!regex.test(email)) {
      errorEmail.textContent = "Email không đúng định dạng";
      isValid = false;
    }
  }
  if (dob === "") {
    errorDob.textContent = "Không được để trống";
    isValid = false;
  }
  if (!position) {
    errorPosition.textContent = "Không được để trống";
    isValid = false;
  }
  return isValid;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let formE = e.target;

  const fullName = formE.fullName.value.trim();
  const email = formE.email.value.trim();
  const dob = formE.dateOfBirth.value;
  const position = formE.position.value.trim();

  if (!validateForm(fullName, email, dob, position)) return;

  if (isUpdated) {
    const employee = employees.find((e) => e.id === isUpdated);

    employee.fullName = fullName;
    employee.email = email;
    employee.dob = dob;
    employee.position = position;
  } else {
    const employee = {
      id: idEmployee++,
      fullName,
      email,
      dob,
      position,
    };
    employees.push(employee);
  }

  updateUI();
  form.reset();
  isUpdated = null;

  title.textContent = "Thêm Nhân Viên";
  formSubmit.textContent = "Thêm Nhân Viên";
  cancelBtn.style.display = "none";
});

tbody.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-edit")) {
    const tr = e.target.closest("tr");
    const id = +tr.dataset.id;

    const employee = employees.find((e) => e.id === id);

    form.fullName.value = employee.fullName;
    form.email.value = employee.email;
    form.dateOfBirth.value = employee.dob;
    form.position.value = employee.position;

    isUpdated = id;

    title.textContent = "Chỉnh sửa nhân viên";
    formSubmit.textContent = "Cập nhật";
    cancelBtn.style.display = "inline-block";

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  if (e.target.classList.contains("btn-delete")) {
    const tr = e.target.closest("tr");
    const id = +tr.dataset.id;

    const employee = employees.find((e) => e.id === id);
    if (!confirm("Bạn có muốn xóa nhân viên này không")) return;
    employees = employees.filter((e) => e.id !== id);

    if (isUpdated === id) {
      form.reset();
      isUpdated = null;

      title.textContent = "Thêm Nhân Viên";
      formSubmit.textContent = "Thêm Nhân Viên";
      cancelBtn.style.display = "none";
    }
    updateUI();
  }
});

cancelBtn.addEventListener("click", () => {
  form.reset();
  isUpdated = null;

  title.textContent = "Thêm Nhân Viên";
  formSubmit.textContent = "Thêm Nhân Viên";

  cancelBtn.style.display = "none";
});
