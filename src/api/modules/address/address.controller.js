import {
  getProvider,
  getDistric,
  getWard,
  createUserAddress,
  searchAddress
} from "./address.service";
import { LOGISTIC_COMP_KEY } from "../../../constants/logistics/index";

export const getProviderController = async (req, res) => {
  try {
    const logicticKey = req?.logicticKey ?? LOGISTIC_COMP_KEY.GHN;
    const data = await getProvider(logicticKey);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getDistrictController = async (req, res) => {
  try {
    const logicticKey = req?.logicticKey ?? LOGISTIC_COMP_KEY.GHN;
    const { providerId } = req.body;

    const data = await getDistric(logicticKey, providerId);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getWardController = async (req, res) => {
  try {
    const logicticKey = req?.logicticKey ?? LOGISTIC_COMP_KEY.GHN;
    const { districId } = req.body;
    console.log("districId", districId);

    const data = await getWard(logicticKey, districId);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const createUserAddressController = async (req, res) => {
  try {
    const data = await createUserAddress(req.body);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
export const searchAddressControllder = async (req, res) => {
  try {
    const data = await searchAddress(req.body);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
