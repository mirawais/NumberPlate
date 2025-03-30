import LicensePlateCustomizer from '@/components/LicensePlateCustomizer';

export default function Customizer() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <div className="container mx-auto px-0 py-4">
        <div className="bg-white rounded-none overflow-hidden shadow mb-4">
          <div className="bg-neutral-800 p-3 text-white text-center font-bold">
            <h1 className="text-xl">Number Plate Customizer</h1>
          </div>
        </div>
        <LicensePlateCustomizer />
      </div>
    </div>
  );
}
