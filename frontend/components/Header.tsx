import React, { useState } from "react";
import Logo from "./Logo";

interface HeaderProps {
  navigate: (page: string) => void;
  currentPage: string;
}

const NavLink: React.FC<{
  pageName: string;
  currentPage: string;
  navigate: (page: string) => void;
  children: React.ReactNode;
  isMobile?: boolean;
}> = ({ pageName, currentPage, navigate, children, isMobile = false }) => {
  const isActive = currentPage === pageName;
  const baseClasses = isMobile
    ? "block px-3 py-2 rounded-md text-base font-medium"
    : "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300";
  const activeClasses = isMobile
    ? "bg-brand-secondary text-white"
    : "text-white bg-brand-dark/50";
  const inactiveClasses = isMobile
    ? "text-gray-300 hover:bg-gray-700 hover:text-white"
    : "text-gray-300 hover:bg-gray-700/50 hover:text-white";

  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        navigate(pageName);
      }}
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </a>
  );
};

const Header: React.FC<HeaderProps> = ({ navigate, currentPage }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavigate = (page: string) => {
    navigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-brand-dark/20">
      <div className="container mx-auto px-4">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="flex-shrink-0 flex items-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNavigate("home");
              }}
            >
              <Logo className="h-8 w-auto text-white" />
            </a>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch">
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <NavLink
                  pageName="home"
                  currentPage={currentPage}
                  navigate={handleNavigate}
                >
                  Home
                </NavLink>
                <NavLink
                  pageName="about"
                  currentPage={currentPage}
                  navigate={handleNavigate}
                >
                  About Us
                </NavLink>
                <NavLink
                  pageName="faq"
                  currentPage={currentPage}
                  navigate={handleNavigate}
                >
                  FAQ
                </NavLink>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"></div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink
              pageName="home"
              currentPage={currentPage}
              navigate={handleNavigate}
              isMobile
            >
              Home
            </NavLink>
            <NavLink
              pageName="about"
              currentPage={currentPage}
              navigate={handleNavigate}
              isMobile
            >
              About Us
            </NavLink>
            <NavLink
              pageName="faq"
              currentPage={currentPage}
              navigate={handleNavigate}
              isMobile
            >
              FAQ
            </NavLink>
            <div className="border-t border-gray-700 my-2"></div>
            <button
              onClick={() => handleNavigate("login")}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Login
            </button>
            <button
              onClick={() => handleNavigate("signup")}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
