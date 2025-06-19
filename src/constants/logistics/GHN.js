export const GHN_INSTANCE = {
  PRODUCTION: "https://online-gateway.ghn.vn",
  TEST: "https://dev-online-gateway.ghn.vn",
};


export const GHN_API_LIST = (instance = GHN_INSTANCE.TEST) => ({
  // Address APIs
  getDistrict: `${instance}/shiip/public-api/master-data/district`,
  getWard: `${instance}/shiip/public-api/master-data/ward?district_id`,
  getProvince: `${instance}/shiip/public-api/master-data/province`,

  // Fee calculation
  getFeeOfOrderInfo: `${instance}/shiip/public-api/v2/shipping-order/soc`,
  calcFee: `${instance}/shiip/public-api/v2/shipping-order/fee`,

  // Service
  getService: `${instance}/shiip/public-api/v2/shipping-order/available-services`,

  // Order
  updateOrder: `${instance}/shiip/public-api/v2/shipping-order/update`,
  cancelOrder: `${instance}/shiip/public-api/v2/switch-status/cancel`,
  returnOrder: `${instance}/shiip/public-api/v2/switch-status/return`,
  printOrder: `${instance}/shiip/public-api/v2/a5/gen-token`,
  getOrderInfo: `${instance}/shiip/public-api/v2/shipping-order/detail`,
  deliveryAgain: `${instance}/shiip/public-api/v2/switch-status/storing`,
  updateCODofOrder: `${instance}/shiip/public-api/v2/shipping-order/updateCOD `,
  createOrder: `${instance}/shiip/public-api/v2/shipping-order/create `,
  getPickShift: `${instance}/shiip/public-api/v2/shift/date `,
});

