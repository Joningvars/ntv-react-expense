"use client";

import Item from "@/components/Item";
import { useState } from "react";
import { v4 } from "uuid";

export default function Home() {
  const [items, setItems] = useState<
    { name: string; cost: number; id: string }[]
  >([]);
  const [item, setItem] = useState({ name: "", cost: 0 });
  const [sum, setSum] = useState(0);

  const handleOnChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handleOnChangeCost = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cost = parseFloat(e.target.value);
    setItem((prev) => ({
      ...prev,
      cost: cost,
    }));
  };

  const handleAddItem = () => {
    const id = v4();
    setItems((prev) => [...prev, { ...item, id }]);
    setSum((prev) => prev + item.cost);
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-[#19161d]">
      <div className="bg-[#473366] bg-opacity-30 h-[1100px] p-10 rounded-3xl shadow-md flex gap-20">
        <div className="flex flex-col items-start gap-6 h-full justify-between">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl font-extrabold">Expense Tracker</h1>
            <h2 className="text-4xl mt-10">Add Expense</h2>
            <div className="flex gap-6 w-80 justify-between items-center">
              <label htmlFor="name" className="font-bold">
                Name:
              </label>
              <input
                type="text"
                id="name"
                className="p-2 rounded text-xl"
                onChange={handleOnChangeName}
              />
            </div>
            <div className="flex gap-6 w-80 justify-between items-center">
              <label htmlFor="cost" className="font-bold">
                Cost:
              </label>
              <input
                type="number"
                id="cost"
                className="p-2 rounded text-xl"
                onChange={handleOnChangeCost}
              />
            </div>
            <button
              onClick={handleAddItem}
              className="p-3 bg-[#473366] text-white rounded w-28 font-bold transition hover:bg-opacity-90"
            >
              Add
            </button>
          </div>
          <div className=" bg-[#473366] bg-opacity-30 w-full rounded-xl flex flex-col p-4">
            <h2 className="text-4xl">Stats</h2>
            <p className="text-xl">Sum: {sum} kr.</p>
            <p>Count: {items.length}</p>
          </div>
        </div>
        <div className="w-96  px-2 py-2 rounded-xl h-full bg-[#473366] bg-opacity-50">
          <h3 className="text-3xl p-2">Added Items:</h3>
          <hr className="border-black mt-4 pt-2 border-opacity-30" />
          <div className=" flex flex-col gap-2">
            {items.map((item) => (
              <Item
                key={item.id}
                item={item}
                setSum={setSum}
                setItems={setItems}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
