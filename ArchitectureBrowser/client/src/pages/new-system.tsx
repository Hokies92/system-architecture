import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Plus, Sparkles } from 'lucide-react';

export default function NewSystem() {
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back-home">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              </Link>
              <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Growth Enablement
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <Plus className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Create New System</h1>
            <p className="text-xl text-gray-600 mb-8">
              Start a fresh system architecture project. Define your purpose and begin building.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-16 container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">System Information</CardTitle>
              <CardDescription>
                Provide basic information about the system you're building
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">System Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Customer Engagement Platform"
                    required
                    data-testid="input-system-name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purpose">Purpose *</Label>
                  <Textarea
                    id="purpose"
                    placeholder="What is the primary purpose of this system? What problem does it solve?"
                    rows={4}
                    required
                    data-testid="input-system-purpose"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide additional context or details about your system..."
                    rows={6}
                    data-testid="input-system-description"
                  />
                </div>

                <div className="flex gap-4">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 gap-2"
                    data-testid="button-create-system"
                  >
                    <Sparkles className="h-4 w-4" />
                    Create System
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setLocation('/')}
                    data-testid="button-cancel"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <span className="font-bold text-gray-900">Growth Enablement</span>
            <p className="text-sm text-gray-600 mt-1">© 2025 All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
