import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import type {
  CloudinaryUploadWidgetResults,
  CloudinaryUploadWidgetInfo,
} from "@cloudinary-util/types";

type CloudinaryProps = {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
};

const Cloudinary = ({ image, setImage }: CloudinaryProps) => {
  const handleSuccess = (results: CloudinaryUploadWidgetResults) => {
    if (results.event === "success" && typeof results.info !== "string") {
      const info = results.info as CloudinaryUploadWidgetInfo;
      setImage(info.secure_url);
    }
  };

  return (
    <div>
      <CldUploadWidget uploadPreset="ml_default" onSuccess={handleSuccess}>
        {({ open }) => (
          <button type="button" onClick={() => open()}>
            Зураг оруулах
          </button>
        )}
      </CldUploadWidget>
      {image && (
        <div className="mt-4">
          <Image
            src={image}
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
