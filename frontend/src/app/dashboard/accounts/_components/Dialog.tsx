import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          {" "}
          <Plus /> Шинэ данс нээх
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex justify-center text-sm uppercase">
            Дансны төрөл сонгоно уу
          </DialogTitle>
          <DialogDescription className="flex justify-center text-center text-xs">
            Данс нээх онлайн гэрээ таны бүртгэлтэй и-мэйл хаяг руу илгээгдэх тул
            и-мэйл хаягаа тохиргоо цэсээр орж зөв эсэхийг шалгана уу.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-center justify-center gap-5">
            <button className="flex items-center justify-center border-t  shadow-xl text-gray-800 dark:border-gray-200 dark:text-gray-200 px-4 py-2 rounded-md hover:bg-gray-800 hover:text-white dark:hover:bg-gray-200 dark:hover:text-gray-900 transition duration-500 w-[262px]">
              Харилцах данс
            </button>
            <button className="flex items-center justify-center border-t  shadow-xl text-gray-800 dark:border-gray-200 dark:text-gray-200 px-4 py-2 rounded-md hover:bg-gray-800 hover:text-white dark:hover:bg-gray-200 dark:hover:text-gray-900 transition duration-500 w-[262px]">
              Хугацаагүй хадгаламж
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
