import { useState } from "react";
import { randomAvatar } from "./utils";
import useSWR from "swr";
import { Data } from "./types";

export default function App() {
  const { data, isLoading, error } = useSWR<Data>("home", () =>
    fetch(`https://ionian-green-basket.glitch.me/data.json`).then((res) =>
      res.json()
    )
  );

  const [currentTab, setCurrentTab] = useState("Tổng");

  if (isLoading || !data)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-8 h-8 rounded-full border-[3px] border-sky-600 border-t-transparent animate-spin"></div>
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
      <div>
        <h1 className="text-3xl md:text-5xl mt-8 mb-4 md:mt-16 md:mb-8">
          Global Ranking
        </h1>
      </div>
      <div className="flex gap-5">
        {data
          ?.sort(
            // @ts-ignore
            (a, b) =>
              // @ts-ignore
              +String(b.points[currentTab]).replace(",", ".") -
              // @ts-ignore
              +String(a.points[currentTab]).replace(",", ".")
          )
          .slice(0, 3)
          .map((item, index) => (
            <div
              key={`${item.name}-${item.class}-${currentTab}`}
              className="flex-grow flex flex-col justify-end items-center"
            >
              <div className="flex flex-col items-center relative pt-[40px]">
                {index === 1 && (
                  <img
                    className="absolute left-1/2 -translate-x-1/2 top-0 w-[54px] h-[46px] z-10"
                    src="/crown.svg"
                    alt=""
                  />
                )}
                <div className="pb-1 relative">
                  <div
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 leading-[16px] text-[12px] h-[16px] w-[16px] text-center text-white ${
                      ["bg-red", "bg-yellow", "bg-orange"][index]
                    } rounded-full box-content`}
                  >
                    {[2, 1, 3][index]}
                  </div>
                  <img
                    src={randomAvatar(`${item.name} ${item.class}`)}
                    className={`${
                      index === 1
                        ? "w-[80px] h-[80px] md:w-[120px] md:h-[120px]"
                        : "w-[60px] h-[60px] md:w-[90px] md:h-[90px]"
                    } rounded-full border-4 ${
                      ["border-red", "border-yellow", "border-orange"][index]
                    }`}
                    alt=""
                  />
                </div>
                <p className="text-center text-lg mt-1">{item.name}</p>
                <h1
                  className={`${
                    ["text-red", "text-yellow", "text-orange"][index]
                  }`}
                >
                  {/* @ts-ignore */}
                  {+String(item.points[currentTab]).replace(",", ".")} exp
                </h1>
              </div>
            </div>
          ))}
      </div>

      <div className="flex gap-2 flex-wrap mt-8 [&_button]:py-[6px] [&_button]:px-3 [&_button]:bg-[#3A3B3C] [&_button]:rounded-md [&_button]:transition">
        {Object.keys(data[0].points).map((item) => (
          <button
            onClick={() => setCurrentTab(item)}
            className={currentTab === item ? "!bg-red" : ""}
          >
            {item}
          </button>
        ))}
      </div>
      <table className="w-full border-separate [&_th]:!text-left border-spacing-y-3 my-5">
        <thead>
          <tr>
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
                        "/equal.png"
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
