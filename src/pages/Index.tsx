
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
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="flex h-screen">
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
