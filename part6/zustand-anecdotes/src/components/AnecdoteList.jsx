import { useAnecdoteActions, useAnecdotes } from "../store";
import { useUpdateNotificationAction } from "../notificationStore";

export const AnecdoteList = () => {
  const anecdotes = useAnecdotes();

  const { increment, deleteNote } = useAnecdoteActions();
  const { updateNotification } = useUpdateNotificationAction();

  const sortedAnecdotes = anecdotes.toSorted((a, b) => b.votes - a.votes);

  const buttonStyle = {
    display: "flex",
    flexDirection: "row",
    gap: "4px",
  };

  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            <div style={buttonStyle}>
              has {anecdote.votes}
              <button
                onClick={() => {
                  increment(anecdote.id);
                  updateNotification(`You voted "${anecdote.content}"`);
                }}
              >
                vote
              </button>
              <button
                onClick={() => {
                  deleteNote(anecdote.id);
                  updateNotification(`You deleted: ${anecdote.content}`);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
