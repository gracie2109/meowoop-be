import PetWeightModal from "../pet-weight/pet-weight.schema";


export const create = async (payload) => {
  const data = payload.data.map(i => ({
    key: i
  }))
  const newPetType = await PetWeightModal.insertMany(data);

  return newPetType
};

export const getAll = async (payload) => {

  const result = await PetWeightModal.find();

  return result.map(i => ({
    key: i.key,
    id: i._id
  }))
};  

export default { create, getAll };

