import React, { useState, useEffect } from 'react';
import { TabType, Note, Task, MindMapNode } from './types';
import { storage } from './lib/storage';
import { Navbar } from './components/Navbar';
import { HomeScreen } from './components/HomeScreen';
import { NotesScreen } from './components/NotesScreen';
import { TasksScreen } from './components/TasksScreen';
import { MindMapScreen } from './components/MindMapScreen';
import { SettingsScreen } from './components/SettingsScreen';

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isDark, setIsDark] = useState<boolean>(() => storage.getDarkMode());

  // Data states
  const [notes, setNotes] = useState<Note[]>(() => storage.getNotes());
  const [tasks, setTasks] = useState<Task[]>(() => storage.getTasks());
  const [mindMapNodes, setMindMapNodes] = useState<MindMapNode[]>(() => storage.getMindMapNodes());

  // Dark mode effect
  useEffect(() => {
    storage.saveDarkMode(isDark);
  }, [isDark]);

  // Sync to storage
  const handleAddNote = (newNoteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const dateStr = new Date().toISOString().slice(0, 16).replace('T', ' ');
    const newNote: Note = {
      ...newNoteData,
      id: `note-${Date.now()}`,
      createdAt: dateStr,
      updatedAt: dateStr,
    };
    const updated = [newNote, ...notes];
    setNotes(updated);
    storage.saveNotes(updated);
  };

  const handleUpdateNote = (id: string, updates: Partial<Note>) => {
    const updated = notes.map((note) =>
      note.id === id ? { ...note, ...updates } : note
    );
    setNotes(updated);
    storage.saveNotes(updated);
  };

  const handleDeleteNote = (id: string) => {
    const updated = notes.filter((note) => note.id !== id);
    setNotes(updated);
    storage.saveNotes(updated);
  };

  const handleAddTask = (newTaskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...newTaskData,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
    };
    const updated = [newTask, ...tasks];
    setTasks(updated);
    storage.saveTasks(updated);
  };

  const handleToggleTask = (id: string) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
    storage.saveTasks(updated);
  };

  const handleDeleteTask = (id: string) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    storage.saveTasks(updated);
  };

  const handleAddMindMapNode = (label: string, parentId?: string | null, color?: string) => {
    const newNode: MindMapNode = {
      id: `node-${Date.now()}`,
      label,
      parentId: parentId || null,
      color: color || '#0284c7',
    };
    const updated = [...mindMapNodes, newNode];
    setMindMapNodes(updated);
    storage.saveMindMapNodes(updated);
  };

  const handleUpdateMindMapNode = (id: string, updates: Partial<MindMapNode>) => {
    const updated = mindMapNodes.map((node) =>
      node.id === id ? { ...node, ...updates } : node
    );
    setMindMapNodes(updated);
    storage.saveMindMapNodes(updated);
  };

  const handleDeleteMindMapNode = (id: string) => {
    // Collect all descendant ids recursively
    const idsToDelete = new Set<string>([id]);
    let added = true;
    while (added) {
      added = false;
      mindMapNodes.forEach((node) => {
        if (node.parentId && idsToDelete.has(node.parentId) && !idsToDelete.has(node.id)) {
          idsToDelete.add(node.id);
          added = true;
        }
      });
    }
    const updated = mindMapNodes.filter((node) => !idsToDelete.has(node.id));
    setMindMapNodes(updated);
    storage.saveMindMapNodes(updated);
  };

  const handleResetData = () => {
    const defaults = storage.resetDefaults();
    setNotes(defaults.notes);
    setTasks(defaults.tasks);
    setMindMapNodes(defaults.mindMapNodes);
  };

  const handleDataImported = () => {
    setNotes(storage.getNotes());
    setTasks(storage.getTasks());
    setMindMapNodes(storage.getMindMapNodes());
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col transition-colors duration-200">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        setIsDark={setIsDark}
        onQuickNewNote={() => setActiveTab('notes')}
        notesCount={notes.length}
        activeTasksCount={tasks.filter((t) => !t.completed).length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'home' && (
          <HomeScreen
            notes={notes}
            tasks={tasks}
            onNavigateTab={setActiveTab}
            onOpenNewNote={() => setActiveTab('notes')}
            onOpenNewTask={() => setActiveTab('tasks')}
            onToggleTask={handleToggleTask}
          />
        )}

        {activeTab === 'notes' && (
          <NotesScreen
            notes={notes}
            onAddNote={handleAddNote}
            onUpdateNote={handleUpdateNote}
            onDeleteNote={handleDeleteNote}
          />
        )}

        {activeTab === 'tasks' && (
          <TasksScreen
            tasks={tasks}
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        )}

        {activeTab === 'mindmap' && (
          <MindMapScreen
            nodes={mindMapNodes}
            onAddNode={handleAddMindMapNode}
            onUpdateNode={handleUpdateMindMapNode}
            onDeleteNode={handleDeleteMindMapNode}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsScreen
            isDark={isDark}
            setIsDark={setIsDark}
            onResetData={handleResetData}
            onDataImported={handleDataImported}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800/80 bg-white dark:bg-gray-900 py-6 px-4 text-center text-xs text-gray-500 dark:text-gray-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>NoteFlow &copy; {new Date().getFullYear()} • Akıllı Not Defteri ve Zihin Haritası</span>
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveTab('notes')} className="hover:underline cursor-pointer">Notlar</button>
            <button onClick={() => setActiveTab('tasks')} className="hover:underline cursor-pointer">Görevler</button>
            <button onClick={() => setActiveTab('mindmap')} className="hover:underline cursor-pointer">Zihin Haritası</button>
            <button onClick={() => setActiveTab('settings')} className="hover:underline cursor-pointer">Ayarlar</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
export default App;
