"use client";

import Item from "@/components/Item";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { fetchExpenses } from '../services/get-all-expenses';
import { addExpense } from "@/services/add-expense";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [items, setItems] = useState<{ name: string; cost: number; id: string }[]>([]);
  const [item, setItem] = useState({ name: "", cost: 0 });
  const [sum, setSum] = useState(0);
  const [username, setUserName] = useState('');
  const buttonStyle = loggedIn ? "p-3 bg-[#473366] text-white rounded w-28 font-bold transition hover:bg-opacity-90" : "p-3 bg-gray-500 text-white rounded w-28 font-bold transition hover:bg-opacity-90";

  const loginFormRef = useRef<HTMLFormElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  const loadExpenses = async () => {
    const data = await fetchExpenses();
    setItems(data);
    calculateSum(data);
  };

  const calculateSum = (expenses: { cost: number }[]) => {
    const total = expenses.reduce((acc, item) => acc + item.cost, 0);
    setSum(total);
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const handleOnChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem({ name: e.target.value, cost: item.cost });
  };

  const handleOnChangeCost = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItem({ name: item.name, cost: parseInt(e.target.value) });
  };

  const handleAddItem: MouseEventHandler<HTMLButtonElement> = async () => {
    if (!item.name || item.cost <= 0) {
      alert('Name or cost not valid');
      return;
    }
    const result = await addExpense(item.name, item.cost);
    if (result) {
      loadExpenses();
      setItem({ name: '', cost: 0 });
    }
  };

  const toggleLogin: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const isValid = loginFormRef.current?.reportValidity();
    if (!isValid) {
      return;
    }
    if (nameRef.current) {
      setUserName(nameRef.current.value);
    }
    setLoggedIn(true);
  };

  if (!loggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen text-[#19161d]">
        <form ref={loginFormRef} className="flex flex-col gap-2">
          <label htmlFor="username">Username</label>
          <input ref={nameRef} required className="p-2 rounded text-xl" id="username" type="text" />
          <label htmlFor="password">Password</label>
          <input required className="p-2 rounded text-xl" id="password" type="password" />
          <button onClick={toggleLogin} className="p-2 text-white rounded font-bold bg-[#473366] hover:bg-opacity-85 transition">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen text-[#19161d]">
      <div className="bg-[#473366] bg-opacity-30 h-[1100px] p-10 rounded-3xl shadow-md flex gap-20">
        <div className="flex flex-col items-start gap-6 h-full justify-between">
          <div className="flex flex-col gap-6">
            {username && <h2 className="text-2xl font-semibold">Hi, {username}</h2>}
            <h1 className="text-4xl font-extrabold">Expense Tracker</h1>
            <h2 className="text-4xl mt-10">Add Expense</h2>
            <div className="flex gap-6 w-80 justify-between items-center">
              <label htmlFor="name" className="font-bold">Name:</label>
              <input
                type="text"
                id="name"
                className="p-2 rounded text-xl"
                value={item.name}
                onChange={handleOnChangeName}
              />
            </div>
            <div className="flex gap-6 w-80 justify-between items-center">
              <label htmlFor="cost" className="font-bold">Cost:</label>
              <input
                type="number"
                id="cost"
                className="p-2 rounded text-xl"
                value={item.cost.toString()}
                onChange={handleOnChangeCost}
              />
            </div>
            <button onClick={handleAddItem} className={buttonStyle}>Add</button>
          </div>
          <div className="bg-[#473366] bg-opacity-30 w-full rounded-xl flex flex-col p-4">
            <h2 className="text-4xl">Stats</h2>
            <p className="text-xl">Sum: {sum} kr.</p>
            <p>Count: {items.length}</p>
          </div>
        </div>
        <div className="w-96 px-2 py-2 rounded-xl h-full bg-[#473366] bg-opacity-50">
          <h3 className="text-3xl p-2">Added Items:</h3>
          <hr className="border-black mt-4 pt-2 border-opacity-30" />
          <div className="flex flex-col gap-2">
            {items.map((item) => (
              <Item key={item.id} item={item} setSum={setSum} setItems={setItems} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
