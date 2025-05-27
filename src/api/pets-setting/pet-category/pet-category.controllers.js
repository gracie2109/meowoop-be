import { getAll, createData, deleteData,updateData} from "./pet-category.services";

export const searchList = async (req, res) => {
  try {
    const data = await getAll(req.body);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



export const createNew = async (req, res) => {
  try {
    console.log('res', req.body)
    const data = await createData(req.body);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteController = async (req, res) => {
  try {
    const { ids } = req.body;
    

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'Danh sách ID không hợp lệ' })
    }

    const result = await deleteData(ids)

    return res.status(200).json({
      message: 'Xóa thành công',
      result,
    })
  } catch (error) {
    console.error('Lỗi xoá user:', error)
    return res.status(500).json({ message: 'Đã có lỗi xảy ra' })
  }
}


export const update = async (req, res) => {
  try {
    console.log('res', req.body)
    const data = await updateData(req.body);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};