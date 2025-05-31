import PetServiceSv from "./pet-weight.services";

export const createNew = async (req, res) => {
  try {
    const data = await PetServiceSv.create(req.body);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};




export const searchList = async (req, res) => {
  try {
    const data = await PetServiceSv.getAll(req.body);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
