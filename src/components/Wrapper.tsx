import React from "react";

type Props = {
  children: React.ReactNode;
};
const Wrapper = (props: Props) => {
  return <div className="p-10 bg-gray-200 rounded-3xl">{props.children}</div>;
};

export default Wrapper;
