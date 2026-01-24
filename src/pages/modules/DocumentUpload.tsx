import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, Check, AlertCircle, Edit, Trash2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { bankInstitutions } from '@/data/mockData';

const DocumentUpload: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<any[]>([]);
  const [showReview, setShowReview] = useState(false);

  // Mock extracted transactions
  const mockExtracted = [
    { id: '1', date: '2024-01-15', description: 'ELECTRICITY PAYMENT', amount: 15000, confidence: 95, status: 'high' },
    { id: '2', date: '2024-01-14', description: 'OFFICE SUPPLIES', amount: 25000, confidence: 88, status: 'high' },
    { id: '3', date: '2024-01-13', description: 'DEPOSIT ABC CORP', amount: 150000, confidence: 92, status: 'high' },
    { id: '4', date: '2024-01-12', description: 'UNKNOWN TRF', amount: 5000, confidence: 45, status: 'low' },
    { id: '5', date: '2024-01-11', description: 'BANK CHRGS', amount: 500, confidence: 72, status: 'medium' },
  ];

  const handleFileUpload = () => {
    // FR-4.1.2: Validate file format
    setIsProcessing(true);
    setTimeout(() => {
      setUploadedFile('bank_statement_jan_2024.pdf');
      setExtractedData(mockExtracted);
      setIsProcessing(false);
      setShowReview(true);
    }, 2000);
  };

  const getConfidenceBadge = (confidence: number, status: string) => {
    // FR-4.3.1, FR-4.3.2: Color-coded confidence
    if (status === 'high') return <Badge className="bg-chart-2">{confidence}% High</Badge>;
    if (status === 'medium') return <Badge className="bg-chart-4">{confidence}% Medium</Badge>;
    return <Badge variant="destructive">{confidence}% Low</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Document Upload & Data Extraction</h1>
          <p className="text-muted-foreground">Upload bank statements and extract transactions</p>
        </div>
      </div>

      {!showReview ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-2 border-foreground shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Upload Source</CardTitle>
              <CardDescription>Drag PDF bank statements here for AI ingestion</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="border-4 border-dashed border-gray-100 p-12 text-center cursor-pointer hover:border-black hover:bg-gray-50 transition-all rounded-xl group"
                onClick={handleFileUpload}
              >
                {isProcessing ? (
                  <div className="space-y-6">
                    <div className="relative w-20 h-20 mx-auto">
                      <div className="absolute inset-0 border-4 border-gray-100 rounded-full" />
                      <div className="absolute inset-0 border-4 border-black rounded-full border-t-transparent animate-spin" />
                      <FileText size={32} className="absolute inset-0 m-auto text-black" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-bold uppercase tracking-widest text-black">Extracting Data...</p>
                      <Progress value={65} className="h-1.5 w-48 mx-auto bg-gray-100 rounded-none" />
                      <p className="text-[10px] text-gray-400 font-medium">Identifying Pakistani bank layout (HBL)...</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload size={48} className="mx-auto mb-4 text-gray-300 group-hover:text-black transition-colors" />
                    <p className="text-sm font-bold uppercase tracking-widest">Drop PDF here</p>
                    <p className="text-xs text-gray-400 mt-2 font-medium">or click to browse local files</p>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-foreground">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Bank Configuration</CardTitle>
              <CardDescription>Automatic layout detection settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-gray-50 border-2 border-foreground rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                    <Check size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase">Auto-Detection Active</p>
                    <p className="text-[10px] text-gray-500 font-medium italic">ML Model: LayoutLMv3-PakBank</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase text-gray-500">Manual Template Override</Label>
                <Select>
                  <SelectTrigger className="border-2 border-foreground h-11">
                    <SelectValue placeholder="Select institution if auto-detect fails" />
                  </SelectTrigger>
                  <SelectContent>
                    {bankInstitutions.map((bank) => (
                      <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex gap-4 h-[600px]">
            {/* Visual Verification (Side-by-Side) */}
            <Card className="flex-[0.4] border-2 border-foreground overflow-hidden flex flex-col">
              <div className="bg-black text-white p-3 flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest">Document Preview</span>
                <Badge variant="outline" className="text-white border-white text-[9px]">PAGE 1/4</Badge>
              </div>
              <div className="flex-1 bg-gray-200 p-6 flex items-center justify-center">
                <div className="bg-white w-full h-full shadow-lg border border-gray-300 p-8 space-y-4">
                  <div className="h-8 w-32 bg-gray-100" />
                  <div className="space-y-2">
                    <div className="h-3 w-full bg-gray-50" />
                    <div className="h-3 w-2/3 bg-gray-50" />
                  </div>
                  <div className="mt-8 space-y-4">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className={`h-8 w-full border border-dashed border-gray-200 ${i === 4 ? 'bg-red-50 border-red-200' : ''}`} />
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Verification Grid */}
            <Card className="flex-[0.6] border-2 border-foreground flex flex-col overflow-hidden">
              <div className="bg-white border-b-2 border-gray-100 p-4 flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg">Extracted Transactions</CardTitle>
                  <CardDescription className="text-[10px] font-bold text-red-500 uppercase">Review required for 1 flagged item</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-8 text-xs font-bold border-2 border-foreground">
                    + Add row
                  </Button>
                </div>
              </div>
              <div className="flex-1 overflow-auto">
                <Table>
                  <TableHeader className="bg-gray-50">
                    <TableRow className="border-b-2 border-foreground h-10">
                      <TableHead className="text-[10px] font-bold uppercase text-black">Date</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase text-black">Statement Desc</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase text-black">Amount</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase text-black">Confidence</TableHead>
                      <TableHead className="text-[10px] font-bold uppercase text-black w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {extractedData.map((row) => (
                      <TableRow
                        key={row.id}
                        className={`border-b border-gray-100 hover:bg-gray-50 group transition-colors ${row.status === 'low' ? 'bg-red-50/50' : ''
                          }`}
                      >
                        <TableCell className="py-2">
                          <input
                            type="text"
                            defaultValue={row.date}
                            className="bg-transparent border-none focus:ring-0 text-xs font-medium w-full"
                          />
                        </TableCell>
                        <TableCell className="py-2">
                          <input
                            type="text"
                            defaultValue={row.description}
                            className="bg-transparent border-none focus:ring-0 text-xs w-full overflow-hidden text-ellipsis"
                          />
                        </TableCell>
                        <TableCell className="py-2">
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] text-gray-400 font-bold">PKR</span>
                            <input
                              type="text"
                              defaultValue={row.amount.toLocaleString()}
                              className="bg-transparent border-none focus:ring-0 text-xs font-bold w-full"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="py-2">
                          <div className={`text-[10px] font-bold px-2 py-0.5 rounded border-2 ${row.status === 'high' ? 'bg-green-50 text-green-700 border-green-100' :
                            row.status === 'medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
                              'bg-red-100 text-red-700 border-red-200'
                            }`}>
                            {row.confidence}%
                          </div>
                        </TableCell>
                        <TableCell className="py-2">
                          <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100">
                            <Trash2 size={12} className="text-gray-400 hover:text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </div>

          {/* Action Hub */}
          <div className="flex justify-between items-center p-6 border-2 border-foreground bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex gap-6">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase text-gray-400">Total Extracted</span>
                <span className="text-xl font-bold">PKR 195,500</span>
              </div>
              <div className="w-px h-10 bg-gray-100" />
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-xs font-bold">3 High</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <span className="text-xs font-bold">1 Med</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-xs font-bold">1 Needs Review</span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setShowReview(false)} className="border-2 border-foreground font-bold uppercase tracking-widest text-[10px] px-6">
                Restart
              </Button>
              <Button className="bg-black text-white font-bold uppercase tracking-widest text-[10px] px-8 h-12">
                Commit to Transactions &rarr;
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
