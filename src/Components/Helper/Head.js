import React from "react";
import PropTypes from "prop-types";

const Head = (props) => {
  React.useEffect(() => {
    document.title = props.title + " | Dogs";
    document
      .querySelector("meta[name='description']")
      .setAttribute("content", props.description);
  }, [props]);

  return <></>;
};

Head.defaultProps = {
  description: "",
};

Head.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Head;
