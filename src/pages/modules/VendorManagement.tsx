import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockVendors } from '@/data/mockData';
import { Vendor } from '@/types';
import { Plus, Search, Edit, Archive, Upload, TrendingUp, Users } from 'lucide-react';

const VendorManagement: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>(mockVendors);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  const filteredVendors = vendors.filter(
    (v) =>
      v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleArchive = (id: string) => {
    setVendors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: v.status === 'active' ? 'archived' : 'active' } : v))
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vendor & Contact Management</h1>
          <p className="text-muted-foreground">Manage vendors and employees</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus size={18} className="mr-2" />
                Add Vendor
              </Button>
            </DialogTrigger>
            <DialogContent className="border-2 border-foreground">
              <DialogHeader>
                <DialogTitle>Add New Vendor</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Vendor Name</Label>
                  <Input className="border-2 border-foreground" placeholder="Enter vendor name" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" className="border-2 border-foreground" placeholder="vendor@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input className="border-2 border-foreground" placeholder="+92-XXX-XXXXXXX" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger className="border-2 border-foreground">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utility">Utility</SelectItem>
                      <SelectItem value="supplier">Supplier</SelectItem>
                      <SelectItem value="services">Services</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Bank Name</Label>
                    <Input className="border-2 border-foreground" placeholder="e.g. HBL, Meezan Bank" />
                  </div>
                  <div className="space-y-2">
                    <Label>Bank Account (IBAN)</Label>
                    <Input className="border-2 border-foreground" placeholder="PK45-XXXX-XXXX-XXXX" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                  <Button onClick={() => setIsDialogOpen(false)}>Save Vendor</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="vendors" className="space-y-4">
        <TabsList className="border-2 border-foreground">
          <TabsTrigger value="vendors">Vendors</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
        </TabsList>

        <TabsContent value="vendors" className="space-y-4">
          <Card className="border-2 border-foreground">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  <Input
                    placeholder="Search vendors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-2 border-foreground"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-b-2 border-foreground">
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Total Spend</TableHead>
                    <TableHead>Avg. Transaction</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVendors.map((vendor) => (
                    <TableRow key={vendor.id} className="border-b border-muted">
                      <TableCell className="font-medium">{vendor.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{vendor.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{vendor.email}</p>
                          <p className="text-muted-foreground">{vendor.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>PKR {vendor.totalSpend.toLocaleString()}</TableCell>
                      <TableCell>PKR {vendor.avgTransactionValue.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={vendor.status === 'active' ? 'default' : 'secondary'}>
                          {vendor.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="icon" onClick={() => setSelectedVendor(vendor)}>
                                <TrendingUp size={16} />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="border-2 border-foreground max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Historical Analytics: {vendor.name}</DialogTitle>
                              </DialogHeader>
                              <div className="grid grid-cols-2 gap-4 my-4">
                                <div className="p-4 border-2 border-foreground bg-green-50">
                                  <p className="text-[10px] font-bold uppercase text-green-700">Total Spend</p>
                                  <p className="text-2xl font-bold">PKR {vendor.totalSpend.toLocaleString()}</p>
                                </div>
                                <div className="p-4 border-2 border-foreground bg-blue-50">
                                  <p className="text-[10px] font-bold uppercase text-blue-700">Avg Transaction Value</p>
                                  <p className="text-2xl font-bold">PKR {vendor.avgTransactionValue.toLocaleString()}</p>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <p className="text-xs font-bold uppercase">Transaction History</p>
                                <div className="border-2 border-foreground rounded-lg overflow-hidden">
                                  <Table>
                                    <TableHeader className="bg-muted">
                                      <TableRow>
                                        <TableHead className="h-8 text-[10px] font-bold">Date</TableHead>
                                        <TableHead className="h-8 text-[10px] font-bold">Description</TableHead>
                                        <TableHead className="h-8 text-[10px] font-bold text-right">Amount</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      <TableRow>
                                        <TableCell className="py-2 text-[11px]">2024-01-10</TableCell>
                                        <TableCell className="py-2 text-[11px]">Monthly Supplies</TableCell>
                                        <TableCell className="py-2 text-[11px] text-right font-bold">PKR 15,000</TableCell>
                                      </TableRow>
                                      <TableRow>
                                        <TableCell className="py-2 text-[11px]">2023-12-05</TableCell>
                                        <TableCell className="py-2 text-[11px]">Inventory Bulk</TableCell>
                                        <TableCell className="py-2 text-[11px] text-right font-bold">PKR 85,000</TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="icon">
                                <Edit size={16} />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="border-2 border-foreground">
                              <DialogHeader>
                                <DialogTitle>Edit Vendor: {vendor.name}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label>Bank Name</Label>
                                    <Input defaultValue="HBL" className="border-2 border-foreground" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Bank Account (IBAN)</Label>
                                    <Input defaultValue="PK45HBL..." className="border-2 border-foreground" />
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label>Contact Number</Label>
                                    <Input defaultValue={vendor.phone} className="border-2 border-foreground" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Email Address</Label>
                                    <Input defaultValue={vendor.email} className="border-2 border-foreground" />
                                  </div>
                                </div>
                                <Button className="w-full bg-black text-white">Update Vendor</Button>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="icon" className="hover:bg-destructive hover:text-destructive-foreground">
                                <Archive size={16} />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="border-2 border-foreground">
                              <DialogHeader>
                                <DialogTitle>Archive Vendor?</DialogTitle>
                              </DialogHeader>
                              <p className="text-sm text-muted-foreground">Are you sure you want to archive <strong>{vendor.name}</strong>? This will hide them from active lists.</p>
                              <div className="flex justify-end gap-2 mt-4">
                                <Button variant="outline">Cancel</Button>
                                <Button variant="destructive" onClick={() => handleArchive(vendor.id)}>Confirm Archive</Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="employees">
          <Card className="border-2 border-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center gap-2">
                <Users size={20} />
                Employee Directory
              </CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus size={16} className="mr-2" />
                    Add Employee
                  </Button>
                </DialogTrigger>
                <DialogContent className="border-2 border-foreground">
                  <DialogHeader>
                    <DialogTitle>Register New Employee</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase">Full Name</Label>
                      <Input className="border-2 border-foreground" placeholder="e.g. Ahmed Khan" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase">Department</Label>
                        <Select>
                          <SelectTrigger className="border-2 border-foreground">
                            <SelectValue placeholder="Select Dept" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="operations">Operations</SelectItem>
                            <SelectItem value="hr">Human Resources</SelectItem>
                            <SelectItem value="it">Technology</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase">Designation</Label>
                        <Input className="border-2 border-foreground" placeholder="e.g. Manager" />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                      <Button variant="outline">Cancel</Button>
                      <Button className="bg-black text-white px-8">Save Employee</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-b-2 border-foreground">
                    <TableHead>Employee Name</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Designation</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-b border-muted">
                    <TableCell className="font-medium">Ahmed Khan</TableCell>
                    <TableCell>Finance</TableCell>
                    <TableCell>Accountant</TableCell>
                    <TableCell><Badge>Active</Badge></TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" className="h-8 w-8 text-destructive">
                            <Archive size={14} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="border-2 border-foreground">
                          <DialogHeader><DialogTitle>Archive Employee?</DialogTitle></DialogHeader>
                          <p className="text-sm text-muted-foreground">Are you sure you want to archive this employee profile?</p>
                          <div className="flex justify-end gap-2 mt-4">
                            <Button variant="outline">Cancel</Button>
                            <Button variant="destructive">Confirm Archive</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VendorManagement;
