import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockExpenseCategories } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { CheckCircle, TrendingUp, Filter, ArrowUpRight } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const COLORS = ['hsl(12, 76%, 61%)', 'hsl(173, 58%, 39%)', 'hsl(197, 37%, 24%)', 'hsl(43, 74%, 66%)', 'hsl(27, 87%, 67%)'];

const ExpenseTracking: React.FC = () => {
  const [threshold, setThreshold] = useState(20000);
  const [filterCategory, setFilterCategory] = useState('all');

  const expenseData = [
    { period: 'Mon', amount: 45000 },
    { period: 'Tue', amount: 52000 },
    { period: 'Wed', amount: 48000 },
    { period: 'Thu', amount: 61000 },
    { period: 'Fri', amount: 55000 },
    { period: 'Sat', amount: 42000 },
    { period: 'Sun', amount: 38000 },
  ];

  const expenses = [
    { id: 1, date: '2024-01-11', category: 'Utilities', amount: 15000, vendor: 'KE-Electric', receipt: 'BILL_1.PDF', audit: 'Verified' },
    { id: 2, date: '2024-01-12', category: 'Inventory', amount: 45000, vendor: 'Wholesale Corp', receipt: 'BILL_2.PDF', audit: 'Pending' },
    { id: 3, date: '2024-01-13', category: 'Salaries', amount: 150000, vendor: 'Employee Payroll', receipt: 'BILL_3.PDF', audit: 'Verified' },
    { id: 4, date: '2024-01-14', category: 'Rent', amount: 75000, vendor: 'Property Group', receipt: 'BILL_4.PDF', audit: 'Verified' },
  ];

  const filteredExpenses = expenses.filter(e => e.amount >= threshold && (filterCategory === 'all' || e.category === filterCategory));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Expense Tracking & Analytics</h1>
          <p className="text-muted-foreground">Monitor and analyze spending patterns</p>
        </div>
        <div className="flex gap-2">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-40 border-2 border-foreground"><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Utilities">Utilities</SelectItem>
              <SelectItem value="Inventory">Inventory</SelectItem>
              <SelectItem value="Salaries">Salaries</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2 bg-gray-50 border-2 border-foreground px-3 py-1 rounded-md">
            <span className="text-[10px] font-bold uppercase">Threshold</span>
            <Select value={threshold.toString()} onValueChange={(v) => setThreshold(Number(v))}>
              <SelectTrigger className="w-32 border-none h-6 bg-transparent p-0 focus:ring-0 font-bold"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Show All</SelectItem>
                <SelectItem value="10000">{'>'} 10,000</SelectItem>
                <SelectItem value="50000">{'>'} 50,000</SelectItem>
                <SelectItem value="100000">{'>'} 100,000</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="col-span-2 border-2 border-foreground">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase">Spending Trend (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent className="h-48 pt-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={expenseData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="period" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip />
                <Line type="stepAfter" dataKey="amount" stroke="#000" strokeWidth={3} dot={{ r: 4, fill: '#000' }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="border-2 border-foreground bg-black text-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Avg. Daily Outflow</p>
            <p className="text-3xl font-bold tracking-tighter italic">PKR 48,200</p>
            <div className="flex items-center text-green-400 text-[10px] font-bold">
              <TrendingUp size={14} className="mr-1" /> 12% vs Last Week
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {mockExpenseCategories.slice(0, 4).map((c, i) => (
          <Card key={i} className="border-2 border-foreground p-4">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[10px] font-black uppercase truncate w-24">{c.category}</span>
              <Badge variant={c.percentage > 80 ? 'destructive' : 'outline'} className="text-[8px] h-4">
                {c.percentage}% Buffer
              </Badge>
            </div>
            <Progress value={c.percentage} className="h-1 bg-gray-100" />
            <div className="mt-2 flex justify-between items-end">
              <span className="text-[9px] font-bold text-gray-400">PKR {c.amount.toLocaleString()}</span>
              {c.percentage > 90 && <Badge className="bg-red-500 text-[8px] h-4">OVER BUDGET</Badge>}
            </div>
          </Card>
        ))}
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
              {filteredExpenses.map(e => (
                <TableRow key={e.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <TableCell className="text-xs font-bold">{e.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-[9px] font-bold uppercase py-0">{e.category}</Badge>
                    <p className="text-[8px] text-gray-400 font-bold mt-0.5">{e.vendor}</p>
                  </TableCell>
                  <TableCell className="text-xs font-bold">PKR {e.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-100 border-2 border-foreground flex items-center justify-center cursor-zoom-in">
                        <span className="text-[6px] font-black opacity-20">{e.receipt}</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-6 w-6"><ArrowUpRight size={12} /></Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${e.audit === 'Verified' ? 'bg-green-500' : 'bg-orange-500'} text-[9px] font-bold uppercase py-0`}>
                      {e.audit}
                    </Badge>
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
