import { useState, useEffect, useRef } from "react";
import { Menu, Sparkle, FileText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";

function NavBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const location = useLocation();

  const handleMouseEnter = () => !isLocked && setIsExpanded(true);
  const handleMouseLeave = () => !isLocked && setIsExpanded(false);

  const toggleLock = () => {
    if (isLocked) {
      setIsLocked(false);
      setIsExpanded(false);
    } else {
      setIsLocked(true);
      setIsExpanded(true);
    }
  };

  const navButtons = [
    { name: "Generate Quiz", path: "/", icon: <Sparkle size={24} /> },
    { name: "My Quizzes", path: "/quizzes", icon: <FileText size={24} /> },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-[#181818] text-white transition-all duration-300 z-50 ${
        isExpanded ? "w-64" : "w-16"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center justify-center h-16 w-16">
        <button
          title={isLocked ? "Unlock Sidebar" : "Lock Sidebar"}
          onClick={toggleLock}
          className="p-3 hover:bg-[#303030] rounded-full cursor-pointer"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="mt-4 flex flex-col">
        {navButtons.map((btn) => (
          <AnimatedNavLink
            key={btn.name}
            btn={btn}
            active={location.pathname === btn.path}
            isExpanded={isExpanded}
          />
        ))}
      </div>
    </div>
  );
}

function AnimatedNavLink({ btn, active, isExpanded }) {
  const textRef = useRef(null);

  useEffect(() => {
    if (isExpanded && textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -10 },
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          delay: 0.15,
          ease: "power2.out",
        }
      );
    } else if (!isExpanded && textRef.current) {
      gsap.set(textRef.current, { opacity: 0 });
    }
  }, [isExpanded]);

  return (
    <Link
      title={btn.name}
      to={btn.path}
      className={`flex items-center gap-4 px-4 py-3 mr-2 mb-2 hover:bg-[#303030] transition-colors rounded-r-full ${
        active ? "bg-[#242424] text-yellow-300" : ""
      }`}
    >
      <span>{btn.icon}</span>
      {isExpanded && (
        <span ref={textRef} className="whitespace-nowrap opacity-0">
          {btn.name}
        </span>
      )}
    </Link>
  );
}

export default NavBar;
