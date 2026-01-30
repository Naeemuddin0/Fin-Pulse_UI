import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockCashFlowData, mockExpenseCategories, mockVendors } from '@/data/mockData';
import { Download, TrendingUp, TrendingDown, DollarSign, Wallet, Eye, EyeOff } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Settings } from 'lucide-react';

const COLORS = ['hsl(12, 76%, 61%)', 'hsl(173, 58%, 39%)', 'hsl(197, 37%, 24%)', 'hsl(43, 74%, 66%)', 'hsl(27, 87%, 67%)'];

const Dashboard: React.FC = () => {
  const [dateRange, setDateRange] = useState('last_30');
  const [widgets, setWidgets] = useState({
    metrics: true,
    cashFlow: true,
    liquidity: true,
    vendors: true,
    expenses: true,
    budget: true
  });
  const [budgetTarget, setBudgetTarget] = useState(150000);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);

  const totalInflow = mockCashFlowData.reduce((sum, d) => sum + d.inflow, 0);
  const totalOutflow = mockCashFlowData.reduce((sum, d) => sum + d.outflow, 0);
  const currentBalance = 695000;
  const pendingPayables = 33500;
  const netLiquidity = currentBalance - pendingPayables;
  const actualSpend = totalOutflow;

  const topVendors = mockVendors.slice(0, 5).map(v => ({ name: v.name, spend: v.totalSpend }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard & Analytics</h1>
          <p className="text-muted-foreground">Overview of your financial health</p>
        </div>
        <div className="flex gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-48 border-2 border-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last_30">Last 30 Days</SelectItem>
              <SelectItem value="this_quarter">This Quarter</SelectItem>
              <SelectItem value="fiscal_year">This Fiscal Year</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={isCustomizeOpen} onOpenChange={setIsCustomizeOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-2 border-foreground">
                <Settings size={18} className="mr-2" />
                Customize
              </Button>
            </DialogTrigger>
            <DialogContent className="border-2 border-foreground">
              <DialogHeader>
                <DialogTitle>Customize Dashboard Layout</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                {Object.entries(widgets).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <Label className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</Label>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) => setWidgets(prev => ({ ...prev, [key]: checked }))}
                    />
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" className="border-2 border-foreground"><Download size={18} className="mr-2" />Export</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-2 border-foreground bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Net Liquidity Position</p>
                <p className="text-2xl font-bold">PKR {netLiquidity.toLocaleString()}</p>
                <p className="text-[9px] text-green-400 mt-1 uppercase font-bold">Healthy Runway (142 Days)</p>
              </div>
              <Wallet size={32} className="opacity-40" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Reconciliation Health</p>
                <p className="text-2xl font-bold text-red-500">2 Out of Sync</p>
                <p className="text-[9px] text-gray-400 mt-1 uppercase font-bold">Gap: 12 days since last match</p>
              </div>
              <TrendingDown size={32} className="text-red-100" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Cash Burn Rate</p>
                <p className="text-2xl font-bold">PKR 124,500</p>
                <p className="text-[9px] text-gray-400 mt-1 uppercase font-bold">Avg. Monthly Outflow</p>
              </div>
              <TrendingUp size={32} className="text-gray-100" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-foreground bg-gray-50/50">
          <CardContent className="pt-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Budget Utilization</p>
            <div className="space-y-1">
              <Progress value={(actualSpend / budgetTarget) * 100} className="h-1 bg-gray-200 rounded-none" />
              <div className="flex justify-between text-[9px] font-bold uppercase">
                <span>{Math.round((actualSpend / budgetTarget) * 100)}% Used</span>
                <span className="text-gray-400">PKR {budgetTarget.toLocaleString()} Target</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Cash Flow Chart */}
        <Card className="border-2 border-foreground">
          <CardHeader><CardTitle>Cash Flow Trend</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockCashFlowData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => `PKR ${value.toLocaleString()}`} />
                  <Legend />
                  <Line type="monotone" dataKey="inflow" name="Inflows" stroke="hsl(173, 58%, 39%)" strokeWidth={2} />
                  <Line type="monotone" dataKey="outflow" name="Outflows" stroke="hsl(0, 84%, 60%)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Expense Breakdown */}
        <Card className="border-2 border-foreground">
          <CardHeader><CardTitle>Expense Breakdown</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={mockExpenseCategories} dataKey="amount" nameKey="category" cx="50%" cy="50%" outerRadius={80} label={({ category, percentage }) => `${category}: ${percentage}%`}>
                    {mockExpenseCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `PKR ${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Vendors & Budget */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="border-2 border-foreground">
          <CardHeader><CardTitle>Top 5 Vendors by Spend</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topVendors} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip formatter={(value: number) => `PKR ${value.toLocaleString()}`} />
                  <Bar dataKey="spend" fill="hsl(0, 0%, 0%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-foreground">
          <CardHeader><CardTitle>Budget vs Actual</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span>Monthly Budget Target</span>
              <div className="flex items-center gap-2">
                <span className="font-bold">PKR {budgetTarget.toLocaleString()}</span>
                <Dialog open={isBudgetOpen} onOpenChange={setIsBudgetOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6"><Settings size={12} /></Button>
                  </DialogTrigger>
                  <DialogContent className="border-2 border-foreground">
                    <DialogHeader><DialogTitle>Set Monthly Budget</DialogTitle></DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label>Target Amount (PKR)</Label>
                        <Input
                          type="number"
                          value={budgetTarget}
                          onChange={(e) => setBudgetTarget(Number(e.target.value))}
                          className="border-2 border-foreground"
                        />
                      </div>
                      <Button className="w-full" onClick={() => setIsBudgetOpen(false)}>Save Budget</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <Progress value={(actualSpend / budgetTarget) * 100} className="h-4" />
            <div className="flex justify-between text-sm">
              <span>Actual Spend: PKR {actualSpend.toLocaleString()}</span>
              <Badge variant={actualSpend > budgetTarget ? 'destructive' : 'default'} className={actualSpend <= budgetTarget ? 'bg-chart-2' : ''}>
                {actualSpend > budgetTarget ? 'Over Budget' : 'Within Budget'}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
