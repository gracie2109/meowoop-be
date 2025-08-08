import Role from "./roles-group.schema"; // đường dẫn tới model Role

/**
 * Lấy danh sách Role (có phân trang nếu cần)
 * @param {Object} query
 * @param {Number} page
 * @param {Number} limit
 */
export const getRoles = async ({ query = {}, page = 1, limit = 10 }) => {
  try {
    const options = {
      page,
      limit,
      lean: true,
      leanWithId: false,
      populate: {
        path: "resource_actions",
        select: "name code description", // tuỳ chọn select field
      },
    };
    return await Role.paginate(query, options);
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Lấy chi tiết Role theo ID
 * @param {String} id
 */
export const getRoleById = async (id) => {
  try {
    const role = await Role.findById(id)
      .populate("resource_actions", "name code description")
      .lean({ virtuals: true });
    return role;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Tạo Role mới
 * @param {Object} data
 */
export const createRole = async (data) => {
  try {
    const { name, description, status, resource_actions } = data;

    const existRole = await Role.findOne({ where: { name } });
    if (existRole) {
      throw new Error('Role name already exists');
    }

    console.log('res', resource_actions);

    const newRole = await Role.create({
      name,
      description,
      status,
      resource_actions,
    });

    return newRole;
  } catch (err) {
    throw new Error(err.message);
  }
};


/**
 * Cập nhật Role theo ID
 * @param {String} id
 * @param {Object} data
 */
export const updateRole = async (id, data) => {
  try {
    const updatedRole = await Role.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate("resource_actions", "name code description");

    return updatedRole;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Xóa Role theo ID
 * @param {String} id
 */
export const deleteRole = async (id) => {
  try {
    const deletedRole = await Role.findByIdAndDelete(id);
    return deletedRole;
  } catch (err) {
    throw new Error(err.message);
  }
};


export const getRoleList = async ({
  page = 1,
  page_size = 10,
  is_detail = false,
  filter = {},
}) => {
  try {
    const query = { ...filter };

    const options = {
      page,
      limit: page_size,
      lean: true,
      leanWithId: false,
    };

    // Nếu yêu cầu chi tiết thì populate resource_actions
    if (is_detail) {
      options.populate = {
        path: "resource_actions",
       
      };
    }

    const result = await Role.paginate(query, options);

    return {
      totalRecord: result.totalDocs,
      data: result.docs,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};