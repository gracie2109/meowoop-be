import express from "express";
import * as AddressControllder from "./address.controller";
import { ROUTER_PREFIX } from "../../../constants/routePrefix";


const router = express.Router();
router.post(`/${ROUTER_PREFIX.ADDRESS}/get-providers`, AddressControllder.getProviderController);
router.post(`/${ROUTER_PREFIX.ADDRESS}/get-districs`, AddressControllder.getDistrictController);
router.post(`/${ROUTER_PREFIX.ADDRESS}/get-wards`, AddressControllder.getWardController);

router.post(`/${ROUTER_PREFIX.ADDRESS}/create-address`, AddressControllder.createUserAddressController);
router.post(`/${ROUTER_PREFIX.ADDRESS}/search-address`, AddressControllder.searchAddressControllder);
router.delete(`/${ROUTER_PREFIX.ADDRESS}/:id`, AddressControllder.deleteAddressController);
router.patch(`/${ROUTER_PREFIX.ADDRESS}/:id`, AddressControllder.updateAddressController);




export default router;
