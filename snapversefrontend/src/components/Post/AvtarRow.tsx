const AvatarRow = () => {
  const avatars = [
    "https://mybestdp.com/wp-content/uploads/2025/06/boys-dp-1.jpg",
    "https://piclover.in/wp-content/uploads/stylish-boy-dp-3.webp",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSux9bJHTGP7D3S0Of_ahdQMSwrp5_Q9cDfMWcyhPVRaPJ2fGhK0dJZsreCaXTby3dP2ZU&usqp=CAU",
    "https://cutiedp.com/wp-content/uploads/2025/08/stylish-single-boy-dp.webp",
    "https://photodpshare.com/wp-content/uploads/2025/10/hd-handsome-boy-dp-pinterest.jpg",
  ];

  return (
    <div className="flex space-x-6 overflow-x-auto p-4">
      {avatars.map((src, index) => (
        // <div
        //   key={index}
        //   className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-pink-500 via-yellow-400 to-purple-500 flex-shrink-0"
        // >
        //   <img
        //     src={src}
        //     alt={`Avatar ${index}`}
        //     className="w-full h-full rounded-full object-cover border-2 border-white"
        //   />
        // </div>
        <div className="flex flex-col items-center">
  <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-pink-500 via-yellow-400 to-purple-500">
    <img src={src} className="w-full h-full rounded-full object-cover border-2 border-white" />
  </div>
  <span className="text-sm mt-1 font-medium">John</span>
</div>

      ))}
    </div>
  );
};

export default AvatarRow;
