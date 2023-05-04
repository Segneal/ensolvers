import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createNote, deleteNote, getNotes, updateNote } from "../services/api";
import Note from "./Note";
import Modal from "./Modal";
import { v4 as uuid } from "uuid";

const newNote: NoteType = {
  id: null as any,
  title: "",
  description: "",
  tags: [],
  status: true,
  lastModified: new Date(),
};

export default function NotePad() {
  const queryClient = useQueryClient();
  const [showArchived, setShowArchived] = useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<NoteType>({
    id: "",
    title: "",
    description: "",
    tags: [],
    status: true,
    lastModified: new Date(),
  });
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState<string>("");

  const { data, isLoading } = useQuery<NoteType[]>("notes", async () =>
    getNotes()
  );
  //mutate notes
  const updateNoteMutation = useMutation(updateNote, {
    onSuccess: () => {
      queryClient.invalidateQueries("notes");
    },
  });
  const deleteNoteMutation = useMutation(deleteNote, {
    onSuccess: () => {
      queryClient.invalidateQueries("notes");
    },
  });

  // Mutation to create a new note
  const createNoteMutation = useMutation(
    (newNote: NoteType) => createNote(newNote),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("notes");
      },
    }
  );

  const handleModify = (id: string) => {
    //find note by id and set it to selectedNote
    const note = data?.find((note) => note.id === id);
    if (note) {
      setSelectedNote({
        ...note,
      });
      setIsOpen(true);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const handleUpdate = (note: NoteType) => {
    //edit note
    //mutate notes
    updateNoteMutation.mutate(note);
  };

  const handleDelete = (id: string) => {
    //delete note
    //mutate notes
    deleteNoteMutation.mutate(id);
  };

  const handleArchive = (id: string) => {
    //find note by id and change status to opposite inside of data
    //update note
    //mutate notes
    const note = data?.find((note) => note.id === id);
    if (note) {
      note.status = !note.status;
      updateNoteMutation.mutate(note);
    }
  };

  const openCleanModal = () => {
    //set selectedNote to newNote and generate new id
    setSelectedNote({
      ...newNote,
    });
    setIsOpen(true);
  };

  const handleCreate = (note: NoteType) => {
    //create note
    //mutate notes
    createNoteMutation.mutate(note);
    queryClient.invalidateQueries("notes");
    setIsOpen(false);
  };

  const renderNotes = () => {
    //returns only notes that are equal to showArchived
    return data
      ?.filter((note) => note.status === !showArchived)
      .map((note) => {
        return (
          <Note
            key={note.id}
            note={note}
            handleArchive={handleArchive}
            handleDelete={handleDelete}
            handleModify={handleModify}
          />
        );
      });
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <main className="flex flex-col justify-center text-center text-white gap-4 relative">
          <header className="h-[100px] pt-4 md:pt-6 lg:pt-8 text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            {!showArchived ? <h1>My Notes</h1> : <h1>My Archived Notes</h1>}
          </header>
          <span className="p-6 gap-6 flex ml-auto">
            <button
              className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-[.5rem] sm:text-[.75rem] md:text-[1rem]"
              onClick={() => setShowArchived((prev) => !prev)}
            >
              Show Archived
            </button>
            <button
              className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-[.5rem] sm:text-[.75rem] md:text-[1rem]"
              onClick={() => openCleanModal()}
            >
              Create Note
            </button>
          </span>
          <div className="gap-1 md:gap-2 lg:gap-4 flex w-[40%] px-2 md:px-4 lg:px-6 xl:px-8 2xl:px-10">
            <label htmlFor="search" className="">
              Search by tag
            </label>
            <input
              type="text"
              placeholder="Search"
              className="p-2 text-black w-[200px] md:w-[300px] xl:w-[400px] "
              value={search}
              onChange={handleSearch}
            />
          </div>
          <section className="grid grid-cols-1 md:grid-cols-2  gap-2 md:gap-4 lg:gap-6 p-2 md:p-4 lg:p-6">
            {data && renderNotes()}
          </section>
          {isOpen && (
            <Modal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              handleCreate={handleCreate}
              handleUpdate={handleUpdate}
              selectedNote={selectedNote}
            ></Modal>
          )}
        </main>
      )}
    </>
  );
}
