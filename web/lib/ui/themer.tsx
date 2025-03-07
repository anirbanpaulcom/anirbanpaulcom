import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import IconButton from './iconbutton';

export default function Themer({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <IconButton
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className={`flex items-center cursor-pointer justify-center ${className}`}
      Icon={
        theme === 'dark' ? (
          <MoonIcon className="scale-x-[-1] size-5" />
        ) : (
          <SunIcon className="text-amber-500 size-5" />
        )
      }
    />
  );
}
