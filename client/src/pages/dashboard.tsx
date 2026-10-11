import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import { 
  BookOpen, 
  Plus, 
  FolderOpen, 
  Route, 
  Layers, 
  Activity, 
  Upload,
  LogOut,
  User
} from "lucide-react";
import type { System } from "@shared/schema";

const modes = [
  {
    title: "System Wiki",
    description: "Educational architecture explorer",
    icon: BookOpen,
    path: "/wiki",
    color: "from-blue-500 to-blue-600"
  },
  {
    title: "Stepwise",
    description: "Guided system builder",
    icon: Route,
    path: "/stepwise",
    color: "from-purple-500 to-purple-600"
  },
  {
    title: "New System",
    description: "Initialize new project",
    icon: Plus,
    path: "/new-system",
    color: "from-green-500 to-green-600"
  },
  {
    title: "Saved Systems",
    description: "Continue your work",
    icon: FolderOpen,
    path: "/saved-systems",
    color: "from-orange-500 to-orange-600"
  },
  {
    title: "Encapsulator",
    description: "Create module conditions",
    icon: Layers,
    path: "/encapsulator",
    color: "from-pink-500 to-pink-600"
  },
  {
    title: "Modulator",
    description: "Run simulations",
    icon: Activity,
    path: "/modulator",
    color: "from-indigo-500 to-indigo-600"
  },
  {
    title: "Ingestion Engine",
    description: "Process inputs",
    icon: Upload,
    path: "/ingestion",
    color: "from-teal-500 to-teal-600"
  }
];

export default function Dashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const handleLogout = async () => {
    try {
      const response = await fetch('/replit/auth/logout', { method: 'POST' });
      
      if (!response.ok) {
        throw new Error('Logout failed');
      }
      
      queryClient.clear();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out"
      });
      window.location.href = '/';
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const { data: userSystems, isLoading } = useQuery<System[]>({
    queryKey: ['/api/users', user?.id, 'systems'],
    enabled: !!user?.id
  });

  const recentSystems = userSystems?.slice(0, 4) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold" data-testid="text-welcome">
                Welcome back, {user?.firstName || 'Architect'}!
              </h1>
              <p className="text-muted-foreground" data-testid="text-email">
                {user?.email}
              </p>
              {user?.company && (
                <p className="text-sm text-muted-foreground" data-testid="text-company">
                  {user.company}
                </p>
              )}
            </div>
          </div>
          <Button 
            onClick={handleLogout} 
            variant="outline" 
            size="sm"
            data-testid="button-logout"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card data-testid="card-stat-systems">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {userSystems?.length || 0}
              </CardTitle>
              <CardDescription>Total Systems</CardDescription>
            </CardHeader>
          </Card>
          <Card data-testid="card-stat-active">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {userSystems?.filter(s => s.status === 'active').length || 0}
              </CardTitle>
              <CardDescription>Active Systems</CardDescription>
            </CardHeader>
          </Card>
          <Card data-testid="card-stat-completed">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {userSystems?.filter(s => s.status === 'completed').length || 0}
              </CardTitle>
              <CardDescription>Completed Systems</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Recent Systems */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Systems</CardTitle>
              <Button asChild variant="outline" size="sm" data-testid="button-view-all">
                <Link href="/saved-systems">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            ) : recentSystems.length > 0 ? (
              <div className="space-y-4">
                {recentSystems.map((system) => (
                  <div 
                    key={system.id} 
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    data-testid={`card-system-${system.id}`}
                  >
                    <div>
                      <h3 className="font-semibold" data-testid={`text-system-name-${system.id}`}>
                        {system.name}
                      </h3>
                      {system.description && (
                        <p className="text-sm text-muted-foreground" data-testid={`text-system-desc-${system.id}`}>
                          {system.description}
                        </p>
                      )}
                      <div className="flex gap-2 mt-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          system.status === 'active' ? 'bg-green-500/10 text-green-600' :
                          system.status === 'completed' ? 'bg-blue-500/10 text-blue-600' :
                          'bg-yellow-500/10 text-yellow-600'
                        }`} data-testid={`text-system-status-${system.id}`}>
                          {system.status}
                        </span>
                        {system.currentModuleId && (
                          <span className="text-xs px-2 py-1 rounded-full bg-purple-500/10 text-purple-600">
                            Module {system.currentModuleId}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p className="mb-4" data-testid="text-no-systems">No systems yet. Start building!</p>
                <Button asChild data-testid="button-create-first-system">
                  <Link href="/new-system">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First System
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold mb-6">System Modes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {modes.map((mode) => (
              <Link key={mode.path} href={mode.path}>
                <Card 
                  className="hover:shadow-lg transition-all cursor-pointer group"
                  data-testid={`card-mode-${mode.path.replace('/', '')}`}
                >
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${mode.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <mode.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{mode.title}</CardTitle>
                    <CardDescription>{mode.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
