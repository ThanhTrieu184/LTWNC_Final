import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Announcement = () => {
  return (
    <div className="rounded-lg bg-gradient-to-br from-red-50 to-indigo-50 text-gray-800 p-4 m-4 flex flex-col shadow hover:shadow-md transform hover:scale-105 transition duration-200">
      <div className="flex flex-col">
        <a href="/" className="text-md font-bold mb-2 uppercase leading-5">
          <span className="animation-underline">
            You need more informations? You need more informations? You need
            more informations?
          </span>
        </a>
        <p className="opacity-70 pb-4 truncate font-thin">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          do eiusmod
        </p>
      </div>
      <div className="pt-4 flex justify-between items-center z-10">
        <small className="text-gray-600">11/11/2021</small>
        <a
          href="/"
          className="px-4 py-2 text-center text-sm text-white shadow-sm rounded-full bg-gradient-to-br from-red-600  to-indigo-600"
        >
          <span>Xem chi tiết </span>
          <FontAwesomeIcon icon={faArrowRight} />
        </a>
      </div>
    </div>
  );
};

export default Announcement;
