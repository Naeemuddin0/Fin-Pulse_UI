import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockAuditLogs } from '@/data/mockData';
import { Search, Download, Eye, FileText, Table as TableIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

const AuditTrail: React.FC = () => {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const getActionBadge = (action: string) => {
    switch (action) {
      case 'create': return <Badge className="bg-chart-2">Create</Badge>;
      case 'update': return <Badge className="bg-chart-4">Update</Badge>;
      case 'delete': return <Badge variant="destructive">Delete</Badge>;
      case 'login': return <Badge variant="outline">Login</Badge>;
      case 'export': return <Badge variant="secondary">Export</Badge>;
      default: return <Badge>{action}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audit Trail & Change History</h1>
          <p className="text-muted-foreground">Track all system activity and data modifications</p>
        </div>
        <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="border-2 border-foreground" onClick={() => setIsReportOpen(true)}>
              <Download size={18} className="mr-2" />
              Generate Audit Report
            </Button>
          </DialogTrigger>
          <DialogContent className="border-2 border-foreground">
            <DialogHeader>
              <DialogTitle>Generate Audit Report</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input type="date" className="border-2 border-foreground" />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input type="date" className="border-2 border-foreground" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Audit Detail Level</Label>
                <Select defaultValue="summary">
                  <SelectTrigger className="border-2 border-foreground"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summary">Summary Only</SelectItem>
                    <SelectItem value="full">Full Diff Comparison</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 bg-black text-white px-4 font-bold uppercase text-[10px]">
                  <FileText size={16} className="mr-2" /> Export PDF
                </Button>
                <Button variant="outline" className="flex-1 border-2 border-foreground font-bold uppercase text-[10px]">
                  <TableIcon size={16} className="mr-2" /> Export Excel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-2 border-foreground">
        <CardHeader>
          <div className="flex gap-4 items-end">
            <div className="relative flex-1">
              <Label className="text-[10px] font-bold uppercase text-gray-400 mb-1.5 block ml-1">Universal Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input placeholder="Search user, entity ID, or reference..." className="pl-10 border-2 border-foreground" />
              </div>
            </div>
            <div className="w-32">
              <Label className="text-[10px] font-bold uppercase text-gray-400 mb-1.5 block ml-1">Start Date</Label>
              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border-2 border-foreground" />
            </div>
            <div className="w-32">
              <Label className="text-[10px] font-bold uppercase text-gray-400 mb-1.5 block ml-1">End Date</Label>
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border-2 border-foreground" />
            </div>
            <div className="w-40">
              <Label className="text-[10px] font-bold uppercase text-gray-400 mb-1.5 block ml-1">Action Type</Label>
              <Select defaultValue="all">
                <SelectTrigger className="border-2 border-foreground"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="create">Create</SelectItem>
                  <SelectItem value="update">Update</SelectItem>
                  <SelectItem value="delete">Delete</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="bg-black text-white px-8 font-bold uppercase text-[10px] mb-[1px]">Apply Filter</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-b-2 border-foreground">
                <TableHead>Timestamp</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAuditLogs.map((log) => (
                <TableRow key={log.id} className="border-b border-muted">
                  <TableCell className="text-sm">{new Date(log.timestamp).toLocaleString()}</TableCell>
                  <TableCell>{log.userName}</TableCell>
                  <TableCell>{getActionBadge(log.action)}</TableCell>
                  <TableCell>{log.module}</TableCell>
                  <TableCell>{log.entityId ? `${log.entityType} #${log.entityId}` : '-'}</TableCell>
                  <TableCell className="font-mono text-sm">{log.ipAddress}</TableCell>
                  <TableCell>
                    {(log.beforeSnapshot || log.afterSnapshot) && (
                      <Button variant="outline" size="sm"><Eye size={16} className="mr-1" />View Diff</Button>
                    )}
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

export default AuditTrail;
