"use client";
import { Card, CardContent } from "@/components/ui/card";
import { UploadCloud } from "lucide-react";
import { useUpload } from "@/context/UploadContext";
import { useImageUploadHandler } from "@/utils/ImageUploadHandler";
import DisplayImage from "./DisplayImage";
import CropImage from "./CropImage";
import DownloadButton from "./DownloadButton";
import VersionHistoryDrawer from "./VersionHistoryDrawer";
import { useEffect } from "react";

// Update the props interface to remove isCropping
interface UploadImageFormProps {
  selectedAspectRatio: number | null;
}

const UploadImageForm: React.FC<UploadImageFormProps> = ({
  selectedAspectRatio,
}) => {
  const {
    setSelectedImageId,
    selectedImageUrl,
    croppedImageUrl,
    selectedImageId,
    setIsCropping,
    isCropping,
  } = useUpload();
  const { handleUpload } = useImageUploadHandler();

  // For debugging
  useEffect(() => {
    console.log("UploadImageForm state:", {
      contextIsCropping: isCropping,
      selectedImageId,
      selectedImageUrl,
    });
  }, [isCropping, selectedImageId, selectedImageUrl]);

  return (
    <div className="flex flex-col space-y-4">
      <Card className="hover:cursor-pointer hover:bg-secondary hover:border-primary transition-all ease-in-out">
        <CardContent className="flex flex-col h-full items-center justify-center px-2 py-24 text-xs">
          {/* Before image upload */}
          {!selectedImageId && (
            <>
              <input
                type="file"
                accept="image/jpeg, image/png"
                className="hidden"
                id="file-upload"
                multiple
                onChange={handleUpload}
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <UploadCloud className="h-10 w-10 text-gray-500" />
                <p className="text-gray-700 text-sm">Click to upload an Image</p>
                <p className="text-muted-foreground text-xs">Supported formats: .jpeg, .png</p>
              </label>
            </>
          )}

          {/* After image upload */}
          {selectedImageUrl && (
            <>
              {isCropping ? (
                <CropImage
                  imageUrl={selectedImageUrl}
                  aspectRatio={selectedAspectRatio}
                  imageId={selectedImageId}
                  isCropping={isCropping}
                  onCropComplete={() => {
                    setIsCropping(false);
                  }}
                />
              ) : (
                <DisplayImage imageUrl={croppedImageUrl || selectedImageUrl} />
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons - Download and History */}
      {selectedImageUrl && !isCropping && (
        <div className="flex justify-end mt-2 space-x-2">
          <VersionHistoryDrawer imageId={selectedImageId} />
          <DownloadButton imageId={selectedImageId} imageUrl={croppedImageUrl || selectedImageUrl} />
        </div>
      )}
    </div>
  );
};

export default UploadImageForm;
