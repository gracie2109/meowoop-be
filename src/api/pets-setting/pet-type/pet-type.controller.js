import { getAllPets, createPetType, deleteManyPets , updatePetType} from "./pet-type.service";

export const searchList = async (req, res) => {
  try {
    const data = await getAllPets(req.body);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



export const createNew = async (req, res) => {
  try {
    console.log('res', req.body)
    const data = await createPetType(req.body);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteController = async (req, res) => {
  try {
    const { ids } = req.body;
    console.log('ids', ids);
    

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'Danh sách ID không hợp lệ' })
    }

    const result = await deleteManyPets(ids)

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
    const data = await updatePetType(req.body);
    res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};