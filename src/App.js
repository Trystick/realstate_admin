import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Edit from "./pages/edit/Edit";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { adminColumns, adviseColumns, categoryColumns, categoryLandLeaseColumns, categoryLandSaleColumns, commentColumns, jobApplyColumns, jobCategoryColumns, jobColumns, landLeaseColumns, landSaleColumns, orderColumns, packetColumns, packetTypeColumns, paymentColumns, postCategoryColumns, postColumns, projectColumns, roleColumns, slideColumns, userColumns } from "./datatablesource";
import NewCategory from "./pages/newCategory/NewCategory";
import NewProject from "./pages/newProject/NewProject";
import EditCategory from "./pages/editCategory/EditCategory"
import EditProject from "./pages/editProject/EditProject"
import NewAdvise from "./pages/newAdvise/NewAdvise";
import EditAdvise from "./pages/editAdvise/EditAdvise";
import EditPostCategory from "./pages/editPostCategory/EditPostCategory";
import NewPost from "./pages/newPost/NewPost";
import EditPost from "./pages/editPost/EditPost";
import NewJobCategory from "./pages/newJobCategory/NewJobCategory"
import EditJobCategory from "./pages/editJobCategory/EditJobCategory";
import NewJob from "./pages/newJob/NewJob";
import EditJob from "./pages/editJob/EditJob";
import NewJobApply from "./pages/newJobApply/NewJobApply"
import EditJobApply from "./pages/editJobApply/EditJobApply";
import Slide from "./pages/slide/Slide";
import NewAdmin from "./pages/newAdmin/NewAdmin";
import EditAdmin from "./pages/editAdmin/EditAdmin";
import NewLandSaleCategory from "./pages/newLandSaleCategory/NewLandSaleCategory";
import EditLandSaleCategory from "./pages/editLandSaleCategory/EditLandSaleCategory";
import NewLandLeaseCategory from "./pages/newLandLeaseCategory/NewLandLeaseCategory";
import EditLandLeaseCategory from "./pages/editLandLeaseCategory/EditLandLeaseCategory";
import NewPostCategory from "./pages/newPostCategory/NewPostCategory";
import NewLandSale from "./pages/newLandSale/NewLandSale";
import EditLandSale from "./pages/editLandSale/EditLandSale";
import NewLandLease from "./pages/newLandLease/NewLandLease";
import EditLandLease from "./pages/editLandLease/EditLandLease";
import NewOrder from "./pages/newOrder/NewOrder";
import EditOrder from './pages/editOrder/EditOrder'
import NewPayment from "./pages/newPayment/NewPayment";
import EditPayment from "./pages/editPayment/EditPayment";
import NewPacketType from './pages/newPacketType/NewPacketType'
import EditPacketType from "./pages/editPacketType/EditPacketType";
import NewPacket from "./pages/newPacket/NewPacket";
import EditPacket from "./pages/editPacket/EditPacket";
import NewRole from "./pages/newRole/NewRole";
import EditRole from "./pages/editRole/EditRole";
import Assign from "./pages/assign/Assign";
import axios from "axios";
import Profile from "./pages/profife/Profile";


function App() {
  const { darkMode } = useContext(DarkModeContext);
 
  const ProtectedRoute = ({ children, path }) => {
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
      };
    
      fetchRoles();
    }, []);
    
    
  // Lấy Role của người dùng hiện tại từ danh sách Role
  const userRole = roles.find(role => role.name === user.role);
  
  if ( !user || !userRole || !userRole.modules.includes(path)) {
    return null;
  }

  return children;
};

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
              <Route path="home" element={
                  <ProtectedRoute path='home'>
                      <Home/>
                  </ProtectedRoute>} 
              />
              <Route path="admins">
              <Route index element={ <ProtectedRoute path="admins">
                <List columns={adminColumns}/>
              </ProtectedRoute>} />
              <Route
                path="edit/:adminId"
                element={<ProtectedRoute path="admins">
                  <EditAdmin/>
                </ProtectedRoute>}
              />
              <Route
                path="new"
                element={<ProtectedRoute path="admins">
                  <NewAdmin />
                </ProtectedRoute>}
              />
            </Route>
            <Route path="users">
              <Route index element={ <ProtectedRoute path='users'>
                <List columns={userColumns}/>
              </ProtectedRoute>} />
              <Route
                path="edit/:userId"
                element={<ProtectedRoute path="users">
                  <Edit/>
                </ProtectedRoute>}
              />
              <Route
                path="new"
                element={<ProtectedRoute path="users">
                  <New inputs={userInputs} title="Thêm khách hàng" />
                </ProtectedRoute>}
              />
            </Route>
            <Route path="category">
              <Route index element={ <ProtectedRoute path='category'>
                    <List columns={categoryColumns}/>
                  </ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute path="category">
                  <NewCategory/>
                  </ProtectedRoute>}
              />
              <Route
                path="edit/:categoryId"
                element={<ProtectedRoute path="category">
                  <EditCategory/>
                </ProtectedRoute>}
              />
            </Route>
            <Route path="project">
              <Route index element={ <ProtectedRoute path="project">
                    <List columns={projectColumns}/>
                  </ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute path="project">
                  <NewProject/>
                  </ProtectedRoute>}
              />
              <Route
                path="edit/:projectId"
                element={<ProtectedRoute path="project">
                  <EditProject/>
                </ProtectedRoute>}
              />
            </Route>
            <Route path="landSaleCategory">
              <Route index element={ <ProtectedRoute path="landSaleCategory">
                    <List columns={categoryLandSaleColumns}/>
                  </ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute path="landSaleCategory">
                  <NewLandSaleCategory/>
                  </ProtectedRoute>}
              />
              <Route
                path="edit/:landSaleCategoryId"
                element={<ProtectedRoute path="landSaleCategory">
                  <EditLandSaleCategory/>
                </ProtectedRoute>}
              />
            </Route>
            <Route path="landSale">
              <Route index element={ <ProtectedRoute path="landSale">
                    <List columns={landSaleColumns}/>
                  </ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute path="landSale">
                  <NewLandSale/>
                  </ProtectedRoute>}
              />
              <Route
                path="edit/:landSaleId"
                element={<ProtectedRoute path="landSale">
                  <EditLandSale/>
                </ProtectedRoute>}
              />
            </Route>
            <Route path="landLeaseCategory">
              <Route index element={ <ProtectedRoute path="landLeaseCategory">
                    <List columns={categoryLandLeaseColumns}/>
                  </ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute path="landLeaseCategory">
                  <NewLandLeaseCategory/>
                  </ProtectedRoute>}
              />
              <Route
                path="edit/:landLeaseCategoryId"
                element={<ProtectedRoute path="landLeaseCategory">
                  <EditLandLeaseCategory/>
                </ProtectedRoute>}
              />
            </Route>
            <Route path="landLease">
              <Route index element={ <ProtectedRoute path="landLease">
                    <List columns={landLeaseColumns}/>
                  </ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute path="landLease">
                  <NewLandLease/>
                  </ProtectedRoute>}
              />
              <Route
                path="edit/:landLeaseId"
                element={<ProtectedRoute path="landLease">
                  <EditLandLease/>
                </ProtectedRoute>}
              />
            </Route>
            <Route path="advise">
              <Route index element={ <ProtectedRoute path="advise">
                    <List columns={adviseColumns}/>
                  </ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute path="advise">
                  <NewAdvise/>
                  </ProtectedRoute>}
              />
              <Route
                path="edit/:adviseId"
                element={<ProtectedRoute path="advise">
                  <EditAdvise/>
                </ProtectedRoute>}
              />
            </Route>
            <Route path="order">
              <Route index element={ <ProtectedRoute path="order">
                    <List columns={orderColumns}/>
                  </ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute path="order">
                  <NewOrder/>
                  </ProtectedRoute>}
              />
              <Route
                path="edit/:orderId"
                element={<ProtectedRoute path="order">
                  <EditOrder/>
                </ProtectedRoute>}
              />
            </Route>
            <Route path="payment">
              <Route index element={ <ProtectedRoute path="payment">
                    <List columns={paymentColumns}/>
                  </ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute path="payment">
                  <NewPayment/>
                  </ProtectedRoute>}
              />
              <Route
                path="edit/:paymentId"
                element={<ProtectedRoute path="payment">
                  <EditPayment/>
                </ProtectedRoute>}
              />
            </Route>
            <Route path="postCategory">
              <Route index element={ <ProtectedRoute path="postCategory">
                    <List columns={postCategoryColumns}/>
                  </ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute path="postCategory">
                  <NewPostCategory/>
                  </ProtectedRoute>}
              />
              <Route
                path="edit/:postCategoryId"
                element={<ProtectedRoute path="postCategory">
                  <EditPostCategory/>
                </ProtectedRoute>}
              />
            </Route>
            <Route path="post">
              <Route index element={ <ProtectedRoute path="post">
                    <List columns={postColumns}/>
                  </ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute  path="post">
                  <NewPost/>
                  </ProtectedRoute>}
              />
              <Route
                path="edit/:postId"
                element={<ProtectedRoute  path="post">
                  <EditPost/>
                </ProtectedRoute>}
              />
            </Route>
            <Route path="packetType">
              <Route index element={ <ProtectedRoute path="packetType">
                    <List columns={packetTypeColumns}/>
                  </ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute path="packetType">
                  <NewPacketType/>
                  </ProtectedRoute>}
              />
              <Route
                path="edit/:packetTypeId"
                element={<ProtectedRoute path="packetType">
                  <EditPacketType/>
                </ProtectedRoute>}
              />
              </Route>
              <Route path="packet">
              <Route index element={ <ProtectedRoute path="packet">
                    <List columns={packetColumns}/>
                  </ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute path="packet">
                  <NewPacket/>
                  </ProtectedRoute>}
              />
              <Route
                path="edit/:packetId"
                element={<ProtectedRoute path="packet">
                  <EditPacket/>
                </ProtectedRoute>}
              />
            </Route>
            <Route path="jobCategory" >
              <Route index element={ <ProtectedRoute path="jobCategory">
                    <List columns={jobCategoryColumns}/>
                  </ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute path="jobCategory">
                  <NewJobCategory/>
                  </ProtectedRoute>}
              />
              <Route
                path="edit/:jobCategoryId"
                element={<ProtectedRoute path="jobCategory">
                  <EditJobCategory/>
                </ProtectedRoute>}
              />
            </Route>
            <Route path="job">
              <Route index element={ <ProtectedRoute path="job">
                    <List columns={jobColumns}/>
                  </ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute path="job">
                  <NewJob/>
                  </ProtectedRoute>}
              />
              <Route
                path="edit/:jobId"
                element={<ProtectedRoute  path="job">
                  <EditJob/>
                </ProtectedRoute>}
              />
            </Route>
            <Route path="jobApply">
              <Route index element={ <ProtectedRoute path="jobApply">
                    <List columns={jobApplyColumns}/>
                  </ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute path="jobApply">
                  <NewJobApply/>
                  </ProtectedRoute>}
              />
              <Route
                path="edit/:jobApplyId"
                element={<ProtectedRoute path="jobApply">
                  <EditJobApply/>
                </ProtectedRoute>}
              />
            </Route>
            <Route path="slide">
              <Route index element={ <ProtectedRoute path="slide">
                    <List columns={slideColumns}/>
                  </ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute path="slide">
                  <Slide/>
                  </ProtectedRoute>}
              />
          </Route>
          <Route path="comment">
              <Route index element={ <ProtectedRoute path="comment">
                    <List columns={commentColumns}/>
                  </ProtectedRoute>} />
          </Route>
          <Route path="role">
              <Route index element={ <ProtectedRoute path="role">
                    <List columns={roleColumns}/>
                  </ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute path="role">
                  <NewRole/>
                  </ProtectedRoute>}
              />
              <Route
                path="edit/:roleId"
                element={<ProtectedRoute path="role">
                  <EditRole/>
                </ProtectedRoute>}
              />
              <Route
                path="assign/:assignId"
                element={<ProtectedRoute  path="role">
                  <Assign/>
                </ProtectedRoute>}
              />
          </Route>
          <Route path="profile">
              <Route index element={ <ProtectedRoute path="home">
                <Profile/>
              </ProtectedRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;



