import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Send } from "lucide-react";
import { format } from "date-fns";
import type { ChatMessage } from "@shared/schema";

interface ChatMessagesProps {
  systemId: number;
}

export function ChatMessages({ systemId }: ChatMessagesProps) {
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const { data: messages, isLoading } = useQuery<ChatMessage[]>({
    queryKey: ['/api/systems', systemId, 'chat'],
  });

  const sendMessage = useMutation({
    mutationFn: async (messageText: string) => {
      return await apiRequest(
        `/api/systems/${systemId}/chat`,
        'POST',
        { message: messageText }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/systems', systemId, 'chat'] });
      setMessage("");
      toast({
        title: "Message sent",
        description: "Your message has been sent successfully"
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage.mutate(message.trim());
    }
  };

  return (
    <Card className="h-[600px] flex flex-col" data-testid="card-chat">
      <CardHeader>
        <CardTitle>System Chat</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 px-6">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : messages && messages.length > 0 ? (
            <div className="space-y-4 py-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className="flex flex-col space-y-1"
                  data-testid={`message-${msg.id}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm">User {msg.userId}</span>
                    <span className="text-xs text-muted-foreground">
                      {msg.createdAt ? format(new Date(msg.createdAt), 'MMM d, h:mm a') : ''}
                    </span>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p data-testid="text-no-messages">No messages yet. Start the conversation!</p>
            </div>
          )}
        </ScrollArea>
        <form onSubmit={handleSendMessage} className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              disabled={sendMessage.isPending}
              data-testid="input-message"
            />
            <Button 
              type="submit" 
              disabled={!message.trim() || sendMessage.isPending}
              data-testid="button-send"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
