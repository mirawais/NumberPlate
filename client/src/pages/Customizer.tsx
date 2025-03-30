import LicensePlateCustomizer from '@/components/LicensePlateCustomizer';

import { Link } from 'wouter';

export default function Customizer() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="container mx-auto px-0 py-4">
        <div className="bg-white rounded-none overflow-hidden shadow mb-4">
          <div className="bg-neutral-800 p-3 text-white flex justify-between items-center">
            <h1 className="text-xl font-bold">Number Plate Customizer</h1>
            <Link href="/admin-portal">
              <a className="text-xs bg-primary px-2 py-1 rounded hover:bg-primary-700 transition-colors">
                Admin Portal
              </a>
            </Link>
          </div>
        </div>
        <LicensePlateCustomizer />
      </div>
    </div>
  );
}
