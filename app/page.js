'use client';
import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useEffect } from "react";
import { IntroRobot, SpaceModel, LightCenter } from './models';
import { IntroBox, ExperienceTimeline, ContactForm, CustomAlert, LightSwitch } from './components';


export default function Home() {

  /* 
    the rotation logic is based on the scroll Y pos, one page scroll will result in one rotation of our scence
  */
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  // these states have to be global bc we are changing the document css porperties based on these states
  // if each compoent/model holds one state, some of the logic may not work
  const [isViewing, setIsViewing] = useState(0);
  const [isHovered, setIsHovered] = useState(0);
  const [switchState, setSwitchState] = useState([1, 1]);
  const [alertProp, setAlertProp] = useState({ show: false, msg: '', type: 'info' });

  const showAlert = (msg, type) => {
    setAlertProp({ show: true, msg: msg, type: type });

    setTimeout(() => {
      setAlertProp(prevState => ({ ...prevState, show: false }));
    }, 3000);
  };

  // listen on scroll and resize
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);

      const maxScroll = document.body.scrollHeight - window.innerHeight;
      if (window.scrollY <= 0) {
        window.scrollTo(0, maxScroll - 1);
      } else if (window.scrollY >= maxScroll) {
        window.scrollTo(0, 1);
      }
    };

    const handleResize = () => {
      setMaxScroll(document.body.scrollHeight - window.innerHeight);
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Listen on escape key
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        setIsViewing(0);
      }
    };

    if (isHovered) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'auto';
    }

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isViewing, isHovered]);



  return (
    <>
      <main className="flex flex-col">
        {/* 3D world/scene */}
        <div className='fixed top-0 left-0 w-screen h-screen'>
          <Canvas camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 2.6, 3.2] }} >
            <Suspense fallback={null}>
              {/* Lights */}
              <ambientLight intensity={1.75} color="white" />
              <directionalLight position={[-1.4, 1.6, .7]} color="white" intensity={2} />
              <LightCenter switchState={switchState} />

              {/* Models */}
              <SpaceModel maxScroll={maxScroll} scrollPosition={scrollPosition} isViewing={isViewing} setIsViewing={setIsViewing} isHovered={isHovered} setIsHovered={setIsHovered} switchState={switchState} />
              <IntroRobot maxScroll={maxScroll} scrollPosition={scrollPosition} isViewing={isViewing} setIsViewing={setIsViewing} isHovered={isHovered} setIsHovered={setIsHovered} />

              {/* Helper */}
              {/* <axesHelper size={1} scale={2} /> */}
            </Suspense>
          </Canvas>
        </div>

        {/* 2D components */}
        <IntroBox isViewing={isViewing} setIsViewing={setIsViewing} />
        <ExperienceTimeline isViewing={isViewing} setIsViewing={setIsViewing} />
        <ContactForm isViewing={isViewing} setIsViewing={setIsViewing} showAlert={showAlert} />
        <LightSwitch switchState={switchState} setSwitch={setSwitchState} isViewing={isViewing} />

        {/* feedback components */}
        <CustomAlert alertProp={alertProp} />

        {/* empty div to create height for scrolling */}
        <div className="h-screen" />
        <div className="h-screen" />
        <div className="h-screen" />
        <div className="h-screen" />
      </main>
    </>

  )
}
