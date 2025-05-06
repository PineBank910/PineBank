//Ene Transactionii utguudiig backend ees avna, Uurchilj bolno
interface TransactionProps {
  date?: string;
  balance?: string;
  amount?: string;
  type?: string;
  reference?: string; // Added the missing 'type' property
}
const Transaction: React.FC<TransactionProps> = ({ date, balance, amount }) => {
  return (
    <>
      <div className="px-6 py-2 border-b ">
        <div className="flex items-center justify-between">
          <div>{date}</div>
          <div className="text-[1.5rem]">₮ {amount}</div>
        </div>
        <div className="flex">
          <div>Үлдэгдэл: {balance}</div>
        </div>
      </div>
    </>
  );
};
export default Transaction;
