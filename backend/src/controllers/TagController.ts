import { Request, Response } from "express";
import { Tag } from "../models/Tag";

const getAll = async (req: Request, res: Response) => {
  const Tags = await Tag.findAll();
  res.status(200).json(Tags);
};

const createTag = async (req: Request, res: Response) => {
  const tag = req.body;
  const newTag = await Tag.findOne({ where: { id: tag.id } });
  if (!newTag) {
    await Tag.create(tag);
    res.status(200).json({ message: "Tag created successfully" });
  } else {
    res.status(400).json({ message: "Tag already exists" });
  }
};

export default { createTag, getAll };
