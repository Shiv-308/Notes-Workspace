import Notes from "../db/notesSchema.js";
import User from "../db/userSchema.js";
import { zodCreate } from "../types.js";

export const createNotes = async (req, res) => {
  const parseResult = zodCreate.safeParse(req.body);
  if(!parseResult){
    return res.status(404).json({
      errors:parseResult.error.errors,
    })
  }
  const { title, content } = parseResult.data;

  try {
    const createnote = await Notes.create({
      title: title,
      content:content,
      tenantId: req.user.tenantId,
      userId: req.user.userId,
    });

    return res.status(200).json({
      message: "Note has been created successfully!",
      createnote
    });
  } catch (err) {
    return res.json(err.message);
  }
};


//getNotes endpoint
export const getNotes = async (req, res) => {
  try {
    const note = await Notes.find({ tenantId: req.user.tenantId }).populate("userId","email").populate("tenantId","email");
    if (!note) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    return res.json({
      note:note,
    });
  } catch (err) {
    return res.json(err.message);
  }
};



//update endpoint
export const updateNotes = async (req, res) => {
  try {
    const update = await Notes.findOneAndUpdate(
      { _id: req.params.id,tenantId:req.user.tenantId },
      req.body,
      { new: true }
    );
    if (!update) {
      return res.status(404).json({
        message: "Message not found",
      });
    }
    return res.json({
      updateData:update
    });
  } catch (err) {
    return res.json("update",err.message);
  }
};
 

//delete endpoint
export const deleteNotes = async (req, res) => {
  try {
    const deleteNote = await Notes.findOneAndDelete({
      _id: req.params.id,
      tenantId: req.user.tenantId,
    });
    if (!deleteNote) {
      return res.status(404).json({
        message: "Message not found",
      });
    }
    return res.json({
      deleteNote:deleteNote
    });
  } catch (err) {
    return res.json(err.message);
  }
};


export const getUser = async(req,res) => {
  const findUser = await User.find({tenantId:req.user.tenantId})
  console.log(findUser)
  if(!findUser) {
    return res.status(404).json({
      message:"No user has been onborded !"
    });
  }
  return res.status(200).json({
    findUser
  })
}