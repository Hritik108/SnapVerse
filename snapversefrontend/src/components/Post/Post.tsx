const Post = () => {
  return (
    <div className="max-w-2xl rounded overflow-hidden shadow-lg">
      {/* Top Bar */}
      <div className="flex items-center w-full p-3 bg-white shadow rounded">
        <img
          src="https://mybestdp.com/wp-content/uploads/2025/06/boys-dp-1.jpg"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover"
        />

        <span className="ml-3 font-medium text-gray-800">John Doe</span>

        <button className="ml-auto text-gray-600 hover:text-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
            className="w-6 h-6"
          >
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>
      </div>

      {/* Post Image */}
      <img
        className="w-full"
        src="https://v1.tailwindcss.com/img/card-top.jpg"
        alt="Sunset"
      />

      {/* Buttons + Description */}
      <div className="px-6 py-4">
        <div className="flex items-center w-full">
          {/* Left side buttons */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-red-500 transition-colors duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.933 0-3.593 1.159-4.326 2.505-.733-1.346-2.393-2.505-4.326-2.505C5.109 3.75 3 5.765 3 8.25c0 7.22 8.754 12.413 8.754 12.413S21 15.47 21 8.25z"
                />
              </svg>
            </button>
            <button className="text-gray-500 hover:text-blue-500 transition-colors duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 20.25c4.97-1.127 9-5.69 9-10.75S16.97 3 12 3 3 7.568 3 12.553c0 1.258.232 2.48.665 3.633a2.25 2.25 0 01-.157 2.055L3 20.25l2.25-1.5a1.655 1.655 0 011.082-.363 10.587 10.587 0 005.626 1.76z"
                />
              </svg>
            </button>
            <button className="text-gray-500 hover:text-green-500 transition-colors duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                />
              </svg>
            </button>
          </div>
          {/* Right side button */}
          <button className="ml-auto text-gray-500 hover:text-yellow-500 transition-colors duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
          </button>
        </div>
        {/* Description */}
        <p className="text-gray-700 text-base text-justify mt-3">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
          quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
          nihil.
        </p>
      </div>

      {/* Tags */}
      <div className="px-6 pt-2 pb-4 flex justify-start">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          #photography
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          #travel
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          #winter
        </span>
      </div>

      {/* ✅ COMMENT BOX HERE */}
      <div className="px-6 py-3 border-t flex items-center space-x-3">
        {/* User profile image */}
        <img
          src="https://mybestdp.com/wp-content/uploads/2025/06/boys-dp-1.jpg"
          alt="me"
          className="w-9 h-9 rounded-full object-cover"
        />

        {/* Comment input */}
        <input
          type="text"
          placeholder="Add a comment..."
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Post button */}
        <button className="text-blue-500 font-semibold hover:text-blue-700">
          Post
        </button>
      </div>
    </div>
  );
};

export default Post;
