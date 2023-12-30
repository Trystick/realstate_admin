import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch"
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'
import * as XLSX from 'xlsx';

const Datatable = ({columns}) => {
  const [actionStatus, setActionStatus] = useState('');
  const location = useLocation();
  const [totalAmount, setTotalAmount] = useState(0);
  const path = location.pathname.split("/")[1];
  let apiPath;
  if (path === 'users') {
    apiPath = '/users/users/users';
  } else if (path === 'admins')
    apiPath = '/users/admins/admins';
  else {
    apiPath = `/${path}`;
  }
  const {data, loading, error} = useFetch(apiPath)
  const [list, setList] = useState([]);

  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    setList(data)
  }, [data])

  useEffect(() => {
    fetch(apiPath)
      .then(response => response.json())
      .then(data => {
        setList(data);
        if (path === 'order') {
          const total = data.reduce((sum, order) => {
            return order.status === 'Thành công' ? sum + order.amount : sum;
          }, 0);
          setTotalAmount(total);
        }
      })
      .catch(error => {
        console.error('Có lỗi xảy ra:', error);
      });
  }, [path]);

  const handleDelete = async(id, categoryId, postCategoryId, jobCategoryId, categoryLandSaleId, categoryLandLeaseId, packetTypeId) => {
    if (!window.confirm("Are you sure you want to delete?")) {
      return;
    }  
    let apiPath;
    if (path === 'admins') {
      apiPath = 'users';
    } 
    else {
      apiPath = `/${path}`;
    }

    try {
      if (categoryId) {
        // Delete project
        await axios.delete(`${apiPath}/${id}/${categoryId}`);
        setList(list.filter((item) => item.projectId !== id));
      } else if (postCategoryId){
        // Delete post
        await axios.delete(`${apiPath}/${id}/${postCategoryId}`);
        setList(list.filter((item) => item.postId !== id));
      }
      else if (jobCategoryId){
      // Delete job
      await axios.delete(`${apiPath}/${id}/${jobCategoryId}`);
      setList(list.filter((item) => item.jobId !== id));
      }
      else if (categoryLandSaleId){
        // Delete job
        await axios.delete(`${apiPath}/${id}/${categoryLandSaleId}`);
        setList(list.filter((item) => item.landSaleId !== id));
      }
      else if (categoryLandLeaseId){
        // Delete job
        await axios.delete(`${apiPath}/${id}/${categoryLandLeaseId}`);
        setList(list.filter((item) => item.landLeaseId !== id));
      }
      else if (packetTypeId){
        // Delete job
        await axios.delete(`${apiPath}/${id}/${packetTypeId}`);
        setList(list.filter((item) => item.packetId !== id));
      }
      else {
        // Delete category
        await axios.delete(`${apiPath}/${id}`);
        setList(list.filter((item) => item._id !== id));
      }
      setDeleteSuccess(true);
      alert("Xóa thành công")
      window.location.reload()
    } catch (err) {
      
    }
  };

  const handleApprove = async (id) => {
    try {
      const response = await axios.post(`/comment/approve/${id}`);
      if (response.status === 200) {
        alert('Bình luận đã được đăng thành công');
        setActionStatus('success');
      }
    } catch (error) {
      console.error('Error approving comment', error);
      alert('Có lỗi xảy ra khi đăng bình luận');
    }
  };

  const handleApproveLandSale = async (id) => {
    try {
      const response = await axios.post(`/landSale/approve/${id}`);
      if (response.status === 200) {
        alert('Nhà bán đã được đăng thành công');
        setActionStatus('success');
      }
    } catch (error) {
      console.error('Error approving landsale', error);
      alert('Có lỗi xảy ra khi đăng bài nhà bán');
    }
  };

  const handleApproveLandLease = async (id) => {
    try {
      const response = await axios.post(`/landLease/approve/${id}`);
      if (response.status === 200) {
        alert('Nhà thuê đã được đăng thành công');
        setActionStatus('success');
      }
    } catch (error) {
      console.error('Error approving landlease', error);
      alert('Có lỗi xảy ra khi đăng bài nhà thuê');
    }
  };
  

  const actionColumn = [
    {
      field: "action",
      headerName: "Thao tác",
      width: 230,
      renderCell: (params) => {
        if (path === 'comment') {
          return (
            <div className="cellAction">
              <Link style={{ textDecoration: "none" }}>
                <div className="assignButton" onClick={() => handleApprove(params.row._id)}>Đăng</div>
              </Link>
            </div>
          );
        } else if (path === 'landSale'){
          return (
          <div className="cellAction">
              <Link to={`/${path}/edit/${params.row._id}`} style={{ textDecoration: "none" }}>
                <div className="viewButton">Sửa</div>
              </Link>
              <Link style={{ textDecoration: "none" }}>
                <div className="assignButton" onClick={() => handleApproveLandSale(params.row._id)}>Đăng</div>
              </Link>
              <div
                className="deleteButton"
                onClick={() => handleDelete(params.row._id, params.row.categoryId, params.row.postCategoryId, params.row.jobCategoryId, params.row.categoryLandSaleId, params.row.categoryLandLeaseId, params.row.packetTypeId)}
              >
                Xóa
              </div>
            </div>
          )
        }
        else if (path === 'landLease'){
          return (
          <div className="cellAction">
              <Link to={`/${path}/edit/${params.row._id}`} style={{ textDecoration: "none" }}>
                <div className="viewButton">Sửa</div>
              </Link>
              <Link style={{ textDecoration: "none" }}>
                <div className="assignButton" onClick={() => handleApproveLandLease(params.row._id)}>Đăng</div>
              </Link>
              <div
                className="deleteButton"
                onClick={() => handleDelete(params.row._id, params.row.categoryId, params.row.postCategoryId, params.row.jobCategoryId, params.row.categoryLandSaleId, params.row.categoryLandLeaseId, params.row.packetTypeId)}
              >
                Xóa
              </div>
            </div>
          )
        }
        else {
          return (
            <div className="cellAction">
              <Link to={`/${path}/edit/${params.row._id}`} style={{ textDecoration: "none" }}>
                <div className="viewButton">Sửa</div>
              </Link>
              {path === 'role' && (
                <Link to={`/${path}/assign/${params.row._id}`} style={{ textDecoration: "none" }}>
                  <div className="assignButton">Phân quyền</div>
                </Link>
              )}
              <div
                className="deleteButton"
                onClick={() => handleDelete(params.row._id, params.row.categoryId, params.row.postCategoryId, params.row.jobCategoryId, params.row.categoryLandSaleId, params.row.categoryLandLeaseId, params.row.packetTypeId)}
              >
                Xóa
              </div>
            </div>
          );
        }
      },
    },
  ];
  
  let title;
  switch(path) {
    case 'home':
      title = 'Trang chủ';
      break;
    case 'admins':
      title = 'Quản trị viên';
      break;
    case 'users':
      title = 'Tài khoản khách hàng';
      break;
    case 'category':
      title = 'Danh mục dự án';
      break;
    case 'project':
      title = 'Dự án';
      break;
    case 'landSaleCategory':
      title = 'Danh mục nhà bán';
      break;
    case 'landSale':
      title = 'Nhà bán';
      break;
    case 'landLeaseCategory':
      title = 'Danh mục nhà thuê';
      break;
    case 'landLease':
      title = 'Nhà thuê';
      break;
    case 'advise':
      title = 'Tư vấn';
      break;
    case 'order':
      title = 'Đơn hàng';
      break;
    case 'payment':
      title = 'Thanh toán';
      break;
    case 'postCategory':
      title = 'Danh mục tin tức';
      break;
    case 'post':
      title = 'Tin tức';
      break;
    case 'packetType':
      title = 'Danh mục gói thanh toán';
      break;
    case 'packet':
      title = 'Gói thanh toán';
      break;
    case 'jobCategory':
      title = 'Danh mục việc làm';
      break;
    case 'job':
    title = 'Việc làm';
      break;
    case 'jobApply':
    title = 'Thông tin ứng tuyển';
      break;
    case 'slide':
    title = 'Hình ảnh';
      break;
    case 'comment':
    title = 'Kiểm duyệt bình luận';
      break;
    case 'role':
      title = 'Phân quyền';
      break;
    default:
      title = 'Khác';
  }

  function handleExport() {
    if (loading) {
      console.error('Dữ liệu đang được tải, vui lòng thử lại sau!');
      return;
    }
  
    if (error) {
      console.error('Có lỗi xảy ra khi tải dữ liệu:', error);
      return;
    }
  
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "output.xlsx");
  }

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {title}
        {path !== 'comment' && (
          <div>
            <Link to={`/${path}/new`} className="link">
              Thêm mới
            </Link>
            <button  className="linkexel" onClick={() => handleExport()}>Xuất Excel</button>
          </div>
        )}
      </div>
      {path === 'order' && 
        <div style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#4caf50',
          textAlign: 'right',
          padding: '10px',
          borderTop: '1px solid #ddd',
          marginTop: '10px',
        }}>
          TỔNG SỐ TIỀN THU ĐƯỢC : {totalAmount.toLocaleString()} VND
        </div>
      }
      <DataGrid
       className="datagrid"
       rows={list}
       columns={columns.concat(actionColumn)}
       pageSize={9}
       rowsPerPageOptions={[9]}
       checkboxSelection
       getRowId={(row) => row._id}
       getRowCategoryId={(row) => row.categoryId}
      />
     
    </div>
  );
};

export default Datatable;
