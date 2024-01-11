import Image from "next/image";
import { useState } from "react";
import styles from './contactform.module.css';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const textareaPlaceholder = "Open to collaboration for implementing innovative ideas. Let's create something extraordinary together! Contact me to discuss potential projects/ideas!"

const ContactForm = ({ isViewing, setIsViewing, showAlert }) => {

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);

  const checkEmailAddress = (email) => {
    if (isEmailValid) {
      return true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidFormat = emailRegex.test(email);
    setIsEmailValid(isValidFormat);
    return isEmailValid;
  }

  const handleSendEmail = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidFormat = emailRegex.test(email);
    if (!isValidFormat) {
      setIsEmailValid(false);
      return;
    }

    setIsSpinning(true);
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, message }),
      });

      const data = await response.json();

      if (data.success) {
        showAlert('I have received your message :)', 'success');
        setIsViewing(0);
        setMessage('');
      } else {
        showAlert('Something went wrong :(', 'error');
        console.error('Failed to send email', data.error);
      }

      setIsSpinning(false);
    } catch (err) {
      setIsSpinning(false);
      console.error('Error sending email', err);
    }
  };

  return (
    <form className={`fixed top-[20vh] left-1/2 -translate-x-1/2 md:w-[500px] sm:w-[90vw] bg-gradient-to-r from-gray-600/[.9] to-gray-700/[.9] shadow-violet-500/50 shadow-lg
     md:px-10 md:py-6 sm:px-6 sm:py-4 rounded-[20px] transition duration-500 ${isViewing === 2 ? 'opacity-100 scale-x-100' : 'opacity-0 pointer-events-none scale-x-90'}`}>
      <div className="md:my-3 sm:my-4">
        <h3 className="text-center sm:text-[20px] font-bold sm:leading-[20px] md:text-[22px] md:leading-[26px]">Contact me</h3>
        <div className="text-center md:text-sm sm:text-xs flex flex-row justify-center items-center gap-2 italic">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
          </svg>
          zxh635148320@gmail.com
        </div>
      </div>
      <label className="block md:mb-[6px] sm:mb-[2px] text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
      <div >
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
              <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
              <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
            </svg>
          </div>
          <input
            type="text"
            id="email-address-icon"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 outline-none
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-violet-500/50"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              checkEmailAddress(e.target.value);
            }}
          />
          {!isEmailValid && <p className="absolute top-full text-xs left-[4px] text-red-300">{'Please enter a correct email address :)'}</p>}
        </div>
        <div className="mt-[30px]">
          <label className="block md:mb-[6px] sm:mb-[2px] text-sm font-medium text-gray-900 dark:text-white">Your message</label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full sm:h-[180px] md:h-auto text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-blue-500 dark:bg-gray-700 outline-none
             dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-violet-500/50"
            placeholder={textareaPlaceholder}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>
      <div className="w-full flex justify-center items-center mt-[20px] h-[44px]">
        <div className={styles.sendBtn} onClick={handleSendEmail}>
          <button className={`w-[100px] py-2 rounded-[10px] bg-gradient-to-r from-gray-800 to-gray-600 z-30 absolute left-[2px] top-[2px] outline-none`} disabled={isSpinning}>
            {isSpinning ? <Spin indicator={<LoadingOutlined style={{ fontSize: 21, color: '#AF8FF9' }} spin />} /> : 'Send'}
          </button>
        </div>
      </div>
      {/* close button */}
      <Image
        src='/images/common/close-normal.png'
        width={20}
        height={20}
        alt="close btn"
        quality={100}
        className="absolute top-[15px] right-[15px] transition hover:scale-[1.1] hover:cursor-pointer"
        onClick={() => {
          setIsViewing(0);
          setIsEmailValid(true);
        }}
      />
    </form>

  )
}

export default ContactForm;