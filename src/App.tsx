const data = new Array(10).fill("").map((_, index) => ({
  id: index,
  name: "Nguyễn Văn A",
  class: "SH-C4K-SB71",
  exp: 2345,
  newStatus: (index % 3 === 0 ? "up" : index % 3 === 1 ? "down" : "equal") as
    | "up"
    | "down"
    | "equal",
}));

export default function App() {
  return (
    <div className="w-full h-full max-w-[320px] max-h-[568px] bg-red flex flex-col rounded-[25px] overflow-hidden">
      <h1 className="text-center my-3">Global Ranking</h1>
      <div className="flex justify-center">
        <div className="border border-gray-300 rounded-full flex gap-4 px-3 py-[2px]">
          <button>Scratch</button>
          <button>Game</button>
          <button>Web</button>
        </div>
      </div>
      <div className="bg-[#ffffff1a] rounded-full flex [&>button]:flex-grow [&>button]:py-1 [&>button]:rounded-full my-3 mx-4">
        <button className="bg-white text-red">1</button>
        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>7</button>
        <button>8</button>
      </div>
      <div className="flex justify-center items-end gap-4">
        <div className="flex flex-col items-center">
          <div className="w-[48px] relative pb-1">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 leading-[1] text-[12px] h-[12px] w-[12px] text-center text-red bg-third rounded-full border border-red box-content">
              3
            </div>
            <div className="w-[48px] h-[48px] border-[3.7px] border-third rounded-full flex justify-center items-center">
              <img src="/avatar.svg" className="w-[21px] h-[21px]" alt="" />
            </div>
          </div>
          <p className="text-center text-[10px] mt-1 max-w-[55px]">
            Nguyễn Văn A
          </p>
        </div>

        <div className="flex flex-col items-center relative pt-[23px]">
          <img
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[54px] h-[46px]"
            src="/crown.svg"
            alt=""
          />
          <div className="w-[89px] relative pb-1">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 leading-[1] text-[12px] h-[12px] w-[12px] text-center text-red bg-first rounded-full border border-red box-content">
              1
            </div>
            <div className="w-[89px] h-[89px] border-[3.7px] border-first rounded-full flex justify-center items-center">
              <img
                src="/avatar.svg"
                className="w-[38px] h-[38px] mt-2"
                alt=""
              />
            </div>
          </div>
          <p className="text-center text-[10px] mt-1 max-w-[55px]">
            Nguyễn Văn A
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-[55px] relative pb-1">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 leading-[1] text-[12px] h-[12px] w-[12px] text-center text-red bg-second rounded-full border border-red box-content">
              3
            </div>
            <div className="w-[55px] h-[55px] border-[3.7px] border-second rounded-full flex justify-center items-center">
              <img src="/avatar.svg" className="w-[21px] h-[21px]" alt="" />
            </div>
          </div>
          <p className="text-center text-[10px] mt-1 max-w-[55px]">
            Nguyễn Văn A
          </p>
        </div>
      </div>

      <div className="flex justify-center flex-grow overflow-auto">
        <div className="flex flex-col gap-2 w-full max-w-[284px] pt-[25px]">
          <div className="flex text-[10px]">
            <span className="pl-[42px]">#</span>
            <span className="pl-[136px]">Badge</span>
            <span className="pl-[4px]">Pts</span>
          </div>
          {data.map((item, index) => (
            <div
              className={`border-2 h-[45px] rounded-full flex-shrink-0 flex items-center pl-3 pr-2 text-black ${
                index === 0
                  ? "bg-[linear-gradient(94.05deg,_#FFCC30_-29.95%,_#FEFFD1_99.59%)] border-[#68FFF6]"
                  : index === 1
                  ? "bg-[linear-gradient(95.69deg,_#DDFFFD_21.87%,_#FFFFFF_87.66%)] border-[#68FFF6]"
                  : index === 2
                  ? "bg-[linear-gradient(93.62deg,_#FFDECC_-5.49%,_#FFFFFF_88.67%)] border-[#7B61FF]"
                  : "bg-white border-[#C02222]"
              }`}
              key={item.id}
            >
              <div className="w-[18px] h-[18px] flex justify-center items-center">
                <img
                  src={
                    item.newStatus === "up"
                      ? "/up.png"
                      : item.newStatus === "down"
                      ? "/down.png"
                      : "/equal.png"
                  }
                  className="w-[18px]"
                  alt=""
                />
              </div>
              <p className="pl-2 pr-3 text-[20px] w-[16px] box-content">
                {index + 1}
              </p>
              <div className="flex-grow flex-shrink-0">
                <h2 className="text-[14px] overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {item.name}
                </h2>
                <h3 className="text-[10px] text-[#545454] overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {item.class}
                </h3>
              </div>
              <div className="w-[24px] h-[24px]">
                <img className="w-[24px] h-[24px]" src="/medal.png" alt="" />
              </div>
              <div className="w-[62px] pl-2">
                <p className="text-[12px]">{item.exp} exp</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
