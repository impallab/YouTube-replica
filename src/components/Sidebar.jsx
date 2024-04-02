import React, { useState } from 'react';
// import { HiSwitchHorizontal } from "react-icons/hi";
import { RiHomeHeartLine } from "react-icons/ri";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const sidebarItems = [
  {
    icons: <RiHomeHeartLine />,
    title: "Home",
    path: "/"
  },
  {
    icons: <SiYoutubeshorts />,
    title: "Shorts",
    path: "/shorts"
  },
  {
    icons: <MdOutlineSubscriptions />,
    title: "Subscriptions",
    path: "/subscription"
  },
  {
    icons: <RiHomeHeartLine />,
    title: "Home"
  },
  {
    icons: <SiYoutubeshorts />,
    title: "Shorts"
  },
  {
    icons: <MdOutlineSubscriptions />,
    title: "Subscriptions",
    path: "subscription"
  },
  {
    icons: <RiHomeHeartLine />,
    title: "Home"
  },
  {
    icons: <SiYoutubeshorts />,
    title: "Shorts"
  },
  {
    icons: <MdOutlineSubscriptions />,
    title: "Subscriptions"
  },
  {
    icons: <RiHomeHeartLine />,
    title: "Home"
  },
  {
    icons: <SiYoutubeshorts />,
    title: "Shorts"
  },
  {
    icons: <MdOutlineSubscriptions />,
    title: "Subscriptions"
  },
  {
    icons: <RiHomeHeartLine />,
    title: "Home"
  },
  {
    icons: <MdOutlineSubscriptions />,
    title: "Subscriptions"
  },
  {
    icons: <RiHomeHeartLine />,
    title: "Home"
  },
  {
    icons: <MdOutlineSubscriptions />,
    title: "Subscriptions"
  },
  {
    icons: <RiHomeHeartLine />,
    title: "Home"
  },
  {
    icons: <MdOutlineSubscriptions />,
    title: "Subscriptions"
  },
  {
    icons: <RiHomeHeartLine />,
    title: "Home"
  }
]
const Sidebar = () => {
  const isOpen = useSelector((store) => store.app.isOpen);

  return (
    <div className="fixed top-[59px]  select-none z-10 ">
      <div
        className={`fixed top-0 left-0 h-screen bg-black text-white font-bold transition-all duration-300 ${isOpen ? 'translate-x-0 w-[100vw] xs:w-[60vw] mds:w-[50vw] sm:w-[35vw] md:w-[25vw] lg:w-[17vw]   ' : 'translate-x-0 w-0 md:w-16'
          } relative overflow-hidden`}
      >
        <div
          className={`absolute inset-0 bg-white/40 transition-all duration-1500 ${isOpen ? 'h-full ' : 'h-full'
            } flex justify-center overflow-hidden`}
        >
          <div className={`w-full h-full bg-black/45 waterflow-open`}>
            <div
              className={`water-drop h-[14%] w-[92%] ${isOpen
                ? "border border-cyan-300 rounded-full bg-black shadow shadow-cyan-200"
                : "border border-white rounded-full bg-red-600 shadow-white"
                } absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full opacity-0`}
            ></div>
          </div>
        </div>
        <div
          className={`sidebar overflow-y-auto overflow-x-hidden absolute h-[100vh] ${isOpen ? 'w-full' : 'w-full'
            }`}
        >
          {sidebarItems.map((item, index) => (
            <div key={index} className="flex items-center m-[2vh] my-[5vh]">
              <NavLink to="" className={`text-2xl md:text-2xl lg cursor-pointer `}>
                {item.icons}
              </NavLink>
              <NavLink
                to={item.path}
                className={`ml-5 cursor-pointer md:text-md ${isOpen ? "" : "hidden"}`}
              >
                {item.title}
              </NavLink>
            </div>
          ))}
        </div>
      </div>



      <style>{`
        .waterflow-open {
          animation: waterflow-open 2s ease-in-out forwards;
        }

        .waterflow-close {
          animation: waterflow-close 1s ease-in-out forwards;
        }

        .water-drop {
          animation: water-drop 5s ease-in-out infinite;
        }

        @keyframes waterflow-open {
          0% {
            clip-path: polygon(50% 0, 50% 0, 50% 100%, 50% 100%);
            transform: translateY(-100%);
          }
          100% {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            transform: translateY(0);
          }
        }

        @keyframes waterflow-close {
          0% {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            transform: translateY(0);
          }
          100% {
            clip-path: polygon(50% 100%, 50% 100%, 50% 0, 50% 0);
            transform: translateY(100%);
          }
        }

        @keyframes water-drop {
          0% {
            opacity: 0;
            transform: translate(-50%, -100%) scale(0.5);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, 0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, 100%) scale(0.5);
          }
        }
      `}</style>
    </div>
  );
};

export default Sidebar;