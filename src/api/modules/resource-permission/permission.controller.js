import {
  upsertResourceAndPermission,
  getResourceDetail,
  getAllResourceDetails,
} from "./permission.services";
import { actionList } from "../../../constants/permission";

// for admin only
export const upsertResourceAndPermissionController = async (req, res) => {
  try {
    await upsertResourceAndPermission(req.body);
    const data = await getAllResourceDetails();

    res.render("permissions", {
      actions: actionList,
      resources: data,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getResourceDetailCtl = async (req, res) => {
  try {
    const data = await getResourceDetail(req.body);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getListResource = async (req, res) => {
  try {
    const data = await getAllResourceDetails();
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
