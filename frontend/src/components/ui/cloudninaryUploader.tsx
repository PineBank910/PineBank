import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import type {
  CloudinaryUploadWidgetResults,
  CloudinaryUploadWidgetInfo,
} from "@cloudinary-util/types";
import { Button } from "@/components/ui/button";

type CloudinaryUploaderProps = {
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
};

const CloudinaryUploader = ({ image, setImage }: CloudinaryUploaderProps) => {
  const handleSuccess = (results: CloudinaryUploadWidgetResults) => {
    if (results.event === "success" && typeof results.info !== "string") {
      const info = results.info as CloudinaryUploadWidgetInfo;
      setImage(info.secure_url);
    }
  };

  return (
    <div className="flex w-full items-center gap-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow">
      <div className="relative w-40 h-40 border border-gray-300 dark:border-gray-600 rounded-2xl overflow-hidden bg-white dark:bg-gray-700">
        {image ? (
          <Image
            src={image}
            alt="Profile"
            layout="fill"
            objectFit="cover"
            className="rounded-es-none"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400 dark:text-gray-300">
            Зураг байхгүй байна
          </div>
        )}
      </div>
      <div>
        <CldUploadWidget
          uploadPreset="ml_default"
          options={{
            cropping: true,
            croppingAspectRatio: 1,
            showSkipCropButton: false,
            styles: {
              palette: {
                window: "#ffffff",
                sourceBg: "#f4f4f4",
                windowBorder: "#90a0b3",
                tabIcon: "#0078ff",
                inactiveTabIcon: "#69778a",
                menuIcons: "#0078ff",
                link: "#0078ff",
                action: "#0078ff",
                inProgress: "#0078ff",
                complete: "#20b832",
                error: "#c43737",
                textDark: "#000000",
                textLight: "#ffffff",
              },
              fonts: {
                default: null,
                "'Fira Sans', sans-serif": {
                  url: "https://fonts.googleapis.com/css?family=Fira+Sans",
                  active: true,
                },
              },
            },
          }}
          onSuccess={handleSuccess}
        >
          {({ open }) => (
            <Button
              type="button"
              onClick={() => open()}
              className="px-4 py-2 text-white  dark:text-black dark:bg-gray-200"
            >
              Зураг солих
            </Button>
          )}
        </CldUploadWidget>
      </div>
    </div>
  );
};

export default CloudinaryUploader;
