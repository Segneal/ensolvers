import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createNote, deleteNote, getNotes, updateNote } from "../services/api";
import Select from "react-select";
import Note from "./Note";
import Modal from "./UI/Modal";
import { getTags } from "../services/apiTags";
import DeleteModal from "./UI/DeleteModal";
import { NoteType } from "../types/NoteType";
import { TagType } from "../types/TagType";

const newNote: NoteType = {
  id: null as any,
  title: "",
  description: "",
  tags: null || ([] as TagType[]),
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
    tags: [{ id: "asdasd", value: "sarasa", label: "sasasa" }] as TagType[],
    status: true,
    lastModified: new Date(),
  });
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [idToDelete, setIdToDelete] = useState<string>("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { data, isLoading } = useQuery<NoteType[]>(
    "notes",
    async () => getNotes(),
    {
      staleTime: 1000 * 60 * 5,
    }
  );
  const { data: allTags, isLoading: tagsLoading } = useQuery<TagType[]>(
    "tags",
    async () => getTags(),
    { staleTime: 1000 * 60 * 5 }
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
        queryClient.invalidateQueries("tags");
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
    //and notes that are being searched by tags
    let filteredNotes = data?.filter((note) => note.status === !showArchived);
    //check if tags to search is not empty
    if (selectedTags?.length > 0) {
      //filter notes by tags
      filteredNotes = filteredNotes?.filter((note) => {
        //check if note has tags
      });
    }

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

  const renderTags = () => {
    return allTags?.map((tag) => {
      return {
        value: tag.id,
        label: tag.label,
      };
    });
  };

  const handleSelect = (selectedOption: any) => {
    setSelectedTags(selectedOption);
  };

  return (
    <>
      {isLoading || tagsLoading ? (
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
            <div className="gap-1 md:gap-2 lg:gap-4 flex w-[40%] px-2 md:px-4 lg:px-6 xl:px-8 2xl:px-10 text-white w-full">
              <label htmlFor="search" className="">
                Search by tag
              </label>
              <Select
                isMulti
                defaultValue={selectedOption}
                className="z-[30] w-[300px] md:w-[400px]
                lg:w-[500px] xl:w-[6000px] 2xl:w-[800px]
                text-gray-500"
                onChange={handleSelect}
                options={renderTags()}
              />
            </div>
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
