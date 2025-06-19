// Viết tất cả các service lấy địa chỉ của các đơn vị vận chuyển vào đây

import { GHN_API_LIST, GHN_INSTANCE } from "../../../constants/logistics/GHN";
import "dotenv/config";
import AppConfig from "../../../configs/app.config";

const GHN_shopId = process.env.GHN_SHOP_ID;
const GHN_tokenApi = process.env.GHN_TOKEN_API;
const isProducttion = AppConfig.isProductionMode;

export const getGHNInstance = () => {
  return !isProducttion ? GHN_INSTANCE.PRODUCTION : GHN_INSTANCE.TEST;
};

export async function getGHNProvice() {
  const controller = new AbortController();
  const signal = controller.signal;
  const instance = getGHNInstance();
  const url = GHN_API_LIST(instance).getProvince;

  try {
    const response = await fetch(url, {
      method: "GET",
      signal,
      headers: {
        "Content-Type": "application/json",
        Token: GHN_tokenApi,
      },
    });

    if (response.ok) {
      const { data } = await response.json();
      return data;
    } else {
      console.error(`GHN API error: ${response.status} ${response.statusText}`);
      return null;
    }
  } catch (error) {
    console.error("Fetch GHN Province failed:", error);
    return null;
  }
}

export async function getGHNDistric(providerId) {
  const controller = new AbortController();
  const signal = controller.signal;
  const instance = getGHNInstance();
  const url = GHN_API_LIST(instance).getDistrict;

  try {
    if (providerId) {
      const response = await fetch(url, {
        method: "GET",
        signal,
        headers: {
          "Content-Type": "application/json",
          token: GHN_tokenApi,
          province_id: +providerId,
        },
      });

      if (response.ok) {
        const { data } = await response.json();
        return data;
      } else {
        console.error(
          `GHN API error: ${response.status} ${response.statusText}`
        );
        return null;
      }
    }
  } catch (error) {
    console.error("Fetch GHN Province failed:", error);
    return null;
  }
}

export async function getGHNDWard(districtId) {
  const controller = new AbortController();
  const signal = controller.signal;
  const instance = getGHNInstance();
  const url = GHN_API_LIST(instance).getWard;

  try {
    if (districtId) {
      const response = await fetch(url, {
        method: "POST",
        signal,
        headers: {
          "Content-Type": "application/json",
          token: GHN_tokenApi,
        },
        body: JSON.stringify({ district_id: +districtId }),
      });

      if (response.ok) {
        const { data } = await response.json();
        return data;
      } else {
        throw new Error(
          `GHN API error: ${response.status} ${response.statusText}`
        );
      }
    }
  } catch (error) {
    throw new Error(`GHN API error: ${response.status} ${response.statusText}`);
  }
}
