import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";

export const useField = (type: string) => {
  const [value, setValue] = useState("");

  // const camelToFlat=(camel)=>{
  //   const camelCase =camel.replace(/([a-z])([A-Z])/g, '$1 $2').split(" ")

  //   let flat =""

  //   camelCase.forEach(word=>{
  //       flat = flat + word.charAt(0).toUpperCase() + word.slice(1) + " "
  //   })
  //   return flat
  // }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const resetValue = () => {
    setValue("");
  };

  return { type, value, onChange, resetValue };
};

export const useSelectField = () => {
  const [value, setValue] = useState("");

  const onChange = (event: SelectChangeEvent<string>) => {
    setValue(event.target.value);
  };

  const resetValue = () => {
    setValue("");
  };

  return { value, onChange, resetValue };
};
