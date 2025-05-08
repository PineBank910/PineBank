import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { ExtraContent } from "./Extracontent";

export default function SwitchDemo() {
  const [isSwitchChecked, setIsSwitchChecked] = useState(false);

  const handleSwitchChange = () => {
    setIsSwitchChecked(!isSwitchChecked);
  };

  return (
    <div className="w-full">
      <label className="flex items-center space-x-2">
        <Switch
          checked={isSwitchChecked}
          onCheckedChange={handleSwitchChange}
        />
        <span className="text-xs font-bold text-black dark:text-white ">
          Загвар хадгалах
        </span>
      </label>

      {isSwitchChecked && <ExtraContent />}
    </div>
  );
}
