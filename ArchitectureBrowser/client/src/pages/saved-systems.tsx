import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FolderOpen, Plus, Calendar, Activity } from 'lucide-react';

export default function SavedSystems() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50">
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
            <Link href="/new-system">
              <Button className="gap-2" data-testid="button-new-system">
                <Plus className="h-4 w-4" />
                New System
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-violet-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <FolderOpen className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Your Systems</h1>
            <p className="text-xl text-gray-600 mb-8">
              Continue working on your previously saved system architecture projects
            </p>
          </div>
        </div>
      </section>

      {/* Empty State */}
      <section className="pb-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-dashed">
            <CardContent className="py-16 text-center">
              <FolderOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No systems yet</h3>
              <p className="text-gray-600 mb-6">
                Create your first system to get started
              </p>
              <Link href="/new-system">
                <Button className="gap-2" data-testid="button-create-first-system">
                  <Plus className="h-4 w-4" />
                  Create System
                </Button>
              </Link>
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
