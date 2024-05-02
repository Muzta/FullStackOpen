import { useEffect, useState } from "react";
import { getAllDiaries } from "../services/diaryService";
import { Diary } from "../types";
import DiaryForm from "./diaryForm";

const DiariesList = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const createDiaryEntry = (newDiaryEntry: Diary) => {
    // const diaryToAdd: Diary = { ...newDiaryEntry, id: diaries.length + 1 };
    setDiaries(diaries.concat(newDiaryEntry));
  };

  return (
    <div>
      <h2>Diary entries</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: "20px",
        }}
      >
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

      <DiaryForm createDiaryEntry={createDiaryEntry} />
    </div>
  );
};

export default DiariesList;
