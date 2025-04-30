"use client";

const Dashboard = () => {
  return (
    <>
      <div className="pl-[25px] lg:pl-[40px] mt-6 text-[#343C6A] dark:text-[white] flex flex-wrap gap-7   ">
        <div>
          <p className="font-semibold text-lg">Миний данс </p>
          <div className="w-[300px] h-[150px] border">
            <div className="text-center">9911223344</div>
          </div>
        </div>
        <div>
          <p className="font-semibold text-lg">My cards</p>
          <div className="mt-5 flex gap-7 ">
            {/* card geed component gargii */}
            <div className=" w-[265px] h-[170px] lg:w-[350px] lg:h-[235px] border rounded-[15px] flex justify-center items-center cursor-pointer">
              + Create a card
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
