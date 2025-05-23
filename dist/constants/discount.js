"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discount_type2 = exports.discount_conditions = exports.discount_allocation = exports.defaultRule = void 0;
var defaultRule = exports.defaultRule = [{
  type: 'percentage',
  desc: "discount applied in % "
}, {
  type: 'fixed amount',
  desc: "discount in whole numbers"
}];

// export const discount_type = [
//     {
//         name: "percentage",
//         desc: "Discount applied in %",
//         id: 'percentage'
//     },
//     {
//         name: "fixed amount",
//         desc: "Discount in whole numberzs",
//         id: 'amount',
//         children:[
//             {
//                 name: "Total amount",
//                 desc:"Apply to the total amount",
//                 id: 'total_amount',
//             },
//             {
//                 name: "Item specific",
//                 desc:"Apply to every allowed item",
//                 id: 'item_specific',
//             }
//
//         ]
//     }
// ];

var discount_conditions = exports.discount_conditions = {
  PRODUCTS: "products",
  CUSTOMER_GROUPS: "customer_group",
  SERVICES: "services"
};
var discount_type2 = exports.discount_type2 = {
  PERCENTAGE: "percentage",
  AMOUNT: "amount"
};
var discount_allocation = exports.discount_allocation = {
  TOTAL_AMOUNT: "total_amount",
  ITEM_SPECIFIC: "item_specific"
};