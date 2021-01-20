import Head from "next/head";
import { useQuery, gql } from "@apollo/client";
import AddNoteForm from "../components/AddNoteForm";
import styles from "../styles/Home.module.css";

interface Note {
  id: number;
  content: string;
}

interface NotesQuery {
  notes: Note[];
}

const NotesDocument = gql`
  query Notes {
    notes {
      id
      content
    }
  }
`;

export default function Home() {
  const { data, error, loading, refetch } = useQuery<NotesQuery>(NotesDocument);
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