"use client";

const Dashboard = () => {
  return (
    <>
      <div className="pl-[25px] lg:pl-[40px] mt-6 text-[#343C6A] dark:text-[white] flex flex-wrap gap-7   ">
        <div>
          <p className="font-semibold text-lg">My cards</p>
          <div className="mt-5 flex gap-7 ">
            {/* card geed component gargii */}
            <div className=" w-[265px] h-[170px] lg:w-[350px] lg:h-[235px] bg-amber-300 rounded-[15px]">
              text
            </div>
            <div className=" w-[265px] h-[170px] lg:w-[350px] lg:h-[235px] bg-amber-300 rounded-[15px]">
              text
            </div>
          </div>
        </div>
        <div className="min-w-3xs ">
          {/* {Transaction component gargii} */}
          <p className="font-semibold text-lg">Recent transactions</p>
          <div className="w-full rounded-2xl bg-white dark:bg-gray-800 ">
            <div className="w-full h-12  ">Some transactions here</div>
            <div className="w-full h-12  ">Some transactions here</div>
            <div className="w-full h-12  ">Some transactions here</div>
            <div className="w-full h-12  ">Some transactions here</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
