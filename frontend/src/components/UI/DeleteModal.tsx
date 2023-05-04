import React from "react";

type DeleteModalProps = {
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  confirmDelete: () => void;
};

export default function DeleteModal({
  setIsDeleteOpen,
  confirmDelete,
}: DeleteModalProps) {
  return (
    <div
      className="fixed flex h-[100vh] items-center justify-center  w-full text-gray-600 text-left z-50
        before:content-[''] before:absolute before:inset-0 before:bg-black before:bg-opacity-50 before:-z-10
        before:select-none"
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-xl w-4/5 md:w-3/4">
        <h1 className="mb-4 flex flex-col gap-4  font-bold mx-auto">
          Are you sure you want to delete this note?
        </h1>
        <div className="mb-4">
          <div className="px-6 py-4 bg-gray-100 border-t flex justify-end gap-2 md:gap-4 lg:gap-6">
            <button
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 md:px-4 px-2 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setIsDeleteOpen(false)}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
