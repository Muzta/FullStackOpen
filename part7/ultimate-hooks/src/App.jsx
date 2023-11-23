import { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return { type, value, onChange };
};

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    if (baseUrl) {
      const getAll = async () => {
        const response = await axios.get(baseUrl);
        setResources(response.data);
      };

      getAll();
    }
  }, [baseUrl]);

  let token = null;

  const setToken = (newToken) => {
    token = `bearer ${newToken}`;
  };

  const create = async (resource) => {
    const config = {
      headers: { Authorization: token },
    };

    const response = await axios.post(baseUrl, resource, config);
    setResources(resources.concat(response.data));
  };

  const update = async (id, resource) => {
    const response = await axios.put(`${baseUrl}/${id}`, resource);
    setResources(
      resources.map((res) =>
        res.id === response.data.id ? response.data : res
      )
    );
  };

  const service = {
    setToken,
    create,
    update,
  };

  return [resources, service];
};

const App = () => {
  const content = useField("text");
  const name = useField("text");
  const number = useField("text");

  const [notes, noteService] = useResource("http://localhost:3005/notes");
  const [persons, personService] = useResource("http://localhost:3005/persons");

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: name.value, number: number.value });
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  );
};

export default App;
