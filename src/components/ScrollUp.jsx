import React, { useEffect, useState } from "react";

function ScrollUp() {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(
        window.scrollY / (document.body.scrollHeight - window.innerHeight)
      );
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function handleArrowClick() {
    setTimeout(() => {
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    }, 200);
  }

  if (scroll > 0.8) {
    return (
      <div className="arrowUpIcon" onClick={handleArrowClick}>
        <img src="/images/arrowUp.svg" alt="" />
      </div>
    );
  } else {
    return;
  }
}

export default ScrollUp;
