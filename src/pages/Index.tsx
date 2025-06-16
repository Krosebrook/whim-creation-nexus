
import React, { useState } from 'react';
import { DesignProvider } from '@/contexts/DesignContext';
import DesignCanvas from '@/components/DesignCanvas';
import DesignTools from '@/components/DesignTools';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
  };

  return (
    <DesignProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
        <div className="flex h-screen w-full">
          <DesignTools 
            category={selectedCategory || ''}
            onBack={handleBackToCategories}
          />
          <DesignCanvas />
        </div>
      </div>
    </DesignProvider>
  );
};

export default Index;
