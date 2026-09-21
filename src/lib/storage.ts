import { Note, Task, MindMapNode } from '../types';
import { INITIAL_NOTES, INITIAL_TASKS, INITIAL_MIND_MAP_NODES } from '../data/initialData';

const NOTES_KEY = 'noteflow_notes_v1';
const TASKS_KEY = 'noteflow_tasks_v1';
const MINDMAP_KEY = 'noteflow_mindmap_v1';
const THEME_KEY = 'noteflow_theme_v1';

export const storage = {
  getNotes: (): Note[] => {
    try {
      const data = localStorage.getItem(NOTES_KEY);
      if (data) return JSON.parse(data);
    } catch {
      // Fallback
    }
    return INITIAL_NOTES;
  },

  saveNotes: (notes: Note[]): void => {
    try {
      localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    } catch (e) {
      console.error('Notes save error:', e);
    }
  },

  getTasks: (): Task[] => {
    try {
      const data = localStorage.getItem(TASKS_KEY);
      if (data) return JSON.parse(data);
    } catch {
      // Fallback
    }
    return INITIAL_TASKS;
  },

  saveTasks: (tasks: Task[]): void => {
    try {
      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error('Tasks save error:', e);
    }
  },

  getMindMapNodes: (): MindMapNode[] => {
    try {
      const data = localStorage.getItem(MINDMAP_KEY);
      if (data) return JSON.parse(data);
    } catch {
      // Fallback
    }
    return INITIAL_MIND_MAP_NODES;
  },

  saveMindMapNodes: (nodes: MindMapNode[]): void => {
    try {
      localStorage.setItem(MINDMAP_KEY, JSON.stringify(nodes));
    } catch (e) {
      console.error('MindMap save error:', e);
    }
  },

  getDarkMode: (): boolean => {
    try {
      const data = localStorage.getItem(THEME_KEY);
      if (data !== null) return data === 'dark';
      return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    } catch {
      return false;
    }
  },

  saveDarkMode: (isDark: boolean): void => {
    try {
      localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.error('Theme save error:', e);
    }
  },

  exportBackup: (): void => {
    const backupData = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      notes: storage.getNotes(),
      tasks: storage.getTasks(),
      mindMapNodes: storage.getMindMapNodes(),
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `noteflow-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  resetDefaults: (): { notes: Note[]; tasks: Task[]; mindMapNodes: MindMapNode[] } => {
    localStorage.removeItem(NOTES_KEY);
    localStorage.removeItem(TASKS_KEY);
    localStorage.removeItem(MINDMAP_KEY);
    return {
      notes: INITIAL_NOTES,
      tasks: INITIAL_TASKS,
      mindMapNodes: INITIAL_MIND_MAP_NODES,
    };
  }
};
