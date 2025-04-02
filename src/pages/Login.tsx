import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';
import Input from '../components/ui/Input';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword] = useState(false);
    const [error, setError] = useState('');
    const { login, isAuthenticated, isLoading } = useAuth();
    const navigate = useNavigate();

    // If already authenticated, redirect to dashboard
    if (isAuthenticated) {
        return <Navigate to="/" />;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email) {
            setError('Email is required');
            return;
        }

        if (!password) {
            setError('Password is required');
            return;
        }

        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError('Failed to login. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-900">
            {/* Left side - Image (visible on md and up) */}
            <div className="hidden md:flex md:w-1/2 relative overflow-hidden flex-col justify-center items-center">
                {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700 opacity-90"></div> */}
                <img
                    src="https://images.unsplash.com/photo-1579621970795-87facc2f976d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="Financial dashboard"
                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
                />
                <div className="relative z-10 flex flex-col justify-center h-full text-white p-12">
                    <h1 className="text-4xl font-bold flex items-center mb-4">
                        <Logo />
                        <span className="ml-2">FinDash</span>
                    </h1>
                    <p className="text-xl mb-8 text-start max-w-md">
                        Your personal financial dashboard to track, manage, and grow your wealth
                    </p>
                    <div className="space-y-4 max-w-md">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 h-6 w-6 text-blue-300 mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p>Track your spending and income in real-time</p>
                        </div>
                        <div className="flex items-start">
                            <div className="flex-shrink-0 h-6 w-6 text-blue-300 mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p>Set and achieve your savings goals</p>
                        </div>
                        <div className="flex items-start">
                            <div className="flex-shrink-0 h-6 w-6 text-blue-300 mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <p>Monitor your investments and portfolio performance</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Login form */}
            <div className="flex flex-col justify-center items-center p-6 md:p-12 md:w-1/2">
                <div className="w-full max-w-md">
                    {/* Logo for mobile view */}
                    <div className="md:hidden flex justify-center mb-6">
                        <Logo />
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                                Sign in to your account
                            </h2>
                            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                Or <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">create a new account</a>
                            </p>
                        </div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {error && (
                                <div className="bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-3 rounded-md text-sm">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-4">
                                <Input
                                    label="Email Address"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    icon={<FiMail className="h-5 w-5 text-gray-400" />}
                                    required
                                />

                                <Input
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    icon={<FiLock className="h-5 w-5 text-gray-400" />}
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                                >
                                    {isLoading ? (
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : null}
                                    Sign in
                                </button>
                            </div>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                                        Or continue with
                                    </span>
                                </div>
                            </div>

                            <div className="mt-6 grid grid-cols-3 gap-3">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
                                >
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </button>

                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
                                >
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                                    </svg>
                                </button>

                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
                                >
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                        By signing in, you agree to our{' '}
                        <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                            Privacy Policy
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
} 