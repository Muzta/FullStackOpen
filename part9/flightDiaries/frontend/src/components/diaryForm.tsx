import { useState } from "react";
import { addNewDiary } from "../services/diaryService";
import { Diary, NewDiary, Visibility, Weather } from "../types";

interface DiaryFormProps {
  createDiaryEntry: (newDiary: Diary) => void;
}

const DiaryForm = ({ createDiaryEntry }: DiaryFormProps) => {
  const newDiaryInitial: NewDiary = {
    date: "",
    weather: Weather.Cloudy,
    visibility: Visibility.Good,
    comment: "",
  };
  const [newDiary, setNewDiary] = useState<NewDiary>(newDiaryInitial);
  const [error, setError] = useState("");

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const newDiaryEntry: Diary = await addNewDiary(newDiary);
      createDiaryEntry(newDiaryEntry);
      setNewDiary(newDiaryInitial);
      if (error) setError(""); // Remove previous errors
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else
        setError("An unexpected error occurred while adding the diary entry.");
    }
  };

  const handleDiaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewDiary({
      ...newDiary,
      [name]: value,
    });
  };

  return (
    <>
      <h2>Add new entry</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}{" "}
      {/* Display error message if error exists */}
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
                    value={value}
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
                    value={value}
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
    </>
  );
};

export default DiaryForm;
