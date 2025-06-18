import { deleteMedia, uploadMediaToCloudinary } from "./asset.service.js";

export const uploadMedia = async (req, res) => {
  try {
    const files = req.files;
    const folderName = req.body.folder || "noname";

    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }

    const uploadResults = await Promise.all(
      files.map((file) =>
        uploadMediaToCloudinary(file.buffer, file.originalname, folderName)
      )
    );

    const successfulUploads = uploadResults.filter((result) => result !== null);

    res.status(200).json({
      success: true,
      message: `${successfulUploads.length}/${files.length} files uploaded successfully`,
      data: successfulUploads.map((file) => ({
        url: file.url,
        public_id: file.public_id,
        type: file.resource_type,
        folder: file.folder,
        original_name: file.original_name,
      })),
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};


export const deleteAsset = async (req, res) => {
  try {
    const { publicId, resourceType = "image" } = req.body;
    await deleteMedia(publicId, resourceType);
    res.status(200).json({
      success: true,
      message: "deleete success",
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};
