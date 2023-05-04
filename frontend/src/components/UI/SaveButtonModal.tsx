import React from "react";

type SaveBUttonModalProps = {
  isSaveOpen: boolean;
  setIsSaveOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSave: () => void;
};

export default function SaveButtonModal({
  isSaveOpen,
  setIsSaveOpen,
  handleSave,
}: SaveBUttonModalProps) {
  //Save button modal
  return <div></div>;
}
