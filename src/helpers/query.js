import User from "../api/modules/user/user.schema.js";

export async function findCustomer(payload) {
  const conditions = [];
  
  if (payload?.name) {
    conditions.push({ name: payload.name });
  }
  if (payload?.email) {
    conditions.push({ email: payload.email });
  }
  if (payload?.phone_number) {
    conditions.push({ phone_number: payload.phone_number });
  }

  if (conditions.length === 0) {
    return null;
  }

  const existedUser = await User.findOne({
    $or: conditions
  });

  // Debug: Log để xem field nào bị trùng
  if (existedUser) {
    console.log("====================================");
    console.log("FOUND EXISTING USER:");
    console.log("Payload:", {
      name: payload?.name,
      email: payload?.email,
      phone_number: payload?.phone_number
    });
    console.log("Existing user:", {
      _id: existedUser._id,
      name: existedUser.name,
      email: existedUser.email,
      phone_number: existedUser.phone_number
    });
    
    // Check từng field để xem field nào match
    const matches = [];
    if (payload?.name && existedUser.name === payload.name) matches.push('name');
    if (payload?.email && existedUser.email === payload.email) matches.push('email');
    if (payload?.phone_number && existedUser.phone_number === payload.phone_number) matches.push('phone_number');
    
    console.log("Matched fields:", matches);
    console.log("====================================");
  }
  
  return existedUser;
}
