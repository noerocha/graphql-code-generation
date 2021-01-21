import Head from "next/head";
import AddNoteForm from "../components/AddNoteForm";
import styles from "../styles/Home.module.css";
import { useNotesQuery } from "../generated/graphql-frontend";

export default function Home() {
  const { data, error, loading, refetch } = useNotesQuery();
  const notes = data?.notes;

  return (
    <div className={styles.container}>
      <Head>
        <title>My Notes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}>My Notes</h1>
      {loading ? (
        <p>Please wait ...</p>
      ) : error ? (
        <p>An error ocurred</p>
      ) : notes && notes.length ? (
        <ul className={styles.notes}>
          {notes.map((note) => {
            return <li key={note.id}>{note.content}</li>;
          })}
        </ul>
      ) : (
        <p>You've got no notes !</p>
      )}
      <AddNoteForm onSucess={refetch} />
    </div>
  );
}
