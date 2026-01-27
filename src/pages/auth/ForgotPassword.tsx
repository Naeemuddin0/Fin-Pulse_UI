import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ForgotPassword: React.FC = () => {
    const [step, setStep] = useState<'request' | 'reset'>('request');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRequestReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate sending reset link
        setTimeout(() => {
            setLoading(false);
            setStep('reset');
        }, 1000);
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        setLoading(true);
        // Simulate password reset
        setTimeout(() => {
            setLoading(false);
            alert('Password reset successful');
            navigate('/login');
        }, 1000);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md border-2 border-foreground shadow-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl tracking-tight">
                        {step === 'request' ? 'Forgot Password' : 'Reset Password'}
                    </CardTitle>
                    <CardDescription>
                        {step === 'request'
                            ? 'Enter your email to receive a reset link'
                            : 'Enter your new password'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {step === 'request' ? (
                        <form onSubmit={handleRequestReset} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="border-2 border-foreground"
                                />
                            </div>

                            <Button type="submit" className="w-full bg-black text-white" disabled={loading}>
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </Button>

                            <p className="text-center text-sm text-muted-foreground">
                                Remember your password?{' '}
                                <Link to="/login" className="font-bold text-black hover:underline">
                                    Sign in
                                </Link>
                            </p>
                        </form>
                    ) : (
                        <form onSubmit={handleResetPassword} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="border-2 border-foreground"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="border-2 border-foreground"
                                />
                            </div>

                            <Button type="submit" className="w-full bg-black text-white" disabled={loading}>
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </Button>

                            <p className="text-center text-sm text-muted-foreground">
                                <Link to="/login" className="font-bold text-black hover:underline">
                                    Return to login page
                                </Link>
                            </p>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default ForgotPassword;
