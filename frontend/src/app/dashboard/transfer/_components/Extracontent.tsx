import { Label } from "@/components/ui/label";
export function ExtraContent() {
  return (
    <div className="mt-4">
      <Label
        htmlFor="reference"
        className="font-medium text-gray-700 dark:text-gray-300 text-xs"
      >
        <span className="text-red-600">*</span> Гүйлгээний загвар
      </Label>
      <input
        id="amount"
        //   value={formatAmount(amount)}
        //   onChange={handleAmountChange}
        className="border-0 border-b w-full mt-2 border-gray-300 dark:border-gray-500 rounded-none focus:outline-none focus:ring-0 focus:border-black hover:border-black bg-transparent text-gray-900 dark:text-white duration-500"
      />
    </div>
  );
}
