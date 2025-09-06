import { useState, useRef, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { dummyChatThreads, dummyMessages, dummyUser } from '@/lib/dummy-data';
import { MessageCircle, Send, ArrowLeft, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

const Messages = () => {
  const [selectedThread, setSelectedThread] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(dummyMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Current user ID
  const currentUserId = dummyUser.id;

  const selectedChat = selectedThread
    ? dummyChatThreads.find(thread => thread.id === selectedThread)
    : null;

  const chatMessages = selectedChat
    ? messages.filter(msg => msg.productId === selectedChat.productId)
    : [];

  // Scroll to bottom of messages whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  const sendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      // Create a new message object
      const newMessageObj = {
        id: `m${messages.length + 1}`,
        senderId: currentUserId,
        receiverId: selectedChat.sellerId === currentUserId ? selectedChat.buyerId : selectedChat.sellerId,
        productId: selectedChat.productId,
        message: newMessage.trim(),
        timestamp: new Date().toISOString(),
        isRead: false
      };

      // Add the message to the messages list
      setMessages([...messages, newMessageObj]);

      // Clear the input
      setNewMessage('');

      // Show toast notification
      toast({
        title: "Message sent",
        description: "Your message has been sent successfully",
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6 max-w-7xl h-[calc(100vh-8rem)]">
        <div className="flex h-full">
          {/* Chat List - Desktop & Mobile */}
          <div className={`${selectedThread ? 'hidden md:flex' : 'flex'} flex-col w-full md:w-1/3 border-r`}>
            <div className="flex items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <MessageCircle className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold">Messages</h1>
              </div>
              <Button variant="outline" size="sm" asChild className="md:hidden">
                <Link to="/products">
                  <span className="text-xs">Browse Products</span>
                </Link>
              </Button>
            </div>

            {dummyChatThreads.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">No messages yet</h2>
                <p className="text-muted-foreground mb-6">
                  Start a conversation by contacting a seller!
                </p>
                <Button asChild>
                  <Link to="/products">Browse Products</Link>
                </Button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-2 pb-4">
                {dummyChatThreads.map((thread) => {
                  const isUserSeller = thread.sellerId === currentUserId;
                  const otherPersonName = isUserSeller ? thread.buyerName : thread.sellerName;
                  const otherPersonId = isUserSeller ? thread.buyerId : thread.sellerId;

                  return (
                    <Card
                      key={thread.id}
                      className={`cursor-pointer transition-colors ${selectedThread === thread.id ? 'ring-2 ring-primary' : 'hover:bg-accent'
                        }`}
                      onClick={() => setSelectedThread(thread.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <Avatar>
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${otherPersonId}`} />
                            <AvatarFallback>{otherPersonName[0]}</AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-medium truncate">{otherPersonName}</p>
                              <span className="text-xs text-muted-foreground">
                                {new Date(thread.lastMessageTime).toLocaleDateString([], {
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>

                            <p className="text-sm text-muted-foreground truncate mb-2">
                              {thread.product.title}
                            </p>

                            <div className="flex items-center justify-between">
                              <p className="text-sm truncate">{thread.lastMessage}</p>
                              {thread.unreadCount > 0 && (
                                <Badge variant="default" className="text-xs">
                                  {thread.unreadCount}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          {/* Chat Window */}
          <div className={`${!selectedThread ? 'hidden md:flex' : 'flex'} flex-col flex-1`}>
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedThread(null)}
                      className="md:hidden"
                      aria-label="Back to messages"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    {(() => {
                      const isUserSeller = selectedChat.sellerId === currentUserId;
                      const otherPersonName = isUserSeller ? selectedChat.buyerName : selectedChat.sellerName;
                      const otherPersonId = isUserSeller ? selectedChat.buyerId : selectedChat.sellerId;

                      return (
                        <>
                          <Avatar>
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${otherPersonId}`} />
                            <AvatarFallback>{otherPersonName[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{otherPersonName}</p>
                            <p className="text-sm text-muted-foreground">
                              {isUserSeller ? 'Buyer' : 'Seller'} • {selectedChat.product.title}
                            </p>
                          </div>
                        </>
                      );
                    })()}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="hidden sm:flex">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/products/${selectedChat.productId}`}>
                        <span className="hidden sm:inline">View Item</span>
                        <span className="sm:hidden">Item</span>
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4" aria-live="polite">
                  {chatMessages.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-muted-foreground text-center">
                        No messages yet. Start the conversation!
                      </p>
                    </div>
                  ) : (
                    <>
                      {chatMessages.map((message) => {
                        const isCurrentUser = message.senderId === currentUserId;
                        return (
                          <div
                            key={message.id}
                            className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[70%] rounded-lg p-3 ${isCurrentUser
                                  ? 'bg-primary text-primary-foreground'
                                  : 'bg-accent'
                                }`}
                            >
                              <p className="text-sm whitespace-pre-wrap break-words">{message.message}</p>
                              <p className={`text-xs mt-1 ${isCurrentUser
                                  ? 'text-primary-foreground/70'
                                  : 'text-muted-foreground'
                                }`}>
                                {new Date(message.timestamp).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </>
                  )}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                      className="flex-1"
                      aria-label="Message input"
                    />
                    <Button
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                      aria-label="Send message"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center justify-center h-full">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Select a conversation</h2>
                  <p className="text-muted-foreground">
                    Choose a chat from the list to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;