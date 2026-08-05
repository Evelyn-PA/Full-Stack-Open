import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act, render } from "@testing-library/react";

vi.mock("../../services/notes", () => ({
  noteServices: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    deleteNote: vi.fn(),
  },
}));

import { noteServices } from "../../services/notes";
import { useAnecdoteStore, useAnecdoteActions, useAnecdotes } from "../store";
import { AnecdoteList } from "./AnecdoteList";

const noteMock = [
  {
    id: 1,
    content: "A",
    votes: 0,
  },
  {
    id: 2,
    content: "B",
    votes: 10,
  },
  {
    id: 3,
    content: "C",
    votes: 5,
  },
];

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: "" });
  vi.clearAllMocks();
});

describe("useNoteActions", () => {
  it("Initialize load notes from service", async () => {
    const mockNotes = [{ id: 1, content: "Test", votes: 0 }];
    noteServices.getAll.mockResolvedValueOnce(mockNotes);

    const { result } = renderHook(() => useAnecdoteActions());
    await act(async () => {
      await result.current.initialize();
    });
    const { result: notesResult } = renderHook(() => useAnecdotes());
    expect(notesResult.current).toEqual(mockNotes);
  });

  it("receives the anecdotes from the store sorted by votes", async () => {
    useAnecdoteStore.setState({ anecdotes: noteMock, filter: "" });
    const { container } = render(<AnecdoteList />);
    const html = container.textContent;
    expect(html.indexOf("B")).toBeLessThan(html.indexOf("C"));
    expect(html.indexOf("C")).toBeLessThan(html.indexOf("A"));
  });

  it("receives properly filterd list of anecdotes", async () => {
    useAnecdoteStore.setState({ anecdotes: noteMock, filter: "B" });
    const { result } = renderHook(() => useAnecdotes());
    expect(result.current).toEqual([noteMock[1]]);
  });
});
