const MainHeading = (props) => {
  return (
    <h2 className={`font-bold text-xl md:text-3xl mb-4 lg:mb-8 ${props.className}`}>{props.title || "title"}</h2>
  );
};

export default MainHeading;
