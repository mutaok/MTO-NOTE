export type TabType = 'home' | 'notes' | 'tasks' | 'mindmap' | 'settings';

export type NotebookCategory = 
  | 'Tümü'
  | 'Genel'
  | 'Akademik'
  | 'Proje'
  | 'Günlük'
  | 'Toplantı'
  | 'Kod'
  | 'Fikirler';

export interface Note {
  id: string;
  title: string;
  content: string;
  category: NotebookCategory;
  tags: string[];
  pinned?: boolean;
  color?: string;
  createdAt: string;
  updatedAt: string;
}

export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
  priority: TaskPriority;
  category: string;
  createdAt: string;
}

export interface MindMapNode {
  id: string;
  label: string;
  parentId?: string | null;
  color?: string;
  notes?: string;
}
