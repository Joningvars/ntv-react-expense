import React from "react";

type ItemProps = {
  name: string;
  cost: number;
  id: string;
};

type Props = {
  item: ItemProps;
  setItems: Function;
  setSum: Function;
};

const Item = ({ item, setItems, setSum }: Props) => {
  const { name, cost } = item;

  const handleRemoveItem = (item: ItemProps) => {
    setItems((prev: []) => {
      return prev.filter((i: typeof item) => i.id !== item.id);
    });
    setSum((prev: number) => prev - item.cost);
  };

  return (
    <div className="flex justify-between items-center p-4 bg-[#a88ed2] rounded-lg shadow font-bold">
      <div>
        <p className="text-2xl">
          Name:
          <span className="font-light ml-2"> {name}</span>
        </p>
        <p className="text-2xl font-bold">
          Cost:
          <span className="text-sm ml-2"> {cost}kr.</span>
        </p>
      </div>
      <button
        onClick={() => {
          handleRemoveItem(item);
        }}
        className="text-red-600 "
      >
        ❌
      </button>
    </div>
  );
};

export default Item;
