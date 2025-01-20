import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Reserve.css"
import { faCircle, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../Hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = (setOpen, hotelId) => {
    const navigate = useNavigate()
    const [seletedRooms, setSeletedRooms] = useState([])
    const { data, loading, error } = useFetch(`room/${setOpen.hotelId}`)
    const { dates } = useContext(SearchContext)

    const getDatesInRange = (startDate, endDate) => {
        const start = dates[0].startDate
        const end = dates[0].endDate
        const date = new Date(start.getTime());
        let list = []
        console.log("in the function");


        while (date <= end) {
            list.push(new Date(date).getTime())
            date.setDate(date.getDate() + 1)
        }

        return list
    }
    const allDates = getDatesInRange()

    const isAvaliabel = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some(date => allDates.includes(new Date(date).getTime()))

        return !isFound
    }
    const handleSelect = (e) => {
        const checked = e.target.checked
        const value = e.target.value
        setSeletedRooms(checked ? [...seletedRooms, value] : seletedRooms.filter(item => item !== value))
    }

    const handleClick = async () => {
        try {
            await Promise.all(seletedRooms.map((roomId) => {
                const res = axios.put(`/rooms/avalibility/${roomId}`, { dates: allDates })
                return res.data
            }))
        } catch (err) {}
        setOpen.setOpen(false)
        navigate("/")
        
    }

    return (
        <div className="reserve">
            <div className="rContainer">
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="rClose"
                    onClick={() => { setOpen.setOpen(false) }}
                />
                <span> Select your Room : </span>
                {data.map((item => (
                    <div className="rItem">
                        <div className="rItemInfo">
                            <div className="rTitle">{item.title}</div>
                            <div className="rDesc">{item.desc}</div>
                            <div className="rMax">
                                Max People : <b>{item.maxPeople}</b>
                            </div>
                            <div className="rPrice">{item.prise}</div>
                        </div>
                        <div className="rSelectRooms">

                            {item.roomNumbers.map((roomNumber) => (
                                <div className="room">
                                    <label>{roomNumber.number}</label>

                                    <input type="checkbox" value={roomNumber._id} onChange={handleSelect} disabled={!isAvaliabel(roomNumber)} />
                                </div>
                            ))}
                        </div>
                    </div>
                )))}
                <button onClick={handleClick} className="rButton">Reserve Now!</button>
            </div>
        </div>
    )
}

export default Reserve;