import express from 'express';
import { uploadMedia, deleteAsset } from './asset.controller.js';
import { upload } from '../../middleware/upload.middleware.js';
import { ROUTER_PREFIX } from "../../../constants/routePrefix";

const router = express.Router();
router.post(`/${ROUTER_PREFIX.ASSET}/upload`, upload.array('files'), uploadMedia);
router.post(`/${ROUTER_PREFIX.ASSET}/delete`, deleteAsset);

export default router;
