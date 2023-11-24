import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/user/Homepage.js";
import ViewAccount from "./components/admin/account/ViewAccount";
import MoviePLayer from "./components/user/MoviePlayer.js";
import Purchase from "./components/user/Purchase.js";
import UserProfile from "./components/user/account/UserProfile.js";
import UserCard from "./components/user/account/UserCard.js";
import UserTransaction from "./components/user/account/UserTransaction.js";
import EmailContactForm from "./components/common/EmailContactForm.js";
import EditAccount from "./components/admin/account/EditAccount.js";

function App() {
  return (
    <Router>
      <div id="body">
        {/* Đây là chuyển hướng nhé */}
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/phim-bo" element={<Homepage />} />
          <Route path="/phim-le" element={<Homepage />} />
          <Route path="/dang-nhap" element={<Homepage />} />
          <Route path="/dang-xuat" element={<Homepage />} />
          <Route path="/dich-vu" element={<Purchase />} />
          <Route path="/player/:id" element={<MoviePLayer />} />
          <Route path="/admin/accounts" element={<ViewAccount />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/user-profile/user-card" element={<UserCard/> }/>
          <Route path="/user-profile/user-transaction" element={<UserTransaction/> }/>
          <Route path="/admin/accounts/:id" element={<EditAccount />} />
          <Route path="/email" element={<EmailContactForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
