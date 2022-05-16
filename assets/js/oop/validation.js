function Validation() {
  this.checkEmpty = function (value, id, condition, mess) {
    if (value === condition) {
      getEle(id).style.border = "1px solid red";
      getEle("txt" + id).innerHTML = mess;
      getEle("txt" + id).style.display = "block";
      return false;
    }
    getEle(id).style.border = "1px solid green";
    getEle("txt" + id).innerHTML = "";
    getEle("txt" + id).style.display = "none";
    return true;
  };

  this.checkFormat = function (value, format, id, mess) {
    var letter = "";
    if (format === "number") {
      letter = /^[0-9]+$/;
    } else if (format == "string") {
      letter =
        "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
        "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
        "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
    } else if (format === "email") {
      letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    } else if (format === "password") {
      letter =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
    }
    if (value.match(letter)) {
      getEle(id).style.border = "1px solid green";
      getEle("txt" + id).innerHTML = "";
      getEle("txt" + id).style.display = "none";
      return true;
    }
    getEle(id).style.border = "1px solid red";
    getEle("txt" + id).innerHTML = mess;
    getEle("txt" + id).style.display = "block";
    return false;
  };

  this.checkLength = function (value, id, min, max, mess) {
    if (value.trim().length >= min && value.trim().length <= max) {
      getEle(id).style.border = "1px solid green";
      getEle("txt" + id).innerHTML = "";
      getEle("txt" + id).style.display = "none";
      return true;
    }
    getEle(id).style.border = "1px solid red";
    getEle("txt" + id).innerHTML = mess;
    getEle("txt" + id).style.display = "block";
    return false;
  };

  this.checkDuplicate = function (value, id, mess, arr, editStatus) {
    if (editStatus == true) {
      getEle("txt" + id).innerHTML = "";
      getEle("txt" + id).style.display = "none";
      return true;
    }
    var status = false;
    for (var i = 0; i < arr.length; i++) {
      var user = arr[i];
      if (user.taiKhoan == value.trim()) {
        status = true;
        break;
      }
    }
    if (status) {
      getEle(id).style.border = "1px solid red";
      getEle("txt" + id).innerHTML = mess;
      getEle("txt" + id).style.display = "block";
      return false;
    }
    getEle(id).style.border = "1px solid green";
    getEle("txt" + id).innerHTML = "";
    getEle("txt" + id).style.display = "none";
    return true;
  };
}
