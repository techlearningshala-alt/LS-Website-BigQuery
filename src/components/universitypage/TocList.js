import React from "react";
import { Link } from "react-scroll";

const TocList = (props) => {
  return (
    <li>
      <Link
        duration={10}
        to={props.id}
        spy={true}
        smooth={true}
        className="font-bold hover:underline cursor-pointer"
        activeClass="font-bold text-primary"
      >
        {props.title}
      </Link>
    </li>
  );
};

export default TocList;
