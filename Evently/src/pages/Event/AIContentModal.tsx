import React, { useState } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { fetchAIEventResponse } from "@/context/AI_CONTENT/actions";
import { useAIEventDispatch } from "@/context/AI_CONTENT/context";

const AIContent_Modal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [prompt, setPrompt] = useState("");

  const dispacth = useAIEventDispatch();

  const navigate = useNavigate();

  const closeModal = () => {
    setIsOpen(false);
    navigate("/events/create");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async () => {
    await fetchAIEventResponse(dispacth, prompt);
    closeModal();
  };

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="flex items-center justify-center min-h-screen">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-40" />
          </Transition.Child>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative bg-white rounded-lg max-w-screen-xl p-8">
              <Dialog.Title className="text-4xl font-poppins mb-4 font-bold group text-[#] transition duration-300">
                Prompt your event's magic with
                <span className="text-sky-500 mx-2">AI</span>
              </Dialog.Title>
              <input
                type="text"
                className="border border-gray-300 rounded p-3 w-full mb-4"
                placeholder="Enter your prompt here"
                value={prompt}
                onChange={handleInputChange}
              />
              <div className="flex justify-between">
                <button
                  className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition duration-200"
                  onClick={handleSubmit}
                >
                  Submit Prompt
                </button>
                <button
                  className="px-4 py-2 border border-gray-900 text-gray-900 rounded hover:bg-gray-200 transition duration-200"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AIContent_Modal;
