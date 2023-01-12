import { randomAvatar } from "./utils";

const data = new Array(10).fill("").map((_, index) => ({
  id: index,
  name: "Nguyễn Văn A",
  class: "SH-C4K-SB71",
  exp: 2345 - index,
  newStatus: (index % 3 === 0 ? "up" : index % 3 === 1 ? "down" : "equal") as
    | "up"
    | "down"
    | "equal",
}));

export default function App() {
  return (
    <div className="w-full max-w-4xl">
      <div>
        <h1 className="text-3xl md:text-5xl mt-8 mb-4 md:mt-16 md:mb-8">
          Global Ranking
        </h1>
      </div>
      <div className="flex gap-5">
        {[data[1], data[0], data[2]].map((item, index) => (
          <div
            key={item.id}
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
                  src={randomAvatar(`${item.name} ${item.id}`)}
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
              <p className="text-center text-lg mt-1">Nguyễn Văn A</p>
              <h1
                className={`${
                  ["text-red", "text-yellow", "text-orange"][index]
                }`}
              >
                {item.exp} exp
              </h1>
            </div>
          </div>
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
          {data.map((item, index) => (
            <tr
              className="shadow-[0_2px_10px_rgb(0_0_0_/_10%)] rounded-2xl"
              key={item.id}
            >
              <td>
                <div className="w-[24px] md:w-[34px] h-[18px] flex justify-end items-center">
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
                  <img className="w-[24px] h-[24px]" src="/medal.png" alt="" />
                </div>
              </td>
              <td className="!font-semibold text-base md:text-xl">
                {item.exp} exp
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
