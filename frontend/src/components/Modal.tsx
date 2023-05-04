import { useState } from "react";
import { v4 as uuid } from "uuid";
import { AiFillCloseCircle } from "react-icons/ai";

type modalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleCreate: (note: NoteType) => void;
  handleUpdate: (note: NoteType) => void;
  note: NoteType | undefined;
};

const newNote: NoteType = {
  id: uuid(),
  title: "",
  description: "",
  tags: [],
  status: true,
  lastModified: new Date(),
};

function Modal({ setIsOpen, handleCreate, handleUpdate, note }: modalProps) {
  const [currentNote, setCurrentNote] = useState<NoteType>(() =>
    note ? note : newNote
  );
  const [isNew, setIsNew] = useState<boolean>(note ? false : true);
  const [newTag, setNewTag] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentNote({
      ...currentNote,
      [e.target.id]: e.target.value,
    });
  };

  const handleChangeTag = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };

  const handleAddTag = () => {
    //add tag if not empty or not repeated
    if (newTag !== "" && !currentNote.tags.includes(newTag)) {
      setCurrentNote({
        ...currentNote,
        tags: [...currentNote.tags, newTag],
      });
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    //remove tag from currentNote
    setCurrentNote({
      ...currentNote,
      tags: currentNote.tags.filter((t) => t !== tag),
    });
  };

  const handleSave = () => {
    //save note
    //if note is not empty, save
    //if new note, add to notes
    //if existing note, update note
    if (currentNote.title === "" || currentNote.description === "") {
      return;
    }
    if (isNew) {
      handleCreate(currentNote);
    } else {
      //update note
      handleUpdate(currentNote);
    }
    setIsOpen(false);
  };

  const showTags = () => {
    //render tags if there are any
    if (currentNote.tags.length > 0) {
      return currentNote?.tags?.map((tag) => {
        //add button to remove tag
        return (
          <span
            key={tag}
            className="flex gap-2 items-center justify-center text-center"
          >
            <span className="bg-gray-200 rounded-lg px-2 py-1 text-sm font-semibold text-gray-700 ">
              {tag}
              <button className="p-auto" onClick={() => removeTag(tag)}>
                <AiFillCloseCircle className="w-[25px]"></AiFillCloseCircle>
              </button>
            </span>
          </span>
        );
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen absolute w-full text-gray-600 text-left pt-[20%]">
      <div className="bg-white rounded-lg overflow-hidden shadow-xl w-3/4">
        <div className="px-6 py-4 bg-gray-100 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">CREATE / EDIT NOTE</h2>
        </div>
        <div className="px-6 py-4">
          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              className="w-full border text-gray-400 border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              value={currentNote.title}
              onChange={handleChange}
              type="text"
              placeholder="Add a title here"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              onChange={(e) => handleChange(e as any)}
              value={currentNote.description}
              className="w-full border text-gray-400 border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Add description here"
            ></textarea>
          </div>
          <div className="mb-4 flex flex-col gap-4">
            <label className="block font-bold mb-2" htmlFor="tags">
              Tags
            </label>
            <div className="flex flex-row gap-2">
              <input
                className="w-full border border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                id="tags"
                onChange={handleChangeTag}
                value={newTag}
                type="text"
                placeholder="Add new tags here"
              />
              <button
                onClick={handleAddTag}
                className="bg-white hover:bg-gray-200 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-[.5rem] sm:text-[.75rem] md:text-[1rem]"
              >
                Add
              </button>
            </div>
          </div>
          <div className="flex flex-row gap-2 h-[100px] justify-center items-center flex-wrap">
            {showTags()}
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-100 border-t flex justify-end gap-2 md:gap-4 lg:gap-6">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 md:px-4 px-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
