import useFetch from "../../Hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {

  const {data,loading,error} = useFetch("/hotels?featured=true&limit=4");

  
  return (
    <div className="fp">
      {loading ? ("Loading...") : error ? ("Error loading properties") : (<>
      {Array.isArray(data) && data.map(item => (
        <div className="fpItem" key={item._id}>
          <img
            src={item.photos?.[0] || "https://via.placeholder.com/300x200?text=No+Image"}
            alt={item.name || "Property"}
            className="fpImg"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/300x200?text=Error+Loading+Image";
            }}
          />
          <span className="fpName">{item.name || "Unnamed Property"}</span>
          <span className="fpCity">{item.city || "Location Unknown"}</span>
          <span className="fpPrice">Starting from ${item.cheapestPrice || 0}</span>
          {item.rating && <div className="fpRating">
            <button>{item.rating}</button>
            <span>Excellent</span>
          </div>}
        </div>
      ))}
      </>)}
    </div>
  );
};

export default FeaturedProperties;
