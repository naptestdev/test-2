import { useState } from "react";
import useSWR from "swr";
import { Data } from "./types";

export default function App() {
  const { data, isLoading, error } = useSWR<Data>("home", () =>
    fetch(`https://ionian-green-basket.glitch.me/data-ver2.json`).then((res) =>
      res.json()
    )
  );

  const [currentTab, setCurrentTab] = useState("1");
  const [currentCourse, setCurrentCourse] = useState("Tất cả");
  const [searchKeyword, setSearchKeyword] = useState("");

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
    <div className="w-full max-w-[1196px]">
      <div className="flex justify-center mt-[17px]">
        <img className="h-[80px] w-auto" src="/mindx-logo.png" alt="" />
      </div>
      <div>
        <h1 className="text-[20px] md:text-[40px] my-[30px] md:my-[56px] uppercase text-center">
          Bảng xếp hạng tổng
        </h1>
      </div>

      <div className="flex flex-wrap justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <p>Khoá học: </p>

          <div className="flex flex-wrap items-center bg-[#ffffff1a] rounded-full">
            {["Tất cả", "Scratch", "Game", "JavaScript"].map((item) => (
              <button
                key={item}
                onClick={() => setCurrentCourse(item)}
                className={`${
                  currentCourse === item ? "!bg-white !text-bg" : ""
                } py-[2px] px-2 rounded-full transition`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <p>Buổi học: </p>
          <div className="flex flex-wrap items-center bg-[#ffffff1a] rounded-full">
            {Object.keys(data[0].points).map((item) => (
              <button
                key={item}
                onClick={() => setCurrentTab(item)}
                className={`${
                  currentTab === item ? "!bg-white !text-bg" : ""
                } py-[2px] px-2 rounded-full transition`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="relative">
            <img
              className="absolute top-1/2 -translate-y-1/2 left-2 w-[14px] h-[14px]"
              src="/search.svg"
              alt=""
            />
            <input
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-[236px] border border-white rounded-full py-[2px] pl-7 pr-8 bg-transparent placeholder:text-[#ffffff80] outline-none"
              type="text"
              placeholder="Tìm kiếm..."
            />
            {!!searchKeyword && (
              <img
                onClick={() => setSearchKeyword("")}
                className="absolute top-1/2 -translate-y-1/2 right-2 w-[26px] h-[26px] cursor-pointer"
                src="/x.svg"
                alt=""
              />
            )}
          </div>
        </div>
      </div>

      <table className="w-full [&_th]:!text-left my-5">
        <thead>
          <tr className="!text-white">
            <th className="pl-[3vw] md:pl-[10vw] py-2">#</th>
            <th>Khoá học</th>
            <th>Tên học viên</th>
            <th>Mã lớp</th>
            <th>Huy hiệu</th>
            <th className="pr-[3vw] md:pr-[10vw]">Điểm</th>
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
                className={`rounded-2xl ${
                  !searchKeyword ||
                  item.name
                    .toLowerCase()
                    .includes(searchKeyword.toLowerCase()) ||
                  item.class.toLowerCase().includes(searchKeyword.toLowerCase())
                    ? ""
                    : "hidden"
                }`}
                key={`${item.name}-${item.class}`}
              >
                <td className="pl-[3vw] md:pl-[10vw] py-2">
                  <div className="flex items-center gap-[14px]">
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
                      className="w-[24px] h-[24px]"
                      alt=""
                    />
                    <span className="text-[28px]">{index + 1}</span>
                  </div>
                </td>
                <td>
                  <img
                    className="w-[32px] h-[32px]"
                    src="/scratch.png"
                    alt=""
                  />
                </td>
                <td>
                  <p className="text-base md:text-lg">{item.name}</p>
                </td>

                <td>
                  <p className="text-base md:text-lg">{item.class}</p>
                </td>
                <td>
                  <div className="flex gap-1">
                    <div className="w-[24px] h-[24px]">
                      <img
                        className="w-[24px] h-[24px]"
                        src="/medal.png"
                        alt=""
                      />
                    </div>
                    <div className="w-[24px] h-[24px]">
                      <img
                        className="w-[24px] h-[24px]"
                        src="/medal.png"
                        alt=""
                      />
                    </div>
                    <div className="w-[24px] h-[24px]">
                      <img
                        className="w-[24px] h-[24px]"
                        src="/medal.png"
                        alt=""
                      />
                    </div>
                  </div>
                </td>
                <td className="!font-semibold text-base md:text-xl pr-[3vw] md:pr-[6vw]">
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
