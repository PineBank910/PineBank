//Ene Transactionii utguudiig backend ees avna, Uurchilj bolno
const Transaction = ({
  date = "",
  balance = "",
  account = "",
  type = "",
  amount = "",
  reference = "",
  senderAccount = "",
}) => {
  return (
    <>
      <div className="px-6 py-2 border-b ">
        <div className="flex justify-between items-center">
          <div>{date}</div>
          <div className="text-[1.5rem]">{amount}₮</div>
        </div>
        <div className="flex">
          <div>Үлдэгдэл: {balance}</div>
        </div>
      </div>
    </>
  );
};
export default Transaction;
