import { useEffect, useState } from "react";
import { Diary, Visibility, Weather } from "../types";
import { getAllDiaries } from "../services/diaryService";

const DiariesList = () => {
  const [diaries, setDiaries] = useState<Diary[]>([
    {
      id: 1,
      date: "08/08/2020",
      weather: Weather.Rainy,
      visibility: Visibility.Great,
      comment: "nothing",
    },
  ]);

  useEffect(() => {
    getAllDiaries().then((data) => setDiaries(data));
  }, []);

  return (
    <div>
      <h2>Diary entries</h2>
      <div style={{ display: "grid", gap: "20px" }}>
        {diaries.map((diary) => (
          <div key={diary.id}>
            <div>
              <b>{diary.date}</b>
            </div>
            <div>Visibility: {diary.visibility}</div>
            <div>Weather: {diary.weather}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiariesList;
