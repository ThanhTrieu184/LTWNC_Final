const Announcement = () => {
  return (
    <div className="my-2 relative w-full h-32 rounded-lg overflow-hidden shadow-md transition duration-300 ease-in-out">
      <div className="absolute inset-0 bg-pink-100 bg-opacity-75 transition duration-300 ease-in-out"></div>
      <div className="relative w-full h-full px-4 sm:px-6 lg:px-4 flex items-center justify-center">
        <p>Announcement</p>
      </div>
    </div>
  );
};

export default Announcement;
