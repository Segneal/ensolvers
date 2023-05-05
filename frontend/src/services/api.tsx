import axios from "axios";
import { NoteType } from "../types/NoteType";
const API_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

export const getNotes = async () => {
  const response = await axios.get(API_URL + "/notes/getAll");
  return response.data;
};

export const createNote = async (note: NoteType) => {
  console.log(note);
  const response = await axios.post(API_URL + "/notes/create", note);

  return response.data;
};

export const updateNote = async (note: NoteType) => {
  const response = await axios.put(API_URL + `/notes/update/${note.id}`, note);
  return response.data;
};

export const deleteNote = async (id: string) => {
  const response = await axios.delete(API_URL + `/notes/delete/${id}`);
  return response.data;
};

export const findById = async (id: string) => {
  const response = await axios.get(API_URL + `/notes/findById/${id}`);
  return response.data;
};
