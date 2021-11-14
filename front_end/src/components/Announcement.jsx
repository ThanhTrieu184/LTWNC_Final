import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Announcement = () => {
  return (
    <div class="rounded-lg bg-gray-50 text-gray-800 p-4 m-4 flex flex-col shadow hover:shadow-md transform hover:scale-105 transition duration-200">
      <div class="flex flex-col">
        <a href="/" class="text-md font-bold mb-2 uppercase">
          <span className="animation-underline">
            You need more informations? You need more informations? You need
            more informations?
          </span>
        </a>
        <p class="opacity-70 pb-4 truncate font-thin">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          do eiusmod
        </p>
      </div>
      <div class="pt-4 flex justify-between items-center z-10">
        <small className="text-gray-600">11/11/2021</small>
        <a
          href="/"
          class="px-4 py-2 text-center text-sm text-gray-600 border border-gray-400 shadow-sm rounded-full transition duration-200 hover:bg-white"
        >
          <span>Xem chi tiết </span>
          <FontAwesomeIcon icon={faArrowRight} />
        </a>
      </div>
    </div>
  );
};

export default Announcement;
