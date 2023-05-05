import { Request, Response } from "express";
import { Note } from "../models/Note";

const getAll = async (req: Request, res: Response) => {
  //find all notes from database
  //with all the tags
  const notes = await Note.findAll();
  res.status(200).json(notes);
};

const createNote = async (req: Request, res: Response) => {
  try {
    const note = req.body;
    //if note doesnt exist, create it
    //also create all the tags
    const newNote = await Note.findOne({ where: { id: note.id } });
    if (!newNote) {
      const createdNote = await Note.create(req.body);
      res.status(200).json({ message: "Note created successfully" });
    } else {
      res.status(400).json({ message: "Note already exists" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateNote = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const note = req.body;
    //if note exists, update it
    const newNote = await Note.findOne({ where: { id: id } });
    if (newNote) {
      newNote!.lastModified = new Date();
      await Note.update(note, { where: { id: id } });
      res.status(200).json({ message: "Note updated successfully" });
    } else {
      res.status(400).json({ message: "Note doesn't exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteNote = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const note = req.body;
    //if note exists, delete it
    const newNote = await Note.findOne({ where: { id: id } });
    if (newNote) {
      await Note.destroy({ where: { id: id } });
      res.status(200).json({ message: "Note deleted successfully" });
    } else {
      res.status(400).json({ message: "Note doesn't exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const findById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const newNote = await Note.findOne({ where: { id: id } });
    if (newNote) {
      res.status(200).json(newNote);
    } else {
      res.status(400).json({ message: "Note doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default { createNote, updateNote, deleteNote, getAll, findById };
