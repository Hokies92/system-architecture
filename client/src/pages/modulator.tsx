import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Activity, Play, BarChart3 } from 'lucide-react';

export default function Modulator() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50">
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
            <div className="w-20 h-20 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <Activity className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Modulator</h1>
            <p className="text-xl text-gray-600 mb-8">
              Run simulations for each module to visualize system behavior. Test parameters, observe patterns, and understand dynamics.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-16 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <Play className="h-8 w-8 text-cyan-600 mb-2" />
                <CardTitle>Simulate</CardTitle>
                <CardDescription>
                  Run simulations with different parameters and conditions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Activity className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Observe</CardTitle>
                <CardDescription>
                  Watch system behavior and emergent patterns unfold
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-cyan-600 mb-2" />
                <CardTitle>Analyze</CardTitle>
                <CardDescription>
                  Visualize results and understand system dynamics
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Card className="border-2">
            <CardContent className="py-16 text-center">
              <Activity className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
              <p className="text-gray-600 mb-6">
                The Modulator simulation engine is under development
              </p>
              <Link href="/">
                <Button variant="outline" data-testid="button-back-home-action">
                  Back to Home
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
