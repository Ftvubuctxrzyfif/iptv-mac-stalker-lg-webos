import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Loader2, Search, Tv } from 'lucide-react';
import type { Channel, Category } from '@/lib/mac-stalker-protocol';

interface ChannelListProps {
  channels: Channel[];
  categories: Category[];
  onChannelSelect: (channel: Channel) => void;
  isLoading?: boolean;
}

const ChannelList = ({ channels, categories, onChannelSelect, isLoading }: ChannelListProps) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter channels by category and search query
  const filteredChannels = channels.filter((channel) => {
    const matchesCategory = selectedCategory === null || channel.tv_genre_id === selectedCategory;
    const matchesSearch = channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         channel.number.toString().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const groupedChannels = filteredChannels.reduce((acc, channel) => {
    const firstLetter = channel.name.charAt(0).toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push(channel);
    return acc;
  }, {} as Record<string, Channel[]>);

  return (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-slate-900">
      {/* Search and filters */}
      <div className="p-4 border-b bg-white dark:bg-slate-800 shadow-sm">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search channels..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category filter */}
        <ScrollArea className="w-full">
          <div className="flex gap-2 pb-2">
            <Badge
              variant={selectedCategory === null ? 'default' : 'outline'}
              className="cursor-pointer whitespace-nowrap"
              onClick={() => setSelectedCategory(null)}
            >
              All Channels
            </Badge>
            {categories.slice(0, 10).map((category) => (
              <Badge
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                className="cursor-pointer whitespace-nowrap"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.title}
              </Badge>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Channel list */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500 mb-4" />
              <p className="text-muted-foreground">Loading channels...</p>
            </div>
          ) : filteredChannels.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Tv className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No channels found</p>
            </div>
          ) : (
            Object.entries(groupedChannels).map(([letter, channels]) => (
              <div key={letter} className="mb-6">
                <h3 className="font-bold text-lg mb-3 px-2 text-slate-700 dark:text-slate-300">
                  {letter}
                </h3>
                <div className="space-y-2">
                  {channels.map((channel) => (
                    <Card
                      key={channel.id}
                      className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
                      onClick={() => onChannelSelect(channel)}
                    >
                      <CardContent className="flex items-center gap-4 p-3">
                        {/* Channel number */}
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                          {channel.number}
                        </div>

                        {/* Channel logo */}
                        {channel.logo ? (
                          <img
                            src={channel.logo}
                            alt={channel.name}
                            className="w-12 h-12 object-contain rounded"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                            <Tv className="w-6 h-6 text-muted-foreground" />
                          </div>
                        )}

                        {/* Channel name */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate">{channel.name}</h4>
                          <p className="text-sm text-muted-foreground truncate">
                            Ch {channel.number}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChannelList;
