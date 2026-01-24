import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockExpenseCategories } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { CheckCircle } from 'lucide-react';

const COLORS = ['hsl(12, 76%, 61%)', 'hsl(173, 58%, 39%)', 'hsl(197, 37%, 24%)', 'hsl(43, 74%, 66%)', 'hsl(27, 87%, 67%)'];

const ExpenseTracking: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Expense Tracking & Analytics</h1>
        <p className="text-muted-foreground">Monitor and analyze spending</p>
      </div>

      <Card className="border-2 border-foreground">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Expense Verification Ledger</CardTitle>
              <CardDescription className="text-[10px] font-bold uppercase tracking-widest">Audit-ready expense records</CardDescription>
            </div>
            <Button size="sm" className="bg-black text-white px-6 font-bold uppercase text-[10px]">
              + Scan Receipt
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow className="border-b-2 border-foreground h-10">
                <TableHead className="text-[10px] font-bold text-black uppercase">Date</TableHead>
                <TableHead className="text-[10px] font-bold text-black uppercase">Category</TableHead>
                <TableHead className="text-[10px] font-bold text-black uppercase">Amount</TableHead>
                <TableHead className="text-[10px] font-bold text-black uppercase">Receipt</TableHead>
                <TableHead className="text-[10px] font-bold text-black uppercase">Audit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[1, 2, 3].map(i => (
                <TableRow key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <TableCell className="text-xs font-bold">2024-01-{10 + i}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[9px] font-bold uppercase py-0">Utilities</Badge>
                  </TableCell>
                  <TableCell className="text-xs font-bold">PKR {(15000 * i).toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="w-10 h-10 bg-gray-100 border-2 border-foreground overflow-hidden cursor-zoom-in hover:scale-110 transition-transform flex items-center justify-center">
                      <span className="text-[8px] font-black opacity-20 truncate px-1">BILL_{i}.PDF</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="h-7 text-[9px] font-bold uppercase tracking-widest">
                      View History
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseTracking;
