import axios from "axios";
import { Diary, NewDiary } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllDiaries = async () => {
  const response = await axios.get<Diary[]>(baseUrl);
  return response.data;
};

export const addNewDiary = async (newDiary: NewDiary) => {
  try {
    const response = await axios.post(baseUrl, newDiary);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) throw new Error(error.response?.data);
    else console.error(error);
  }
};
