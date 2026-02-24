import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { TableCell, TableRow } from '@/components/ui/table';
import { RefreshCw, Search } from 'lucide-react';

const SearchComponent = ({ keyword, setSearch, loading, refetch }: any) => (
  <>
    <div className="flex items-center gap-2">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, email, phone, ID…"
          className="pl-8"
          value={keyword}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Button
        variant="outline"
        size="icon"
        className="cursor-pointer"
        onClick={() => refetch()}
        disabled={loading}
        title="Refresh"
      >
        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
      </Button>
    </div>
  </>
);

export default SearchComponent;
