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
      <div className="p-6">
        <div className="flex justify-between">
          <div>{date}</div>
          <div>{amount}₮</div>
        </div>
        <div className="flex">
          <div>Үлдэгдэл: {balance}</div>
        </div>
      </div>
    </>
  );
};
export default Transaction;
