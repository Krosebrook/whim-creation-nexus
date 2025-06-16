
import React, { useState } from 'react';
import { DesignProvider } from '@/contexts/DesignContext';
import DesignApp from '@/components/DesignApp';

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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20">
        <DesignApp 
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          onBackToCategories={handleBackToCategories}
        />
      </div>
    </DesignProvider>
  );
};

export default Index;
