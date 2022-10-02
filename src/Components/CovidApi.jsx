import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Theme.css";

export function CovidApi() {
  const [data, setData] = useState([]);
  let [search, setSearch] = useState("");
  let [filtered, setfilteredData] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        "https://data.covid19india.org/data.json"
      );
      setData(response.data.statewise);
      // setfilteredData([data, ...response.data.statewise]);
    }
    getData();
  }, []);

  let handleSearch = ()=>{
    let searched = data.filter((ser) => {
      console.log(search,ser.state)
      if (ser.state) {
        return ser.state.includes(search);
      }
    });
    setfilteredData(searched);
  }

 
  return (
    <>
     
      <div className="container">
        <h1>Statewise Covid data of India</h1>

        <div>
          <button
            className="active theme_button"
            onClick={(e) => {
              document.body.classList.toggle("active");
              document
                .querySelector(".theme_button")
                .classList.toggle("active");
                document.querySelector(".card")
                .classList.toggle("theme_change");

            }}
          >
            Change Theme
          </button>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th>State</th>
                <th>Active</th>
                <th>Confirmed</th>
                <th>Recovered</th>
                <th>Deaths</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                return (
                  <>
                    <tr>
                      <td className="td">{item.state}</td>
                      <td className="td">{item.active}</td>
                      <td className="td">{item.confirmed}</td>
                      <td className="td">{item.recovered}</td>
                      <td className="td">{item.deaths}</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card">
        <h2>Search the State to Get Live Data</h2>
        
        <p className="blur">The search field is case sensitive. Any name of state must be started in Upper Case</p>
        <input
        className="input_field"
        placeholder="Enter the name of State"
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
         
        />
         <button className="Search_button" onClick={(e)=>{
          handleSearch()
         }}>Search Button</button>
        {filtered.map((filter) => (
            <p className="para1">In {filter.state} Total Active Cases  are  => {filter.active} People</p>
        ))}
      </div>
    </>
  );
}
