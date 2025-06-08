import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const DashboardHeader = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <div className="mt-2 mb-2 flex justify-between items-center" >
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">Financial Transaction Dashboard</h1>

            <div className="flex items-center gap-2">

                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 cursor-pointer border border-gray-200 dark:border-gray-700"
                    aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                    <span className="text-gray-500 dark:text-gray-400">Switch Theme</span>
                    {isDarkMode ? (
                        <Sun className="w-5 h-5 text-yellow-500" />
                    ) : (
                        <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    )}
                </button>

            </div>
        </div>
    );
};

export default DashboardHeader;