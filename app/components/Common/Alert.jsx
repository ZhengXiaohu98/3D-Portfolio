import { Alert } from 'antd';

const CustomAlert = ({ alertProp }) => {
  return (
    <div className={`sm:w-[55vw] md:w-auto fixed top-[10vh] left-1/2 -translate-x-1/2 transition duration-300 ${alertProp.show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}`}>
      <Alert message={alertProp.msg} type={alertProp.type} showIcon />
    </div>
  )
}

export default CustomAlert;