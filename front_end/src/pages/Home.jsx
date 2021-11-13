import React, { useEffect } from "react";
import SideBar from "../components/SideBar";
import { Announcement, Post } from "../components";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [history, user]);

  return (
    <div className="flex h-screen w-full bg-gray-800 ">
      <SideBar></SideBar>
      <div className="flex flex-col flex-1 w-full overflow-y-auto">
        <main className="relative z-0 flex-1 px-6 bg-white">
          <div className="grid mt-4">
            <div className="mb-2">
              <p className="text-lg font-semibold text-gray-400">Dashboard</p>
            </div>
            <div className="grid grid-cols-12 gap-6 border-b-2">
              <div className="col-span-12 sm:col-span-12 md:col-span-8 lg:col-span-8 xxl:col-span-8">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4 mt-3">
                  <div className="p-4">
                    <p className="text-xl font-bold">RM 45,941</p>
                    <p className="text-xs font-semibold text-gray-400">
                      Overdue
                    </p>
                  </div>
                  <div className="p-4">
                    <p className="text-xl font-bold">RM 37,500</p>
                    <p className="text-xs font-semibold text-gray-400">
                      Total Outstanding
                    </p>
                  </div>
                  <div className="p-4">
                    <p className="text-xl font-bold">RM 9,200</p>
                    <p className="text-xs font-semibold text-gray-400">
                      In Process
                    </p>
                  </div>
                  <div className=" p-4">
                    <p className="text-xl font-bold">RM 5,700</p>
                    <p className="text-xs font-semibold text-gray-400">
                      Paid Today
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-4">
                <div className="p-4">
                  <p className="text-sm text-gray-400">Outstanding Revenue</p>
                  <div className="shadow w-full bg-gray-100 mt-2">
                    <div className="bg-red-600 text-xs leading-none py-1 text-center text-white w-1/2"></div>
                  </div>
                  <p className="text-xs font-semibold text-gray-400 mt-2">
                    RM 45,941 Overdue
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-3 flex">
              <div className="w-2/3 hide-scroll-bar h-screen overflow-x-auto px-20">
                <Post></Post>
                <hr />
                <Post></Post>
                <hr />
                <Post></Post>
                <hr />
                <Post></Post>
                <hr />
                <Post></Post>
                <hr />
                <Post></Post>
                <hr />
                <Post></Post>
                <hr />
                <Post></Post>
                <hr />
                <Post></Post>
                <hr />
              </div>
              <div className="w-1/3 px-2 hide-scroll-bar h-screen overflow-x-auto">
                <Announcement></Announcement>
                <hr />
                <Announcement></Announcement>
                <hr />
                <Announcement></Announcement>
                <hr />
                <Announcement></Announcement>
                <hr />
                <Announcement></Announcement>
                <hr />
                <Announcement></Announcement>
                <hr />
                <Announcement></Announcement>
                <hr />
                <Announcement></Announcement>
                <hr />
                <Announcement></Announcement>
                <hr />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
