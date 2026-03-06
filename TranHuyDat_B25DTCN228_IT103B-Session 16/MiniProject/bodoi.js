let employees = [];
let idEmployee = 1;
let isUpdated = null;
const tbody = querySelector("#tbody");
const tfooter = querySelector(".tfooter");
const badge = querySelector(".badge");
const title = querySelector("#mainTitle");
const errorFullname = querySelector("#error-fullName");
const errorEmail = querySelector("#error-email");
const errorDob = querySelector("#error-dob");

const errorPosition = querySelector("#error-position");
const form = querySelector("#formEmployee");
const formSubmit = querySelector("#submitForm");
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

const validateForm = () => {
  let isValid = true;
  errorFullname.textContent = "";
  errorEmail.textContent = "";
  errorDob.textContent = "";
  errorPosition.textContent = "";

  if (!fullName) {
    errorFullname.textContent = "Không được để trống";
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let formE = e.target;

  const fullName = formE.fullName.value.trim();
  const email = formE.email.value.trim();
  const dob = formE.dateOfBirth.value.trim();
  const position = formE.position.value.trim();
});
