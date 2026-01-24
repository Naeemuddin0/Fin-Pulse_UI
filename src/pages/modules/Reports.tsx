import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, FileText, BarChart3 } from 'lucide-react';

const Reports: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Exports</h1>
          <p className="text-muted-foreground">Generate financial reports</p>
        </div>
      </div>

      <Tabs defaultValue="pl" className="space-y-4">
        <TabsList className="border-2 border-foreground">
          <TabsTrigger value="pl">Profit & Loss</TabsTrigger>
          <TabsTrigger value="bs">Balance Sheet</TabsTrigger>
          <TabsTrigger value="tax">Tax Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="pl">
          <Card className="border-2 border-foreground">
            <CardHeader className="flex flex-row gap-4 items-center justify-between">
              <div>
                <CardTitle className="text-xl">Profit & Loss Statement</CardTitle>
                <CardDescription className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Jan 1, 2024 - Jan 31, 2024</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase border-2 border-foreground">
                  Compare to Last Month
                </Button>
                <Button size="sm" className="h-8 text-[10px] font-bold uppercase bg-black text-white px-6">
                  Export PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Revenue Section */}
                <div>
                  <h3 className="text-xs font-black uppercase border-b-2 border-foreground pb-1 mb-3 bg-gray-50 px-2">Income / Revenue</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center px-4 py-1 hover:bg-gray-50">
                      <span className="text-sm font-medium">Sales Income</span>
                      <span className="text-sm font-bold">PKR 1,500,000</span>
                    </div>
                    <div className="flex justify-between items-center px-4 py-1 hover:bg-gray-50">
                      <span className="text-sm font-medium">Service Revenue</span>
                      <span className="text-sm font-bold">PKR 450,000</span>
                    </div>
                    <div className="flex justify-between items-center px-4 py-1 bg-gray-100 font-bold">
                      <span className="text-sm uppercase tracking-tighter">Gross Revenue</span>
                      <span className="text-sm">PKR 1,950,000</span>
                    </div>
                  </div>
                </div>

                {/* Operating Expenses */}
                <div>
                  <h3 className="text-xs font-black uppercase border-b-2 border-foreground pb-1 mb-3 bg-gray-50 px-2">Operating Expenses</h3>
                  <div className="space-y-2">
                    {[
                      { name: 'Rent Expense', amt: 75000 },
                      { name: 'Utility Bills', amt: 22400 },
                      { name: 'Software & Subscriptions', amt: 12500 }
                    ].map(ex => (
                      <div key={ex.name} className="flex justify-between items-center px-4 py-1 hover:bg-gray-50">
                        <span className="text-sm font-medium">{ex.name}</span>
                        <span className="text-sm font-bold">PKR {ex.amt.toLocaleString()}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center px-4 py-1 bg-gray-100 font-bold border-t-2 border-black/10">
                      <span className="text-sm uppercase tracking-tighter">Total Operating Expenses</span>
                      <span className="text-sm">PKR 109,900</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Line */}
                <div className="p-6 bg-black text-white flex justify-between items-center shadow-[4px_4px_0px_0px_rgba(34,197,94,0.4)]">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">Net Profit (EBITDA)</span>
                    <p className="text-3xl font-black italic tracking-tighter">PKR 1,840,100</p>
                  </div>
                  <BarChart3 size={40} className="opacity-20 translate-x-3 rotate-12" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bs">
          <Card className="border-2 border-foreground">
            <CardHeader>
              <CardTitle>Balance Sheet</CardTitle>
              <CardDescription>Statement of Financial Position as of Jan 31, 2024</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase bg-gray-50 p-2 border-l-4 border-foreground">Assets</h3>
                  <div className="space-y-2 px-2 text-sm">
                    <div className="flex justify-between"><span>Bank Balances</span><span className="font-bold">PKR 1,450,000</span></div>
                    <div className="flex justify-between"><span>Accounts Receivable</span><span className="font-bold">PKR 280,000</span></div>
                    <div className="flex justify-between"><span>Equipment</span><span className="font-bold">PKR 150,000</span></div>
                    <div className="flex justify-between pt-2 border-t font-bold"><span>Total Assets</span><span>PKR 1,880,000</span></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase bg-gray-50 p-2 border-l-4 border-foreground">Liabilities & Equity</h3>
                  <div className="space-y-2 px-2 text-sm">
                    <div className="flex justify-between"><span>Accounts Payable</span><span className="font-bold">PKR 33,500</span></div>
                    <div className="flex justify-between"><span>Sales Tax Payable</span><span className="font-bold">PKR 21,400</span></div>
                    <div className="flex justify-between pt-2 border-t"><span>Net Equity</span><span className="font-bold">PKR 1,825,100</span></div>
                    <div className="flex justify-between pt-2 border-t font-bold"><span>Total L&E</span><span>PKR 1,880,000</span></div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-100 border-2 border-foreground text-center">
                <p className="text-[10px] font-bold uppercase opacity-50 mb-1">Calculated Net Worth</p>
                <p className="text-4xl font-black tracking-tight italic">PKR 1,825,100</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
