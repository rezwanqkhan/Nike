const ShoeCard = ({ imgURL, changeBigShoeImage, bigShoeImg }) => {
  const handleClick = () => {
    if (bigShoeImg !== imgURL.bigShoe) {
      changeBigShoeImage(imgURL.bigShoe);
    }
  };

  return (
    <div
      className={`border-2 rounded-xl ${
        bigShoeImg === imgURL.bigShoe
          ? "border-coral-red"
          : "border-transparent"
      } cursor-pointer max-sm:w-full transition-all duration-300 hover:scale-105`}
      onClick={handleClick}
    >
      <div className='flex justify-center items-center bg-card bg-center bg-cover sm:w-40 sm:h-40 max-sm:w-full max-sm:h-24 max-sm:min-h-[80px] rounded-xl p-2 sm:p-4'>
        <img
          src={imgURL.thumbnail}
          alt='shoe colletion'
          width={127}
          height={103.34}
          className='object-contain max-sm:w-16 max-sm:h-12'
        />
      </div>
    </div>
  );
};

export default ShoeCard;
