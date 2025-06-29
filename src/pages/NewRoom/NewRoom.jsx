import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../Hooks/useFetch";
import axios from "axios"

// For Create React App
const apiUrl = process.env.REACT_APP_API_URL;



const NewRoom = () => {


  const [info, setInfo] = useState({});
  const [hotelID, setHotelId] = useState(null);
  const [rooms, setRooms] = useState([]);

  const { data, loading, error } = useFetch(`${apiUrl}/hotels`);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async e => {
    e.preventDefault()
    const roomNumbers = rooms.split(",").map(room=>({number:room}))
    try {
      await axios.post(`/rooms/${hotelID}`,{...info,roomNumbers})
      
    } catch (err) {
      console.log(err);
      
    }


  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={ input.id} type={input.type} onChange={handleChange} placeholder={input.placeholder} />
                </div>
              ))}
              <div className="formInput" >
                  <label>Rooms</label>
                  <textarea onChange={e=>setRooms(e.target.value)} placeholder="give comma between room numbers"/>
              </div>
              <div className="formInput" >
                  <label>Choose a hotel</label>
                  <select id="hotelId" onChange={e=>setHotelId(e.target.value)}>
                    {
                      loading ? "Loading" : data && data.map(hotel=>(
                        <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                      ))
                    }
                  </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
