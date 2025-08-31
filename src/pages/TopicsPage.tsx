import { useState } from 'react';
import { BookOpen, Filter } from 'lucide-react';
import Layout from '@/components/Layout';
import TopicCard from '@/components/TopicCard';
import { pathologyTopics } from '@/data/pathologyTopics';
import { cn } from '@/lib/utils';

const categories = ['All', 'Fundamentals', 'Systems', 'Hematology'];
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function TopicsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const filteredTopics = pathologyTopics.filter(topic => {
    const matchesSearch = 
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || topic.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || topic.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <Layout onSearch={setSearchQuery} searchPlaceholder="Search all pathology topics...">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            All Pathology Topics
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive collection of pathology topics covering all major systems and concepts. 
            Track your progress and master each subject at your own pace.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-card rounded-lg border p-6 shadow-custom-sm">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <h3 className="font-semibold">Filters</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                      selectedCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-accent"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Difficulty</label>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={cn(
                      "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                      selectedDifficulty === difficulty
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-accent"
                    )}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">
              {filteredTopics.length} Topic{filteredTopics.length !== 1 ? 's' : ''} Found
            </h2>
            
            <div className="text-sm text-muted-foreground">
              {selectedCategory !== 'All' && (
                <span className="mr-2">Category: {selectedCategory}</span>
              )}
              {selectedDifficulty !== 'All' && (
                <span>Difficulty: {selectedDifficulty}</span>
              )}
            </div>
          </div>

          {filteredTopics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTopics.map((topic) => (
                <TopicCard key={topic.id} topic={topic} showProgress />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No topics found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search criteria or filters to find more topics.
              </p>
              <div className="space-x-4">
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                    setSelectedDifficulty('All');
                  }}
                  className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary-hover transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
<footer className="w-full text-center p-4 bg-gray-100 dark:bg-gray-900 text-sm text-gray-600 dark:text-gray-400 mt-12">
  © 2025 Mintesnot Leliso. All rights reserved.
</footer>


    </Layout>
  );
}