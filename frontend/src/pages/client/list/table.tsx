import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Hash,
  Mail,
  MoreHorizontal,
  Pencil,
  Phone,
  Trash2,
} from 'lucide-react';
import TableSkeleton from './skeleton';

const TableComponent = ({ search, filtered, loading, handleDelete }: any) => (
  <>
    <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[120px]">
              <span className="flex items-center gap-1.5">
                <Hash className="h-3.5 w-3.5" /> ID
              </span>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>
              <span className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5" /> Email
              </span>
            </TableHead>
            <TableHead>
              <span className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5" /> Phone
              </span>
            </TableHead>
            <TableHead className="w-[50px]" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading && <TableSkeleton />}

          {!loading && filtered.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-32 text-center text-muted-foreground text-sm"
              >
                {search
                  ? `No clients match "${search}"`
                  : 'No clients found. Add one to get started.'}
              </TableCell>
            </TableRow>
          )}

          {!loading &&
            filtered.map((client: any) => (
              <TableRow
                key={client.id}
                className="group hover:bg-muted/40 transition-colors"
              >
                <TableCell>
                  <Badge variant="secondary" className="font-mono text-xs">
                    {client.id}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">{client.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {client.email}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {client.phone}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <a href={`/clients/edit/${client.id}`}>
                          <Pencil className="mr-2 h-3.5 w-3.5" />
                          Edit
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => handleDelete(client)}
                      >
                        <Trash2 className="mr-2 h-3.5 w-3.5" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  </>
);

export default TableComponent;
