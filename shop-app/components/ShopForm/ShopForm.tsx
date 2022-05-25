import "./ShopForm.css";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import axios from 'axios';
import shops from "../../../server-api/db.json"

function ShopForm(props: any) {
  const [shopName, setShopName] = useState<any | null>()
  const [shopArea, setShopArea] = useState<any | null>()
  const [shopCategory, setShopCategory] = useState<any | null>()
  const [startDate, setStartDate] = useState<any | null>(new Date());
  const [endDate, setEndDate] = useState<any | null>(new Date());
  const [isPending, setIsPending] = useState<Boolean | null>(false);
  const [posted, setPosted] = useState<Boolean | null>(false)
  const [error, setError] = useState<any | null>(false)
  const [data, setData] = useState<any | null>()


  // console.log(date.toDateString());
  // console.log(Date.parse(startDate));
  // console.log(Date.parse(endDate));


  const onSubmit = (event: any) => {
    event.preventDefault();
    if (Date.parse(startDate) <= Date.parse(endDate) && shopName.trim() !== 0 && shopCategory && shopArea) {
      const api = "http://localhost:3006/shops"
      setIsPending(true);
      axios.post(api, {
        "name": shopName,
        "area": shopArea,
        "category": shopCategory,
        "start-date": startDate,
        "end-date": endDate 
      })
      .then(res => {
        console.log("Submitted Successfully!", res.data);
        setIsPending(false);
        setPosted(true)
      })
    } else {
      setError(true)
    }
  };


  return (
    <>

    <div className="container__background">
    <div className="container">


      {/* Form Start */}
      <form onSubmit={onSubmit}>

      {/* Close Button */}
      <button 
      className="close__button" 
      onClick={() => {props.setOpenForm(false)}}
      > X </button>



        {/* Shop Name Input */}
        <div className="row">
          <h2>Enter Shop Name</h2>
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter Your Shop Name..."
              value={shopName}
              onChange={(event: any) => {
                setShopName(event.target.value);
                console.log(shopName);
              }}
              required
              />
          </div>



          {/* Shop Area Dropdown Selection */}
          <div className="row">
            <h2>Select Shop Area</h2>
              <div className="input-group">
                <select 
                required 
                onChange={(event: any) => {
                  setShopArea(event.target[event.target.selectedIndex].text)
                  console.log(shopArea);
                  ;
                }}
                value={shopArea}>
                  <option></option>
                  <option>Pune</option>
                  <option>Thane</option>
                  <option>Mumbai Suburban</option>
                  <option>Nashik</option>
                  <option>Nagpur</option>
                  <option>Ahmednagar</option>
                  <option>Solapur</option>
                </select>
              </div>
          </div>



          {/* Shop Category Selection */}
          <div className="row">
            <h2>Select Shop Category</h2>
              <div className="input-group">
                <select 
                required 
                onChange={(event: any) => {
                  setShopCategory(event.target[event.target.selectedIndex].text);
                }}
                value={shopCategory}>
                  <option></option>
                  <option>Grocery</option>
                  <option>Butcher</option>
                  <option>Baker</option>
                  <option>Chemist</option>
                  <option>Stationery shop</option>
                </select>
              </div>
          </div>



          {/* Date Selection */}
          <div className="row">
            <div className="col-half">
              <h3>Select Starting Date</h3>
               <input 
               type="date" 
               required
               onChange={(event: any) => {
                setStartDate(event.target.value)
              }}
               value={startDate}
               />
            </div>
            <div className="col-half">
              <h3>Select Closing Date</h3>
              <input 
              type="date" 
              required
              onChange={(event: any) => {
                setEndDate(event.target.value);
              }}
              value={endDate}
              />
            </div>
          </div>
        </div>



        {/* Error Message */}
        {error && 
          <div className="error">
            Oops! Closing date canNot be earlier than the opening date!
          </div>}
        

        {/* Submit Button */}
        <div className="button__container">
          {!isPending && <button className="button">Submit</button>}
          {isPending && <button className="button">Submitting...</button>}
          {posted && props.setOpenForm(false)}
        </div>

      </form>
    </div>


    </div>
    </>
  );
}

export default ShopForm;
