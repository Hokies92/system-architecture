import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, GitBranch, ArrowRight } from 'lucide-react';

export default function Stepwise() {
  const modules = [
    { id: 1, name: 'Space', description: 'Define the boundaries and scope of your system' },
    { id: 2, name: 'Boundary', description: 'Establish what is inside and outside your system' },
    { id: 3, name: 'Forces', description: 'Identify the driving forces and constraints' },
    { id: 4, name: 'Purpose', description: 'Clarify the system\'s goals and objectives' },
    { id: 5, name: 'Structure', description: 'Design the organizational framework' },
    { id: 6, name: 'Mechanism', description: 'Define how the system operates' },
    { id: 7, name: 'Parts & Connections', description: 'Map components and relationships' },
    { id: 8, name: 'Behavior', description: 'Model dynamic patterns and responses' },
    { id: 9, name: 'Input/Output', description: 'Specify system interfaces and flows' },
    { id: 10, name: 'Complete System', description: 'Integrate all modules into a whole' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
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
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <GitBranch className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Stepwise System Builder</h1>
            <p className="text-xl text-gray-600 mb-8">
              Build your complex system step by step with guided support through each architecture module. Perfect for transitioning from linear thinking to systems thinking.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 gap-2" data-testid="button-start-new">
              Start New System
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="py-12 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">10 Architecture Modules</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Each module builds on the previous one, helping you create a comprehensive system architecture with specific deliverables and visualizations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <Card key={module.id} className="hover:shadow-lg transition-all border-2" data-testid={`card-module-${module.id}`}>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="font-bold text-blue-600">{module.id}</span>
                    </div>
                    <CardTitle className="text-xl">{module.name}</CardTitle>
                  </div>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full" disabled data-testid={`button-module-${module.id}`}>
                    Coming Soon
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8 mt-16">
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
