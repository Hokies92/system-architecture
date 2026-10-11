import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

// Element 1 of the wiki: the menu-driven Space modeler.
// The modeler is a self-contained page in client/public; it is shown here inside the app.
export default function Space() {
  return (
    <div className="h-screen flex flex-col bg-white">
      <header className="bg-white border-b border-gray-100 py-3">
        <div className="container mx-auto px-4 flex items-center gap-4">
          <Link href="/wiki">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back-wiki">
              <ArrowLeft className="h-4 w-4" />
              Back to Wiki
            </Button>
          </Link>
          <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Element 1: Space
          </span>
        </div>
      </header>
      <iframe
        src="/space-explorer.html"
        title="Space modeler"
        className="flex-1 w-full border-0"
        data-testid="frame-space-modeler"
      />
    </div>
  );
}
