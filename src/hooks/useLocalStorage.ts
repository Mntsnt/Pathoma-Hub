import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}

export function useVideoProgress() {
  const [progress, setProgress] = useLocalStorage<Record<string, number>>('videoProgress', {});
  
  const updateProgress = (videoId: string, progressPercent: number) => {
    setProgress(prev => ({
      ...prev,
      [videoId]: Math.max(0, Math.min(100, progressPercent))
    }));
  };

  const getProgress = (videoId: string) => progress[videoId] || 0;

  return { progress, updateProgress, getProgress };
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useLocalStorage<string[]>('bookmarks', []);

  const toggleBookmark = (topicId: string) => {
    setBookmarks(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const isBookmarked = (topicId: string) => bookmarks.includes(topicId);

  return { bookmarks, toggleBookmark, isBookmarked };
}

export function useNotes() {
  const [notes, setNotes] = useLocalStorage<Record<string, string>>('notes', {});

  const updateNote = (topicId: string, note: string) => {
    setNotes(prev => ({
      ...prev,
      [topicId]: note
    }));
  };

  const getNote = (topicId: string) => notes[topicId] || '';

  return { notes, updateNote, getNote };
}