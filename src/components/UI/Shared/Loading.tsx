import { Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";

const Loading = () => {
  const [spinningO, setSpinningO] = useState<{ char: string; color: string }>({
    char: "O",
    color: "text-red-500",
  });

  useEffect(() => {
    const spinFrames = [
      { char: "O", color: "text-red-500" },
      { char: "◑", color: "text-blue-500" },
      { char: "◒", color: "text-green-500" },
      { char: "◐", color: "text-yellow-500" },
      { char: "◓", color: "text-purple-500" },
    ];

    let i = 0;
    const interval = setInterval(() => {
      setSpinningO(spinFrames[i]);
      i = (i + 1) % spinFrames.length;
    }, 200);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="flex justify-center mt-10 text-3xl">
      {/* <Spinner size="lg" /> */}L
      <span className={`${spinningO.color}`}>{spinningO.char}</span>ading
    </div>
  );
};

export default Loading;
