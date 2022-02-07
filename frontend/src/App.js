
import './App.css';
import UserSignup from './User/signUp/UserSignup';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserLogin from './User/Login/UserLogin';
import Home from './User/Home/Home';
import ShopSignup from './Shop/ShopSignup/ShopSignup';
import DlvryBoySignup from './DeliveryBoy/DlvryBoySignup/DlvryBoySignup';
import EmailOTPVerify from './User/Email_verify/Email_OTP_verify';
import ShopEmailVerify from './Shop/Email_verify/Shop_Email_Verify';
import DlvryBoyEmailVerify from './DeliveryBoy/EmailVerify/DlvryBoyEmailVerify';
import SetMobile from './User/SetMobile/SetMobile';
import AdminLogin from './Admin/AdminLogin/AdminLogin';
import AdminHome from './Admin/AdminHome/AdminHome';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* user */}
          <Route path='/' exact element={<Home/>} />
          <Route path='/signup' element={<UserSignup />} />
          <Route path='/login' element={<UserLogin/>} />
          <Route path="/email_otp" element={<EmailOTPVerify />} />
          <Route path="/setMobileNumber" element={<SetMobile />} />


          {/* shop */}
          <Route path='/shopSignup' element={<ShopSignup />} />
          <Route path="shopEmailVerify" element={<ShopEmailVerify />} />

          {/* DeliveryBoy */}
          <Route path='/dlvryboySignup' element={<DlvryBoySignup />} />
          <Route path='/dlvryboyEmailverify' element={<DlvryBoyEmailVerify />} />
          

          {/* admin */}
          <Route path='/adminLogin' element={<AdminLogin />} />
          <Route path='/adminHome' element={<AdminHome />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
