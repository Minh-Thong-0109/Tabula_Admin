// getElementById
function getEle(id) {
  return document.getElementById(id);
}

// remove Vietnamese accents
function removeAccents(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}

// get list data from Database and render to table
function getListData() {
  var promise = data.fetchData();
  promise
    .then(function (result) {
      renderHTML(result.data); //on sub_code.js
    })
    .catch(function (error) {
      console.log(error);
    });
}

// render HTML to table
function renderHTML(data) {
  var content = "";
  for (var i = 0; i < data.length; i++) {
    user = data[i];
    content += `
        <tr>
        <th>${i + 1}</th>
        <th>${user.taiKhoan}</th>
        <th>${user.matKhau}</th>
        <th>${user.hoTen}</th>
        <th>${user.email}</th>
        <th>${user.ngonNgu}</th>
        <th>${user.loaiND}</th>
        <th>
        <button class="btn btn-danger" onclick="deleteUser(${
          user.id
        })">Delete</button>
        <button class="btn btn-success" data-toggle="modal" data-target="#myModal" onclick="editUser(${
          user.id
        })">Edit</button>
        </th>
        <tr>
        `;
  }
  getEle("tblDanhSachNguoiDung").innerHTML = content;
}

// get User information from input
function getDataInfo(editStatus) {
  var _taiKhoan = getEle("TaiKhoan").value;
  checkTaiKhoan();
  var _hoTen = getEle("HoTen").value;
  checkHoTen();
  var _matKhau = getEle("MatKhau").value;
  checkMatKhau();
  var email = getEle("Email").value;
  checkEmail();
  var _hinhAnh = getEle("HinhAnh").value;
  checkHinhAnh();
  var _loaiND = getEle("loaiNguoiDung").value;
  checkloaiNguoiDung();
  var _ngonNgu = getEle("loaiNgonNgu").value;
  checkloaiNgonNgu();
  var _moTa = getEle("MoTa").value;
  checkMoTa();
  var isValid = true;
  isValid &=
    checkTaiKhoan() &&
    checkHoTen() &&
    checkMatKhau() &&
    checkEmail() &&
    checkHinhAnh() &&
    checkloaiNguoiDung() &&
    checkloaiNgonNgu() &&
    checkMoTa();
  if (isValid || editStatus==true) {
    var user = new User(
      _taiKhoan,
      _hoTen,
      _matKhau,
      email,
      _hinhAnh,
      _loaiND,
      _ngonNgu,
      _moTa
    );
    return user;
  }
  return null;
}

// clear input
function clearInput() {
  getEle("TaiKhoan").value = "";
  getEle("TaiKhoan").style.border = "1px solid grey";
  getEle("txtTaiKhoan").style.display = "none";
  getEle("HoTen").value = "";
  getEle("HoTen").style.border = "1px solid grey";
  getEle("txtHoTen").style.display = "none";
  getEle("MatKhau").value = "";
  getEle("MatKhau").style.border = "1px solid grey";
  getEle("txtMatKhau").style.display = "none";
  getEle("Email").value = "";
  getEle("Email").style.border = "1px solid grey";
  getEle("txtEmail").style.display = "none";
  getEle("HinhAnh").value = "";
  getEle("HinhAnh").style.border = "1px solid grey";
  getEle("txtHinhAnh").style.display = "none";
  getEle("loaiNguoiDung").value = "Chọn loại người dùng";
  getEle("loaiNguoiDung").style.border = "1px solid grey";
  getEle("txtloaiNguoiDung").style.display = "none";
  getEle("loaiNgonNgu").value = "Chọn ngôn ngữ";
  getEle("loaiNgonNgu").style.border = "1px solid grey";
  getEle("txtloaiNgonNgu").style.display = "none";
  getEle("MoTa").value = "";
  getEle("MoTa").style.border = "1px solid grey";
  getEle("txtMoTa").style.display = "none";
}

// check input TaiKhoan
function checkTaiKhoan() {
  var result = true;
  getEle("txtTaiKhoan").style.marginTop = "5px";
  result &=
    validation.checkEmpty(
      getEle("TaiKhoan").value,
      "TaiKhoan",
      "",
      "Vui lòng không để trống phần Tài Khoản"
    );
  return result;
}

// check input HoTen
function checkHoTen() {
  var result = true;
  getEle("txtHoTen").style.marginTop = "5px";
  result &=
    validation.checkEmpty(
      getEle("HoTen").value,
      "HoTen",
      "",
      "Vui lòng không để trống phần Họ tên"
    ) &&
    validation.checkFormat(
      getEle("HoTen").value,
      "string",
      "HoTen",
      "Họ tên không chứa số và các kí tự"
    );
  return result;
}

// check input MatKhau
function checkMatKhau() {
  var result = true;
  getEle("txtMatKhau").style.marginTop = "5px";
  result &=
    validation.checkEmpty(
      getEle("MatKhau").value,
      "MatKhau",
      "",
      "Vui lòng không để trống phần Mật khẩu"
    ) &&
    validation.checkFormat(
      getEle("MatKhau").value,
      "password",
      "MatKhau",
      "Mật khẩu phải gồm chữ in hoa, chữ thường, số và kí tự đặc biệt"
    ) &&
    validation.checkLength(
      getEle("MatKhau").value,
      "MatKhau",
      6,
      8,
      "Mật khẩu chứa từ 6-8 kí tự"
    );
  return result;
}

// check input Email
function checkEmail() {
  var result = true;
  getEle("txtEmail").style.marginTop = "5px";
  result &=
    validation.checkEmpty(
      getEle("Email").value,
      "Email",
      "",
      "Vui lòng không để trống phần Email"
    ) &&
    validation.checkFormat(
      getEle("Email").value,
      "email",
      "Email",
      "Email không đúng định dạng"
    );
  return result;
}

// check input HinhAnh
function checkHinhAnh() {
  var result = true;
  getEle("txtHinhAnh").style.marginTop = "5px";
  result &= validation.checkEmpty(
    getEle("HinhAnh").value,
    "HinhAnh",
    "",
    "Vui lòng không để trống phần Mật khẩu"
  );
  return result;
}

// check input loaiNguoiDung
function checkloaiNguoiDung() {
  var result = true;
  getEle("txtloaiNguoiDung").style.marginTop = "5px";
  result &= validation.checkEmpty(
    getEle("loaiNguoiDung").value,
    "loaiNguoiDung",
    "Chọn loại người dùng",
    "Vui lòng chọn loại Người dùng phù hợp"
  );
  return result;
}

// check input loaiNgonNgu
function checkloaiNgonNgu() {
  var result = true;
  getEle("txtloaiNgonNgu").style.marginTop = "5px";
  result &= validation.checkEmpty(
    getEle("loaiNgonNgu").value,
    "loaiNgonNgu",
    "Chọn ngôn ngữ",
    "Vui lòng chọn loại Ngôn ngữ"
  );
  return result;
}

// check input MoTa
function checkMoTa() {
  var result = true;
  getEle("txtMoTa").style.marginTop = "5px";
  result &=
    validation.checkEmpty(
      getEle("MoTa").value,
      "MoTa",
      "",
      "Vui lòng không để trống phần Mô tả"
    ) &&
    validation.checkLength(
      getEle("MoTa").value,
      "MoTa",
      0,
      60,
      "Mô tả tối đa 60 kí tự"
    );
  return result;
}
