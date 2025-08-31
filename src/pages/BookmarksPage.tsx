import { useState } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import Layout from '@/components/Layout';
import TopicCard from '@/components/TopicCard';
import { pathologyTopics } from '@/data/pathologyTopics';
import { useBookmarks } from '@/hooks/useLocalStorage';

export default function BookmarksPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { bookmarks } = useBookmarks();

  const bookmarkedTopics = pathologyTopics.filter(topic => 
    bookmarks.includes(topic.id)
  );

  const filteredBookmarks = bookmarkedTopics.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout onSearch={setSearchQuery} searchPlaceholder="Search bookmarked topics...">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
              <BookmarkCheck className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Your Bookmarks</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Quick access to your saved pathology topics for efficient review and study planning.
          </p>
        </div>

        {/* Stats */}
        <div className="bg-gradient-card rounded-lg border p-6 shadow-custom-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold mb-1">{bookmarkedTopics.length}</div>
              <div className="text-sm text-muted-foreground">Bookmarked Topics</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">
                {bookmarkedTopics.reduce((total, topic) => total + topic.videoCount, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Videos</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">
                {bookmarkedTopics.reduce((total, topic) => {
                  const duration = topic.estimatedDuration;
                  const hours = parseFloat(duration.match(/(\d+)h/)?.[1] || '0');
                  const minutes = parseFloat(duration.match(/(\d+)m/)?.[1] || '0');
                  return total + hours + (minutes / 60);
                }, 0).toFixed(1)}h
              </div>
              <div className="text-sm text-muted-foreground">Estimated Duration</div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          {bookmarkedTopics.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  {searchQuery ? (
                    <>Search Results ({filteredBookmarks.length})</>
                  ) : (
                    <>All Bookmarks ({bookmarkedTopics.length})</>
                  )}
                </h2>
              </div>

              {filteredBookmarks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBookmarks.map((topic) => (
                    <TopicCard key={topic.id} topic={topic} showProgress />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Bookmark className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No bookmarks match your search</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search terms to find your bookmarked topics.
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <Bookmark className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">No Bookmarks Yet</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Start bookmarking your favorite pathology topics to create your personalized study collection. 
                Click the bookmark icon on any topic card to save it here.
              </p>
              <div className="space-y-4">
                <a
                  href="/topics"
                  className="inline-block bg-gradient-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:shadow-custom-lg transition-all duration-300 hover:-translate-y-0.5"
                >
                  Browse All Topics
                </a>
                <div className="text-sm text-muted-foreground">
                  💡 Tip: Bookmarked topics appear here for quick access during your study sessions.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}