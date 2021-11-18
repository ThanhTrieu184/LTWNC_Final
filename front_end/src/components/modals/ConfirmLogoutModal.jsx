import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const ConfirmLogoutModal = (props) => {
  const { isOpen, handleCancel, handleConfirm } = props;

  return (
    <Fragment>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-30 overflow-y-auto"
          onClose={handleCancel}
        >
          <div className="min-h-screen px-4 text-center bg-gray-500 bg-opacity-40">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 text-center"
                >
                  Xác nhận đăng xuất?
                </Dialog.Title>
                <div className="my-6">
                  <p className="text-sm text-gray-500">
                    Một khi bạn nhấn vào "Có", bạn sẽ bị đăng xuất khỏi hệ
                    thống. Để truy cập vào hệ thống bạn cần phải đăng nhập lại.
                  </p>
                </div>

                <div className="mt-4 flex justify-center space-x-6">
                  <button
                    type="button"
                    className="w-20 py-2 text-sm font-medium text-gray-600 border rounded-full hover:bg-gray-50 focus:outline-none shadow-sm"
                    onClick={handleCancel}
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    className=" w-20 py-2 text-sm font-medium text-white bg-gradient-to-br from-red-600 to-indigo-600 rounded-full focus:outline-none shadow-sm"
                    onClick={handleConfirm}
                  >
                    Có
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  );
};

export default ConfirmLogoutModal;
