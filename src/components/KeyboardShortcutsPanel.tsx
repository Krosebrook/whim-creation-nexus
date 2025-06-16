
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Keyboard, X } from 'lucide-react';

const KeyboardShortcutsPanel: React.FC = () => {
  const shortcuts = [
    { keys: ['Ctrl', 'Z'], description: 'Undo last action' },
    { keys: ['Ctrl', 'Y'], description: 'Redo last action' },
    { keys: ['Ctrl', 'C'], description: 'Copy selected elements' },
    { keys: ['Ctrl', 'V'], description: 'Paste elements' },
    { keys: ['Ctrl', 'D'], description: 'Duplicate selected elements' },
    { keys: ['Delete'], description: 'Delete selected elements' },
    { keys: ['Escape'], description: 'Deselect all elements' },
    { keys: ['Ctrl', 'Click'], description: 'Multi-select elements' },
    { keys: ['Arrow Keys'], description: 'Move selected elements (1px)' },
    { keys: ['Shift', 'Arrow'], description: 'Move selected elements (10px)' },
    { keys: ['Ctrl', 'A'], description: 'Select all elements' },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-white/80 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-300"
        >
          <Keyboard className="w-4 h-4 mr-2" />
          Shortcuts
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Keyboard className="w-5 h-5 mr-2 text-indigo-600" />
            Keyboard Shortcuts
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <span className="text-sm text-gray-700">{shortcut.description}</span>
              <div className="flex items-center gap-1">
                {shortcut.keys.map((key, keyIndex) => (
                  <React.Fragment key={keyIndex}>
                    <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded">
                      {key}
                    </kbd>
                    {keyIndex < shortcut.keys.length - 1 && (
                      <span className="text-gray-400 text-xs">+</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KeyboardShortcutsPanel;
