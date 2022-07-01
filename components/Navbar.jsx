import { useTheme } from 'next-themes';
import { FaHome, FaMoon, FaPlus, FaSun } from 'react-icons/fa';
import Link from 'next/link';

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-row justify-between items-center dark:bg-neutral-800 bg-white px-10 py-4 dark:text-neutral-100 border-b border-neutral-400 dark:border-neutral-600">
      <h1 className="text-xl font-semibold">BlogApp</h1>
      <ul className="flex-row flex space-x-10 items-center justify-center">
        <Link href="/">
          <li className="cursor-pointer text-lg font-medium flex flex-row space-x-2 items-center hover:opacity-80 duration-100">
            <FaHome />
            <span>Home</span>
          </li>
        </Link>
        <Link href="/new">
          <li className="cursor-pointer text-lg font-medium flex flex-row space-x-2 items-center hover:opacity-80 duration-100">
            <FaPlus />
            <span>Add Post</span>
          </li>
        </Link>
      </ul>
      {theme === 'light' ? (
        <button
          onClick={() => setTheme('dark')}
          className="text-sky-700 text-lg"
        >
          <FaMoon onClick={() => setTheme('dark')} />
        </button>
      ) : (
        <button
          onClick={() => setTheme('light')}
          className="text-yellow-400 text-lg"
        >
          <FaSun />
        </button>
      )}
    </div>
  );
};

export default Navbar;
