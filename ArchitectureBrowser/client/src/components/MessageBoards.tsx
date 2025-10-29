import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Plus, MessageSquare } from "lucide-react";
import { format } from "date-fns";
import type { MessageBoard, BoardMessage } from "@shared/schema";

interface MessageBoardsProps {
  systemId: number;
}

export function MessageBoards({ systemId }: MessageBoardsProps) {
  const [selectedBoard, setSelectedBoard] = useState<number | null>(null);
  const [newBoardOpen, setNewBoardOpen] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [newBoardDescription, setNewBoardDescription] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();

  const { data: boards, isLoading: boardsLoading } = useQuery<MessageBoard[]>({
    queryKey: ['/api/systems', systemId, 'boards'],
  });

  const { data: messages, isLoading: messagesLoading } = useQuery<BoardMessage[]>({
    queryKey: ['/api/boards', selectedBoard, 'messages'],
    enabled: !!selectedBoard
  });

  const createBoard = useMutation({
    mutationFn: async () => {
      return await apiRequest(
        `/api/systems/${systemId}/boards`,
        'POST',
        { title: newBoardTitle, description: newBoardDescription }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/systems', systemId, 'boards'] });
      setNewBoardOpen(false);
      setNewBoardTitle("");
      setNewBoardDescription("");
      toast({
        title: "Board created",
        description: "Your message board has been created successfully"
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create board. Please try again.",
        variant: "destructive"
      });
    }
  });

  const postMessage = useMutation({
    mutationFn: async () => {
      if (!selectedBoard) return;
      return await apiRequest(
        `/api/boards/${selectedBoard}/messages`,
        'POST',
        { content: newMessage }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/boards', selectedBoard, 'messages'] });
      setNewMessage("");
      toast({
        title: "Message posted",
        description: "Your message has been posted successfully"
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to post message. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleCreateBoard = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBoardTitle.trim()) {
      createBoard.mutate();
    }
  };

  const handlePostMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && selectedBoard) {
      postMessage.mutate();
    }
  };

  const selectedBoardData = boards?.find(b => b.id === selectedBoard);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-testid="container-message-boards">
      {/* Boards List */}
      <Card className="md:col-span-1">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Discussion Boards</CardTitle>
            <Dialog open={newBoardOpen} onOpenChange={setNewBoardOpen}>
              <DialogTrigger asChild>
                <Button size="sm" data-testid="button-create-board">
                  <Plus className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Board</DialogTitle>
                  <DialogDescription>
                    Start a new discussion topic for your system
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateBoard} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={newBoardTitle}
                      onChange={(e) => setNewBoardTitle(e.target.value)}
                      placeholder="Board title..."
                      required
                      data-testid="input-board-title"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description (optional)</label>
                    <Textarea
                      value={newBoardDescription}
                      onChange={(e) => setNewBoardDescription(e.target.value)}
                      placeholder="What is this board about?"
                      rows={3}
                      data-testid="input-board-description"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={!newBoardTitle.trim() || createBoard.isPending}
                    className="w-full"
                    data-testid="button-submit-board"
                  >
                    Create Board
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px]">
            {boardsLoading ? (
              <div className="space-y-2 p-4">
                {[1, 2, 3].map(i => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : boards && boards.length > 0 ? (
              <div className="space-y-1 p-2">
                {boards.map((board) => (
                  <button
                    key={board.id}
                    onClick={() => setSelectedBoard(board.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedBoard === board.id 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-muted'
                    }`}
                    data-testid={`button-board-${board.id}`}
                  >
                    <div className="flex items-start gap-2">
                      <MessageSquare className="w-4 h-4 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{board.title}</h4>
                        {board.description && (
                          <p className="text-xs opacity-75 truncate">{board.description}</p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-muted-foreground">
                <p className="mb-4" data-testid="text-no-boards">No discussion boards yet</p>
                <Button onClick={() => setNewBoardOpen(true)} variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Board
                </Button>
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Messages Panel */}
      <Card className="md:col-span-2">
        {selectedBoard && selectedBoardData ? (
          <>
            <CardHeader>
              <CardTitle>{selectedBoardData.title}</CardTitle>
              {selectedBoardData.description && (
                <CardDescription>{selectedBoardData.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <ScrollArea className="h-[400px] pr-4">
                {messagesLoading ? (
                  <div className="space-y-4">
                    {[1, 2].map(i => (
                      <Skeleton key={i} className="h-24 w-full" />
                    ))}
                  </div>
                ) : messages && messages.length > 0 ? (
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className="border rounded-lg p-4"
                        data-testid={`board-message-${msg.id}`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-sm">User {msg.userId}</span>
                          <span className="text-xs text-muted-foreground">
                            {msg.createdAt ? format(new Date(msg.createdAt), 'MMM d, h:mm a') : ''}
                          </span>
                        </div>
                        <p className="text-sm">{msg.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <p data-testid="text-no-messages">No messages yet. Start the discussion!</p>
                  </div>
                )}
              </ScrollArea>
              
              <form onSubmit={handlePostMessage} className="space-y-2">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Write your message..."
                  rows={3}
                  disabled={postMessage.isPending}
                  data-testid="input-board-message"
                />
                <Button 
                  type="submit" 
                  disabled={!newMessage.trim() || postMessage.isPending}
                  className="w-full"
                  data-testid="button-post-message"
                >
                  Post Message
                </Button>
              </form>
            </CardContent>
          </>
        ) : (
          <CardContent className="h-[500px] flex items-center justify-center">
            <p className="text-muted-foreground" data-testid="text-select-board">
              Select a board to view discussions
            </p>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
