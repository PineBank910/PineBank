import { useVisibility } from "@/context/visibilityContext";

interface TransactionProps {
  date?: string;
  balance?: string;
  amount?: string;
  type?: string;
  reference?: string;
  fromAccountId?: string;
  toAccountId?: string;
}

const Transaction: React.FC<TransactionProps> = ({ date, balance, amount, reference, type }) => {
  const { isVisible } = useVisibility();
  return (
    <>
      <div className="px-6 py-2 border-b flex justify-between items-center">
        <div className="flex flex-col">
          <div>{date}</div>
          <div>{reference}</div>
        </div>
        <div className="flex flex-col">
          {isVisible ? (
            <div>
              <div className={
                `text-[1.5rem] ${type === "CREDIT" ? "text-green-500" : "text-red-500"}`
              }>

                {type === "CREDIT" ? "+" : "-"} {amount}
              </div>
              <div>Үлд: {balance}</div>
            </div>
          ) : (
            <div>
              <div className="text-[1.5rem]">****</div>
              <div>Үлд: **** </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Transaction;
