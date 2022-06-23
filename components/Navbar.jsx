import { useTheme } from 'next-themes';
import { FaMoon, FaSun } from 'react-icons/fa';
import Link from 'next/link';

const Navbar = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-row justify-between items-center dark:bg-indigo-800 bg-indigo-100 px-10 py-3 dark:text-neutral-100">
      <h1 className="text-xl font-semibold">BlogApp</h1>
      <ul className="flex-row flex space-x-4 items-center justify-center">
        <Link href="/">
          <li className="cursor-pointer text-lg font-medium">Home</li>
        </Link>
        <Link href="/new">
          <li className="cursor-pointer text-lg font-medium">Add Post</li>
        </Link>
      </ul>
      {theme === 'dark' ? (
        <button
          onClick={() => setTheme('light')}
          className="text-yellow-400 text-lg"
        >
          <FaSun />
        </button>
      ) : (
        <button
          onClick={() => setTheme('dark')}
          className="text-indigo-900 text-lg"
        >
          <FaMoon onClick={() => setTheme('dark')} />
        </button>
      )}
    </div>
  );
};

export default Navbar;
