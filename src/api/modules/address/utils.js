export const AddressLevel = {
  LEVEL_1: 1,
  LEVEL_2: 2,
  LEVEL_3: 3,
};

export const getFieldGHN = (level) => {
  const fieldCode =
    level === AddressLevel.LEVEL_1
      ? "ProvinceID"
      : level === AddressLevel.LEVEL_2
      ? "DistrictID"
      : "WardCode";
  const fieldName =
    level === AddressLevel.LEVEL_1
      ? "ProvinceName"
      : level === AddressLevel.LEVEL_2
      ? "DistrictName"
      : "WardName";

  return {
    fieldCode,
    fieldName,
  };
};

export const getProfielData = (level, item) => {
  if (level === AddressLevel.LEVEL_2) {
    return {
      provider_id: String(item.ProvinceID),
    };
  }
  if (level === AddressLevel.LEVEL_3) {
    return {
      district_id: String(item.DistrictID),
    };
  }
  if (level === AddressLevel.LEVEL_1) {
    return;
  }
};
export function tranformAddressProvider(data, level) {
  if (!data) return [];
  const { fieldCode, fieldName } = getFieldGHN(level);
  return data?.map((i) => ({
    ...getProfielData(level, i),
    code: String(i[fieldCode]),
    name: i[fieldName],
    level,
  }));
}
