import Image from "next/image";

const IntroBox = ({ isViewing, setIsViewing }) => {

  const handleCloseViewClick = () => {
    setIsViewing(0);
  }

  return (
    <div className={
      `fixed top-1/2 left-1/2 -translate-x-1/2 transition xl:w-1/3 lg:w-1/2 md:w-2/3 sm:w-11/12 
       ${isViewing === 1 ? 'opacity-100 scale-100 md:-translate-y-[25vh] sm:-translate-y-[85%] delay-[600ms] duration-1000' : 'opacity-0 scale-[.3] pointer-events-none -translate-y-[25vh] duration-300'}`
    }>
      <div className={`shadow-xl shadow-blue-300/50 text-gray-300 flex flex-col items-center gap-[10px] text-center lg:text-[18px] md:text-[16px] sm:text-[14px] lg:leading-[24px] md:leading-[20px] sm:leading-[18px] text-[#f3f3f3] font-mono bg-gradient-to-r from-gray-600/[.9] to-gray-700/[.9] ld:p-6 md:p-4 sm:p-2 rounded-[20px] z-30`} >
        <p>{`Hello, I'm `}<span className="lg:text-[20px] md:text-[18px] sm:text-[16px] font-bold italic uppercase text-white">Xiaohu Zheng</span>, a passionate <span className="lg:text-[20px] md:text-[18px] sm:text-[16px] font-bold italic uppercase text-white">front-end developer</span> {`with a background in computer science.
          My journey in the world of technology began with a deep dive into the realm of computer science, where I cultivated a strong foundation for problem-solving and innovation.
          I am working as a front-end development engineer, where I am involved in creating the official website and implementing the internationalization features. `}</p>
        <p className="text-white"> - Click the moving spaceship to see my experience.</p>
        <p className="text-white"> - Click the moving statellite to contact me.</p>
        <Image src="/images/common/back-arrow.png" width={40} height={40} className="mt-[10px] hover:cursor-pointer transition hover:scale-[1.1]" alt="close btn" onClick={handleCloseViewClick} />
      </div>
    </div>
  )
}

export default IntroBox;