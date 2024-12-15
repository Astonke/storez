import { Zap } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Zap size={32} className="text-blue-600" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
      </div>
      <span className="text-2xl font-bold">
        next<span className="text-blue-600">G</span>
      </span>
    </div>
  );
}