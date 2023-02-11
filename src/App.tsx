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
      <div className="flex justify-between mt-[17px]">
        <div className="block md:hidden ml-2">
          <div className="relative">
            <img
              className="absolute top-1/2 -translate-y-1/2 left-2 w-[14px] h-[14px]"
              src="/search.svg"
              alt=""
            />
            <input
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="w-[158px] border border-white rounded-full py-[2px] pl-7 pr-8 bg-transparent placeholder:text-[#ffffff80] outline-none"
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

        <img
          className="h-[34px] md:h-[80px] w-auto"
          src="/mindx-logo.png"
          alt=""
        />
      </div>
      <div className="md:block hidden">
        <h1 className="text-[20px] md:text-[40px] my-[30px] md:my-[56px] uppercase text-center">
          Bảng xếp hạng tổng
        </h1>
      </div>

      <div className="flex flex-col md:flex-row md:flex-wrap justify-between gap-2 px-2 py-8 md:px-0 md:py-0">
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
        <div className="hidden md:block">
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

      <div className="md:hidden block">
        <h1 className="text-[20px] md:text-[40px] uppercase text-center">
          Bảng xếp hạng tổng
        </h1>

        <div className="flex justify-center">
          <img className="w-[279px] h-[162px]" src="/top-3.png" alt="" />
        </div>
      </div>

      <table className="w-full [&_th]:!text-left my-5 md:border-spacing-0 border-spacing-y-[6px] md:border-collapse border-separate">
        <thead className="md:table-header-group hidden">
          <tr className="!text-white rounded-[6px] md:rounded-none">
            <th className="pl-[3vw] md:pl-[7vw] py-2">#</th>
            <th>Khoá học</th>
            <th>Tên học viên</th>
            <th>Mã lớp</th>
            <th>Huy hiệu</th>
            <th className="pr-[3vw] md:pr-[7vw]">Điểm</th>
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
                className={`${
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
                <td className="pl-[3vw] md:pl-[7vw] py-2 md:rounded-none rounded-l-[6px]">
                  <div className="flex items-center gap-[11px] md:gap-[14px]">
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
                      className="w-[12px] h-[12px] md:w-[24px] md:h-[24px]"
                      alt=""
                    />
                    <span className="text-[14px] font-semibold md:text-[28px]">
                      {index + 1}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="md:w-[32px] md:h-[32px] w-[20px] h-[20px]">
                    <img
                      className="md:w-[32px] md:h-[32px] w-[20px] h-[20px]"
                      src="/scratch.png"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <p className="text-base md:text-lg">{item.name}</p>
                  <p className="text-sm block md:hidden">{item.class}</p>
                </td>

                <td className="md:table-cell hidden">
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
                    <div className="w-[24px] h-[24px] hidden md:block">
                      <img
                        className="w-[24px] h-[24px]"
                        src="/medal.png"
                        alt=""
                      />
                    </div>
                    <div className="w-[24px] h-[24px] hidden md:block">
                      <img
                        className="w-[24px] h-[24px]"
                        src="/medal.png"
                        alt=""
                      />
                    </div>
                  </div>
                </td>
                <td className="!font-semibold text-base md:text-xl pr-[3vw] md:pr-[6vw] md:rounded-none rounded-r-[6px]">
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
