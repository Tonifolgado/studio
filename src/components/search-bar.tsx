'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';

export function SearchBar({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [inputValue, setInputValue] = useState(searchParams.get('q')?.toString() || '');

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (inputValue) {
        params.set('q', inputValue);
      } else {
        params.delete('q');
      }
      // use `replace` to update the URL without adding to browser history
      replace(`${pathname}?${params.toString()}`);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, pathname, replace, searchParams]);

  return (
    <div className="relative">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        className="w-full pl-10 h-12 text-base"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
    </div>
  );
}
