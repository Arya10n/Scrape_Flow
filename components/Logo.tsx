import { cn } from '@/lib/utils';
import { SquareDashedMousePointer } from 'lucide-react';
import Link from 'next/link';

function Logo({
  fontSize = 'text-2xl',
  iconSize = 20,
}: {
  fontSize?: string;
  iconSize?: number;
}) {
  return (
    <Link
      href='/'
      className={cn(
        'text-2xl font-extrabold flex items-center gap-2',
        fontSize
      )}>
      <div className='rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-600 p-2'>
        <SquareDashedMousePointer size={iconSize} className='stroke-white' />
      </div>
      <div>
        <span className='bg-gradient-to-r from-violet-400 to-violet-700 bg-clip-text text-transparent'>
          Flow
        </span>
        <span className='text-stone-700 dark:text-stone-300'>Scrape</span>
      </div>
    </Link>
  );
}
export default Logo;
