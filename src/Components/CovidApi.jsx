import React, { useState, useEffect } from "react";
import axios from "axios";
import './Theme.css'

export function CovidApi() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        "https://data.covid19india.org/data.json"
      );
      setData(response.data.statewise);
    }
    getData();
  }, []);

  return (
    <>
      <div className="container">
          <h1 >Statewise Covid data of India</h1>

        <div>
          <button className="active theme_button"  onClick={
            (e)=>{
                document.body.classList.toggle("active")
                document.querySelector(".theme_button").classList.toggle("active")
            }
          }>Change Theme</button>
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
              {data.map((item, index) => {
                return (
                  <>
                    <tr>
                      <td className="td">{item.state}</td>
                      <td className="td">{item.active}</td>
                      <td className="td">{item.confirmed}</td>
                      <td className="td">{item.recovered}</td>
                      <td className="td" >{item.deaths}</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
