import * as ServicePrice from "./service-price.services";



export const createNew = async (req, res) => {
  try {
    const data = await ServicePrice.createPetServicePrice(req.body);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



export const getDetail = async (req, res) => {
  try {
    const data = await ServicePrice.getPetServicePriceDetail(req.body);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};