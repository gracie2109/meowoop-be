import PetServiceSv from "./pet-service.services";

export const createNew = async (req, res) => {
  try {
    const data = await PetServiceSv.createPetService(req.body);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



export const updateService = async (req, res) => {
  try {
    const data = await PetServiceSv.updatePetService(req.body);
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




export const getServiceDetail = async (req, res) => {
  try {
    const data = await PetServiceSv.getDetailService(req.body);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
