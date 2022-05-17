data = new Data();
//userList = new UserList();
validation = new Validation();
var editStatus = false;
getListData();
getEle("TaiKhoan").disabled = false;

// event when click button Thêm mới
getEle("btnThemNguoiDung").addEventListener("click", function () {
  getEle("modal-title").innerHTML = "Add new user";
  getEle("txtTaiKhoan").style = "display:none";
  editStatus = false;
  getEle("TaiKhoan").disabled = false;
  getEle("btnSave").onclick = function () {
    var user = getDataInfo(editStatus);
    if (user != null) {
      $("#myModal").modal("hide");
      getEle("txtThongBao").style.opacity = "1";
      getEle("txtThongBao").classList.add("alert-success");
      getEle("txtThongBao").innerHTML = "Add new user successfully !!!";
      setTimeout(function () {
        getEle("txtThongBao").style.opacity = "0";
      }, 1800);
      setTimeout(function () {
        getEle("txtThongBao").classList.remove("alert-success");
        getEle("txtThongBao").innerHTML = "";
      }, 3500);
      var promise = data.postData(user);
      promise
        .then(function (result) {
          getListData();
          clearInput();
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  getEle("btnClose").addEventListener("click", clearInput()); //on sub_code.js
});

// event when click button Delete
function deleteUser(id) {
  var promise = data.deleteData(id);
  promise
    .then(function (result) {
      getListData();
    })
    .catch(function (error) {
      console.log(error);
    });
}

// event when click button Edit
function editUser(id) {
  getEle("modal-title").innerHTML = "Edit user";
  clearInput();
  editStatus = true;
  getEle("TaiKhoan").disabled = true;
  var promise = data.findData(id);
  promise
    .then(function (result) {
      getEle("TaiKhoan").value = result.data.taiKhoan;
      getEle("HoTen").value = result.data.hoTen;
      getEle("MatKhau").value = result.data.matKhau;
      getEle("Email").value = result.data.email;
      getEle("HinhAnh").value = result.data.hinhAnh;
      getEle("loaiNguoiDung").value = result.data.loaiND;
      getEle("loaiNgonNgu").value = result.data.ngonNgu;
      getEle("MoTa").value = result.data.moTa;
    })
    .catch(function (error) {
      console.log(error);
    });
  getEle("btnSave").onclick = async function () {
    var user = { id: id, ...getDataInfo(editStatus) };
    console.log(user);
    var result = [];
    result.push(
      checkHoTen(),
      checkTaiKhoan(),
      checkMatKhau(),
      checkEmail(),
      checkHinhAnh(),
      checkloaiNguoiDung(),
      checkloaiNgonNgu(),
      checkMoTa()
    );
    if (result.includes(0) == false) {
      var promise = data.putData(user.id, user);
      $("#myModal").modal("hide");
      getEle("txtThongBao").style.opacity = "1";
      getEle("txtThongBao").classList.add("alert-success");
      getEle("txtThongBao").innerHTML = "Edit successfully !!!";
      promise
        .then(function (data) {
          getListData();
          clearInput();
          setTimeout(function () {
            getEle("txtThongBao").style.opacity = "0";
          }, 1000);
          setTimeout(function () {
            getEle("txtThongBao").classList.remove("alert-success");
            getEle("txtThongBao").innerHTML = "";
          }, 3000);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
}

//event when input on search field
getEle("search").addEventListener("keyup", function () {
  var value = removeAccents(getEle("search").value);
  var promise = data.searchData(value);
  promise
    .then(function (result) {
      renderHTML(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
});
