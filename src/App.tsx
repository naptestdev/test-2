import { useState } from "react";
import useSWR from "swr";
import { Data } from "./types";

export default function App() {
  const { data, isLoading, error } = useSWR<Data>("home", () =>
    fetch(`https://ionian-green-basket.glitch.me/data.json`).then((res) =>
      res.json()
    )
  );

  const [currentTab, setCurrentTab] = useState("Tổng");
  const [currentCourse, setCurrentCourse] = useState("Tất cả");

  if (isLoading || !data)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-8 h-8 rounded-full border-[3px] border-white border-t-transparent animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-4xl">Error</h1>
      </div>
    );

  return (
    <div className="w-full max-w-4xl">
      <div className="flex justify-center mt-[17px]">
        <img className="h-[80px] w-auto" src="/mindx-logo.png" alt="" />
      </div>
      <div>
        <h1 className="text-[20px] md:text-[40px] mt-[49px] mb-8 uppercase text-center">
          Bảng xếp hạng tổng
        </h1>
      </div>

      <div className="flex gap-2 flex-wrap items-center mt-8">
        <p>Khoá học: </p>

        {["Tất cả", "Scratch", "Game", "JavaScript"].map((item) => (
          <button
            key={item}
            onClick={() => setCurrentCourse(item)}
            className={`${
              currentCourse === item ? "!bg-white !text-bg" : ""
            } py-1 px-2 bg-[#ffffff1a] rounded-full transition`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap items-center mt-8">
        <p>Buổi học: </p>
        {Object.keys(data[0].points).map((item) => (
          <button
            key={item}
            onClick={() => setCurrentTab(item)}
            className={`${
              currentTab === item ? "!bg-white !text-bg" : ""
            } py-1 px-2 bg-[#ffffff1a] rounded-full transition`}
          >
            {item}
          </button>
        ))}
      </div>
      <table className="w-full border-separate [&_th]:!text-left border-spacing-y-3 my-5">
        <thead>
          <tr className="!text-white">
            <th></th>
            <th>#</th>
            <th></th>
            <th>Badge</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          {data
            .sort(
              (a, b) =>
                // @ts-ignore
                +String(b.points[currentTab]).replace(",", ".") -
                // @ts-ignore
                +String(a.points[currentTab]).replace(",", ".")
            )
            .map((item, index) => (
              <tr
                className="shadow-[0_2px_10px_rgb(0_0_0_/_10%)] rounded-2xl"
                key={`${item.name}-${item.class}`}
              >
                <td>
                  <div className="w-[24px] md:w-[34px] h-[18px] flex justify-end items-center">
                    <img
                      src={
                        // item.newStatus === "up"
                        //   ? "/up.png"
                        //   : item.newStatus === "down"
                        //   ? "/down.png"
                        // :
                        // "/equal.png"
                        "/up.png"
                      }
                      className="w-[18px]"
                      alt=""
                    />
                  </div>
                </td>
                <td>{index + 1}</td>
                <td>
                  <div className="py-1">
                    <p className="!font-semibold text-base md:text-lg">
                      {item.name}
                    </p>
                    <p className="text-sm md:text-base">{item.class}</p>
                  </div>
                </td>
                <td>
                  <div className="w-[24px] h-[24px]">
                    <img
                      className="w-[24px] h-[24px]"
                      src="/medal.png"
                      alt=""
                    />
                  </div>
                </td>
                <td className="!font-semibold text-base md:text-xl">
                  {/* @ts-ignore */}
                  {+String(item.points[currentTab]).replace(",", ".")} exp
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
