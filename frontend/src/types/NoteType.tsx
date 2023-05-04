import { TagType } from "./TagType";

export type NoteType = {
  id: string;
  title: string;
  description: string;
  tags: TagType[];
  status: boolean;
  lastModified: Date;
};
