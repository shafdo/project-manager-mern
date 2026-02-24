import { Button } from '@/components/ui/button';
import { Plus, Users } from 'lucide-react';

const Header = ({ loading, clients }: any) => (
  <div className="flex items-start justify-between gap-4">
    <div className="flex items-center gap-3">
      <div className="rounded-lg bg-primary p-2">
        <Users className="h-5 w-5 text-primary-foreground" />
      </div>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Clients</h1>
        <p className="text-sm text-muted-foreground">
          {loading
            ? 'Loading…'
            : `${clients.length} client${clients.length !== 1 ? 's' : ''} registered`}
        </p>
      </div>
    </div>

    <Button asChild size="sm">
      <a href="/clients/add">
        <Plus className="mr-2 h-4 w-4" />
        Add Client
      </a>
    </Button>
  </div>
);

export default Header;
