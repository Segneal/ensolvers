import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createNote, deleteNote, getNotes, updateNote } from "../services/api";
import Note from "./Note";
import Modal from "./UI/Modal";
import DeleteModal from "./UI/DeleteModal";
import { NoteType } from "../types/NoteType";

const newNote: NoteType = {
  id: null as any,
  title: "",
  description: "",
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
    status: true,
    lastModified: new Date(),
  });
  const [isOpen, setIsOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState<string>("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { data, isLoading } = useQuery<NoteType[]>(
    "notes",
    async () => getNotes(),
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  //mutate notes
  const updateNoteMutation = useMutation(updateNote, {
    onSuccess: () => {
      queryClient.invalidateQueries("notes");
    },
  });

  const openCleanModal = () => {
    //set selectedNote to newNote
    setSelectedNote({
      ...newNote,
    });
    setIsOpen(true);
  };

  useEffect(() => {
    isOpen || isDeleteOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [isOpen, isDeleteOpen]);

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

  const handleUpdate = (note: NoteType) => {
    //edit note
    updateNoteMutation.mutate(note);
  };

  const handleDelete = (id: string) => {
    //open confirmation modal
    setIsDeleteOpen(true);
    setIdToDelete(id);
  };

  const confirmDelete = () => {
    //delete note
    deleteNoteMutation.mutate(idToDelete);
    setIsDeleteOpen(false);
    setIdToDelete("");
  };

  const handleArchive = (id: string) => {
    //find note by id and change status to opposite inside of data
    //update note
    const note = data?.find((note) => note.id === id);
    if (note) {
      note.status = !note.status;
      updateNoteMutation.mutate(note);
    }
  };

  const handleCreate = (note: NoteType) => {
    //create note
    if (note.title === "" || note.description === "") return;
    createNoteMutation.mutate(note);
    queryClient.invalidateQueries("notes");
    setIsOpen(false);
  };

  const renderNotes = () => {
    //returns only notes that are equal to showArchived
    if (!data) return;
    const filteredNotes = data?.filter((note) => note.status !== showArchived);

    return filteredNotes?.map((note) => {
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
        <>
          {isOpen && (
            <Modal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              handleCreate={handleCreate}
              handleUpdate={handleUpdate}
              selectedNote={selectedNote}
            />
          )}
          {isDeleteOpen && (
            <DeleteModal
              confirmDelete={confirmDelete}
              setIsDeleteOpen={setIsDeleteOpen}
            />
          )}
          <div className="flex flex-col px-2 md:px-4 lg:px-6">
            <header className="h-[100px] px-4 md:px-6 lg:px-8 pt-4 md:pt-6 lg:pt-8 text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white border-gray-200 ">
              {!showArchived ? <h1>My Notes</h1> : <h1>My Archived Notes</h1>}
            </header>
            <span className="p-4 md:p-6 lg:p-8 gap-6 flex ml-auto">
              <button
                className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-[.75rem]  md:text-[1rem]"
                onClick={() => setShowArchived((prev) => !prev)}
              >
                Show Archived
              </button>
              <button
                className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-[.75rem] md:text-[1rem]"
                onClick={() => openCleanModal()}
              >
                Create Note
              </button>
            </span>
          </div>
          <section className="flex flex-col pt-4 text-center text-white gap-4 relative min-h-[calc(100vh-200px)]">
            <section className="grid grid-cols-1 md:grid-cols-2  gap-2 md:gap-4 lg:gap-6 p-2 md:p-4 lg:p-6">
              {data && renderNotes()}
            </section>
          </section>
        </>
      )}
    </>
  );
}
