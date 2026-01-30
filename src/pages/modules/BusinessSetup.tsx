import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Check, Landmark, Calendar, Building2, Wallet } from 'lucide-react';

const BusinessSetup: React.FC = () => {
  const [coa, setCoa] = useState([
    { id: '1', name: 'Cash in Hand', category: 'Asset', balance: 0 },
    { id: '2', name: 'HBL Bank Account', category: 'Asset', balance: 0 },
    { id: '3', name: 'Sales Revenue', category: 'Revenue', balance: 0 },
    { id: '4', name: 'Rent Expense', category: 'Expense', balance: 0 },
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Business Setup & Configuration</h1>
        <p className="text-muted-foreground">Configure your business profile, fiscal year, and financial foundation.</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="border-2 border-foreground bg-background">
          <TabsTrigger value="profile" className="data-[state=active]:bg-foreground data-[state=active]:text-background">
            <Building2 size={16} className="mr-2" />
            1. Business Profile
          </TabsTrigger>
          <TabsTrigger value="fiscal" className="data-[state=active]:bg-foreground data-[state=active]:text-background">
            <Calendar size={16} className="mr-2" />
            2. Fiscal Year
          </TabsTrigger>
          <TabsTrigger value="coa" className="data-[state=active]:bg-foreground data-[state=active]:text-background">
            <Landmark size={16} className="mr-2" />
            3. Chart of Accounts
          </TabsTrigger>
          <TabsTrigger value="opening" className="data-[state=active]:bg-foreground data-[state=active]:text-background">
            <Wallet size={16} className="mr-2" />
            4. Opening Balances
          </TabsTrigger>
        </TabsList>

        {/* UC-2.1: Setup Business Profile */}
        <TabsContent value="profile">
          <Card className="border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader>
              <CardTitle>Business Profile</CardTitle>
              <CardDescription>Basic information for your company records.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="biz-name">Business Name *</Label>
                  <Input id="biz-name" className="border-2 border-foreground" placeholder="e.g. Acme Corp" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="biz-email">Business Email *</Label>
                  <Input id="biz-email" type="email" className="border-2 border-foreground" placeholder="contact@acme.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="biz-phone">Contact Number *</Label>
                  <Input id="biz-phone" className="border-2 border-foreground" placeholder="+92-XXX-XXXXXXX" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="biz-type">Business Type *</Label>
                  <Select>
                    <SelectTrigger className="border-2 border-foreground">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="services">Services</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="biz-address">Business Address *</Label>
                <Input id="biz-address" className="border-2 border-foreground" placeholder="Complete address" />
              </div>
              <Button className="bg-black text-white hover:bg-black/90 px-8">Save Profile</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* UC-2.2: Setup Fiscal Year */}
        <TabsContent value="fiscal">
          <Card className="border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader>
              <CardTitle>Fiscal Year Configuration</CardTitle>
              <CardDescription>Define your company's financial reporting period.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date *</Label>
                  <Input type="date" className="border-2 border-foreground" />
                </div>
                <div className="space-y-2">
                  <Label>End Date *</Label>
                  <Input type="date" className="border-2 border-foreground" />
                </div>
              </div>
              <Button className="bg-black text-white px-8">Confirm Fiscal Year</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* UC-2.3: Setup Chart of Accounts */}
        <TabsContent value="coa">
          <Card className="border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Chart of Accounts</CardTitle>
                <CardDescription>Manage your ledger categories and accounts.</CardDescription>
              </div>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-[200px] border-2 border-foreground">
                    <SelectValue placeholder="Select Template" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Retail Template</SelectItem>
                    <SelectItem value="services">Services Template</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing Template</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="border-2 border-foreground h-11">
                  <Plus size={18} className="mr-2" />
                  Add Ledger
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-b-2 border-foreground">
                    <TableHead>Account Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Current Balance</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coa.map((account) => (
                    <TableRow key={account.id} className="border-b border-muted">
                      <TableCell className="font-medium">{account.name}</TableCell>
                      <TableCell>{account.category}</TableCell>
                      <TableCell>PKR {account.balance.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Edit size={14} /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 size={14} /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-6 flex justify-end">
                <Button className="bg-black text-white px-8">Confirm Chart of Accounts</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* UC-2.4: Configure Opening Balance */}
        <TabsContent value="opening">
          <Card className="border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader>
              <CardTitle>Opening Balance Entry</CardTitle>
              <CardDescription>Set the starting balances for your accounts as of day one.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4 p-4 border-2 border-muted rounded-lg bg-muted/5">
                  <h3 className="font-bold flex items-center gap-2">
                    <Wallet size={16} />
                    Cash In Hand
                  </h3>
                  <div className="space-y-2">
                    <Label>In Hand Amount *</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold">PKR</span>
                      <Input type="number" className="pl-12 border-2 border-foreground h-12" placeholder="0.00" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 p-4 border-2 border-muted rounded-lg bg-muted/5">
                  <h3 className="font-bold flex items-center gap-2">
                    <Landmark size={16} />
                    Ledger Account
                  </h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Account</Label>
                      <Select>
                        <SelectTrigger className="border-2 border-foreground h-12">
                          <SelectValue placeholder="Select account" />
                        </SelectTrigger>
                        <SelectContent>
                          {coa.map(a => <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Balance Amount *</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold">PKR</span>
                        <Input type="number" className="pl-12 border-2 border-foreground h-12" placeholder="0.00" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="border-2 border-foreground h-12 data-[state=selected]:bg-black data-[state=selected]:text-white">Debit</Button>
                      <Button variant="outline" className="border-2 border-foreground h-12">Credit</Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="bg-black text-white hover:bg-black/90 px-12 h-12 text-sm font-bold uppercase tracking-widest">
                  Submit Initial Balance
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BusinessSetup;
