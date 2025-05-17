
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [linkHover, setLinkHover] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 150);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleMouseEnter = () => {
      setHidden(false);
    };

    const handleLinkHoverOn = () => {
      setLinkHover(true);
    };

    const handleLinkHoverOff = () => {
      setLinkHover(false);
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const links = document.querySelectorAll('a, button');
    links.forEach((link) => {
      link.addEventListener('mouseenter', handleLinkHoverOn);
      link.addEventListener('mouseleave', handleLinkHoverOff);
    });

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);

      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleLinkHoverOn);
        link.removeEventListener('mouseleave', handleLinkHoverOff);
      });
    };
  }, []);

  return (
    <>
      <motion.div
        className="custom-cursor bg-white mix-blend-difference"
        animate={{
          x: position.x,
          y: position.y,
          scale: clicked ? 0.7 : linkHover ? 2 : 1,
          opacity: hidden ? 0 : 1,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
        }}
      />
      <motion.div
        className="custom-cursor bg-transparent border-2 border-white mix-blend-difference"
        animate={{
          x: position.x,
          y: position.y,
          scale: clicked ? 0.7 : linkHover ? 2 : 1.5,
          opacity: hidden ? 0 : 0.3,
        }}
        transition={{
          type: "spring",
          damping: 40,
          stiffness: 150,
          delay: 0.02,
        }}
      />
    </>
  );
};

export default CustomCursor;
