import { create } from "zustand";
import { noteServices } from "../services/notes";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => ({
  content: anecdote,
  id: getId(),
  votes: 0,
});

export const useAnecdoteStore = create((set, get) => ({
  anecdotes: anecdotesAtStart.map(asObject),
  filter: "",
  actions: {
    increment: async (id) => {
      const note = get().anecdotes.find((n) => n.id == id);
      const updated = await noteServices.update(id, {
        ...note,
        votes: note.votes + 1,
      });
      set((state) => ({
        anecdotes: state.anecdotes.map((anecdote) =>
          anecdote.id === id ? updated : anecdote,
        ),
      }));
    },
    addNote: async (content) => {
      const newNote = await noteServices.createNew(content);
      set((state) => ({ anecdotes: [...state.anecdotes, newNote] }));
    },
    deleteNote: async (id) => {
      noteServices.deleteNote(id);
      set((state) => ({
        anecdotes: state.anecdotes.filter((anecdote) => anecdote.id !== id),
      }));
    },
    setFilter: (value) => set(() => ({ filter: value })),
    initialize: async () => {
      const anecdotes = await noteServices.getAll();
      set(() => ({ anecdotes }));
    },
  },
}));
export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes);
  const filter = useAnecdoteStore((state) => state.filter);
  return anecdotes.filter((anecdote) => anecdote.content.includes(filter));
};
export const useFilter = () => useAnecdoteStore((state) => state.filter);
export const useAnecdoteActions = () =>
  useAnecdoteStore((state) => state.actions);
