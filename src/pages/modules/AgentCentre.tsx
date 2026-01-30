import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockActionCards } from '@/data/mockData';
import { AlertTriangle, Lightbulb, Bell, Check, X, Search, Eye, TrendingUp, DollarSign, Clock, LayoutGrid, Zap } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';

const AgentCentre: React.FC = () => {
  const pendingCount = mockActionCards.filter(a => a.status === 'pending').length;

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'border-destructive bg-destructive/10';
      case 'medium': return 'border-chart-4 bg-chart-4/10';
      default: return 'border-muted';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'anomaly': return <AlertTriangle className="text-destructive" />;
      case 'reminder': return <Bell className="text-chart-4" />;
      default: return <Lightbulb className="text-chart-2" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agent Action Centre</h1>
          <p className="text-muted-foreground">AI-powered insights and priority actions</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="destructive" className="h-8 px-4 font-black italic">{pendingCount} PENDING</Badge>
          <Badge className="bg-black text-white h-8 px-4 font-black">AI AGENT ACTIVE</Badge>
        </div>
      </div>

      <Tabs defaultValue="actions" className="space-y-4">
        <TabsList className="w-full justify-start border-b-2 border-foreground rounded-none bg-transparent h-12 p-0 gap-8">
          <TabsTrigger value="actions" className="data-[state=active]:border-b-4 data-[state=active]:border-black rounded-none px-2 font-black uppercase text-[10px] tracking-widest h-full">
            <Bell size={14} className="mr-2" /> Actions
          </TabsTrigger>
          <TabsTrigger value="categorization" className="data-[state=active]:border-b-4 data-[state=active]:border-black rounded-none px-2 font-black uppercase text-[10px] tracking-widest h-full">
            <LayoutGrid size={14} className="mr-2" /> Categorization
          </TabsTrigger>
          <TabsTrigger value="insights" className="data-[state=active]:border-b-4 data-[state=active]:border-black rounded-none px-2 font-black uppercase text-[10px] tracking-widest h-full">
            <Zap size={14} className="mr-2" /> Insights
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:border-b-4 data-[state=active]:border-black rounded-none px-2 font-black uppercase text-[10px] tracking-widest h-full">
            <Clock size={14} className="mr-2" /> History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="actions" className="space-y-4">
          <div className="grid gap-4">
            {mockActionCards.map((card) => (
              <Card key={card.id} className={`border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${getUrgencyColor(card.urgency)}`}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(card.type)}
                      <div>
                        <CardTitle className="text-sm font-black uppercase">{card.title}</CardTitle>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline" className="text-[8px] border-foreground">{card.type}</Badge>
                          <Badge variant={card.urgency === 'high' ? 'destructive' : 'secondary'} className="text-[8px]">{card.urgency}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="h-8 text-[10px] font-bold uppercase border-2 border-foreground">Review</Button>
                      <Button size="sm" className="h-8 text-[10px] font-bold uppercase bg-black text-white px-4">Confirm</Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 border-2 border-foreground"><X size={14} /></Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm italic opacity-80">{card.description}</p>
                  {card.flagReason && (
                    <div className="mt-3 flex items-center gap-2 p-2 bg-red-50 border-l-4 border-red-500">
                      <AlertTriangle size={14} className="text-red-500" />
                      <p className="text-[10px] font-bold text-red-600 uppercase">Flag: {card.flagReason}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categorization">
          <Card className="border-2 border-foreground">
            <CardHeader><CardTitle className="text-sm font-black uppercase">Suggested Categorizations</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader className="bg-gray-50 border-b-2 border-foreground">
                  <TableRow>
                    <TableHead className="text-[10px] font-black uppercase text-black">Transaction</TableHead>
                    <TableHead className="text-[10px] font-black uppercase text-black">Suggested Vendor</TableHead>
                    <TableHead className="text-[10px] font-black uppercase text-black">Category</TableHead>
                    <TableHead className="text-[10px] font-black uppercase text-black">Confidence</TableHead>
                    <TableHead className="text-[10px] font-black uppercase text-black">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { id: 1, desc: 'TRF TO ABDUL REHMAN', vendor: 'Abdul Rehman (Freelancer)', cat: 'Contracting', conf: 94 },
                    { id: 2, desc: 'KE ELECTRIC ONLINE PAY', vendor: 'K-Electric', cat: 'Utilities', conf: 99 },
                    { id: 3, desc: 'ZOMATO ORDER #445', vendor: 'Zomato', cat: 'Meals & Ent.', conf: 82 }
                  ].map(s => (
                    <TableRow key={s.id} className="border-b border-gray-100 italic">
                      <TableCell className="text-xs font-bold">{s.desc}</TableCell>
                      <TableCell className="text-xs">{s.vendor}</TableCell>
                      <TableCell><Badge variant="outline" className="text-[9px] font-bold uppercase">{s.cat}</Badge></TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={s.conf} className="h-1 w-12" />
                          <span className="text-[10px] font-bold">{s.conf}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="icon" className="h-7 w-7 bg-black"><Check size={14} /></Button>
                          <Button size="icon" variant="outline" className="h-7 w-7 border-foreground"><X size={14} /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <div className="grid grid-cols-2 gap-4">
            <Card className="border-2 border-foreground p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-sm font-black uppercase mb-4 flex items-center gap-2">
                <TrendingUp size={18} /> Financial Anomalies
              </h3>
              <div className="space-y-4">
                <div className="p-3 border-2 border-red-200 bg-red-50">
                  <p className="text-[10px] font-black text-red-600 uppercase">Double Payment Alert</p>
                  <p className="text-xs font-medium mt-1">Two identical transactions of PKR 15,000 detected for 'Vendor A' within 4 hours.</p>
                </div>
                <div className="p-3 border-2 border-orange-200 bg-orange-50">
                  <p className="text-[10px] font-black text-orange-600 uppercase">Budget Overrun</p>
                  <p className="text-xs font-medium mt-1">Marketing spend is at 105% of monthly budget as of Jan 25.</p>
                </div>
              </div>
            </Card>
            <Card className="border-2 border-foreground p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-sm font-black uppercase mb-4 flex items-center gap-2">
                <DollarSign size={18} /> Instant Insights
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold">Top Vendor by Volume</span>
                  <span className="text-sm font-black italic">PKR 450,000 (ABC Corp)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold">Total Overdue Debt</span>
                  <span className="text-sm font-black italic text-red-600">PKR 125,400</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold">Pending Reconciliations</span>
                  <span className="text-sm font-black italic">4 Statements</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card className="border-2 border-foreground">
            <CardHeader><CardTitle className="text-sm font-black uppercase">Resolved Suggestions</CardTitle></CardHeader>
            <CardContent>
              <div className="text-center py-12 italic text-gray-400">
                <Clock size={40} className="mx-auto mb-4 opacity-20" />
                <p className="text-sm font-bold">Agent history log is currently empty for this period.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AgentCentre;
