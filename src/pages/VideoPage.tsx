import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookmarkCheck, Bookmark, FileText, Share2, Clock, BookOpen } from 'lucide-react';
import Layout from '@/components/Layout';
import VideoPlayer from '@/components/VideoPlayer';
import TopicCard from '@/components/TopicCard';
import { pathologyTopics } from '@/data/pathologyTopics';
import { useBookmarks, useVideoProgress } from '@/hooks/useLocalStorage';
import { useState } from 'react';

export default function VideoPage() {
  const { topicId } = useParams<{ topicId: string }>();
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { getProgress } = useVideoProgress();
  const [currentProgress, setCurrentProgress] = useState(0);

  const topic = pathologyTopics.find(t => t.id === topicId);

  if (!topic) {
    return (
      <Layout>
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Topic Not Found</h1>
          <p className="text-muted-foreground mb-6">The requested pathology topic could not be found.</p>
          <Link
            to="/topics"
            className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary-hover transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span>Browse All Topics</span>
          </Link>
        </div>
      </Layout>
    );
  }

  const bookmarked = isBookmarked(topic.id);
  const savedProgress = getProgress(topic.id);
  
  // Get related topics (same category, different topic)
  const relatedTopics = pathologyTopics
    .filter(t => t.id !== topic.id && t.category === topic.category)
    .slice(0, 3);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${topic.title} - Pathoma Hub`,
          text: topic.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast here
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Back Navigation */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          <div className="h-4 w-px bg-border" />
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/topics" className="hover:text-foreground transition-colors">
              Topics
            </Link>
            <span>/</span>
            <span className="text-foreground">{topic.title}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <VideoPlayer
              src={topic.videoPath}
              topicId={topic.id}
              title={topic.title}
              onProgressUpdate={setCurrentProgress}
            />

            {/* Video Info */}
            <div className="bg-card rounded-lg border p-6 shadow-custom-sm">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-2xl font-bold pr-4">{topic.title}</h1>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <button
                    onClick={() => toggleBookmark(topic.id)}
                    className="p-2 rounded-lg hover:bg-accent transition-colors"
                    title={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
                  >
                    {bookmarked ? (
                      <BookmarkCheck className="w-5 h-5 text-primary" />
                    ) : (
                      <Bookmark className="w-5 h-5 text-muted-foreground hover:text-primary" />
                    )}
                  </button>
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-lg hover:bg-accent transition-colors"
                    title="Share this topic"
                  >
                    <Share2 className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                  </button>
                  <Link
                    to="/notes"
                    className="p-2 rounded-lg hover:bg-accent transition-colors"
                    title="View notes"
                  >
                    <FileText className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                  </Link>
                </div>
              </div>

              <p className="text-muted-foreground mb-6">{topic.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-secondary rounded-lg p-3">
                  <div className="text-lg font-bold">{topic.videoCount}</div>
                  <div className="text-xs text-muted-foreground">Videos</div>
                </div>
                <div className="bg-secondary rounded-lg p-3">
                  <div className="text-lg font-bold">{topic.estimatedDuration}</div>
                  <div className="text-xs text-muted-foreground">Duration</div>
                </div>
                <div className="bg-secondary rounded-lg p-3">
                  <div className="text-lg font-bold">{topic.difficulty}</div>
                  <div className="text-xs text-muted-foreground">Level</div>
                </div>
                <div className="bg-secondary rounded-lg p-3">
                  <div className="text-lg font-bold">
                    {Math.round(currentProgress || savedProgress)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Progress</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <div className="bg-gradient-card rounded-lg border p-6 shadow-custom-md">
              <h3 className="font-semibold mb-4 flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Learning Progress</span>
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Current Progress</span>
                  <span className="font-medium">
                    {Math.round(currentProgress || savedProgress)}%
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-3">
                  <div 
                    className="bg-gradient-primary h-3 rounded-full transition-all duration-500"
                    style={{ width: `${currentProgress || savedProgress}%` }}
                  />
                </div>
                
                <div className="text-xs text-muted-foreground">
                  {savedProgress < 100 ? (
                    "Keep watching to complete this topic!"
                  ) : (
                    "🎉 Topic completed! Great job!"
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card rounded-lg border p-6 shadow-custom-sm">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link
                  to="/notes"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors w-full text-left"
                >
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Take Notes</span>
                </Link>
                <button
                  onClick={() => toggleBookmark(topic.id)}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors w-full text-left"
                >
                  {bookmarked ? (
                    <BookmarkCheck className="w-4 h-4 text-primary" />
                  ) : (
                    <Bookmark className="w-4 h-4 text-muted-foreground" />
                  )}
                  <span className="text-sm">
                    {bookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
                  </span>
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors w-full text-left"
                >
                  <Share2 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Share Topic</span>
                </button>
              </div>
            </div>

            {/* Related Topics */}
            {relatedTopics.length > 0 && (
              <div className="bg-card rounded-lg border p-6 shadow-custom-sm">
                <h3 className="font-semibold mb-4">Related Topics</h3>
                <div className="space-y-4">
                  {relatedTopics.map((relatedTopic) => (
                    <Link
                      key={relatedTopic.id}
                      to={`/video/${relatedTopic.id}`}
                      className="block p-3 rounded-lg hover:bg-accent transition-colors"
                    >
                      <div className="font-medium text-sm mb-1">{relatedTopic.title}</div>
                      <div className="text-xs text-muted-foreground mb-2">
                        {relatedTopic.videoCount} videos • {relatedTopic.estimatedDuration}
                      </div>
                      <div className="w-full bg-secondary rounded-full h-1">
                        <div 
                          className="bg-gradient-primary h-1 rounded-full"
                          style={{ width: `${getProgress(relatedTopic.id)}%` }}
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
<footer className="w-full text-center p-4 bg-gray-100 dark:bg-gray-900 text-sm text-gray-600 dark:text-gray-400 mt-12">
  © 2025 Mintesnot Leliso. All rights reserved.
</footer>


    </Layout>
  );
}