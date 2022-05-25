import { useEffect, useState } from "react";
import shops from "../../../server-api/db.json";
import "./Cards.css";

function Cards() {
  const [cards, setCards] = useState([]);
  const [data, setData] = useState<any | null>(shops);
  const [filter, setFilter] = useState(false);

  // console.log(shops.shops);

  useEffect(() => {
    fetch("http://localhost:3006/shops")
      .then((response) => response.json())
      .then((json) => {
        // console.log(json);
        setCards(json);
      });
  }, []);

  const filterResultByArea = (categoryOfItem: any) => {
    const result = shops.shops.filter((currentData) => {
      return currentData.area === categoryOfItem;
    });
    setData(result);
    console.log(result);
  };

  const filterResultByCategory = (categoryOfItem: any) => {
    const result = shops.shops.filter((currentData) => {
      return currentData.category === categoryOfItem;
    });
    setData(result);
    console.log(result);
  };

  return (
    <>
      <div className="cards__box">
        <div className="cards__container">
          <h2>Filter By Area: </h2>
          <select
            required
            onChange={(event: any) => {
              filterResultByArea(event.target[event.target.selectedIndex].text);
              setFilter(true);
            }}
          >
            <option></option>
            <option>Pune</option>
            <option>Thane</option>
            <option>Mumbai Suburban</option>
            <option>Nashik</option>
            <option>Nagpur</option>
            <option>Ahmednagar</option>
            <option>Solapur</option>
          </select>
          <h2>Filter By Category: </h2>
          <select
            required
            onChange={(event: any) => {
              filterResultByCategory(event.target[event.target.selectedIndex].text);
              setFilter(true);
            }}
          >
            <option></option>
            <option>Grocery</option>
            <option>Butcher</option>
            <option>Baker</option>
            <option>Chemist</option>
            <option>Stationery shop</option>
          </select>

          {!filter &&
            cards.map((card: any, id: any) => {
              return (
                <div className="item-card" key={card.id}>
                  <div className="item-details">
                    <span className="item-number">{card.id}</span>
                    <h2>
                      <a href="">{card.name}</a>
                    </h2>
                    <br />
                    <div className="item-bottom-details">
                      <div className="item-category">{card.category}</div>
                      <div className="item-area">{card.area}</div>
                    </div>
                  </div>
                </div>
              );
            })}

          {filter &&
            data.map((card: any, id: any) => {
              return (
                <>
                  <div className="item-card" key={card.id}>
                    <div className="item-details" key={card.id}>
                      <span className="item-number">{card.id}</span>
                      <h2>
                        <a href="">{card.name}</a>
                      </h2>
                      <br />
                      <div className="item-bottom-details">
                        <div className="item-category">{card.category}</div>
                        <div className="item-area">{card.area}</div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Cards;
