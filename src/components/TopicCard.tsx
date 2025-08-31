import { Link } from 'react-router-dom';
import { BookOpen, Clock, Star, Bookmark, BookmarkCheck } from 'lucide-react';
import { PathologyTopic } from '@/data/pathologyTopics';
import { useVideoProgress, useBookmarks } from '@/hooks/useLocalStorage';
import { cn } from '@/lib/utils';

interface TopicCardProps {
  topic: PathologyTopic;
  showProgress?: boolean;
}

const difficultyColors = {
  Beginner: 'text-success bg-success/10',
  Intermediate: 'text-warning bg-warning/10',
  Advanced: 'text-destructive bg-destructive/10',
};

export default function TopicCard({ topic, showProgress = true }: TopicCardProps) {
  const { getProgress } = useVideoProgress();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  
  const progress = getProgress(topic.id);
  const bookmarked = isBookmarked(topic.id);

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(topic.id);
  };

  return (
    <Link to={`/video/${topic.id}`} className="block group">
      <div className="bg-gradient-card rounded-lg border shadow-custom-md hover:shadow-custom-lg transition-all duration-300 group-hover:-translate-y-1 overflow-hidden">
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium",
                  difficultyColors[topic.difficulty]
                )}>
                  {topic.difficulty}
                </span>
              </div>
            </div>
            <button
              onClick={handleBookmarkClick}
              className="p-2 rounded-full hover:bg-accent transition-colors"
              title={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
            >
              {bookmarked ? (
                <BookmarkCheck className="w-5 h-5 text-primary" />
              ) : (
                <Bookmark className="w-5 h-5 text-muted-foreground hover:text-primary" />
              )}
            </button>
          </div>

          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-2">
            {topic.title}
          </h3>
          
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {topic.description}
          </p>

          {/* Stats */}
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <BookOpen className="w-4 h-4" />
              <span>{topic.videoCount} videos</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{topic.estimatedDuration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4" />
              <span>{topic.category}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        {showProgress && (
          <div className="px-6 pb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}