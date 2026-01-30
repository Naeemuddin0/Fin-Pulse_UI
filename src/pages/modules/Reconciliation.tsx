import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Check, X, ArrowRight, Split, AlertCircle, CheckCircle } from 'lucide-react';

const Reconciliation: React.FC = () => {
  const [selectedBank, setSelectedBank] = useState<string[]>([]);
  const [selectedSystem, setSelectedSystem] = useState<string[]>([]);
  const [isAdjustmentOpen, setIsAdjustmentOpen] = useState(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  // Mock bank statement items
  const bankItems = [
    { id: 'B1', date: '2024-01-15', description: 'ELECTRICITY PAYMENT', amount: 15000, matched: true, confidence: 95 },
    { id: 'B2', date: '2024-01-14', description: 'OFFICE SUPPLIES TRF', amount: 25000, matched: true, confidence: 88 },
    { id: 'B3', date: '2024-01-13', description: 'DEPOSIT - ABC CORP', amount: 150000, matched: true, confidence: 92 },
    { id: 'B4', date: '2024-01-12', description: 'BANK CHARGES', amount: 500, matched: false, confidence: 0 },
    { id: 'B5', date: '2024-01-11', description: 'UNKNOWN TRF', amount: 5000, matched: false, confidence: 45 },
  ];

  // Mock system bills
  const systemItems = [
    { id: 'S1', date: '2024-01-15', description: 'Electricity Bill - January', amount: 15000, matched: true },
    { id: 'S2', date: '2024-01-14', description: 'Office Furniture', amount: 25000, matched: true },
    { id: 'S3', date: '2024-01-13', description: 'Client Payment - Project Alpha', amount: 150000, matched: true },
    { id: 'S4', date: '2024-01-12', description: 'Cloud Hosting - Monthly', amount: 8500, matched: false },
    { id: 'S5', date: '2024-01-10', description: 'Monthly Rent', amount: 30000, matched: false },
  ];

  const matchedCount = bankItems.filter((b) => b.matched).length;
  const totalCount = bankItems.length;
  const reconciliationProgress = (matchedCount / totalCount) * 100;

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 85) return <Badge className="bg-chart-2">{confidence}%</Badge>;
    if (confidence >= 50) return <Badge className="bg-chart-4">{confidence}%</Badge>;
    if (confidence > 0) return <Badge variant="destructive">{confidence}%</Badge>;
    return <Badge variant="secondary">-</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bank Reconciliation</h1>
          <p className="text-muted-foreground">Match bank statements with system records</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-2 border-foreground font-bold">
            <Check size={18} className="mr-2" />
            Run Auto-Match
          </Button>
          <Button onClick={() => setIsSummaryOpen(true)}>Finalize Reconciliation</Button>
        </div>
      </div>

      <div className="flex gap-4 items-end">
        <div className="flex-1 grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase text-gray-500">Statement From</Label>
            <Input type="date" className="border-2 border-foreground" />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase text-gray-500">Statement To</Label>
            <Input type="date" className="border-2 border-foreground" />
          </div>
        </div>
        <Card className="flex-1 border-2 border-foreground">
          <CardContent className="py-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold uppercase">Progress</span>
              <span className="text-[10px] font-bold uppercase">{matchedCount}/{totalCount} Items</span>
            </div>
            <Progress value={reconciliationProgress} className="h-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Left: Bank Statement */}
        <Card className="border-2 border-foreground">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Bank Statement</CardTitle>
              <Select defaultValue="hbl">
                <SelectTrigger className="w-40 border-2 border-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hbl">HBL Bank</SelectItem>
                  <SelectItem value="ubl">UBL Bank</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-b-2 border-foreground">
                  <TableHead className="w-10"></TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Confidence</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bankItems.map((item) => (
                  <TableRow
                    key={item.id}
                    className={`border-b border-gray-100 transition-colors h-14 ${item.matched ? 'bg-green-50/30' : selectedBank.includes(item.id) ? 'bg-gray-50' : ''
                      }`}
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedBank.includes(item.id)}
                        onCheckedChange={(checked) => {
                          if (checked) setSelectedBank([...selectedBank, item.id]);
                          else setSelectedBank(selectedBank.filter((id) => id !== item.id));
                        }}
                        disabled={item.matched}
                        className="border-2 border-foreground data-[state=checked]:bg-black"
                      />
                    </TableCell>
                    <TableCell className="text-[11px] font-bold">{item.date}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-tight">{item.description}</span>
                        {item.matched && item.confidence > 90 && (
                          <span className="text-[9px] font-bold text-green-600 uppercase flex items-center gap-1 mt-0.5">
                            <CheckCircle size={10} /> Auto-Match Found
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs font-bold leading-none">
                      <span className="text-[9px] text-gray-400 block mb-0.5 font-bold uppercase">Amount</span>
                      PKR {item.amount.toLocaleString()}
                    </TableCell>
                    <TableCell>{getConfidenceBadge(item.confidence)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Right Side: System Records */}
        <Card className="border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col h-[500px]">
          <CardHeader className="py-4 border-b-2 border-gray-100 flex-shrink-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">System Ledger</CardTitle>
              <div className="bg-gray-100 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter">
                {systemItems.filter(s => !s.matched).length} Pending Items
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto p-0">
            <Table>
              <TableHeader className="bg-white sticky top-0 z-10">
                <TableRow className="border-b-2 border-foreground h-11">
                  <TableHead className="w-10"></TableHead>
                  <TableHead className="text-[10px] font-bold text-black uppercase">Date</TableHead>
                  <TableHead className="text-[10px] font-bold text-black uppercase">Reference</TableHead>
                  <TableHead className="text-[10px] font-bold text-black uppercase">Ledger Amt</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {systemItems.map((item) => (
                  <TableRow
                    key={item.id}
                    className={`border-b border-gray-100 transition-colors h-14 ${item.matched ? 'bg-green-50/30' : selectedSystem.includes(item.id) ? 'bg-gray-50' : ''
                      }`}
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedSystem.includes(item.id)}
                        onCheckedChange={(checked) => {
                          if (checked) setSelectedSystem([...selectedSystem, item.id]);
                          else setSelectedSystem(selectedSystem.filter((id) => id !== item.id));
                        }}
                        disabled={item.matched}
                        className="border-2 border-foreground data-[state=checked]:bg-black"
                      />
                    </TableCell>
                    <TableCell className="text-[11px] font-bold">{item.date}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold uppercase tracking-tight line-clamp-1">{item.description}</span>
                        <span className="text-[9px] text-gray-400 font-bold uppercase">ID: {item.id}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs font-bold leading-none">
                      PKR {item.amount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Reconciliation Footer / Conflict Resolver */}
      <div className={`mt-6 p-6 border-2 border-foreground transition-all flex items-center justify-between ${(selectedBank.length > 0 || selectedSystem.length > 0) ? 'bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] translate-y-[-4px]' : 'bg-gray-50 opacity-40 grayscale'
        }`}>
        <div className="flex gap-8 items-center font-bold">
          <div className="flex flex-col border-r border-gray-200 pr-8">
            <span className="text-[10px] uppercase text-gray-400">Bank Selection</span>
            <span className="text-lg tracking-tighter">PKR {selectedBank.reduce((acc, id) => acc + (bankItems.find(b => b.id === id)?.amount || 0), 0).toLocaleString()}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-gray-400">Ledger Selection</span>
            <span className="text-lg tracking-tighter">PKR {selectedSystem.reduce((acc, id) => acc + (systemItems.find(s => s.id === id)?.amount || 0), 0).toLocaleString()}</span>
          </div>
          <div className={`px-3 py-1 text-[10px] uppercase tracking-widest ${selectedBank.reduce((acc, id) => acc + (bankItems.find(b => b.id === id)?.amount || 0), 0) ===
            selectedSystem.reduce((acc, id) => acc + (systemItems.find(s => s.id === id)?.amount || 0), 0)
            ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
            {selectedBank.reduce((acc, id) => acc + (bankItems.find(b => b.id === id)?.amount || 0), 0) ===
              selectedSystem.reduce((acc, id) => acc + (systemItems.find(s => s.id === id)?.amount || 0), 0)
              ? 'Matches' : 'Variance Required'}
          </div>
        </div>

        <div className="flex gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-2 border-foreground font-bold uppercase text-[10px] tracking-widest h-12 px-8 hover:bg-black hover:text-white transition-all">
                <Split size={14} className="mr-2" /> Split Fee
              </Button>
            </DialogTrigger>
            <DialogContent className="border-2 border-foreground">
              <DialogHeader>
                <DialogTitle className="uppercase font-bold tracking-tight">Record Bank Fee Split</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="p-4 bg-gray-50 border border-gray-200 text-xs font-bold uppercase tracking-tight text-gray-500">
                  Splitting: UNKNOWN TRF (PKR 5,000)
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-[10px] font-bold uppercase">Principal Amount</Label>
                    <Input className="border-2 border-foreground" defaultValue="4950" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] font-bold uppercase font-red-500">Bank Fee</Label>
                    <Input className="border-2 border-foreground border-red-500" defaultValue="50" />
                  </div>
                </div>
                <Button className="w-full bg-black text-white font-bold uppercase text-[11px] h-12 tracking-widest">Post Split Entry & Match</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isAdjustmentOpen} onOpenChange={setIsAdjustmentOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-2 border-foreground font-bold uppercase text-[10px] tracking-widest h-12 px-8">
                Add Adjustment
              </Button>
            </DialogTrigger>
            <DialogContent className="border-2 border-foreground">
              <DialogHeader>
                <DialogTitle>Manual Adjustment</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Adjustment Date</Label>
                  <Input type="date" className="border-2 border-foreground" />
                </div>
                <div className="space-y-2">
                  <Label>Amount (PKR)</Label>
                  <Input type="number" className="border-2 border-foreground" />
                </div>
                <div className="space-y-2">
                  <Label>Adjustment Type</Label>
                  <Select>
                    <SelectTrigger className="border-2 border-foreground">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank-fee">Bank Fee</SelectItem>
                      <SelectItem value="int-income">Interest Income</SelectItem>
                      <SelectItem value="other">Other Variance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full bg-black text-white font-bold h-12" onClick={() => setIsAdjustmentOpen(false)}>Post Adjustment</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button className="bg-black text-white font-bold uppercase text-[10px] tracking-widest h-12 px-8 flex items-center gap-2">
            Commit Match <Check size={14} />
          </Button>
        </div>
      </div>

      <Dialog open={isSummaryOpen} onOpenChange={setIsSummaryOpen}>
        <DialogContent className="border-4 border-foreground max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black uppercase tracking-tighter italic">Reconciliation Summary</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border-2 border-foreground bg-gray-50">
                <p className="text-[10px] font-bold uppercase text-gray-400">Statement Balance</p>
                <p className="text-xl font-bold">PKR 710,000</p>
              </div>
              <div className="p-4 border-2 border-foreground bg-gray-50">
                <p className="text-[10px] font-bold uppercase text-gray-400">Ledger Balance</p>
                <p className="text-xl font-bold">PKR 710,000</p>
              </div>
            </div>
            <div className="p-4 bg-green-50 border-2 border-green-600">
              <p className="text-xs font-bold uppercase text-green-700">✓ In Equilibrium</p>
              <p className="text-[10px] text-green-600 mt-1 italic">Statement and Ledger balances match exactly. No further adjustments required.</p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsSummaryOpen(false)}>Back to Review</Button>
              <Button className="bg-black text-white px-10 font-bold uppercase text-[10px] h-12" onClick={() => setIsSummaryOpen(false)}>Finalize & Lock Period</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Card className="border-2 border-foreground">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle size={20} />
            Unpresented Items
          </CardTitle>
          <CardDescription>Unmatched system bills flagged for review</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1 p-4 border-2 border-muted">
              <p className="text-sm text-muted-foreground">Unpresented Cheques</p>
              <p className="text-2xl font-bold">PKR 38,500</p>
              <p className="text-xs text-muted-foreground mt-1">2 items</p>
            </div>
            <div className="flex-1 p-4 border-2 border-muted">
              <p className="text-sm text-muted-foreground">In Transit</p>
              <p className="text-2xl font-bold">PKR 0</p>
              <p className="text-xs text-muted-foreground mt-1">0 items</p>
            </div>
            <div className="flex-1 p-4 border-2 border-muted">
              <p className="text-sm text-muted-foreground">Bank Charges (Unrecorded)</p>
              <p className="text-2xl font-bold">PKR 500</p>
              <p className="text-xs text-muted-foreground mt-1">1 item</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reconciliation;