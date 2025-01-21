import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../Hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state?.destination || "");
  const [dates, setDates] = useState(location.state?.dates || [
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state?.options || { adult: 1, children: 0, room: 1 });
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const { dispatch } = useContext(SearchContext);

  const { data, loading, error, reFetch } = useFetch(
    `/hotels?city=${destination}&min=${min || 0}&max=${max || 10000000}`
  );
  

  const handleSearch = () => {
    reFetch();
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input
                onChange={(e) => setDestination(e.target.value)}
                placeholder={destination || "Enter destination"}
                type="text"
              />
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="lsOptionInput"
                  />
                </div>
              </div>
            </div>
            <button onClick={handleSearch} disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
          <div className="listResult">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : !Array.isArray(data) ? (
              <p>No results found</p>
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
