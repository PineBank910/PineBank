import React from "react";

const BankCard = ({
  cardType = "Debit or Credit",
  bankName = "Bank Name",
  cardNumber = "**** **** **** 1234",
  cardHolder = "John Doe",
  expiry = "12/25",
  bgColor = "bg-gradient-to-r from-purple-500 to-indigo-600",
}) => {
  return (
    <div
      className={`w-80 min-w-80 h-48 rounded-2xl shadow-lg text-white p-6 flex flex-col justify-between ${bgColor}`}>
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold">{bankName}</div>
        <div className="text-lg font-bold">{cardType}</div>
        <div className="text-sm">💳</div>
      </div>
      <div className="text-xl tracking-widest font-mono">{cardNumber}</div>
      <div className="flex justify-between text-sm">
        <div>
          <div className="uppercase text-xs">Card Holder</div>
          <div>{cardHolder}</div>
        </div>
        <div>
          <div className="uppercase text-xs">Expires</div>
          <div>{expiry}</div>
        </div>
      </div>
    </div>
  );
};

export default BankCard;
