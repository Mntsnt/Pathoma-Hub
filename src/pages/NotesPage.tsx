import { useState, useEffect } from 'react';
import { FileText, Save, Search, BookOpen, Plus, Trash2 } from 'lucide-react';
import Layout from '@/components/Layout';
import { pathologyTopics } from '@/data/pathologyTopics';
import { useNotes } from '@/hooks/useLocalStorage';
import { cn } from '@/lib/utils';

export default function NotesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [currentNote, setCurrentNote] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { notes, updateNote, getNote } = useNotes();

  // Get topics that have notes
  const topicsWithNotes = pathologyTopics.filter(topic => 
    getNote(topic.id).trim() !== ''
  );

  const filteredTopics = pathologyTopics.filter(topic =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Auto-select first topic if none selected
  useEffect(() => {
    if (!selectedTopicId && topicsWithNotes.length > 0) {
      setSelectedTopicId(topicsWithNotes[0].id);
    }
  }, [selectedTopicId, topicsWithNotes]);

  // Load note when topic changes
  useEffect(() => {
    if (selectedTopicId) {
      const note = getNote(selectedTopicId);
      setCurrentNote(note);
      setIsEditing(false);
    }
  }, [selectedTopicId, getNote]);

  const handleSaveNote = () => {
    if (selectedTopicId) {
      updateNote(selectedTopicId, currentNote);
      setIsEditing(false);
    }
  };

  const handleDeleteNote = () => {
    if (selectedTopicId) {
      updateNote(selectedTopicId, '');
      setCurrentNote('');
      setIsEditing(false);
    }
  };

  const selectedTopic = selectedTopicId ? 
    pathologyTopics.find(t => t.id === selectedTopicId) : null;

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">Study Notes</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take and organize your pathology study notes for each topic. Your notes are automatically saved locally.
          </p>
        </div>

        {/* Stats */}
        <div className="bg-gradient-card rounded-lg border p-6 shadow-custom-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold mb-1">{topicsWithNotes.length}</div>
              <div className="text-sm text-muted-foreground">Topics with Notes</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">
                {Object.values(notes).join(' ').split(' ').length}
              </div>
              <div className="text-sm text-muted-foreground">Total Words</div>
            </div>
            <div>
              <div className="text-2xl font-bold mb-1">{pathologyTopics.length}</div>
              <div className="text-sm text-muted-foreground">Available Topics</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Topic List */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg border shadow-custom-sm">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background"
                  />
                </div>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {(searchQuery ? filteredTopics : pathologyTopics).map((topic) => {
                  const hasNote = getNote(topic.id).trim() !== '';
                  const isSelected = selectedTopicId === topic.id;
                  
                  return (
                    <button
                      key={topic.id}
                      onClick={() => setSelectedTopicId(topic.id)}
                      className={cn(
                        "w-full text-left p-4 border-b hover:bg-accent transition-colors",
                        isSelected && "bg-primary/10 border-primary/20"
                      )}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className={cn(
                              "text-sm font-medium truncate",
                              isSelected ? "text-primary" : "text-foreground"
                            )}>
                              {topic.title}
                            </h3>
                            {hasNote && (
                              <FileText className="w-3 h-3 text-success flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {topic.category} • {topic.difficulty}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Note Editor */}
          <div className="lg:col-span-2">
            {selectedTopic ? (
              <div className="bg-card rounded-lg border shadow-custom-sm">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-semibold">{selectedTopic.title}</h2>
                      <p className="text-sm text-muted-foreground">
                        {selectedTopic.category} • {selectedTopic.difficulty}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {currentNote.trim() !== '' && (
                        <button
                          onClick={handleDeleteNote}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                          title="Delete note"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                        title={isEditing ? "Cancel editing" : "Edit note"}
                      >
                        {isEditing ? "Cancel" : "Edit"}
                      </button>
                      {isEditing && (
                        <button
                          onClick={handleSaveNote}
                          className="flex items-center space-x-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors"
                        >
                          <Save className="w-4 h-4" />
                          <span>Save</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {isEditing ? (
                    <textarea
                      value={currentNote}
                      onChange={(e) => setCurrentNote(e.target.value)}
                      placeholder={`Write your notes for ${selectedTopic.title}...`}
                      className="w-full h-96 p-4 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary bg-background resize-none"
                      autoFocus
                    />
                  ) : (
                    <div className="min-h-96">
                      {currentNote.trim() ? (
                        <div className="prose prose-sm max-w-none">
                          <pre className="whitespace-pre-wrap font-sans text-sm text-foreground">
                            {currentNote}
                          </pre>
                        </div>
                      ) : (
                        <div className="text-center py-16">
                          <Plus className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                          <h3 className="text-lg font-semibold mb-2">No notes yet</h3>
                          <p className="text-muted-foreground mb-4">
                            Start taking notes for {selectedTopic.title} to enhance your learning.
                          </p>
                          <button
                            onClick={() => setIsEditing(true)}
                            className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary-hover transition-colors"
                          >
                            Start Writing
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-card rounded-lg border shadow-custom-sm p-16 text-center">
                <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Select a Topic</h3>
                <p className="text-muted-foreground">
                  Choose a pathology topic from the left sidebar to view or create notes.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}