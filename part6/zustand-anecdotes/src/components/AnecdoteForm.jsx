import { useUpdateNotificationAction } from "../notificationStore";
import { useAnecdoteActions } from "../store";

export const AnecdoteForm = () => {
  const { addNote } = useAnecdoteActions();
  const { updateNotification } = useUpdateNotificationAction();
  const addNotes = async (e) => {
    e.preventDefault();
    const content = e.target.note.value;
    await addNote(content);
    e.target.reset();
    updateNotification(`A new anecdotes is created: ${content}`);
  };
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNotes}>
        <div>
          <input name="note" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};
