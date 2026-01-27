import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useApp } from '@/contexts/AppContext';
import { chartOfAccountTemplates } from '@/data/mockData';
import { CompanyProfile } from '@/types';
import { Check } from 'lucide-react';

const Onboarding: React.FC = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [formData, setFormData] = useState<CompanyProfile & { industry: string }>({
    name: '',
    address: '',
    phone: '',
    email: '',
    industry: '',
    fiscalYearStart: '',
    currency: 'PKR',
    chartOfAccountsTemplate: 'services',
    openingCashBalance: 0,
    openingBankBalance: 0,
  });
  const { completeOnboarding } = useApp();
  const navigate = useNavigate();

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    completeOnboarding(formData);
    navigate('/dashboard');
  };

  const progress = (step / totalSteps) * 100;

  const fiscalYearEnd = formData.fiscalYearStart
    ? new Date(new Date(formData.fiscalYearStart).setFullYear(new Date(formData.fiscalYearStart).getFullYear() + 1))
      .toISOString().split('T')[0]
    : '';

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-xl border-2 border-foreground shadow-md">
        <CardHeader className="pb-4">
          <div className="flex justify-between items-center mb-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Step {step} of {totalSteps}</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className={`h-1 w-8 rounded-full ${s <= step ? 'bg-black' : 'bg-gray-100'}`} />
              ))}
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            {step === 1 && 'Business Information'}
            {step === 2 && 'Fiscal Configuration'}
            {step === 3 && 'Financial Structure'}
            {step === 4 && 'Opening Balances'}
          </CardTitle>
          <CardDescription className="text-gray-500">
            {step === 1 && 'Let’s define your core business details'}
            {step === 2 && 'Setup your accounting period and currency'}
            {step === 3 && 'Choose a template for your general ledger'}
            {step === 4 && 'Input your starting cash and bank values'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Business Profile */}
          {step === 1 && (
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase">Business Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="e.g. Silk Road Exports"
                  className="border-2 border-foreground h-12"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase">Industry Type</Label>
                  <Select value={formData.industry} onValueChange={(v) => handleChange('industry', v)}>
                    <SelectTrigger className="border-2 border-foreground h-12">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="services">Professional Services</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="it">Technology/SaaS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase">Base Currency</Label>
                  <Input value="PKR - Pakistani Rupee" disabled className="bg-gray-50 border-2 border-gray-200 h-12 font-medium" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase">Business Address</Label>
                <Input
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Registered street address"
                  className="border-2 border-foreground"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase">Business Email</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="contact@business.com"
                    className="border-2 border-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase">Contact Number</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    placeholder="+92-XXX-XXXXXXX"
                    className="border-2 border-foreground"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Fiscal Setup */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="p-4 border-2 border-dashed border-gray-200 bg-gray-50 rounded-lg">
                <div className="flex gap-4 items-center">
                  <div className="flex-1 space-y-2">
                    <Label className="text-xs font-bold uppercase">Fiscal Year Start</Label>
                    <Input
                      type="date"
                      value={formData.fiscalYearStart}
                      onChange={(e) => handleChange('fiscalYearStart', e.target.value)}
                      className="border-2 border-foreground bg-white"
                    />
                  </div>
                  <div className="pt-6 text-gray-400">&rarr;</div>
                  <div className="flex-1 space-y-2 text-right">
                    <Label className="text-xs font-bold uppercase">Fiscal Year End</Label>
                    <div className="h-10 flex items-center justify-end font-bold text-black px-3 border-2 border-gray-100 rounded-md bg-white">
                      {fiscalYearEnd || 'Set Start Date'}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 border-2 border-blue-200 p-4 rounded-lg flex gap-3">
                <div className="text-blue-500 font-bold mt-1 text-lg">!</div>
                <p className="text-xs text-blue-900 leading-relaxed font-medium">
                  The fiscal year end is automatically calculated as 12 months from your start date.
                  This will determine your tax and reporting periods.
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Chart of Accounts */}
          {step === 3 && (
            <div className="space-y-4">
              <Label className="text-xs font-bold uppercase">Hierarchical Template</Label>
              <div className="grid gap-3">
                {Object.entries(chartOfAccountTemplates).map(([key, name]) => (
                  <div
                    key={key}
                    onClick={() => handleChange('chartOfAccountsTemplate', key as any)}
                    className={`flex flex-col p-4 border-2 transition-all cursor-pointer ${formData.chartOfAccountsTemplate === key
                      ? 'border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                      : 'border-gray-200 hover:border-gray-400 grayscale'
                      }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-sm tracking-tight">{name}</span>
                      {formData.chartOfAccountsTemplate === key && <div className="w-2 h-2 bg-black rounded-full" />}
                    </div>
                    <p className="text-[11px] text-gray-500 font-medium">
                      {key === 'retail' && 'Includes: Inventory, COGS, POS Cash, Sales Tax Payable'}
                      {key === 'services' && 'Includes: Professional Fees, Unearned Revenue, Travel Expenses'}
                      {key === 'manufacturing' && 'Includes: Work in Progress, Raw Materials, Factory Overhead'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Opening Balances */}
          {step === 4 && (
            <div className="grid gap-6">
              <div className="p-4 border-2 border-foreground rounded-lg space-y-4">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="font-bold text-sm">Initial Liquidity Entry</span>
                  <span className="text-[10px] font-bold text-gray-400">PKR</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase">Cash in Hand</Label>
                    <Input
                      type="number"
                      value={formData.openingCashBalance}
                      onChange={(e) => handleChange('openingCashBalance', Number(e.target.value))}
                      className="border-2 border-foreground font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold uppercase">Main Bank Account</Label>
                    <Input
                      type="number"
                      value={formData.openingBankBalance}
                      onChange={(e) => handleChange('openingBankBalance', Number(e.target.value))}
                      className="border-2 border-foreground font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer Controls */}
          <div className="flex justify-between pt-8 items-center border-t border-gray-100 mt-4">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`text-sm font-bold uppercase tracking-widest ${step === 1 ? 'text-gray-200 cursor-not-allowed' : 'text-gray-400 hover:text-black'}`}
            >
              &larr; Previous
            </button>
            {step < totalSteps ? (
              <Button onClick={handleNext} className="bg-black text-white px-8 font-bold uppercase tracking-widest text-xs h-12">
                Continue &rarr;
              </Button>
            ) : (
              <Button onClick={handleComplete} className="bg-black text-white px-8 font-bold uppercase tracking-widest text-xs h-12">
                Finish Setup
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
