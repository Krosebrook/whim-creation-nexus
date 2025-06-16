
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
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
