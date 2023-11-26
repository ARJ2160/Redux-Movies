export const Footer = () => {
  const date = new Date();
  return (
    <div className='flex justify-center items-center flex-col py-6 bg-[#0F171E] text-white'>
      <div>IMDb Clone</div>
      <div>©{date.getFullYear()}, IMDb Clone or its affiliates</div>
    </div>
  );
};
