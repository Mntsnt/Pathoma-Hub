import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, BookOpen, TrendingUp, Star } from 'lucide-react';
import Layout from '@/components/Layout';
import TopicCard from '@/components/TopicCard';
import { pathologyTopics, featuredTopics } from '@/data/pathologyTopics';
import { useVideoProgress } from '@/hooks/useLocalStorage';

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const { progress } = useVideoProgress();

  // Get topics that have some progress for "Continue Watching"
  const topicsInProgress = pathologyTopics.filter(topic => {
    const topicProgress = progress[topic.id] || 0;
    return topicProgress > 0 && topicProgress < 100;
  }).slice(0, 4);

  // Filter topics based on search
  const filteredTopics = pathologyTopics.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayTopics = searchQuery ? filteredTopics : featuredTopics;

  return (
    <Layout onSearch={setSearchQuery} searchPlaceholder="Search pathology topics...">
      <div className="space-y-12">
        {/* Hero Section */}
        {!searchQuery && (
          <section className="text-center py-12">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Master{' '}
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  Pathology
                </span>{' '}
                with Confidence
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Access all 19 core pathology topics with interactive video learning, 
                progress tracking, and study tools designed for medical students.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/topics"
                  className="inline-flex items-center space-x-2 bg-gradient-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:shadow-custom-lg transition-all duration-300 hover:-translate-y-0.5"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Browse All Topics</span>
                </Link>
                {topicsInProgress.length > 0 && (
                  <Link
                    to={`/video/${topicsInProgress[0].id}`}
                    className="inline-flex items-center space-x-2 bg-card text-card-foreground border px-8 py-3 rounded-lg font-semibold hover:bg-accent transition-colors"
                  >
                    <Play className="w-5 h-5" />
                    <span>Continue Learning</span>
                  </Link>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Continue Watching Section */}
        {!searchQuery && topicsInProgress.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Play className="w-4 h-4 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold">Continue Watching</h2>
              </div>
              <Link 
                to="/topics" 
                className="text-primary hover:text-primary-hover font-medium transition-colors"
              >
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {topicsInProgress.map((topic) => (
                <TopicCard key={topic.id} topic={topic} showProgress />
              ))}
            </div>
          </section>
        )}

        {/* Featured/Search Results Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                {searchQuery ? (
                  <BookOpen className="w-4 h-4 text-primary-foreground" />
                ) : (
                  <Star className="w-4 h-4 text-primary-foreground" />
                )}
              </div>
              <h2 className="text-2xl font-bold">
                {searchQuery ? `Search Results (${displayTopics.length})` : 'Featured Topics'}
              </h2>
            </div>
            {!searchQuery && (
              <Link 
                to="/topics" 
                className="text-primary hover:text-primary-hover font-medium transition-colors"
              >
                View All Topics →
              </Link>
            )}
          </div>

          {displayTopics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayTopics.map((topic) => (
                <TopicCard key={topic.id} topic={topic} showProgress />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No topics found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search terms or browse all topics.
              </p>
              <Link
                to="/topics"
                className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary-hover transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>View All Topics</span>
              </Link>
            </div>
          )}
        </section>

        {/* Stats Section */}
        {!searchQuery && (
          <section className="bg-gradient-card rounded-2xl p-8 border shadow-custom-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <BookOpen className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold">{pathologyTopics.length}</h3>
                <p className="text-muted-foreground">Pathology Topics</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <Play className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold">
                  {pathologyTopics.reduce((total, topic) => total + topic.videoCount, 0)}
                </h3>
                <p className="text-muted-foreground">Educational Videos</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <TrendingUp className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-bold">
                  {Object.keys(progress).length}
                </h3>
                <p className="text-muted-foreground">Topics Started</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}