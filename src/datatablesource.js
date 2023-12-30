export const adminColumns = [
  { field: "_id", headerName: "ID", width: 170 },
  {
    field: "admin",
    headerName: "Quản trị viên",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "http://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" onLoad={(e) => { e.target.style.opacity = 1; }}
        style={{ opacity: 0, transition: 'opacity 0.5s' }}/>
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "password",
    headerName: "Mật khẩu",
    width: 230,
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "role",
    headerName: "Chức vụ",
    width: 150,
    valueGetter: (params) => params.row.role ? params.row.role.name : '',
  },
];


export const userColumns = [
  { field: "_id", headerName: "ID", width: 170 },
  {
    field: "user",
    headerName: "Khách hàng",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "http://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" onLoad={(e) => { e.target.style.opacity = 1; }}
        style={{ opacity: 0, transition: 'opacity 0.5s' }}/>
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "password",
    headerName: "Mật khẩu",
    width: 230,
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "role",
    headerName: "Chức vụ",
    width: 150,
    valueGetter: (params) => params.row.role ? params.row.role.name : '',
  },
  {
    field: "type",
    headerName: "Loại khách hàng",
    width: 230,
  }
];


export const categoryColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Tên danh mục",
    width: 150,
  },
  {
    field: "type",
    headerName: "Loại",
    width: 100,
  },
  {
    field: "desc",
    headerName: "Mô tả",
    width: 230,
  },
  {
    field: "title",
    headerName: "Tiêu đề",
    width: 100,
  },
];

export const projectColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Tên dự án",
    width: 150,
  },
  {
    field: "photos",
    headerName: "Hình ảnh",
    width: 150,
    renderCell: (params) => {
      return (
        <div>
          {params.row.photos && params.row.photos.length > 0 && (
            <img
              src={params.row.photos[0]}
              alt="photos"
              onLoad={(e) => { e.target.style.opacity = 1; }}
              style={{ opacity: 0, transition: 'opacity 0.5s' }}
            />
          )}
        </div>
      );
    },    
  },
  {
    field: "location",
    headerName: "Địa chỉ",
    width: 100,
  },
  {
    field: "descLocation",
    headerName: "Mô tả địa chỉ",
    width: 100,
  },
  {
    field: "investor",
    headerName: "Nhà đầu tư",
    width: 100,
  },
  {
    field: "construction",
    headerName: "Nhà thầu",
    width: 100,
  },
  {
    field: "land_area",
    headerName: "Diện tích đất",
    width: 100,
  },
  {
    field: "scale",
    headerName: "Chiều rộng",
    width: 100,
  },
  {
    field: "utiliti",
    headerName: "Tiện ích",
    width: 100,
  },
  {
    field: "descUtilitiIn",
    headerName: "Mô tả nội tiện ích",
    width: 100,
  },
  {
    field: "descUtilitiInSe",
    headerName: "Mô tả nội tiện ích",
    width: 100,
  },
  {
    field: "descUtilitiInTh",
    headerName: "Mô tả nội tiện ích",
    width: 100,
  },
  {
    field: "descUtilitiInFo",
    headerName: "Mô tả nội tiện ích",
    width: 100,
  },
  {
    field: "descUtilitiInFi",
    headerName: "Mô tả nội tiện ích",
    width: 100,
  },
  {
    field: "descUtilitiOut",
    headerName: "Mô tả ngoại tiện ích",
    width: 100,
  },
  {
    field: "descUtilitiOutSe",
    headerName: "Mô tả ngoại tiện ích",
    width: 100,
  },
  {
    field: "descUtilitiOutTh",
    headerName: "Mô tả ngoại tiện ích",
    width: 100,
  },
  {
    field: "descUtilitiOutFo",
    headerName: "Mô tả ngoại tiện ích",
    width: 100,
  },
  {
    field: "descUtilitiOutFi",
    headerName: "Mô tả ngoại tiện ích",
    width: 100,
  },
  {
    field: "ground",
    headerName: "Đất",
    width: 100,
  },
  {
    field: "groundSe",
    headerName: "Đất",
    width: 100,
  },
  {
    field: "groundTh",
    headerName: "Đất",
    width: 100,
  },
  {
    field: "categoryDesc",
    headerName: "Mô tả danh mục",
    width: 100,
  },
  {
    field: "juridical",
    headerName: "Pháp lý",
    width: 100,
  },
  {
    field: "price",
    headerName: "Giá",
    width: 100,
  },
  {
    field: "time_start",
    headerName: "Thời gian bắt đầu",
    width: 100,
  },
  {
    field: "categoryId",
    headerName: "ID danh mục",
    width: 150,
  },
];

export const adviseColumns = [
  { field: "_id", headerName: "ID", width: 170 },
  {
    field: "fullname",
    headerName: "Họ tên",
    width: 230,
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "phone",
    headerName: "Số điện thoại",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Mô tả",
    width: 230,
  },
];

export const orderColumns = [
  { field: "_id", headerName: "ID", width: 170 },
  {
    field: "userId",
    headerName: "Id Khách hàng",
    width: 230,
  },
  {
    field: "packetId",
    headerName: "Id gói",
    width: 230,
  },
  {
    field: "packetName",
    headerName: "Tên gói",
    width: 230,
  },
  {
    field: "customerName",
    headerName: "Tên khách hàng",
    width: 230,
  },
  {
    field: "address",
    headerName: "Địa chỉ",
    width: 230,
  },
  {
    field: "phoneNumber",
    headerName: "Số điện thoại",
    width: 230,
  },
  {
    field: "amount",
    headerName: "Tổng tiền",
    width: 230,
    valueFormatter: (params) => params.value ? params.value.toLocaleString() : '',
  },
  {
    field: "status",
    headerName: "Trạng thái",
    width: 230,
  },
  {
    field: "cancelReason",
    headerName: "Lý do hủy",
    width: 230,
  },
];


export const paymentColumns = [
  { field: "_id", headerName: "ID", width: 170 },
  {
    field: "userId",
    headerName: "Id khách hàng",
    width: 230,
  },
  {
    field: "orderId",
    headerName: "Id đơn hàng",
    width: 230,
  },
  {
    field: "packetName",
    headerName: "Tên gói",
    width: 230,
  },
  {
    field: "amount",
    headerName: "Tổng tiền",
    width: 230,
    valueFormatter: (params) => params.value ? params.value.toLocaleString() : '',
  },
  {
    field: "status",
    headerName: "Trạng thái",
    width: 230,
  },
];

export const packetTypeColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Tên",
    width: 150,
  },
  {
    field: "desc",
    headerName: "Mô tả",
    width: 230,
  },
  {
    field: "title",
    headerName: "Tiêu đề",
    width: 100,
  },
];

export const packetColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "packetTypeId",
    headerName: "Id danh mục gói",
    width: 150,
  },
  {
    field: "name",
    headerName: "Tên gói",
    width: 150,
  },
  {
    field: "timeend",
    headerName: "Thời hạn gói",
    width: 150,
  },
  {
    field: "function",
    headerName: "Chức năng gói",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Mô tả",
    width: 230,
  },
  {
    field: "price",
    headerName: "Giá",
    width: 230,
  },
  {
    field: "title",
    headerName: "Tiêu đề",
    width: 100,
  },
];
export const categoryLandSaleColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Tên",
    width: 150,
  },
  {
    field: "desc",
    headerName: "Mô tả",
    width: 230,
  },
  {
    field: "title",
    headerName: "Tiêu đề",
    width: 100,
  },
];

export const landSaleColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "userId",
    headerName: "Id khách hàng",
    width: 150,
  },
  {
    field: "photos",
    headerName: "Hình ảnh",
    width: 150,
    renderCell: (params) => {
      return (
        <div>
          {params.row.photos && params.row.photos.length > 0 && (
            <img
              src={params.row.photos[0]}
              alt="photos"
              onLoad={(e) => { e.target.style.opacity = 1; }}
              style={{ opacity: 0, transition: 'opacity 0.5s' }}
            />
          )}
        </div>
      );
    },    
  },
  {
    field: "categoryLandSaleId",
    headerName: "Id loại đất bán",
    width: 230,
  },
  {
    field: "name",
    headerName: "Tên",
    width: 100,
  },
  {
    field: "location",
    headerName: "Địa chỉ",
    width: 100,
  },
  {
    field: "area",
    headerName: "Diện tích",
    width: 100,
  },
  {
    field: "price",
    headerName: "Giá",
    width: 100,
  },
  {
    field: "title",
    headerName: "Tiêu đề",
    width: 100,
  },
  {
    field: "desc",
    headerName: "Mô tả",
    width: 100,
  },
  {
    field: "nameContact",
    headerName: "Tên liên hệ",
    width: 100,
  },
  {
    field: "phoneContact",
    headerName: "Số điện thoại liên hệ",
    width: 100,
  },
  {
    field: "emailContact",
    headerName: "Email liên hệ",
    width: 100,
  },
  {
    field: "room",
    headerName: "Số phòng",
    width: 100,
  },
  {
    field: "toilet",
    headerName: "Số nhà vệ sinh",
    width: 100,
  },
  {
    field: "isApproved",
    headerName: "Trạng thái",
    width: 120,
    valueFormatter: (params) => params.value ? 'Đã đăng' : 'Chưa đăng',
  }  
];

export const categoryLandLeaseColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Tên",
    width: 150,
  },
  {
    field: "desc",
    headerName: "Mô tả",
    width: 230,
  },
  {
    field: "title",
    headerName: "Tiêu đề",
    width: 100,
  },
];

export const landLeaseColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "userId",
    headerName: "Id khách hàng",
    width: 150,
  },
  {
    field: "photos",
    headerName: "Hình ảnh",
    width: 150,
    renderCell: (params) => {
      return (
        <div>
          {params.row.photos && params.row.photos.length > 0 && (
            <img
              src={params.row.photos[0]}
              alt="photos"
              onLoad={(e) => { e.target.style.opacity = 1; }}
              style={{ opacity: 0, transition: 'opacity 0.5s' }}
            />
          )}
        </div>
      );
    },    
  },
  {
    field: "categoryLandLeaseId",
    headerName: "Id loại đất thuê",
    width: 230,
  },
  {
    field: "name",
    headerName: "Tên",
    width: 100,
  },
  {
    field: "location",
    headerName: "Địa chỉ",
    width: 100,
  },
  {
    field: "area",
    headerName: "Diện tích",
    width: 100,
  },
  {
    field: "price",
    headerName: "Giá",
    width: 100,
  },
  {
    field: "title",
    headerName: "Tiêu đề",
    width: 100,
  },
  {
    field: "desc",
    headerName: "Mô tả",
    width: 100,
  },
  {
    field: "nameContact",
    headerName: "Tên liên hệ",
    width: 100,
  },
  {
    field: "phoneContact",
    headerName: "Số điện thoại liên hệ",
    width: 100,
  },
  {
    field: "emailContact",
    headerName: "Email liên hệ",
    width: 100,
  },
  {
    field: "room",
    headerName: "Số phòng",
    width: 100,
  },
  {
    field: "toilet",
    headerName: "Số nhà vệ sinh",
    width: 100,
  },
  {
    field: "isApproved",
    headerName: "Trạng thái",
    width: 120,
    valueFormatter: (params) => params.value ? 'Đã đăng' : 'Chưa đăng',
  }  
];

export const postCategoryColumns = [
  { field: "_id", headerName: "ID", width: 170 },
  {
    field: "name",
    headerName: "Tên",
    width: 230,
  },
  {
    field: "type",
    headerName: "Loại",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Mô tả",
    width: 230,
  },
  {
    field: "title",
    headerName: "Tiêu đề",
    width: 230,
  },
];

export const postColumns = [
  { field: "_id", headerName: "ID", width: 170 },
  {
    field: "name",
    headerName: "Tên",
    width: 230,
  },
  {
    field: "photos",
    headerName: "Hình ảnh",
    width: 150,
    renderCell: (params) => {
      return (
        <div>
          {params.row.photos && params.row.photos.length > 0 && (
            <img
              src={params.row.photos[0]}
              alt="photos"
              onLoad={(e) => { e.target.style.opacity = 1; }}
              style={{ opacity: 0, transition: 'opacity 0.5s' }}
            />
          )}
        </div>
      );
    },    
  },
  {
    field: "descone",
    headerName: "Nội dung",
    width: 230,
  },
  {
    field: "desctwo",
    headerName: "Nội dung",
    width: 230,
  },
  {
    field: "descthree",
    headerName: "Nội dung",
    width: 230,
  },
  {
    field: "descfour",
    headerName: "Nội dung",
    width: 230,
  },
  {
    field: "descfive",
    headerName: "Nội dung",
    width: 230,
  },
  {
    field: "title",
    headerName: "Nội dung",
    width: 230,
  },
  {
    field: "postCategoryId",
    headerName: "ID loại tin tức",
    width: 150,
  },
];

export const jobCategoryColumns = [
  { field: "_id", headerName: "ID", width: 170 },
  {
    field: "name",
    headerName: "Tên",
    width: 230,
  },
  {
    field: "type",
    headerName: "Loại",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Mô tả",
    width: 230,
  },
  {
    field: "title",
    headerName: "Tiêu đề",
    width: 230,
  },
];

export const jobColumns = [
  { field: "_id", headerName: "ID", width: 170 },
  {
    field: "name",
    headerName: "Tên",
    width: 230,
  },
  {
    field: "location",
    headerName: "Địa chỉ",
    width: 230,
  },
  {
    field: "number",
    headerName: "Số lượng",
    width: 230,
  },
  {
    field: "dateend",
    headerName: "Ngày kết thúc",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Mô tả công việc",
    width: 230,
  },
  {
    field: "gender",
    headerName: "Giới tính",
    width: 230,
  },
  {
    field: "age",
    headerName: "Tuổi",
    width: 230,
  },
  {
    field: "level",
    headerName: "Trình độ",
    width: 230,
  },
  {
    field: "experience",
    headerName: "Kinh nghiệm",
    width: 230,
  },
  {
    field: "request",
    headerName: "Yêu cầu",
    width: 230,
  },
  {
    field: "income",
    headerName: "Thu nhập",
    width: 230,
  },
  {
    field: "regime",
    headerName: "Chế độ",
    width: 230,
  },
  {
    field: "jobCategoryId",
    headerName: "ID Loại công việc",
    width: 150,
  },
];

export const jobApplyColumns = [
  { field: "_id", headerName: "ID", width: 170 },
  {
    field: "fullname",
    headerName: "Họ tên",
    width: 180,
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "phone",
    headerName: "Số điện thoại",
    width: 140,
  },
  {
    field:"file",
    headerName:"Hồ sơ",
    width: 350,
  },
  {
    field: "namejob",
    headerName: "Tên công việc",
    width: 230,
  },
];

export const roleColumns = [
  { field: "_id", headerName: "ID", width: 170 },
  {
    field: "name",
    headerName: "Tên chức vụ",
    width: 200,
  },
  {
    field: "modules",
    headerName: "Các chức năng",
    width: 250,
    valueGetter: (params) => params.row.modules.join(', '),
  },
];

export const commentColumns = [
  { field: "_id", headerName: "ID", width: 170 },
  {
    field: "userId",
    headerName: "Id khách hàng",
    width: 200,
  },
  {
    field: "postId",
    headerName: "Id tin tức",
    width: 250,
  },
  {
    field: "parentId",
    headerName: "Id bình luận",
    width: 250,
  },
  {
    field: "content",
    headerName: "Nội dung",
    width: 250,
  },
  {
    field: "replies",
    headerName: "Phản hồi",
    width: 250,
    valueGetter: (params) => {
      return params.value && Array.isArray(params.value) ? params.value.map(reply => `${reply.content}`).join('; ') : '';
    },
  },
  {
    field: "isApproved",
    headerName: "Trạng thái",
    width: 120,
    valueFormatter: (params) => params.value ? 'Đã đăng' : 'Chưa đăng',
  }  
];

export const slideColumns = [
  { field: "_id", headerName: "ID", width: 170 },
  {
    field: "photos1",
    headerName: "Hình ảnh",
    width: 150,
    renderCell: (params) => {
      return (
        <div>
          {params.row.photos && params.row.photos.length > 0 && (
            <img
              src={params.row.photos[0]}
              alt="photos"
              onLoad={(e) => { e.target.style.opacity = 1; }}
              style={{ opacity: 0, transition: 'opacity 0.5s' }}
            />
          )}
        </div>
      );
    },    
  },
  {
    field: "photos2",
    headerName: "Hình ảnh",
    width: 150,
    renderCell: (params) => {
      return (
        <div>
          {params.row.photos && params.row.photos.length > 0 && (
            <img
              src={params.row.photos[1]}
              alt="photos"
              onLoad={(e) => { e.target.style.opacity = 1; }}
              style={{ opacity: 0, transition: 'opacity 0.5s' }}
            />
          )}
        </div>
      );
    },    
  },
  {
    field: "photos3",
    headerName: "Hình ảnh",
    width: 150,
    renderCell: (params) => {
      return (
        <div>
          {params.row.photos && params.row.photos.length > 0 && (
            <img
              src={params.row.photos[2]}
              alt="photos"
              onLoad={(e) => { e.target.style.opacity = 1; }}
              style={{ opacity: 0, transition: 'opacity 0.5s' }}
            />
          )}
        </div>
      );
    },    
  },
  {
    field: "photos4",
    headerName: "Hình ảnh",
    width: 150,
    renderCell: (params) => {
      return (
        <div>
          {params.row.photos && params.row.photos.length > 0 && (
            <img
              src={params.row.photos[3]}
              alt="photos"
              onLoad={(e) => { e.target.style.opacity = 1; }}
              style={{ opacity: 0, transition: 'opacity 0.5s' }}
            />
          )}
        </div>
      );
    },    
  },
  {
    field: "photos5",
    headerName: "Hình ảnh",
    width: 150,
    renderCell: (params) => {
      return (
        <div>
          {params.row.photos && params.row.photos.length > 0 && (
            <img
              src={params.row.photos[4]}
              alt="photos"
              onLoad={(e) => { e.target.style.opacity = 1; }}
              style={{ opacity: 0, transition: 'opacity 0.5s' }}
            />
          )}
        </div>
      );
    },    
  },
];
