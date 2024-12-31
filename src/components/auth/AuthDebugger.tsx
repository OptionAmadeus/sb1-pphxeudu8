import React from 'react';
import { useAuthDiagnostics } from '@/lib/supabase/hooks/useAuthDiagnostics';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

export function AuthDebugger() {
  const diagnostics = useAuthDiagnostics();

  if (!diagnostics || import.meta.env.PROD) return null;

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-white rounded-lg shadow-lg border border-gray-200 max-w-sm">
      <h3 className="text-sm font-medium text-gray-900 mb-2">Auth Diagnostics</h3>
      
      <div className="space-y-2">
        {Object.entries(diagnostics.results).map(([key, success]) => (
          <div key={key} className="flex items-center gap-2 text-sm">
            {success ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <XCircle className="w-4 h-4 text-red-500" />
            )}
            <span className="capitalize">{key}</span>
          </div>
        ))}
      </div>

      {diagnostics.error && (
        <div className="mt-2 pt-2 border-t border-gray-200">
          <div className="flex items-center gap-2 text-sm text-red-600">
            <AlertCircle className="w-4 h-4" />
            <span>Error detected</span>
          </div>
        </div>
      )}
    </div>
  );
}