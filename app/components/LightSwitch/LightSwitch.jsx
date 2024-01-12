import { useEffect, useState } from "react";


const LightSwitch = ({ switchState, setSwitch, isViewing }) => {

  const [canLoad, setCanLoad] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCanLoad(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = (idx) => {
    const newSwitchState = [...switchState];
    newSwitchState[idx] = (switchState[idx] ^ 1);
    setSwitch(newSwitchState);
  }

  return (
    <div className={`fixed md:left-1/2 md:bottom-[5vh] md:-translate-x-1/2 sm:left-[10vw] sm:bottom-[5vh] flex flex-col items-center gap-[10px] transition duration-300 ${(isViewing || !canLoad) ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <p className="font-bold">Light Toggles</p>
      <div className={`relative w-[54px] h-[25px] transition duration-500 ${switchState[0] === 1 ? 'bg-[#cec286]' : 'bg-gray-600'}  rounded-[25px] hover:cursor-pointer`} onClick={() => { handleClick(0) }}>
        <div className={`absolute w-[26px] h-full rounded-[25px] bg-white transition ease-in ${switchState[0] === 1 ? 'translate-x-[29px]' : 'translate-x-0'}`} />
      </div>
      <div className={`relative w-[54px] h-[25px] transition duration-500 ${switchState[1] === 1 ? 'bg-[#C9EDFC]' : 'bg-gray-600'}  rounded-[25px] hover:cursor-pointer`} onClick={() => { handleClick(1) }}>
        <div className={`absolute w-[26px] h-full rounded-[25px] bg-white transition ease-in ${switchState[1] === 1 ? 'translate-x-[29px]' : 'translate-x-0'}`} />
      </div>
    </div>
  )
}

export default LightSwitch;