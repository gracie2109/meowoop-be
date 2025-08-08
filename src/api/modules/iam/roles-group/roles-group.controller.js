import {
  getRoleList,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from "./roles-group.services";

/**
 * Lấy danh sách Role (có phân trang & is_detail)
 */
export const getRolesController = async (req, res) => {
  try {
    const {
      page = 1,
      page_size = 10,
      is_detail = "false",
      ...filters
    } = req.query;

    const result = await getRoleList({
      page: Number(page),
      page_size: Number(page_size),
      is_detail: is_detail === "true",
      filter: filters,
    });

    res.status(200).json({
      message: "Lấy danh sách role thành công",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Lấy chi tiết Role theo ID
 */
export const getRoleByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await getRoleById(id);

    if (!role) return res.status(404).json({ message: "Role không tồn tại" });

    res.status(200).json({
      message: "Lấy chi tiết role thành công",
      data: role,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Tạo Role mới
 */
export const createRoleController = async (req, res) => {
  try {
    const newRole = await createRole(req.body);

    res.status(201).json({
      message: "Tạo role thành công",
      data: newRole,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Cập nhật Role
 */
export const updateRoleController = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRole = await updateRole(id, req.body);

    if (!updatedRole)
      return res.status(404).json({ message: "Role không tồn tại" });

    res.status(200).json({
      message: "Cập nhật role thành công",
      data: updatedRole,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Xoá Role
 */
export const deleteRoleController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRole = await deleteRole(id);

    if (!deletedRole)
      return res.status(404).json({ message: "Role không tồn tại" });

    res.status(200).json({
      message: "Xoá role thành công",
      data: deletedRole,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
