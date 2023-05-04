import axios from "axios";
import { NoteType } from "../types/NoteType";
const API_URL = "http://localhost:3000/notes";

export const getNotes = async () => {
  const response = await axios.get(API_URL + "/getAll");
  return response.data;
};

export const createNote = async (note: NoteType) => {
  console.log(note);
  const response = await axios.post(API_URL + "/create", note);
  return response.data;
};

export const updateNote = async (note: NoteType) => {
  const response = await axios.put(API_URL + `/update/${note.id}`, note);
  return response.data;
};

export const deleteNote = async (id: string) => {
  const response = await axios.delete(API_URL + `/delete/${id}`);
  return response.data;
};

export const findById = async (id: string) => {
  const response = await axios.get(API_URL + `/findById/${id}`);
  return response.data;
};
