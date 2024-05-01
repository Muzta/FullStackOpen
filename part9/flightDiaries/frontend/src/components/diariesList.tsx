import { useEffect, useState } from "react";
import { Diary, NewDiary, Visibility, Weather } from "../types";
import { getAllDiaries } from "../services/diaryService";

const DiariesList = () => {
  const newDiaryInitial: NewDiary = {
    date: "",
    weather: Weather.Cloudy,
    visibility: Visibility.Good,
    comment: "",
  };
  const [newDiary, setNewDiary] = useState<NewDiary>(newDiaryInitial);
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
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const diaryToAdd = { ...newDiary, id: diaries.length + 1 };
    setDiaries(diaries.concat(diaryToAdd));
    setNewDiary(newDiaryInitial);
  };

  const handleDiaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewDiary({
      ...newDiary,
      [name]: value,
    });
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

      <h2>Add new entry</h2>
      <form style={{ textAlign: "left" }} onSubmit={diaryCreation}>
        <div style={{ margin: "1rem" }}>
          Date
          <input
            type="date"
            name="date"
            value={newDiary.date}
            onChange={handleDiaryChange}
          />
        </div>

        <div style={{ margin: "1rem" }}>
          Weather
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {Object.entries(Weather).map(([key, value]) => {
              return (
                <div key={key}>
                  {key}
                  <input
                    value={key}
                    checked={newDiary.weather === value}
                    type="radio"
                    name="weather"
                    onChange={handleDiaryChange}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ margin: "1rem" }}>
          Visibility
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {Object.entries(Visibility).map(([key, value]) => {
              return (
                <div key={key}>
                  {key}
                  <input
                    value={key}
                    checked={newDiary.visibility === value}
                    type="radio"
                    name="visibility"
                    onChange={handleDiaryChange}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ margin: "1rem" }}>
          Comment
          <input
            type="string"
            name="comment"
            value={newDiary.comment}
            onChange={handleDiaryChange}
          />
        </div>

        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default DiariesList;
