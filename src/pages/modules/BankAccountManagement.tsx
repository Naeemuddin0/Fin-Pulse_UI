import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { mockBankAccounts, bankInstitutions } from '@/data/mockData';
import { BankAccount } from '@/types';
import { Plus, Landmark, CreditCard, Wallet, PiggyBank, Search, History, Edit, Archive, Eye } from 'lucide-react';

const BankAccountManagement: React.FC = () => {
  const [accounts, setAccounts] = useState<BankAccount[]>(mockBankAccounts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'operating':
        return <Landmark size={20} />;
      case 'savings':
        return <PiggyBank size={20} />;
      case 'petty_cash':
        return <Wallet size={20} />;
      case 'credit_card':
        return <CreditCard size={20} />;
      default:
        return <Landmark size={20} />;
    }
  };

  const totalCash = accounts
    .filter((a) => a.category !== 'credit_card' && a.status === 'active')
    .reduce((sum, a) => sum + a.currentBalance, 0);

  const totalCredit = accounts
    .filter((a) => a.category === 'credit_card' && a.status === 'active')
    .reduce((sum, a) => sum + a.currentBalance, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bank Account Management</h1>
          <p className="text-muted-foreground">Manage bank accounts and liquidity</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus size={18} className="mr-2" />
              Add Account
            </Button>
          </DialogTrigger>
          <DialogContent className="border-2 border-foreground">
            <DialogHeader>
              <DialogTitle>Add Bank Account</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Bank Institution</Label>
                <Select>
                  <SelectTrigger className="border-2 border-foreground">
                    <SelectValue placeholder="Select bank" />
                  </SelectTrigger>
                  <SelectContent>
                    {bankInstitutions.map((bank) => (
                      <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Account Number / IBAN</Label>
                <Input className="border-2 border-foreground" placeholder="PK45-XXXX-XXXX-XXXX-XXXX" />
              </div>
              <div className="space-y-2">
                <Label>Account Category</Label>
                <Select>
                  <SelectTrigger className="border-2 border-foreground">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="operating">Operating Account</SelectItem>
                    <SelectItem value="savings">Savings Account</SelectItem>
                    <SelectItem value="petty_cash">Petty Cash</SelectItem>
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Opening Balance (PKR)</Label>
                <Input type="number" className="border-2 border-foreground" placeholder="0.00" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsDialogOpen(false)}>Add Account</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-2 border-foreground bg-black text-white">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Net Liquidity Position</p>
                <p className="text-2xl font-bold">PKR {(totalCash - totalCredit).toLocaleString()}</p>
                <p className="text-[9px] text-gray-400 mt-1 uppercase font-bold">Assets - Liabilities</p>
              </div>
              <Landmark size={32} className="opacity-40" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Total Bank Balance</p>
                <p className="text-2xl font-bold">PKR {totalCash.toLocaleString()}</p>
              </div>
              <Wallet size={32} className="text-gray-200" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Credit Liabilities</p>
                <p className="text-2xl font-bold text-red-600">PKR {totalCredit.toLocaleString()}</p>
              </div>
              <CreditCard size={32} className="text-red-100" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-2 border-foreground bg-gray-50/50">
          <CardContent className="pt-6">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Composition</p>
            <div className="space-y-1">
              <Progress value={(totalCash / (totalCash + (totalCredit || 1))) * 100} className="h-1 bg-gray-200 rounded-none" />
              <div className="flex justify-between text-[9px] font-bold uppercase">
                <span>{Math.round((totalCash / (totalCash + (totalCredit || 1))) * 100)}% Cash</span>
                <span className="text-red-400">{100 - Math.round((totalCash / (totalCash + (totalCredit || 1))) * 100)}% Debt</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account) => (
          <Card key={account.id} className="border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-2px] transition-all">
            <CardHeader className="pb-3 border-b border-gray-100">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-gray-50 rounded border border-gray-100">
                    {getCategoryIcon(account.category)}
                  </div>
                  <CardTitle className="text-base font-bold tracking-tight uppercase">{account.institutionName}</CardTitle>
                </div>
                <Badge
                  variant={account.reconciliationStatus === 'up_to_date' ? 'default' : 'destructive'}
                  className={`text-[9px] font-bold uppercase tracking-widest py-0.5 ${account.reconciliationStatus === 'up_to_date' ? 'bg-green-600' : 'bg-red-500'}`}
                >
                  {account.reconciliationStatus === 'up_to_date' ? 'Reconciled' : 'Out of Sync'}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <CardDescription className="font-mono text-[10px] font-bold text-gray-400 italic">{account.accountNumber}</CardDescription>
                <div className="flex items-center gap-1.5 bg-gray-100 px-2 py-0.5 rounded text-[9px] font-bold uppercase">
                  <History size={10} className="text-gray-400" />
                  <span>Gap: {Math.floor(Math.random() * 15)} Days</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-bold uppercase text-gray-400 leading-none">Available Balance</span>
                <span className="text-2xl font-bold leading-none tracking-tighter">PKR {account.currentBalance.toLocaleString()}</span>
              </div>

              <div className="flex gap-2 pt-2 border-t border-gray-50">
                <Button variant="outline" size="sm" className="flex-1 h-8 text-[10px] font-bold uppercase border-2 border-foreground">
                  Ingest Stmt
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 border-2 border-foreground">
                  <Edit size={14} />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8 border-red-200 text-red-500 hover:bg-red-50 hover:border-red-500">
                  <Archive size={14} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-2 border-foreground">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History size={20} />
            Recent Account Activity
          </CardTitle>
          <CardDescription>Transaction list for selected account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input placeholder="Search transactions..." className="pl-10 border-2 border-foreground" />
            </div>
            <Select>
              <SelectTrigger className="w-40 border-2 border-foreground">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="debit">Debit</SelectItem>
                <SelectItem value="credit">Credit</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-foreground">
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Balance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-b border-muted">
                <TableCell>2024-01-15</TableCell>
                <TableCell>Electricity Bill Payment</TableCell>
                <TableCell><Badge variant="destructive">Debit</Badge></TableCell>
                <TableCell className="text-destructive">-PKR 15,000</TableCell>
                <TableCell>PKR 695,000</TableCell>
              </TableRow>
              <TableRow className="border-b border-muted">
                <TableCell>2024-01-13</TableCell>
                <TableCell>Client Payment - Project Alpha</TableCell>
                <TableCell><Badge className="bg-chart-2">Credit</Badge></TableCell>
                <TableCell className="text-chart-2">+PKR 150,000</TableCell>
                <TableCell>PKR 710,000</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default BankAccountManagement;
