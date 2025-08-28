import { useState, useEffect, useRef } from "react";
import { Menu, Sparkle, FileText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { loginWithGoogle, logoutUser } from "../../services/authService";

function NavBar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [user, setUser] = useState(null);
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const navButtons = [
    { name: "Generate Quiz", path: "/", icon: <Sparkle size={24} /> },
    { name: "My Quizzes", path: "/quizzes", icon: <FileText size={24} /> },
  ];

  return (
    <div>
      <div
        className={`fixed top-0 left-0 h-screen bg-[#181818] text-white transition-all duration-300 z-50 flex flex-col justify-between ${
          isExpanded ? "w-64" : "w-16"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div>
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

        <div className="mb-4 px-4">
          <AnimatedLoginButton
            isExpanded={isExpanded}
            user={user}
            loginWithGoogle={loginWithGoogle}
            logoutUser={logoutUser}
          />
        </div>
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
        {
          opacity: 0,
          x: -10
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.3,
          delay: 0.15,
          ease: "power2.out",
        }
      );
    } else if (!isExpanded && textRef.current) {
      gsap.set(textRef.current, { opacity: 0, duration: 0.15 });
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

function AnimatedLoginButton({ isExpanded, user, loginWithGoogle, logoutUser }) {
  const btnRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!btnRef.current) return;
    gsap.killTweensOf(btnRef.current);

    if (isExpanded) {
      gsap.fromTo(
        btnRef.current,
        {
          opacity: 0,
          y: 50
        },
        { opacity: 1,
          y: 0,
          duration: 0.3,
          delay: 0.15,
          ease: "power2.out"
        }
      );
    } else {
      gsap.to(btnRef.current, { opacity: 0, duration: 0.1 });
    }
  }, [isExpanded]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") setShowDropdown(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <div ref={btnRef} className="opacity-0 relative">
      {user ? (
        <div
          className="flex items-center cursor-pointer relative"
          ref={dropdownRef}
        >
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-10 h-10 rounded-full"
            onClick={() => setShowDropdown(!showDropdown)}
          />

          {isExpanded && (
            <span
              className="ml-2 max-w-[120px] truncate text-sm transition-opacity duration-300 opacity-100"
            >
              {user.displayName || "User"}
            </span>
          )}

          {showDropdown && (
            <div className="absolute bottom-12 left-0 bg-[#242424] text-white p-2 rounded-lg shadow-md w-32 z-50">
              <button
                onClick={logoutUser}
                className="w-full text-left px-2 py-1 hover:bg-[#303030] rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={loginWithGoogle}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md w-full"
        >
          Login
        </button>
      )}
    </div>
  );
}

export default NavBar;
