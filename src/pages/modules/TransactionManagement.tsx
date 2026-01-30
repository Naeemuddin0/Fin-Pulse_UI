import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { mockTransactions, mockAccounts, mockVendors } from '@/data/mockData';
import { Transaction } from '@/types';
import { Search, Filter, Plus, Check, AlertCircle, Edit, CheckCircle } from 'lucide-react';

const TransactionManagement: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isManualEntryOpen, setIsManualEntryOpen] = useState(false);
  const [selectedTransactions, setSelectedTransactions] = useState<string[]>([]);

  const toggleTransaction = (id: string) => {
    setSelectedTransactions(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.amount.toString().includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (id: string) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'approved' } : t))
    );
  };

  const handleCategorize = (id: string, category: string) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, category, status: t.status === 'uncategorized' ? 'pending' : t.status } : t))
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-chart-2">Approved</Badge>;
      case 'reconciled':
        return <Badge>Reconciled</Badge>;
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      case 'uncategorized':
        return <Badge variant="destructive">Uncategorized</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const categories = [...new Set(mockAccounts.filter(a => a.type === 'expense' || a.type === 'revenue').map(a => a.name))];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transaction Management</h1>
          <p className="text-muted-foreground">Review and manage transactions</p>
        </div>
        <Dialog open={isManualEntryOpen} onOpenChange={setIsManualEntryOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus size={18} className="mr-2" />
              Manual Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="border-2 border-foreground">
            <DialogHeader>
              <DialogTitle>Add Manual Transaction</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Date *</Label>
                <Input type="date" className="border-2 border-foreground" />
              </div>
              <div className="space-y-2">
                <Label>Amount (PKR) *</Label>
                <Input type="number" className="border-2 border-foreground" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label>Payee/Vendor *</Label>
                <Select>
                  <SelectTrigger className="border-2 border-foreground">
                    <SelectValue placeholder="Select vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockVendors.map((v) => (
                      <SelectItem key={v.id} value={v.id}>{v.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Category *</Label>
                <Select>
                  <SelectTrigger className="border-2 border-foreground">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input className="border-2 border-foreground" placeholder="Transaction description" />
              </div>
              <div className="space-y-2">
                <Label>Target Bank Account *</Label>
                <Select>
                  <SelectTrigger className="border-2 border-foreground">
                    <SelectValue placeholder="Select bank account" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="main">Main Account - HBL</SelectItem>
                    <SelectItem value="savings">Savings - Meezan Bank</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsManualEntryOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsManualEntryOpen(false)}>Save Transaction</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-2 border-foreground">
        <CardHeader>
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Search by description or amount..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-2 border-foreground"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 border-2 border-foreground">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="uncategorized">Uncategorized Only</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
              </SelectContent>
            </Select>
            <Button className="border-2 border-foreground font-bold">Apply Filter</Button>
            <Button
              className="bg-black text-white font-bold ml-auto"
              disabled={selectedTransactions.length === 0}
            >
              Approve Selected ({selectedTransactions.length})
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-foreground">
                <TableHead className="w-10">
                  <input type="checkbox" onChange={(e) => {
                    if (e.target.checked) setSelectedTransactions(filteredTransactions.map(t => t.id));
                    else setSelectedTransactions([]);
                  }} />
                </TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  className={`border-b border-muted ${transaction.status === 'uncategorized' ? 'bg-destructive/10' : ''}`}
                >
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedTransactions.includes(transaction.id)}
                      onChange={() => toggleTransaction(transaction.id)}
                    />
                  </TableCell>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell className="font-medium">
                    {transaction.description}
                  </TableCell>
                  <TableCell>
                    <Select onValueChange={(value) => handleCategorize(transaction.id, value)}>
                      <SelectTrigger className="w-40 border-2 border-dashed border-gray-300 h-9">
                        <SelectValue placeholder={transaction.vendor || "Select Vendor"} />
                      </SelectTrigger>
                      <SelectContent>
                        <div className="p-2 border-b border-gray-100 bg-blue-50/50">
                          <p className="text-[10px] font-bold uppercase text-blue-600 mb-1">Suggested Vendor</p>
                          <SelectItem value="hbl" className="font-bold">HBL (Bank Fees)</SelectItem>
                        </div>
                        {mockVendors.map(v => <SelectItem key={v.id} value={v.id}>{v.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select onValueChange={(value) => handleCategorize(transaction.id, value)}>
                      <SelectTrigger className="w-40 border-2 border-dashed border-gray-300 h-9">
                        <SelectValue placeholder={transaction.category || "Select Category"} />
                      </SelectTrigger>
                      <SelectContent>
                        <div className="p-2 border-b border-gray-100 bg-orange-50/50">
                          <p className="text-[10px] font-bold uppercase text-orange-600 mb-1">Suggested Category</p>
                          <SelectItem value="bank-fees" className="font-bold">Bank Charges</SelectItem>
                        </div>
                        {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="font-bold">PKR {transaction.amount.toLocaleString()}</TableCell>
                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs font-bold text-green-600 hover:text-green-700 hover:bg-green-50"
                      onClick={() => handleApprove(transaction.id)}
                      disabled={transaction.status === 'approved'}
                    >
                      {transaction.status === 'approved' ? <CheckCircle size={14} /> : 'Approve'}
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

export default TransactionManagement;