import { Icon, Spinner } from "@blueprintjs/core";
import { useNavigate } from "@reach/router";
import React, { useEffect, useState } from "react";
import { SERVER_ADDRESS } from "../constants/general";
import { getUser } from "../utils/actions";

export function SlowPage() {
  const [data, setData] = useState([]);
  const [displayedData, setdisplayedData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    let records = await fetch(SERVER_ADDRESS + "/sales", {
      method: "GET",
    });
    setData(await records.json());
    setLoading(false);
  };

  const displayData = () => {
    // console.log("display data");
    // console.log(data);
    for (let i = 0; i < data.length; i++) {
      let newData = displayedData;
      newData.push(data[i]);
      console.log("displayed data",newData)
      setdisplayedData(newData);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    getUser() ? null : navigate("/login");
    fetchData();
  }, []);

  useEffect(() => {
    displayData();
  }, [data]);
  return (
    <div>
      {loading ? (
        <div className="flex flex-col items-center pt-64">
          <Spinner />
        </div>
      ) : (
        <table className="w-full flex-grow">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th>Id</th>
              <th>Region</th>
              <th>Country</th>
              <th>Item type</th>
              <th>Sales channel</th>
              <th>Order priority</th>
              <th>Order id</th>
              <th>Ship date</th>
              <th>Units sold</th>
              <th>Unit price</th>
              <th>Unit cost</th>
              <th>Total revenue</th>
              <th>Total cost</th>
              <th>Total profit</th>
              <th>Order date</th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((i) => (
              <tr className="hover:bg-gray-100 cursor-pointer border-b-2 border-gray-300 text-center">
                <td>{i.id}</td>
                <td>{i.region}</td>
                <td>{i.country}</td>
                <td>{i.itemType}</td>
                <td>{i.salesChannel}</td>
                <td>{i.orderPriority}</td>
                <td>{i.orderId}</td>
                <td>{i.shipDate}</td>
                <td>{i.unitsSold}</td>
                <td>{i.unitPrice}</td>
                <td>{i.unitCost}</td>
                <td>{i.totalRevenue}</td>
                <td>{i.totalCost}</td>
                <td>{i.totalProfit}</td>
                <td>{i.orderDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default SlowPage;
