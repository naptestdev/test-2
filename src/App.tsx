import { useMemo, useState } from "react";
import { Data } from "./types";
import useMediaQuery from "./hooks/useMediaQuery";
import { InView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function App() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [currentTab, setCurrentTab] = useState("Total");
  const [currentCourse, setCurrentCourse] = useState<
    "Scratch" | "Game" | "Web"
  >("Scratch");
  const [currentLevel, setCurrentLevel] = useState<
    "Basic" | "Advanced" | "Intensive"
  >("Basic");
  const [searchKeyword, setSearchKeyword] = useState("");

  const {
    data: rawData,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [currentCourse, currentLevel, currentTab],
    queryFn: ({ pageParam }) =>
      fetch(
        new URL(
          `/${currentCourse}/${currentLevel}/${currentTab}?page=${
            pageParam || 0
          }`,
          import.meta.env.VITE_SERVER_URL
        )
      ).then((res) => res.json()),
    getNextPageParam: (lastPage, pages) => {
      // @ts-ignore
      return lastPage.length === 0 ? null : pages.length;
    },
  });

  const [isViewMore, setIsViewMore] = useState(false);

  const data = useMemo<Data>(
    // @ts-ignore
    () => rawData?.pages?.reduce((acc, current) => [...acc, ...current], []),
    [JSON.stringify(rawData)]
  );

  return (
    <div className="w-full max-w-[1196px]">
      <div className="flex justify-between md:justify-center mt-[17px]">
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
            {["Scratch", "Game", "Web"].map((item) => (
              <button
                key={item}
                onClick={() =>
                  setCurrentCourse(item as "Scratch" | "Game" | "Web")
                }
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
          <p>Cấp độ: </p>

          <div className="flex flex-wrap items-center bg-[#ffffff1a] rounded-full">
            {["Basic", "Advanced", "Intensive"].map((item) => (
              <button
                key={item}
                onClick={() =>
                  setCurrentLevel(item as "Basic" | "Advanced" | "Intensive")
                }
                className={`${
                  currentLevel === item ? "!bg-white !text-bg" : ""
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
            {new Array(8)
              .fill("")
              .map((_, index) => `${index + 1}`)
              .map((item) => (
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
            <button
              onClick={() => setCurrentTab("Total")}
              className={`${
                currentTab === "Total" ? "!bg-white !text-bg" : ""
              } py-[2px] px-2 rounded-full transition`}
            >
              Tổng
            </button>
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

      {!data || !rawData?.pages.length ? (
        <div className="min-h-[50vh] flex justify-center items-center">
          <div className="w-8 h-8 rounded-full border-[3px] border-white border-t-transparent animate-spin"></div>
        </div>
      ) : error ? (
        <div className="min-h-[50vh] flex justify-center items-center">
          <h1 className="text-4xl">Error</h1>
        </div>
      ) : (
        <table className="w-full [&_th]:!text-left mt-5 mb-[14px] md:border-spacing-0 border-spacing-y-[6px] md:border-collapse border-separate">
          <thead className="md:table-header-group hidden">
            <tr className="!text-white rounded-[6px] md:rounded-none">
              <th className="pl-[3vw] md:pl-[7vw] py-2">#</th>
              <th>Khoá học</th>
              <th>Tên học viên</th>
              <th>Mã lớp</th>
              <th>Huy hiệu</th>
              <th className="md:pr-[3vw]">Điểm</th>
            </tr>
          </thead>
          <tbody>
            {(isDesktop || isViewMore ? data : data.slice(0, 3)).map(
              (item, index) => (
                <tr
                  className={`${
                    !searchKeyword ||
                    item.name
                      .toLowerCase()
                      .includes(searchKeyword.toLowerCase()) ||
                    item.class
                      .toLowerCase()
                      .includes(searchKeyword.toLowerCase())
                      ? ""
                      : "hidden"
                  } ${
                    index === 0
                      ? "md:[&_td]:pt-[19px]"
                      : index === data.length - 1
                      ? "md:[&_td]:pb-[19px]"
                      : ""
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
                  <td className="!font-semibold text-base md:text-xl md:pr-[3vw] md:rounded-none rounded-r-[6px]">
                    {/* @ts-ignore */}
                    {+String(item.point).replace(",", ".")} exp
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}

      {!isDesktop && !isViewMore && !!data && (
        <div className="flex justify-center">
          <button
            onClick={() => setIsViewMore(true)}
            className="flex items-center gap-1 py-1 px-[10px] bg-[#ffffff33] border border-white rounded"
          >
            <span>Xem thêm</span>
            <img src="/chevron-down.svg" alt="" />
          </button>
        </div>
      )}
      {(isDesktop || isViewMore) && hasNextPage && !searchKeyword.trim() && (
        <div className="flex justify-center mt-4 mb-6">
          <InView
            onChange={(inView) => {
              if (inView) {
                if (hasNextPage) {
                  fetchNextPage();
                }
              }
            }}
          >
            {({ ref }) => (
              <div className="flex justify-center items-center gap-2" ref={ref}>
                <div className="w-6 h-6 rounded-full border-[3px] border-white border-t-transparent animate-spin"></div>
                <p>Đang tải...</p>
              </div>
            )}
          </InView>
        </div>
      )}
    </div>
  );
}
