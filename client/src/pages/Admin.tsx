import AdminPanel from '@/components/AdminPanel';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function Admin() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-primary text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Number Plate Admin Dashboard</h1>
          <Link href="/">
            <Button variant="outline" className="text-white border-white hover:bg-primary-700">
              Back to Customizer
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="container mx-auto py-6">
        <AdminPanel />
      </div>
    </div>
  );
}
