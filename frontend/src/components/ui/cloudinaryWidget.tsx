import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import type {
  CloudinaryUploadWidgetResults,
  CloudinaryUploadWidgetInfo,
} from "@cloudinary-util/types";

type CloudinaryProps = {
  avatarImage: string;
  setAvatarImage: React.Dispatch<React.SetStateAction<string>>;
};

const Cloudinary = ({ avatarImage, setAvatarImage }: CloudinaryProps) => {
  const handleSuccess = (results: CloudinaryUploadWidgetResults) => {
    if (results.event === "success" && typeof results.info !== "string") {
      const info = results.info as CloudinaryUploadWidgetInfo;
      setAvatarImage(info.secure_url);
    }
  };

  return (
    <div>
      <CldUploadWidget
        uploadPreset="ml_default" // Ensure this is the correct preset
        onSuccess={handleSuccess}
      >
        {({ open }) => (
          <button type="button" onClick={() => open()}>
            Зураг оруулах
          </button>
        )}
      </CldUploadWidget>
      {avatarImage && (
        <div className="mt-4">
          <Image
            src={avatarImage}
            alt="Uploaded Avatar"
            width={160}
            height={160}
            className="absolute rounded-full w-full h-full top-0 left-0 object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default Cloudinary;
