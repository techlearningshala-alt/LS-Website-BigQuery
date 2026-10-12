import React from "react";
import { Link } from "react-scroll";

const CoursePageToc = ({ id, title }) => {
  const handleActive = () => {
    const el = document.getElementById(`toc-${id}`);
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  return (
    <li id={`toc-${id}`} className="my-2">
      <Link
        duration={300}
        to={id}
        spy={true}
        smooth={true}
        offset={-50}
        onSetActive={handleActive}
        className="cursor-pointer font-semibold text-gray-700  border bg-gray-100 text-[10px] md:text-sm px-2 md:px-3 py-2 rounded-lg transition-all duration-300 border-0"
        activeClass="font-bold bg-primary text-white border-0"
      >
        {title}
      </Link>
    </li>
  );
};

export default CoursePageToc;
