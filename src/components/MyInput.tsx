import React from "react";
import Label from "./Label";

type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "search";

type Props = {
  label: string;
  type: InputType;
};

const MyInput = ({ label, type }: Props) => {
  return (
    <div>
      <Label label={label} />
      <label htmlFor={label}>{label}</label>
      <input type={type} id={label} placeholder={`Enter your ${label}`} />
    </div>
  );
};

export default MyInput;
