const baseURL = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await fetch(baseURL);

  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }

  const data = await response.json();
  return data;
};

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const createNew = async (content) => {
  const options = {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify({ content, votes: 0, id: generateId() }),
  };
  const response = await fetch(baseURL, options);
  if (!response.ok) {
    throw new Error("Failed to create note!");
  }
  return await response.json();
};

const update = async (id, note) => {
  const response = await fetch(`${baseURL}/${id}`, {
    method: "PUT",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  if (!response.ok) {
    throw new Error("failed to vote");
  }

  return await response.json();
};

const deleteNote = async (id) => {
  const response = await fetch(`${baseURL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete");
  }
  return await response.json();
};

export const noteServices = {
  getAll,
  createNew,
  update,
  deleteNote,
};
