function Data() {
    this.fetchData = function () {
      return (promise = axios({
        url: "https://625bc0cd50128c570207068b.mockapi.io/api/ListCenterData",
        method: "GET",
      }));
    };
  
    this.postData = function (data) {
      return (promise = axios({
        url: "https://625bc0cd50128c570207068b.mockapi.io/api/ListCenterData",
        method: "POST",
        data: data,
      }));
    };
  
    this.deleteData = function (id) {
      return (promise = axios({
        url: `https://625bc0cd50128c570207068b.mockapi.io/api/ListCenterData/${id}`,
        method: "DELETE",
      }));
    };
  
    this.putData = function (id, data) {
      return (promise = axios({
        url: `https://625bc0cd50128c570207068b.mockapi.io/api/ListCenterData/${id}`,
        method: "PUT",
        data: data,
      }));
    };
  
    this.findData = function (id) {
      return (promise = axios({
        url: `https://625bc0cd50128c570207068b.mockapi.io/api/ListCenterData/${id}`,
        method: "GET",
      }));
    };
  }
  