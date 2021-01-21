import React, { useState } from "react";
import styles from "../styles/AddNoteForm.module.css";
import { useAddNoteMutation } from "../generated/graphql-frontend";

const AddNoteForm: React.FC<{ onSucess: () => void }> = ({ onSucess }) => {
  const [content, setContent] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const [addNote, { loading }] = useAddNoteMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addNote({ variables: { input: { content } } });
      setContent("");
      onSucess();
    } catch (e) {
      console.error("An error occurred, please try again");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className={styles.contentTextarea}
        value={content}
        onChange={handleChange}
      />
      <button
        type="submit"
        className={styles.button}
        disabled={loading || content === ""}
      >
        Add Note
      </button>
    </form>
  );
};

export default AddNoteForm;
