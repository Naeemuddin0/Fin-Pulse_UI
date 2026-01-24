import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useApp } from '@/contexts/AppContext';

const Signup: React.FC = () => {
  const [step, setStep] = useState<'form' | 'verification_sent' | 'verified'>('form');
  const [formData, setFormData] = useState<{
    role: 'admin' | 'accountant' | 'viewer' | '';
    businessName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    role: '',
    businessName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const { signup } = useApp();
  const navigate = useNavigate();

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    setLoading(true);
    // Simulate signup
    setTimeout(() => {
      setLoading(false);
      setStep('verification_sent');
    }, 1000);
  };

  const handleSimulateVerify = () => {
    setStep('verified');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-2 border-foreground shadow-md">
        <CardHeader className="text-center font-bold">
          <CardTitle className="text-2xl tracking-tight">
            {step === 'form' ? 'Create Account' : step === 'verification_sent' ? 'Check Your Email' : 'Account Verified'}
          </CardTitle>
          <CardDescription>
            {step === 'form' ? 'Sign up for Fin-Pulse' : step === 'verification_sent' ? 'We sent a link to ' + formData.email : 'Your account is ready'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'form' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={formData.role} onValueChange={(value) => handleChange('role', value)}>
                  <SelectTrigger className="border-2 border-foreground">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Business Owner (Admin)</SelectItem>
                    <SelectItem value="accountant">Accountant</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  placeholder="Enter business name"
                  value={formData.businessName}
                  onChange={(e) => handleChange('businessName', e.target.value)}
                  required
                  className="border-2 border-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Full Name</Label>
                <Input
                  id="username"
                  placeholder="Enter your name"
                  value={formData.username}
                  onChange={(e) => handleChange('username', e.target.value)}
                  required
                  className="border-2 border-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  required
                  className="border-2 border-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  required
                  className="border-2 border-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  required
                  className="border-2 border-foreground"
                />
              </div>

              <Button type="submit" className="w-full bg-black text-white" disabled={loading}>
                {loading ? 'Creating...' : 'Sign Up'}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="font-bold text-black hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          ) : step === 'verification_sent' ? (
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center border-2 border-foreground">
                  <svg className="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Click the link in your inbox to verify your account and proceed to setup.
              </p>
              <Button variant="outline" className="w-full border-2 border-foreground" onClick={handleSimulateVerify}>
                Simulate Link Click (Dev Only)
              </Button>
              <p className="text-xs text-gray-400">
                Didn't receive code? <button className="underline font-medium hover:text-black">Resend</button>
              </p>
            </div>
          ) : (
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center border-2 border-green-600">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Email verification successful. Your business workspace is now ready to be configured.
              </p>
              <Button className="w-full bg-black text-white" onClick={() => navigate('/onboarding')}>
                Proceed to Onboarding &rarr;
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;