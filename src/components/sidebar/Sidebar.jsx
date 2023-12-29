import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import RecentActorsSharpIcon from '@mui/icons-material/RecentActorsSharp';
import DynamicFeedSharpIcon from '@mui/icons-material/DynamicFeedSharp';
import PostAddSharpIcon from '@mui/icons-material/PostAddSharp';
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BusinessIcon from '@mui/icons-material/Business';
import CategoryIcon from '@mui/icons-material/Category';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import VillaIcon from '@mui/icons-material/Villa';
import HomeIcon from '@mui/icons-material/Home';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import HolidayVillageIcon from '@mui/icons-material/HolidayVillage';
import GiteIcon from '@mui/icons-material/Gite';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import WorkIcon from '@mui/icons-material/Work';
import ClassIcon from '@mui/icons-material/Class';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import TaskIcon from '@mui/icons-material/Task';
import TuneIcon from '@mui/icons-material/Tune';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import InventoryIcon from '@mui/icons-material/Inventory';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import WidgetsIcon from '@mui/icons-material/Widgets';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import logoGoldenland from '../sidebar/LOGO.png'

const Sidebar = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { dispatch } = useContext(DarkModeContext);
  const { user } = useContext(AuthContext);

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('/role');
        setRoles(response.data);
      } catch (error) {
        console.error('Error fetching roles', error);
      }
      setLoading(false);
    };
    
    fetchRoles();
  }, []);
  
  const userRole = roles.find(role => role && role.name === user.role);
  
  
  const checkAccess = (path) => {
    if (loading || !userRole || !Array.isArray(userRole.modules)) {
      return false;
    }
    return userRole.modules.includes(path);
  };

const handleLogout = () => {
  if (window.confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    dispatch({ type: "LOGOUT" });
    alert('Bạn đã đăng xuất');
    navigate('/')
  }
};

const [activeIndex, setActiveIndex] = useState(null);

const handleClick = (index) => {
  if (activeIndex === index) {
    setActiveIndex(null);
  } else {
    setActiveIndex(index);
  }
};

const [activeIndexProject, setActiveIndexProject] = useState(null);

const handleClickProject = (index) => {
  if (activeIndexProject === index) {
    setActiveIndexProject(null);
  } else {
    setActiveIndexProject(index);
  }
};

const [activeIndexLandSale, setActiveIndexLandSale] = useState(null);

const handleClickLandSale = (index) => {
  if (activeIndexLandSale === index) {
    setActiveIndexLandSale(null);
  } else {
    setActiveIndexLandSale(index);
  }
};

const [activeIndexLandLease, setActiveIndexLandLease] = useState(null);

const handleClickLandLease = (index) => {
  if (activeIndexLandLease === index) {
    setActiveIndexLandLease(null);
  } else {
    setActiveIndexLandLease(index);
  }
};

const [activeIndexPost, setActiveIndexPost] = useState(null);

const handleClickPost = (index) => {
  if (activeIndexPost === index) {
    setActiveIndexPost(null);
  } else {
    setActiveIndexPost(index);
  }
};

const [activeIndexJob, setActiveIndexJob] = useState(null);

const handleClickJob = (index) => {
  if (activeIndexJob === index) {
    setActiveIndexJob(null);
  } else {
    setActiveIndexJob(index);
  }
};

const [activeIndexPackage, setActiveIndexPackage] = useState(null);

const handleClickPackage = (index) => {
  if (activeIndexPackage === index) {
    setActiveIndexPackage(null);
  } else {
    setActiveIndexPackage(index);
  }
};

const handleClickChildAdmin = (e) => {
  e.stopPropagation();
  e.preventDefault();
  // Xử lý sự kiện khi mục con được nhấn
  navigate('/admins')
};

const handleClickChildUsers = (e) => {
  e.stopPropagation();
  e.preventDefault();
  // Xử lý sự kiện khi mục con được nhấn
  navigate('/users')
};

const handleClickChildCategory = (e) => {
  e.stopPropagation();
  e.preventDefault();
  // Xử lý sự kiện khi mục con được nhấn
  navigate('/category')
};

const handleClickChildProject = (e) => {
  e.stopPropagation();
  e.preventDefault();
  // Xử lý sự kiện khi mục con được nhấn
  navigate('/project')
};

const handleClickChildlandSaleCategory = (e) => {
  e.stopPropagation();
  e.preventDefault();
  // Xử lý sự kiện khi mục con được nhấn
  navigate('/landSaleCategory')
};

const handleClickChildlandSale = (e) => {
  e.stopPropagation();
  e.preventDefault();
  // Xử lý sự kiện khi mục con được nhấn
  navigate('/landSale')
};


const handleClickChildlandLeaseCategory = (e) => {
  e.stopPropagation();
  e.preventDefault();
  // Xử lý sự kiện khi mục con được nhấn
  navigate('/landLeaseCategory')
};

const handleClickChildlandLease = (e) => {
  e.stopPropagation();
  e.preventDefault();
  // Xử lý sự kiện khi mục con được nhấn
  navigate('/landLease')
};

const handleClickChildpostCategory = (e) => {
  e.stopPropagation();
  e.preventDefault();
  // Xử lý sự kiện khi mục con được nhấn
  navigate('/postCategory')
};


const handleClickChildpost = (e) => {
  e.stopPropagation();
  e.preventDefault();
  // Xử lý sự kiện khi mục con được nhấn
  navigate('/post')
};


const handleClickChildjobCategory = (e) => {
  e.stopPropagation();
  e.preventDefault();
  // Xử lý sự kiện khi mục con được nhấn
  navigate('/jobCategory')
};


const handleClickChildjob = (e) => {
  e.stopPropagation();
  e.preventDefault();
  // Xử lý sự kiện khi mục con được nhấn
  navigate('/job')
};

const handleClickChildjobApply = (e) => {
  e.stopPropagation();
  e.preventDefault();
  // Xử lý sự kiện khi mục con được nhấn
  navigate('/jobApply')
};


const handleClickChildpacketType = (e) => {
  e.stopPropagation();
  e.preventDefault();
  // Xử lý sự kiện khi mục con được nhấn
  navigate('/packetType')
};


const handleClickChildpacket = (e) => {
  e.stopPropagation();
  e.preventDefault();
  // Xử lý sự kiện khi mục con được nhấn
  navigate('/packet')
};

const handleClickChildadvise = (e) => {
  e.stopPropagation();
  e.preventDefault();
  // Xử lý sự kiện khi mục con được nhấn
  navigate('/advise')
};

const handleClickChildorder = (e) => {
  e.stopPropagation();
  e.preventDefault();
  // Xử lý sự kiện khi mục con được nhấn
  navigate('/order')
};

const handleClickChildpayment = (e) => {
  e.stopPropagation();
  e.preventDefault();
  // Xử lý sự kiện khi mục con được nhấn
  navigate('/payment')
};

const handleClickChildslide = (e) => {
  e.stopPropagation();
  e.preventDefault();
  // Xử lý sự kiện khi mục con được nhấn
  navigate('/slide')
};

const handleClickChildcomment = (e) => {
  e.stopPropagation();
  e.preventDefault();
  // Xử lý sự kiện khi mục con được nhấn
  navigate('/comment')
};

const handleClickChildrole = (e) => {
  e.stopPropagation();
  e.preventDefault();
  // Xử lý sự kiện khi mục con được nhấn
  navigate('/role')
};

  return (
    <div className="sidebar">
      <div className="top">
      {checkAccess('home') && (
        <Link to="/home" style={{ textDecoration: "none" }}>
          <span className="logo">
            <img src={logoGoldenland} alt="" className="imglogogoldenland" />
          </span>
        </Link>
      )}
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Chức năng chính</p>
          {checkAccess('home') && (
          <Link to="/home" style={{ textDecoration: "none" }}>
          <li>
            <DashboardIcon className="icon" />
            <span className="titleCategory">Thống Kê</span>
          </li>
          </Link>
           )}
          <p className="title">Danh sách chức năng</p>
          {(checkAccess('admins') && checkAccess('users')) && (
         <div>
            <li onClick={() => handleClick(0)}>
              <AccountCircleIcon className="icon" />
              <span className="titleCategory">Tài Khoản</span>
              <ul style={{ display: activeIndex === 0 ? 'block' : 'none' }}>
              {checkAccess('admins') && (
                <Link style={{ textDecoration: "none" }}>
                  <li onClick={handleClickChildAdmin}>
                    <AdminPanelSettingsIcon className="icon" />
                    <span>Quản trị viên</span>
                  </li>
                </Link>
                 )}
                 {checkAccess('users') && (
                  <Link style={{ textDecoration: "none" }}>
                    <li onClick={handleClickChildUsers}>
                      <PersonOutlineIcon className="icon" />
                      <span>Khách hàng</span>
                    </li>
                  </Link>
                 )}
              </ul>
            </li>
          </div>
           )}
            {(checkAccess('category') && checkAccess('project')) && (
          <div>
            <li onClick={() => handleClickProject(0)}>
              <BusinessIcon className="icon" />
              <span className="titleCategory">Dự án</span>
              <ul style={{ display: activeIndexProject === 0 ? 'block' : 'none' }}>
              {checkAccess('category') && (
                <Link style={{ textDecoration: "none" }}>
                  <li onClick={handleClickChildCategory}>
                    <CategoryIcon className="icon" />
                    <span>Danh mục dự án</span>
                  </li>
                </Link>
                )}
                {checkAccess('project') && (
                <Link style={{ textDecoration: "none" }}>
                  <li onClick={handleClickChildProject}>
                    <StoreIcon className="icon" />
                    <span>Các dự án</span>
                  </li>
                </Link>
                )}
                </ul>
            </li>
          </div>
            )}
           {(checkAccess('landSaleCategory') && checkAccess('landSale')) && (
          <div>
            <li onClick={() => handleClickLandSale(0)}>
              <HomeWorkIcon className="icon" />
              <span className="titleCategory">Nhà bán</span>
              <ul style={{ display: activeIndexLandSale === 0 ? 'block' : 'none' }}>
              {checkAccess('landSaleCategory') && (
                <Link  style={{ textDecoration: "none" }}>
                  <li onClick={handleClickChildlandSaleCategory}>
                    <VillaIcon className="icon" />
                    <span>Danh mục nhà bán</span>
                  </li>
                </Link>
              )}
                {checkAccess('landSale') && (
                <Link style={{ textDecoration: "none" }}>
                  <li onClick={handleClickChildlandSale}>
                    <HomeIcon className="icon" />
                    <span>Các nhà bán</span>
                  </li>
                </Link>
                )}
                </ul>
            </li>
          </div>
           )}
           {(checkAccess('landLeaseCategory') && checkAccess('landLease')) && (
          <div>
            <li onClick={() => handleClickLandLease(0)}>
              <HolidayVillageIcon className="icon" />
              <span className="titleCategory">Nhà thuê</span>
              <ul style={{ display: activeIndexLandLease === 0 ? 'block' : 'none' }}>
              {checkAccess('landLeaseCategory') && (
                <Link style={{ textDecoration: "none" }}>
                  <li onClick={handleClickChildlandLeaseCategory}>
                    <AddHomeWorkIcon className="icon" />
                    <span>Danh mục nhà thuê</span>
                  </li>
                </Link>
              )}
              {checkAccess('landLease') && (
                <Link style={{ textDecoration: "none" }}>
                  <li onClick={handleClickChildlandLease}>
                    <GiteIcon className="icon" />
                    <span>Các nhà thuê</span>
                  </li>
                </Link>
              )}
              </ul>
            </li>
          </div>
           )}
            {(checkAccess('postCategory') && checkAccess('post')) && (
          <div>
            <li onClick={() => handleClickPost(0)}>
              <MarkunreadMailboxIcon className="icon" />
              <span className="titleCategory">Tin tức</span>
              <ul style={{ display: activeIndexPost === 0 ? 'block' : 'none' }}>
              {checkAccess('postCategory') && (
                <Link style={{ textDecoration: "none" }}>
                  <li onClick={handleClickChildpostCategory}>
                    <DynamicFeedSharpIcon className="icon" />
                    <span>Danh mục tin tức</span>
                  </li>
                </Link>
              )}
              {checkAccess('post') && (
                <Link style={{ textDecoration: "none" }}>
                  <li onClick={handleClickChildpost}>
                    <PostAddSharpIcon className="icon" />
                    <span>Các tin tức</span>
                  </li>
                </Link>
                )}
                </ul>
            </li>
          </div>
            )}
            {(checkAccess('jobCategory') && checkAccess('job') && checkAccess('jobApply')) && (
          <div>
            <li onClick={() => handleClickJob(0)}>
              <WorkIcon className="icon" />
              <span className="titleCategory">Công việc</span>
              <ul style={{ display: activeIndexJob === 0 ? 'block' : 'none' }}>
              {checkAccess('jobCategory') && (
                <Link style={{ textDecoration: "none" }}>
                  <li onClick={handleClickChildjobCategory}>
                    <ClassIcon className="icon" />
                    <span>Danh mục công việc</span>
                  </li>
                </Link>
              )}
              {checkAccess('job') && (
                <Link style={{ textDecoration: "none" }}>
                  <li onClick={handleClickChildjob}>
                    <TaskIcon className="icon" />
                    <span>Các công việc</span>
                  </li>
                </Link>
              )}
              {checkAccess('jobApply') && (
                <Link style={{ textDecoration: "none" }}>
                  <li onClick={handleClickChildjobApply}>
                    <AssignmentIndIcon className="icon" />
                    <span>Người ứng tuyển</span>
                  </li>
                </Link>
              )}
                </ul>
            </li>
          </div>
           )}
             {(checkAccess('packetType') && checkAccess('packet')) && (
          <div>
            <li onClick={() => handleClickPackage(0)}>
              <InventoryIcon className="icon" />
              <span className="titleCategory">Gói thanh toán</span>
              <ul style={{ display: activeIndexPackage === 0 ? 'block' : 'none' }}>
              {checkAccess('packetType') && (
                <Link style={{ textDecoration: "none" }}>
                  <li onClick={handleClickChildpacketType}>
                    <AllInboxIcon className="icon" />
                    <span>Danh mục gói</span>
                  </li>
                </Link>
              )}
              {checkAccess('packet') && (
                <Link style={{ textDecoration: "none" }}>
                  <li onClick={handleClickChildpacket}>
                    <WidgetsIcon className="icon" />
                    <span>Các gói thanh toán</span>
                  </li>
                </Link>
              )}
                </ul>
            </li>
          </div>
           )}
          {checkAccess('advise') && (
          <Link style={{ textDecoration: "none" }}>
            <li onClick={handleClickChildadvise}>
              <RecentActorsSharpIcon className="icon" />
              <span className="titleCategory">Tư vấn</span>
            </li>
          </Link>
          )}
           {checkAccess('order') && (
          <Link style={{ textDecoration: "none" }}>
            <li  onClick={handleClickChildorder}>
              <AnalyticsIcon className="icon" />
              <span className="titleCategory">Đơn hàng</span>
            </li>
          </Link>
           )}
           {checkAccess('payment') && (
          <Link style={{ textDecoration: "none" }}>
            <li  onClick={handleClickChildpayment}>
              <CreditCardIcon className="icon" />
              <span className="titleCategory">Thanh toán</span>
            </li>
          </Link>
           )}
           {checkAccess('slide') && (
          <Link style={{ textDecoration: "none" }}>
            <li onClick={handleClickChildslide}>
              <TuneIcon className="icon" />
              <span className="titleCategory">Hình ảnh</span>
            </li>
          </Link>
           )}
           {checkAccess('comment') && (
          <Link style={{ textDecoration: "none" }}>
            <li onClick={handleClickChildcomment}>
              <MarkUnreadChatAltIcon className="icon" />
              <span className="titleCategory">Kiểm duyệt bình luận</span>
            </li>
          </Link>
           )}
           {checkAccess('role') && (
          <Link style={{ textDecoration: "none" }}>
            <li onClick={handleClickChildrole}>
              <DeveloperBoardIcon className="icon" />
              <span className="titleCategory">Phân quyền quản trị</span>
            </li>
          </Link>
           )}
          <p className="title">Tài khoản</p>
          <li>
            <ExitToAppIcon className="icon" />
            <span onClick={handleLogout} className="titleCategory">Đăng xuất</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
