import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@workspace/ui/components/table';
import Link from 'next/link';
import { Badge } from '@workspace/ui/components/badge';

export default function TodoPage() {
  return (
    <Table>
      {/*<TableCaption>A list of your recent invoices.</TableCaption>*/}
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Date</TableHead>
          <TableHead className="w-2/3">Title</TableHead>
          <TableHead>Skill</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">2024-02-05</TableCell>
          <TableCell>
            <Link href="/laboratory/todo/zustand">zustand를 이용한 todo</Link>
          </TableCell>
          <TableCell>
            <Badge variant="outline">zustand</Badge>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">2024-01-20</TableCell>
          <TableCell>
            <Link href="/laboratory/todo/redux">redux를 이용한 todo</Link>
          </TableCell>
          <TableCell>
            <Badge variant="outline">redux</Badge>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
