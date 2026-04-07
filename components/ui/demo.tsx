import React from 'react';
import { GetStartedButton } from './get-started-button';
import { Button } from './button';

export function Demo() {
  return (
    <div className="p-12 bg-cyber-dark border border-cyber-border rounded-xl space-y-8">
      <h2 className="text-2xl font-display font-bold text-white">Component Demo</h2>
      
      <div className="flex flex-wrap gap-4">
        <GetStartedButton />
        <Button variant="outline">Learn More</Button>
        <Button variant="ghost">Cancel</Button>
      </div>
    </div>
  );
}
