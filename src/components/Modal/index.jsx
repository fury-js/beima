import React from "react";
import styles from "./modal.module.css";

function Modal({ showModal = false, closeModal, children, className }) {
  return showModal ? (
    <>
      <div
        className={`${styles.container} justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none `}
        onClick={closeModal}
      >
        <div onClick={e => e.stopPropagation()} className={`${styles["children-container"]} relative md:w-3/4 lg:w-2/3 max-w-5xl my-6 mx-auto`}>
          {/*content*/}
          <div className="border-0 shadow relative flex flex-col w-full outline-none focus:outline-none">
            {children}
          </div>
        </div>
      </div>
      <div className={`${styles.backdrop} opacity-70 fixed inset-0 bg-black`}></div>
    </>
  ) : null
}

export { Modal };



// import React from "react";

// export default function Modal() {

//   return (
//     <>
//       <button
//         className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//         type="button"
//         onClick={() => setShowModal(true)}
//       >
//         Open regular modal
//       </button>

//     </>
//   );
// }