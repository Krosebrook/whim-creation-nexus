
// Centralized design system for consistent styling across the application

export const designSystem = {
  colors: {
    primary: {
      50: 'bg-indigo-50',
      100: 'bg-indigo-100',
      500: 'bg-indigo-500',
      600: 'bg-indigo-600',
      700: 'bg-indigo-700',
    },
    secondary: {
      50: 'bg-purple-50',
      100: 'bg-purple-100',
      500: 'bg-purple-500',
      600: 'bg-purple-600',
      700: 'bg-purple-700',
    },
    accent: {
      green: {
        50: 'bg-green-50',
        100: 'bg-green-100',
        500: 'bg-green-500',
        600: 'bg-green-600',
      },
      blue: {
        50: 'bg-blue-50',
        100: 'bg-blue-100',
        500: 'bg-blue-500',
        600: 'bg-blue-600',
      },
      orange: {
        50: 'bg-orange-50',
        100: 'bg-orange-100',
        500: 'bg-orange-500',
        600: 'bg-orange-600',
      },
    },
    neutral: {
      50: 'bg-gray-50',
      100: 'bg-gray-100',
      200: 'bg-gray-200',
      700: 'bg-gray-700',
      800: 'bg-gray-800',
    },
  },
  gradients: {
    primary: 'bg-gradient-to-r from-indigo-500 to-purple-600',
    secondary: 'bg-gradient-to-r from-purple-500 to-pink-600',
    success: 'bg-gradient-to-r from-green-500 to-emerald-600',
    warning: 'bg-gradient-to-r from-orange-500 to-red-500',
    info: 'bg-gradient-to-r from-blue-500 to-cyan-600',
  },
  shadows: {
    card: 'shadow-lg shadow-gray-200/50',
    elevated: 'shadow-xl shadow-gray-300/20',
    soft: 'shadow-md shadow-gray-200/40',
  },
  borders: {
    subtle: 'border border-gray-200/60',
    accent: 'border-2 border-indigo-300',
    focus: 'focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200',
  },
  spacing: {
    card: 'p-6',
    cardHeader: 'pb-4',
    section: 'space-y-6',
    element: 'space-y-4',
  },
  typography: {
    heading: 'text-lg font-semibold text-gray-800',
    subheading: 'text-sm font-medium text-gray-700',
    body: 'text-sm text-gray-600',
    muted: 'text-xs text-gray-500',
  },
};

export const getCardStyles = (variant: 'primary' | 'secondary' | 'accent' = 'primary') => {
  const baseStyles = 'border-none shadow-lg backdrop-blur-sm';
  
  const variants = {
    primary: `${baseStyles} bg-gradient-to-br from-white to-indigo-50/40`,
    secondary: `${baseStyles} bg-gradient-to-br from-white to-purple-50/40`,
    accent: `${baseStyles} bg-gradient-to-br from-white to-blue-50/40`,
  };
  
  return variants[variant];
};

export const getButtonStyles = (variant: 'primary' | 'secondary' | 'accent' = 'primary') => {
  const baseStyles = 'transition-all duration-200 shadow-md hover:shadow-lg';
  
  const variants = {
    primary: `${baseStyles} ${designSystem.gradients.primary} hover:from-indigo-600 hover:to-purple-700 text-white`,
    secondary: `${baseStyles} ${designSystem.gradients.secondary} hover:from-purple-600 hover:to-pink-700 text-white`,
    accent: `${baseStyles} ${designSystem.gradients.success} hover:from-green-600 hover:to-emerald-700 text-white`,
  };
  
  return variants[variant];
};

export const getIconContainerStyles = (color: 'indigo' | 'purple' | 'green' | 'blue' | 'orange' = 'indigo') => {
  const colorMap = {
    indigo: 'bg-indigo-100 text-indigo-600',
    purple: 'bg-purple-100 text-purple-600',
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    orange: 'bg-orange-100 text-orange-600',
  };
  
  return `w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${colorMap[color]}`;
};
