import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BookOpen, 
  Plus, 
  FolderOpen, 
  Lightbulb, 
  Activity, 
  Upload, 
  GitBranch 
} from 'lucide-react';

export default function Home() {
  const modes = [
    {
      id: 'stepwise',
      title: 'Stepwise',
      description: 'Guided hand-holding system builder - build complex systems step by step',
      icon: GitBranch,
      color: 'from-blue-600 to-indigo-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      path: '/stepwise',
      isCore: true,
    },
    {
      id: 'new-system',
      title: 'New System',
      description: 'Start a new system architecture project from scratch',
      icon: Plus,
      color: 'from-green-600 to-emerald-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      path: '/new-system',
    },
    {
      id: 'saved-systems',
      title: 'Saved Systems',
      description: 'Continue working on your previously saved system projects',
      icon: FolderOpen,
      color: 'from-purple-600 to-violet-600',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      path: '/saved-systems',
    },
    {
      id: 'wiki',
      title: 'System Wiki',
      description: 'Explore architecture fundamentals and cross-domain examples',
      icon: BookOpen,
      color: 'from-amber-600 to-orange-600',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
      path: '/wiki',
    },
    {
      id: 'encapsulator',
      title: 'Encapsulator',
      description: 'Create conditions for each module to generate emergent outputs',
      icon: Lightbulb,
      color: 'from-pink-600 to-rose-600',
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600',
      path: '/encapsulator',
    },
    {
      id: 'modulator',
      title: 'Modulator',
      description: 'Run simulations for each module to visualize system behavior',
      icon: Activity,
      color: 'from-cyan-600 to-blue-600',
      bgColor: 'bg-cyan-50',
      iconColor: 'text-cyan-600',
      path: '/modulator',
    },
    {
      id: 'ingestion',
      title: 'Ingestion Engine',
      description: 'Provide inputs to create conditions and data for your systems',
      icon: Upload,
      color: 'from-teal-600 to-green-600',
      bgColor: 'bg-teal-50',
      iconColor: 'text-teal-600',
      path: '/ingestion',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-100 py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Growth Enablement
            </span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4 px-4 py-1.5 bg-blue-50 rounded-full">
              <span className="text-sm font-medium text-blue-600">System Architecture Platform</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              What System Are You Building?
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Transform linear thinking into complex systems understanding. Build, simulate, and visualize architectures that create emergent outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Core Feature Callout */}
      <section className="py-12 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-sm uppercase tracking-wider text-gray-500 font-semibold mb-2">Core Feature</h2>
          </div>
          <Link href="/stepwise">
            <Card className="border-2 border-blue-500 hover:border-blue-600 transition-all cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg hover:shadow-xl" data-testid="card-stepwise">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <GitBranch className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-3xl mb-2">Stepwise</CardTitle>
                <CardDescription className="text-lg">
                  Our guided hand-holding system builder - perfect for those transitioning from analytical reductionist thinking to seeing how complex systems work
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" data-testid="button-start-stepwise">
                  Start Building
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Modes Grid */}
      <section className="py-16 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">All System Modes</h2>
            <p className="text-gray-600 text-lg">Choose your path to building complex systems</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modes.filter(mode => !mode.isCore).map((mode) => {
              const Icon = mode.icon;
              return (
                <Link key={mode.id} href={mode.path}>
                  <Card className="h-full hover:shadow-lg transition-all cursor-pointer border-2 hover:border-gray-300" data-testid={`card-${mode.id}`}>
                    <CardHeader>
                      <div className={`w-14 h-14 ${mode.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                        <Icon className={`h-7 w-7 ${mode.iconColor}`} />
                      </div>
                      <CardTitle className="text-xl mb-2">{mode.title}</CardTitle>
                      <CardDescription className="text-base">
                        {mode.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full" data-testid={`button-${mode.id}`}>
                        Open {mode.title}
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Define Your System</h3>
                <p className="text-gray-600">
                  Start with a clear purpose and vision for what you're building
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl font-bold text-indigo-600">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Build Through Modules</h3>
                <p className="text-gray-600">
                  Work through each architecture module with guided support
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl font-bold text-purple-600">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Visualize & Generate</h3>
                <p className="text-gray-600">
                  See your system come to life with visualizations and deliverables
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <span className="font-bold text-xl text-gray-900">Growth Enablement</span>
            <p className="text-gray-600 mt-2">Transform how you design complex systems</p>
            <p className="text-sm text-gray-500 mt-4">© 2025 All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
