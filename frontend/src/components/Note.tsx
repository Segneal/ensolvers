import { GrNote } from "react-icons/gr";
import { BsPencil } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { BsArchiveFill } from "react-icons/bs";
import { BsJournalArrowUp } from "react-icons/bs";

type NoteProps = {
  note: NoteType;
  handleArchive: (id: string) => void;
  handleDelete: (id: string) => void;
  handleUpdate: (id: NoteType) => void;
  handleEditNote: (id: string) => void;
};

export default function Note({
  note,
  handleArchive,
  handleDelete,
  handleUpdate,
  handleEditNote,
}: NoteProps) {
  const archiveThis = () => {
    handleArchive(note.id);
  };

  const editThis = () => {
    handleEditNote(note.id);
  };

  const deleteThis = () => {
    handleDelete(note.id);
  };

  const showTags = () => {
    return note?.tags?.map((tag) => {
      return (
        <h1 className="bg-slate-600 rounded-md px-2 border-black border-2 select-none">
          {tag}
        </h1>
      );
    });
  };

  return (
    <section className="gap-2 relative p-4 bg-slate-500 h-[150px] md:h-[200px] lg:h-[250px] rounded-md border-white shadow-sm text-left shadow-white flex">
      <span className="w-[15%] md:w-[18%] lg:w-[20%] items-center flex p-1 md:p-2 lg:p-3">
        <GrNote className="w-full max-h-[80%] h-auto" />
      </span>
      <span className="flex flex-col w-[50%]">
        <h1 className="h-[15%] overflow-hidden">{note.title}</h1>
        <p className="h-[50%] overflow-hidden text-ellipsis truncate">
          {note.description}
        </p>
        <h1 className="h-[20%] overflow-hidden text-sm">
          Last Modified: {note.lastModified.toString().slice(0, 10)}
        </h1>
        <span className="flex gap-2">{showTags()}</span>
      </span>
      <span className="flex w-[30%] absolute bottom-[10%] right-0 gap-2">
        {note.status ? (
          <BsArchiveFill
            className="w-[25%] h-auto hover:scale-105 transition-all"
            onClick={archiveThis}
          />
        ) : (
          <BsJournalArrowUp
            className="w-[25%] h-auto hover:scale-105 transition-all"
            onClick={archiveThis}
          />
        )}
        <BsPencil
          className="w-[25%] h-auto hover:scale-105 transition-all"
          onClick={editThis}
        />
        <BsTrash
          className="w-[25%] h-auto hover:scale-105 transition-all"
          onClick={deleteThis}
        />
      </span>
    </section>
  );
}
