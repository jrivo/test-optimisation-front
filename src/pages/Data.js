import { Button, MenuItem, Spinner } from "@blueprintjs/core";
import { Select } from "@blueprintjs/select";
import React, { useEffect, useState } from "react";
import { useStaticInfo } from "react-static";
import { SERVER_ADDRESS } from "../constants/general";

export function Data() {
  const [dataAmount, setDataAmount] = useState({ id: "light", text: "Light" });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    console.log(dataAmount.id);
    let endpoint = "";
    switch (dataAmount.id) {
      case "light":
        endpoint = "/sales-light";
        break;
      case "normal":
        endpoint = "/sales";
        break;
      case "large":
        endpoint = "/heavy-operation";
        break;
    }
    let records = await fetch(SERVER_ADDRESS + endpoint, {
      method: "GET",
    });
    setData(await records.json());
    setLoading(false);
  };

  const amountRenderer = (item, { modifiers, handleClick }) => {
    return (
      <MenuItem
        active={modifiers.active}
        key={item.id}
        onClick={handleClick}
        text={item.text}
      />
    );
  };

  useEffect(() => {
    fetchData();
  }, [dataAmount]);

  useEffect(()=>{
    if(document.getElementsByTagName("nav")[0].style.display == "none")
    {
      document.getElementsByTagName("nav")[0].style.display = "block"
    }
  })
  return (
    <div>
      <div className="h-screen">
        <div className="pb-4">
          <Select
            items={[
              { id: "light", text: "Light" },
              { id: "normal", text: "Normal" },
              { id: "large", text: "Large" },
            ]}
            itemRenderer={amountRenderer}
            filterable={false}
            onItemSelect={(item) => setDataAmount(item)}
          >
            <Button intent="primary" text={dataAmount.text}></Button>
          </Select>
        </div>
        {loading ? (
          <Spinner />
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
              {data.map((i) => (
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
    </div>
  );
}

export default Data;
