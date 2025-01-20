import {
  faBed,
  faCalendarDays,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(SearchContext);

  const handleOption = (key, operation) => {
    setOptions((prev) => ({
      ...prev,
      [key]: Math.max(0, prev[key] + (operation === "i" ? 1 : -1)),
    }));
  };

  const handleSearch = () => {
    if (!destination.trim()) {
      alert("Please enter a destination.");
      return;
    }

    const searchData = { destination, dates, options };
    localStorage.setItem("searchData", JSON.stringify(searchData)); // Save search data to localStorage
    dispatch({ type: "NEW_SEARCH", payload: searchData });
    navigate("/hotels", { state: searchData });
  };

  const toggleDate = () => {
    setOpenDate(!openDate);
    if (openOptions) setOpenOptions(false);
  };

  const toggleOptions = () => {
    setOpenOptions(!openOptions);
    if (openDate) setOpenDate(false);
  };




  return (
    <div className="header">
      <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">Discover Your Perfect Getaway!</h1>
            <p className="headerDesc">
              Explore exclusive deals, unbeatable discounts, and tailor-made experiences for your next adventure.
            </p>
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Enter destination"
                  className="headerSearchInput"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  aria-label="Destination"
                />
              </div>
              <div className="headerSearchItem" style={{ position: "relative" }}>
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={toggleDate}
                  className="headerSearchText"
                  aria-label="Select dates"
                >
                  {`${format(dates[0].startDate, "MM/dd/yyyy")} - ${format(dates[0].endDate, "MM/dd/yyyy")}`}
                </span>
                {openDate && (
                  <div style={{ position: "absolute", top: "100%", left: 0, zIndex: 10 }}>
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => setDates([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={dates}
                      className="datePicker"
                      minDate={new Date()}
                    />
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={toggleOptions}
                  className="headerSearchText"
                  aria-label="Select options"
                >
                  {`${options.adult} Adult · ${options.children} Children · ${options.room} Room`}
                </span>
                {openOptions && (
                  <div className="options">
                    {Object.keys(options).map((key) => (
                      <div className="optionItem" key={key}>
                        <span className="optionText">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </span>
                        <div className="optionCounter">
                          <button
                            disabled={options[key] <= (key === "adult" ? 1 : 0)}
                            className="optionCounterButton"
                            onClick={() => handleOption(key, "d")}
                            aria-label={`Decrease ${key}`}
                          >
                            -
                          </button>
                          <span className="optionCounterNumber">{options[key]}</span>
                          <button
                            className="optionCounterButton"
                            onClick={() => handleOption(key, "i")}
                            aria-label={`Increase ${key}`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch} aria-label="Search">
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
