// console.log(axios);

// var objectAjax = {
//     url: './data/arrSinhVien.json',//đường dẫn đến file chứa dữ liệu hoặc api do backend cung cấp
//     method:'GET',//do backend cung cấp
//     responseType: 'json',//Kiểu dữ liệu trả về do backend cung cấp
// }

// //Gọi ajax = axios => trả về promise
// var promise = axios(objectAjax);

// //xử lí khi request thành công
// promise.then(function(result){
//     console.log(result.data);
//     document.querySelector('#data').innerHTML = result.data[0].tenSV;
// })

// //Xử lí khi request thất bại
// promise.catch(function(err){
//     console.log(err);
// })

// var objectAjax = {
//     url: '/data/xmlSinhVien.xml',
//     method:'GET',
//     response:'document'
// }

// var promise = axios(objectAjax);

// promise.then(function(result){
//     console.log('result', result.data);
//     let sinhVien1 = result.data.querySelector('SinhVien').innerHTML;
//     var maSV = result.data.querySelector('SinhVien').getAttribute('maSV');
//     console.log('ten sinh vien', sinhVien1);
//     console.log('ma sinh vien',maSV);
// });

var renderSinhVien = function () {
  // var objectAjax = {}
  var promise = axios({
    url: "http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien", //backend cung cấp đường dẫn api
    method: "GET", //backend cung cấp method
    responseType: "json", //backend cung cấp kiểu dữ liệu trả về
  });
  //Xử lí thành công
  promise.then(function (result) {
    console.log("result", result.data);
    //Hiển thị thông tin sinh viên lên table
    renderTableSinhVien(result.data);
  });

  //Xử lí thất bại
  promise.catch(function (error) {
    console.log("2");
  });
};

//=============================

var renderTableSinhVien = function (arrSinhVien) {
  var content = "";
  for (var i = 0; i < arrSinhVien.length; i++) {
    // Mỗi lần duyệt lấy ra 1 đối tượng sinh viên trong mảng
    var content = "";
    for (var i = 0; i < arrSinhVien.length; i++) {
      //Mỗi lần duyệt lấy ra 1 đối tượng sinh viên trong mảng
      var sinhVien = arrSinhVien[i];
      var sv = new SinhVien(
        sinhVien.maSinhVien,
        sinhVien.tenSinhVien,
        sinhVien.loaiSinhVien,
        sinhVien.diemToan,
        sinhVien.diemLy,
        sinhVien.diemHoa,
        sinhVien.diemRenLuyen,
        sinhVien.email,
        sinhVien.soDienThoai
      );

      content += `
            <tr>
                <td>${sv.maSinhVien}</td>
                <td>${sv.tenSinhVien}</td>
                <td>${sv.loaiSinhVien}</td>
                <td>${sv.tinhDiemTrungBinh()}</td>
                <td>${sv.diemRenLuyen}</td>
                <td>
                
                <button class="btn btn-danger" onclick="xoaSinhVien('${
                  sv.maSinhVien
                }')" >Xoá</button>
                
                <button class="btn btn-danger" onclick="chinhSua('${
                  sv.maSinhVien
                }')" >Chỉnh sửa</button>
                </td>
            </tr>
        `;
    }
    document.querySelector("#tblSinhVien").innerHTML = content;
  }
};
renderSinhVien();

//========POST: Thêm sinh viên server qua api của backend cung cấp
document.querySelector("#btnXacNhan").onclick = function () {
  // lấy thông tin từ người dùng nhập vào
  var sinhVien = new SinhVien();
  sinhVien.maSinhVien = document.querySelector("#maSinhVien").value;
  sinhVien.tenSinhVien = document.querySelector("#tenSinhVien").value;
  sinhVien.email = document.querySelector("#email").value;
  sinhVien.soDienThoai = document.querySelector("#soDienThoai").value;
  sinhVien.diemToan = document.querySelector("#diemToan").value;
  sinhVien.diemLy = document.querySelector("#diemLy").value;
  sinhVien.diemHoa = document.querySelector("#diemHoa").value;
  sinhVien.diemRenLuyen = document.querySelector("#diemRenLuyen").value;

  console.log("sinhVien", sinhVien);

  var promise = axios({
    url: "http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien", //api backend cung cấp
    method: "POST", //method backend cung cấp
    data: sinhVien, //Format data phải đúng định dạng
    responseType: "json",
  });
  promise.then(function (result) {
    console.log("xử lí thành công", result.data);
    renderSinhVien();
  });
  promise.catch(function (error) {
    console.log("xử lí thất bại", error);
  });
};

//========================DELETE: với api backend cung cấp==========================

window.xoaSinhVien = function (maSinhVien) {
  var promise = axios({
    url: `http://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=${maSinhVien}`,
    method: "DELETE",
    responseType: "json",
  });
  promise.then(function (result) {
    console.log("result", result.data);
    renderSinhVien();
  });

  promise.catch(function (error) {
    console.log("error", error);
  });
};

//======================Chỉnh sửa=================================
window.chinhSua = function (maSinhVien) {
  var promise = axios({
    url: `http://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien=${maSinhVien}`,
    method: "GET",
    responseType: "json",
  })
    .then(function (result) {
      console.log("result", result);
      var sv = result.data;
      document.querySelector("#maSinhVien").value = sv.maSinhVien;
      document.querySelector("#tenSinhVien").value = sv.tenSinhVien;
      document.querySelector("#email").value = sv.email;
      document.querySelector("#soDienThoai").value = sv.soDienThoai;
      document.querySelector("#diemRenLuyen").value = sv.diemRenLuyen;
      document.querySelector("#diemToan").value = sv.diemToan;
      document.querySelector("#diemLy").value = sv.diemLy;
      document.querySelector("#diemHoa").value = sv.diemHoa;
    })
    .catch(function (error) {
      console.log("error", error);
    });
};

//=====================PUT cập nhật thông tin===========================

document.querySelector("#btnCapNhatSinhVien").onclick = function () {

  var sv = result.data;
  document.querySelector("#maSinhVien").value = sv.maSinhVien;
  document.querySelector("#tenSinhVien").value = sv.tenSinhVien;
  document.querySelector("#email").value = sv.email;
  document.querySelector("#soDienThoai").value = sv.soDienThoai;
  document.querySelector("#diemRenLuyen").value = sv.diemRenLuyen;
  document.querySelector("#diemToan").value = sv.diemToan;
  document.querySelector("#diemLy").value = sv.diemLy;
  document.querySelector("#diemHoa").value = sv.diemHoa;
  var promise = axios({
    url:`http://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien=${sinhVien.maSinhVien}`,
    method:'PUT',
    data:sinhVien
  });

  promise.then(function(result){
    console.log('result',result.data);
    renderSinhVien();
  })

  promise.catch(function(result){
    console.log('error',error);
  })
};
