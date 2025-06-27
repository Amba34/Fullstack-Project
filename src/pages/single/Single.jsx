import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import { useLocation } from "react-router-dom";

// For Create React App
const apiUrl = process.env.REACT_APP_API_URL;

const Single = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data ,loading , error } = useFetch(`${apiUrl}/users/${id}`); 
  const user = data
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading user data.</p>;
  console.log(data)

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">User Information</h1>
            <div className="item">
              <img
                src={user?.profileImg || "https://i2.wp.com/vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png?fit=512%2C512&ssl=1"}
                alt="Profile"
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{user?.username || "Unknown User"}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{user?.email || "N/A"}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{user?.phone || "N/A"}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">{user?.country || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
