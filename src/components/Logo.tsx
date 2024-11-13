import { Stethoscope } from 'lucide-react';

export function Logo() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-600 text-white mb-4">
        <Stethoscope className="w-8 h-8" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900">ODONTOPREV</h1>
      <p className="text-gray-600 mt-2">Acceso a tu plataforma Dental</p>
    </div>
  );
}