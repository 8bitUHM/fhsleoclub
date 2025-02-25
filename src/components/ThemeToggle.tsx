import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(storedDarkMode);
    if (storedDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevState) => {
      const newState = !prevState;
      if (newState) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("darkMode", "true");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("darkMode", "false");
      }
      return newState;
    });
  };
  return (
    <>
      <label className="inline-flex items-center me-5 cursor-pointer">
        <input
          type="checkbox"
          defaultValue=""
          className="sr-only peer"
          checked={isDarkMode}
          onChange={toggleDarkMode}
        />
        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-teal-600" />
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
          Dark Mode
        </span>
      </label>
    </>
  );
};

export default DarkModeToggle;
