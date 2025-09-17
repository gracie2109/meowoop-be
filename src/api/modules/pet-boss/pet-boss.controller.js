import {
  searchPetBoss,
  createBoss, 
  deleteBoss
} from "./pet-boss.service";


export const searchBoss = async (req, res) => {
  try {
    const data = await searchPetBoss(req.body);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createBossController = async (req, res) => {
  try {
    const boss = await createBoss(req.body);
    res.status(201).json({ success: true, data: boss });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteBossCtrl = async (req, res) => {
  try {
    const boss = await deleteBoss(req.params);
    res.status(201).json({ success: true, data: boss });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};