import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { NoteType } from "../../types/NoteType";

type modalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleCreate: (note: NoteType) => void;
  handleUpdate: (note: NoteType) => void;
  selectedNote: NoteType;
};

function Modal({
  isOpen,
  setIsOpen,
  handleCreate,
  handleUpdate,
  selectedNote,
}: modalProps) {
  const [modifiedNote, setModifiedNote] = useState<NoteType>({
    ...selectedNote,
  });

  useEffect(() => {
    setModifiedNote({ ...selectedNote });
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModifiedNote({
      ...(modifiedNote as NoteType),
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    //if id is null generate null and create else update
    if (modifiedNote.id === null) {
      modifiedNote.id = uuid();
      handleCreate(modifiedNote);
      setIsOpen(false);
    }
    //update
    else {
      handleUpdate(modifiedNote);
      setIsOpen(false);
    }
  };

  return (
    <>
      {!modifiedNote ? (
        <h1>Loading...</h1>
      ) : (
        <div
          className="flex h-[100vh] items-center justify-center fixed w-full text-gray-600 text-left z-50
        before:content-[''] before:absolute before:inset-0 before:bg-black before:bg-opacity-50 before:-z-10
        before:select-none"
        >
          <div className="bg-white rounded-lg overflow-hidden shadow-xl w-4/5 md:w-3/4">
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
                  value={modifiedNote.title}
                  name="title"
                  onChange={(e) => handleChange(e as any)}
                  type="text"
                  placeholder="Add a title here"
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={15}
                  onChange={(e) => handleChange(e as any)}
                  value={modifiedNote.description}
                  className="w-full border text-gray-400 border-gray-300 rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Add description here"
                ></textarea>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-100 border-t flex justify-end gap-2 md:gap-4 lg:gap-6">
              <button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 md:px-4 px-2 rounded"
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
      )}
    </>
  );
}

export default Modal;
