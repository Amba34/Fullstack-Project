import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleViewUsers = () => {
    navigate("/users"); // Redirect to the Users page
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="welcomeSection">
          <h2 className="greeting">Welcome Ambadas!</h2>
          <p className="welcomeMessage">Manage your dashboard and explore user data efficiently.</p>
          <button className="viewUsersButton" onClick={handleViewUsers}>
            View Users
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
