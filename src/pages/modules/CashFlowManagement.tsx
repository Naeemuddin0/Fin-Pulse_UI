import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockCashFlowData } from '@/data/mockData';
import { TrendingUp, TrendingDown, DollarSign, AlertTriangle, Download, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CashFlowManagement: React.FC = () => {
  const [dateRange, setDateRange] = useState('current_month');
  const [selectedBank, setSelectedBank] = useState('all');

  const totalInflow = mockCashFlowData.reduce((sum, d) => sum + d.inflow, 0);
  const totalOutflow = mockCashFlowData.reduce((sum, d) => sum + d.outflow, 0);
  const netCashFlow = totalInflow - totalOutflow;
  const closingBalance = mockCashFlowData[mockCashFlowData.length - 1].balance;
  const openingBalance = 500000;

  const avgDailyOutflow = totalOutflow / 30;
  const runway = Math.round(closingBalance / avgDailyOutflow);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cash Flow Management</h1>
          <p className="text-muted-foreground">Monitor cash position and trends</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedBank} onValueChange={setSelectedBank}>
            <SelectTrigger className="w-48 border-2 border-foreground">
              <SelectValue placeholder="All Bank Accounts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Bank Accounts</SelectItem>
              <SelectItem value="hbl">HBL Operating</SelectItem>
              <SelectItem value="meezan">Meezan Primary</SelectItem>
            </SelectContent>
          </Select>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40 border-2 border-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current_month">Current Month</SelectItem>
              <SelectItem value="last_quarter">Last Quarter</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-2 border-foreground">
            <Download size={18} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="border-2 border-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Inflows</p>
                <p className="text-2xl font-bold text-chart-2">PKR {totalInflow.toLocaleString()}</p>
              </div>
              <ArrowUpRight size={32} className="text-chart-2" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Outflows</p>
                <p className="text-2xl font-bold text-destructive">PKR {totalOutflow.toLocaleString()}</p>
              </div>
              <ArrowDownRight size={32} className="text-destructive" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Net Cash Change</p>
                <p className={`text-2xl font-bold ${netCashFlow >= 0 ? 'text-chart-2' : 'text-destructive'}`}>
                  {netCashFlow >= 0 ? '+' : ''}PKR {netCashFlow.toLocaleString()}
                </p>
              </div>
              {netCashFlow >= 0 ? (
                <TrendingUp size={32} className="text-chart-2" />
              ) : (
                <TrendingDown size={32} className="text-destructive" />
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Closing Balance</p>
                <p className="text-2xl font-bold">PKR {closingBalance.toLocaleString()}</p>
              </div>
              <DollarSign size={32} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-foreground">
        <CardHeader>
          <CardTitle>Cash Position Trends</CardTitle>
          <CardDescription>Visualize trends using line charts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockCashFlowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip formatter={(value: number) => `PKR ${value.toLocaleString()}`} />
                <Legend />
                <Line type="monotone" dataKey="inflow" name="Inflows" stroke="hsl(173, 58%, 39%)" strokeWidth={2} />
                <Line type="monotone" dataKey="outflow" name="Outflows" stroke="hsl(0, 84%, 60%)" strokeWidth={2} />
                <Line type="monotone" dataKey="balance" name="Balance" stroke="hsl(0, 0%, 0%)" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card className="border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader>
            <CardTitle className="text-lg">Top Spending Categories</CardTitle>
            <CardDescription className="text-[10px] font-bold uppercase tracking-widest">Outflow Concentration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase">
                <span>Inventory & Stock</span>
                <span>PKR 85,000</span>
              </div>
              <Progress value={65} className="h-2 bg-gray-100" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase">
                <span>Employee Salaries</span>
                <span>PKR 150,000</span>
              </div>
              <Progress value={85} className="h-2 bg-gray-100" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold uppercase">
                <span>Utilities & Rent</span>
                <span>PKR 45,000</span>
              </div>
              <Progress value={35} className="h-2 bg-gray-100" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-foreground">
          <CardHeader>
            <CardTitle>Cash Runway</CardTitle>
            <CardDescription>Days remaining until cash reaches 0</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-6xl font-bold">{runway}</p>
              <p className="text-muted-foreground">Days of Runway</p>
            </div>
            <Progress value={Math.min((runway / 365) * 100, 100)} className="h-3" />
            <p className="text-sm text-center text-muted-foreground">
              Based on current burn rate of PKR {Math.round(avgDailyOutflow).toLocaleString()}/day
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-foreground">
        <CardHeader>
          <CardTitle>Closing Balances</CardTitle>
          <CardDescription>Closing cash balance for selected intervals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            {mockCashFlowData.map((data, index) => (
              <div key={index} className="p-4 border-2 border-muted text-center">
                <p className="text-sm text-muted-foreground">{data.period}</p>
                <p className="text-xl font-bold">PKR {data.balance.toLocaleString()}</p>
                <p className={`text-sm ${data.inflow - data.outflow >= 0 ? 'text-chart-2' : 'text-destructive'}`}>
                  {data.inflow - data.outflow >= 0 ? '+' : ''}
                  PKR {(data.inflow - data.outflow).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CashFlowManagement;
