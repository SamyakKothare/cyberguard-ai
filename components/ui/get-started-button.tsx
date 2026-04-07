import React from 'react';
import { Button } from './button';
import { ArrowRight } from 'lucide-react';

interface GetStartedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const GetStartedButton = ({ children = "Get Started", ...props }: GetStartedButtonProps) => {
  return (
    <Button {...props} size="lg" className="group gap-2 font-bold uppercase tracking-wider">
      {children}
      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
    </Button>
  );
};
