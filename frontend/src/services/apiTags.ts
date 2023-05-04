import axios from "axios";
import { TagType } from "../types/TagType";
const API_URL = "http://localhost:3000/tags";

export const getTags = async () => {
  const response = await axios.get(API_URL + "/getAll");
  return response.data;
};

export const createTag = async (tag: TagType) => {
  const response = await axios.post(API_URL + "/create", tag);
  return response.data;
};
