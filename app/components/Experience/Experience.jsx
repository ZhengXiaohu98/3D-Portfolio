import styles from './experience.module.css';
import Image from 'next/image';

const experienceData = [
  {
    "title": "Unadat - Software Engineering Intern",
    "timeline": "2022.06 - 2022.08",
    "detail": [
      "Website development and UI improvement",
      "Leaning UI design with figma"
    ]
  },
  {
    "title": "Google Software Product Sprint Program",
    "timeline": "2022.06 - 2022.08",
    "detail": [
      "Created a personal portfolio website",
      "Completed team projects with Google mentors and team members",
    ]
  },
  {
    "title": "CoderBase - Personal Project",
    "timeline": "2022.09 - 2022.12",
    "detail": [
      "MERN stack web application that can link to the Leetcode and Github accounts of the user.",
      "The website shows the user's weekly contests as a table and the repositories of the user",
      "Use JTW for data encryption and Echart for data visualization",
    ]
  },
  {
    "title": "Graduated from City College of New York",
    "timeline": "2018.08 - 2023.01",
    "detail": [
      "Bachelor of Science in Computer Science | GPA: 3.77/4.00",
      "Relevant Coursework: Covering standard topics and subjects commonly studied by everyone in the field. :)"
    ]
  },
  {
    "title": "Fanruan - Frontend engineering",
    "timeline": "2023.02 - Current",
    "detail": [
      "Implementing internationalization features for enhanced website accessibility.",
      "Developing and maintaining official website"
    ]
  }
];

const renderExpCard = (exp, idx) => {
  return (
    <div
      key={idx}
      className={`shadow-lg shadow-amber-50 md:absolute bg-gray-600/[.8] rounded-[20px] transition-all duration-500 lg:w-[500px] md:w-[350px] sm:w-[320px] lg:px-5 lg:py-4 sm:px-3 sm:py-3 flex flex-col sm:ml-[10px] md:ml-auto z-50 
      ${idx & 1 ? 'left-[20px] ' : 'right-[20px] md:items-end'} animate__animated animate__fadeIn animate__slow`}
      style={{
        top: `${(idx * 20)}%`,
        animationDelay: `${idx * 1}s`
      }}
    >
      <p className='lg:text-[20px] font-[600] lg:leading-[22px] md:text-[16px] md:leading-[18px] sm:text-[14px] sm:leading-[16px]'>{exp.title}</p>
      <p className='lg:text-[18px] font-[500] lg:leading-[20px] md:text-[14px] md:leading-[16px] lg:mt-[10px] md:mt-[6px] sm:text-[13px] sm:leading-[16px] sm:mt-[2px]'>{exp.timeline}</p>
      <ul className='lg:mt-[16px] md:mt-[10px] sm:mt-[2px] flex flex-col lg:gap-[8px] sm:gap-[4px] font-[400] lg:text-[16px] lg:leading-[18px] md:text-[14px] md:leading-[16px] sm:text-[12px] sm:leading-[14px]'>
        {
          exp.detail.map((cur, i) => (
            <li key={i} className={`${idx % 2 === 0 ? 'md:text-right' : ''}`}>
              {cur}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

const ExperienceTimeline = ({ isViewing, setIsViewing }) => {

  const handleCloseViewClick = () => {
    setIsViewing(0);
  }
  return (
    <>
      {
        isViewing === 3 &&
        <>
          <div className={`fixed md:top-[7vh] sm:top-1/2 sm:-translate-y-1/2 sm:mt-[-10px] md:mt-0 md:translate-y-0 md:left-1/2 md:-translate-x-1/2 sm:left-[5vw] sm:w-[90vw] md:w-auto flex flex-col items-center transition-all`}>
            <div className='md:w-[3px] bg-transparent md:h-[80vh] rounded-[45px] relative flex flex-col items-center sm:gap-[12px]'>
              <div className={`${styles.expBar} ${styles.expBar1} md:block hidden`} />
              <div className={`${styles.expBar} ${styles.expBar2} md:block hidden`} />
              <div className={`${styles.expBar} ${styles.expBar3} md:block hidden`} />
              <div className={`${styles.expBar} ${styles.expBar4} md:block hidden`} />
              <div className={`${styles.expBar} ${styles.expBar5} md:block hidden`} />
              {
                experienceData.map((cur, idx) => (
                  renderExpCard(cur, idx)
                ))
              }
            </div>
          </div>
          <Image
            src="/images/common/back-white.png"
            width={48}
            height={48}
            className="fixed bottom-[5vh] left-1/2 -translate-x-1/2 hover:cursor-pointer transition hover:scale-[1.1] shadow-inner shadow-amber-50 rounded-[20px]"
            alt="close btn"
            onClick={handleCloseViewClick} />
        </>
      }
    </>
  )
}

export default ExperienceTimeline;