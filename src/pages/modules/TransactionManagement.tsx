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
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isManualEntryOpen, setIsManualEntryOpen] = useState(false);

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.amount.toString().includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || t.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
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
              <SelectTrigger className="w-40 border-2 border-foreground">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="reconciled">Reconciled</SelectItem>
                <SelectItem value="uncategorized">Uncategorized</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40 border-2 border-foreground">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-foreground">
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  className={`border-b border-muted ${transaction.status === 'uncategorized' ? 'bg-destructive/10' : ''
                    }`}
                >
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell className="font-medium">
                    {transaction.description}
                  </TableCell>
                  <TableCell>{transaction.vendor || '-'}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      {transaction.status === 'uncategorized' ? (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Select onValueChange={(value) => handleCategorize(transaction.id, value)}>
                              <SelectTrigger className="w-40 border-2 border-dashed border-gray-300 h-9">
                                <SelectValue placeholder="Assign Vendor" />
                              </SelectTrigger>
                              <SelectContent>
                                <div className="p-2 border-b border-gray-100 bg-blue-50/50">
                                  <p className="text-[10px] font-bold uppercase text-blue-600 mb-1">AI Suggestion</p>
                                  <SelectItem value="hbl" className="font-bold">HBL (Bank Fees)</SelectItem>
                                </div>
                                {mockVendors.map((v) => (
                                  <SelectItem key={v.id} value={v.id}>{v.name}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center gap-2">
                            <Select onValueChange={(value) => handleCategorize(transaction.id, value)}>
                              <SelectTrigger className="w-40 border-2 border-foreground h-9">
                                <SelectValue placeholder="Select Account" />
                              </SelectTrigger>
                              <SelectContent>
                                <div className="p-2 border-b border-gray-100 bg-green-50/50">
                                  <p className="text-[10px] font-bold uppercase text-green-600 mb-1">AI Suggestion</p>
                                  <SelectItem value="utilities" className="font-bold">Utilities Expense</SelectItem>
                                </div>
                                {categories.map((c) => (
                                  <SelectItem key={c} value={c}>{c}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">{transaction.vendor || 'Unknown Vendor'}</span>
                          <Badge variant="outline" className="w-fit text-[10px] font-bold border-gray-200">
                            {transaction.category}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className={transaction.type === 'credit' ? 'text-chart-2 font-medium' : 'text-destructive font-medium'}>
                    {transaction.type === 'credit' ? '+' : '-'}PKR {transaction.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{transaction.source}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Edit size={16} />
                      </Button>
                      {transaction.status === 'pending' && (
                        <Button variant="outline" size="icon" onClick={() => handleApprove(transaction.id)}>
                          <CheckCircle size={16} />
                        </Button>
                      )}
                    </div>
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