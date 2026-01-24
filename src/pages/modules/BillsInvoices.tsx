import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockBills, mockInvoices, mockVendors } from '@/data/mockData';
import { Bill } from '@/types';
import { Plus, Upload, Receipt, FileText, CreditCard } from 'lucide-react';

const BillsInvoices: React.FC = () => {
  const [bills, setBills] = useState<Bill[]>(mockBills);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [lineItems, setLineItems] = useState([{ description: '', category: '', quantity: 1, unitPrice: 0 }]);
  const [tax, setTax] = useState(0);

  const addLineItem = () => {
    setLineItems([...lineItems, { description: '', category: '', quantity: 1, unitPrice: 0 }]);
  };

  const calculateSubtotal = () => lineItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
  const subtotal = calculateSubtotal();
  const total = subtotal + tax;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-chart-2">Paid</Badge>;
      case 'open':
        return <Badge variant="outline">Open</Badge>;
      case 'partially_paid':
        return <Badge className="bg-chart-4">Partial</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bills & Invoice Management</h1>
          <p className="text-muted-foreground">Manage payables and receivables</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus size={18} className="mr-2" />
              New Bill
            </Button>
          </DialogTrigger>
          <DialogContent className="border-2 border-foreground max-w-2xl">
            <DialogHeader>
              <DialogTitle>Record Vendor Bill</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Vendor</Label>
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
                  <Label>Reference #</Label>
                  <Input className="border-2 border-foreground" placeholder="BILL-XXX" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Issue Date</Label>
                  <Input type="date" className="border-2 border-foreground" />
                </div>
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Input type="date" className="border-2 border-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Line Items</Label>
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-2 border-foreground">
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {lineItems.map((item, index) => (
                      <TableRow key={index} className="border-b border-muted">
                        <TableCell>
                          <Input
                            placeholder="Item description"
                            value={item.description}
                            onChange={(e) => {
                              const newItems = [...lineItems];
                              newItems[index].description = e.target.value;
                              setLineItems(newItems);
                            }}
                            className="border border-muted h-8"
                          />
                        </TableCell>
                        <TableCell>
                          <Select>
                            <SelectTrigger className="h-8 border border-muted">
                              <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="utilities">Utilities</SelectItem>
                              <SelectItem value="rent">Rent</SelectItem>
                              <SelectItem value="software">Software</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            className="w-16 h-8 border border-muted"
                            value={item.quantity}
                            onChange={(e) => {
                              const newItems = [...lineItems];
                              newItems[index].quantity = Number(e.target.value);
                              setLineItems(newItems);
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            className="w-24 h-8 border border-muted"
                            value={item.unitPrice}
                            onChange={(e) => {
                              const newItems = [...lineItems];
                              newItems[index].unitPrice = Number(e.target.value);
                              setLineItems(newItems);
                            }}
                          />
                        </TableCell>
                        <TableCell className="font-medium">
                          PKR {(item.quantity * item.unitPrice).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button variant="outline" size="sm" onClick={addLineItem}>
                  <Plus size={16} className="mr-2" />
                  Add Line
                </Button>
              </div>

              <div className="flex justify-end pt-4 border-t border-gray-100">
                <div className="w-64 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-medium text-gray-900">PKR {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Tax</span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">PKR</span>
                      <Input
                        type="number"
                        value={tax}
                        onChange={(e) => setTax(Number(e.target.value))}
                        className="w-24 h-8 text-right border-2 border-foreground"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t-2 border-foreground">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-lg text-gray-900">PKR {total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Attach Bill Image</Label>
                <div className="border-2 border-dashed border-muted p-8 text-center cursor-pointer hover:border-foreground transition-colors">
                  <Upload size={32} className="mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click or drag to upload bill image</p>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">Save as Draft</Button>
                <Button onClick={() => setIsDialogOpen(false)}>Save & Finalize</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="bills" className="space-y-4">
        <TabsList className="border-2 border-foreground">
          <TabsTrigger value="bills">
            <Receipt size={16} className="mr-2" />
            Vendor Bills
          </TabsTrigger>
          <TabsTrigger value="invoices">
            <FileText size={16} className="mr-2" />
            Customer Invoices
          </TabsTrigger>
          <TabsTrigger value="payments">
            <CreditCard size={16} className="mr-2" />
            Payments
          </TabsTrigger>
        </TabsList>

        <TabsContent value="bills">
          <Card className="border-2 border-foreground">
            <CardHeader>
              <CardTitle>Vendor Bills (Accounts Payable)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-b-2 border-foreground">
                    <TableHead>Reference</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Paid</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bills.map((bill) => (
                    <TableRow key={bill.id} className="border-b border-muted">
                      <TableCell className="font-medium text-[11px]">{bill.reference}</TableCell>
                      <TableCell className="font-bold text-xs">{bill.vendorName}</TableCell>
                      <TableCell className="text-xs">{bill.issueDate}</TableCell>
                      <TableCell className="text-xs">{bill.dueDate}</TableCell>
                      <TableCell className="font-bold text-xs">PKR {bill.total.toLocaleString()}</TableCell>
                      <TableCell className="text-xs text-gray-400">PKR {bill.amountPaid.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(bill.status)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {bill.status !== 'paid' && (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="h-7 text-[10px] font-bold uppercase border-2 border-foreground">
                                  Pay
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="border-2 border-foreground">
                                <DialogHeader>
                                  <DialogTitle>Record Payment for {bill.reference}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <Label className="text-xs uppercase font-bold">Payment Amount</Label>
                                      <Input type="number" defaultValue={bill.total - bill.amountPaid} className="border-2 border-foreground" />
                                    </div>
                                    <div className="space-y-2">
                                      <Label className="text-xs uppercase font-bold">Payment Date</Label>
                                      <Input type="date" className="border-2 border-foreground" />
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <Label className="text-xs uppercase font-bold">Source Bank Account</Label>
                                    <Select>
                                      <SelectTrigger className="border-2 border-foreground">
                                        <SelectValue placeholder="Select Account" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="hbl">HBL Operating - ...4567</SelectItem>
                                        <SelectItem value="meezan">Meezan Business - ...8901</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="flex justify-end gap-2 pt-2">
                                    <Button variant="outline">Details</Button>
                                    <Button className="bg-black text-white px-8">Confirm Payment</Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="border-2 border-foreground mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Accounts Payable Aging</CardTitle>
              <CardDescription className="text-[10px] font-bold uppercase">Time-sensitive debt tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 border-2 border-foreground bg-white hover:bg-gray-50 transition-colors">
                  <p className="text-[10px] font-bold uppercase text-gray-400 mb-1 tracking-widest">0-30 Days</p>
                  <p className="text-xl font-bold">PKR 33,500</p>
                  <div className="w-full h-1 bg-green-500 mt-3" />
                </div>
                <div className="p-4 border-2 border-gray-100 bg-gray-50/50">
                  <p className="text-[10px] font-bold uppercase text-gray-400 mb-1 tracking-widest">30-60 Days</p>
                  <p className="text-xl font-bold text-gray-300">PKR 0</p>
                </div>
                <div className="p-4 border-2 border-gray-100 bg-gray-50/50">
                  <p className="text-[10px] font-bold uppercase text-gray-400 mb-1 tracking-widest">60-90 Days</p>
                  <p className="text-xl font-bold text-gray-300">PKR 0</p>
                </div>
                <div className="p-4 border-2 border-red-100 bg-red-50/30">
                  <p className="text-[10px] font-bold uppercase text-red-400 mb-1 tracking-widest">90+ Days Critical</p>
                  <p className="text-xl font-bold text-red-300">PKR 0</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices">
          <Card className="border-2 border-foreground">
            <CardHeader>
              <CardTitle>Customer Invoices (Accounts Receivable)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-b-2 border-foreground">
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockInvoices.map((invoice) => (
                    <TableRow key={invoice.id} className="border-b border-muted">
                      <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                      <TableCell>{invoice.customerName}</TableCell>
                      <TableCell>{invoice.issueDate}</TableCell>
                      <TableCell>{invoice.dueDate}</TableCell>
                      <TableCell>PKR {invoice.total.toLocaleString()}</TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card className="border-2 border-foreground">
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                Payment records will appear here when payments are recorded against bills and invoices.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BillsInvoices;
