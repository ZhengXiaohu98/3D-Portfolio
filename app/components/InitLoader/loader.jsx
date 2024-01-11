import styles from './initloader.module.css'

const InitLoader = () => {

  return (
    <div className='fixed left-0 top-0 w-[100vw] h-[100vh] flex flex-col gap-4 items-center justify-center z-50 bg-gradient-to-r from-gray-600/[.9] to-gray-700/[.9]'>
      <div className={styles.hourglass} />
      <p className='font-bold text-lg'>Loading in progress, please wait...</p>
    </div>
  )
}

export default InitLoader;