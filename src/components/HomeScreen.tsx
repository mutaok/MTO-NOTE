import React from 'react';
import { 
  FileText, 
  CheckSquare, 
  Network, 
  ArrowRight, 
  Plus, 
  Clock, 
  CheckCircle2, 
  BookOpen, 
  Sparkles 
} from 'lucide-react';
import { Note, Task, TabType } from '../types';

interface HomeScreenProps {
  notes: Note[];
  tasks: Task[];
  onNavigateTab: (tab: TabType) => void;
  onOpenNewNote: () => void;
  onOpenNewTask: () => void;
  onToggleTask: (taskId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  notes,
  tasks,
  onNavigateTab,
  onOpenNewNote,
  onOpenNewTask,
  onToggleTask,
}) => {
  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);
  const recentNotes = notes.slice(0, 3);
  const urgentTasks = activeTasks.slice(0, 4);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center py-6 sm:py-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 dark:bg-sky-950/70 dark:text-sky-300 text-xs font-semibold mb-2">
          <Sparkles size={14} />
          <span>NoteFlow v1.0 Çalışma Alanı</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          NoteFlow
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-normal">
          Notlarınız, görevleriniz ve zihin haritalarınız tek bir yerde
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          onClick={() => onNavigateTab('notes')}
          className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/80 shadow-sm hover:border-sky-400 dark:hover:border-sky-500 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Toplam Not</span>
            <div className="p-2 rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400">
              <FileText size={18} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {notes.length}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
            Görüntülemek için tıkla <ArrowRight size={12} />
          </p>
        </div>

        <div 
          onClick={() => onNavigateTab('tasks')}
          className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/80 shadow-sm hover:border-amber-400 dark:hover:border-amber-500 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Aktif Görev</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
              <Clock size={18} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {activeTasks.length}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
            Tamamlanması gerekenler <ArrowRight size={12} />
          </p>
        </div>

        <div 
          onClick={() => onNavigateTab('tasks')}
          className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/80 shadow-sm hover:border-emerald-400 dark:hover:border-emerald-500 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Tamamlanan</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            {completedTasks.length}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
            Toplam biten görevler <ArrowRight size={12} />
          </p>
        </div>

        <div 
          onClick={() => onNavigateTab('mindmap')}
          className="p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/80 shadow-sm hover:border-purple-400 dark:hover:border-purple-500 cursor-pointer transition-all"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Zihin Haritası</span>
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
              <Network size={18} />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Aktif
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1">
            Fikirleri bağla <ArrowRight size={12} />
          </p>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <button
          id="home-create-note-btn"
          onClick={onOpenNewNote}
          className="flex items-center justify-between p-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white shadow-sm transition-all text-left group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-sky-500/80 text-white">
              <Plus size={20} />
            </div>
            <div>
              <div className="font-semibold text-base">Yeni Not Oluştur</div>
              <div className="text-xs text-sky-100">Kategori, etiket ve detaylar ile</div>
            </div>
          </div>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>

        <button
          id="home-create-task-btn"
          onClick={onOpenNewTask}
          className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white shadow-sm transition-all text-left group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <CheckSquare size={20} />
            </div>
            <div>
              <div className="font-semibold text-base">Yeni Görev Ekle</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Son teslim tarihi ve öncelik</div>
            </div>
          </div>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-gray-400" />
        </button>

        <button
          id="home-open-mindmap-btn"
          onClick={() => onNavigateTab('mindmap')}
          className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white shadow-sm transition-all text-left group cursor-pointer sm:col-span-2 lg:col-span-1"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
              <Network size={20} />
            </div>
            <div>
              <div className="font-semibold text-base">Zihin Haritasını Aç</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Düğümleri bağla ve görselleştir</div>
            </div>
          </div>
          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-gray-400" />
        </button>
      </div>

      {/* Two Column Layout: Recent Notes & Urgent Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Notes */}
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen size={20} className="text-sky-600 dark:text-sky-400" />
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Son Notlar</h2>
            </div>
            <button
              onClick={() => onNavigateTab('notes')}
              className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              Tümünü Gör ({notes.length}) <ArrowRight size={12} />
            </button>
          </div>

          <div className="space-y-3">
            {recentNotes.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 py-4 text-center">
                Henüz kayıtlı bir not bulunmuyor.
              </p>
            ) : (
              recentNotes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => onNavigateTab('notes')}
                  className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200/70 dark:border-gray-700/60 hover:border-sky-300 dark:hover:border-sky-600 cursor-pointer transition-all"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-sm text-gray-900 dark:text-white truncate">
                      {note.title}
                    </h3>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 font-medium whitespace-nowrap">
                      {note.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                    {note.content}
                  </p>
                  <div className="mt-2 text-[10px] text-gray-400 dark:text-gray-500">
                    {note.updatedAt}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Urgent / Pending Tasks */}
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckSquare size={20} className="text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Aktif Görevler</h2>
            </div>
            <button
              onClick={() => onNavigateTab('tasks')}
              className="text-xs font-semibold text-sky-600 dark:text-sky-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              Görevler Sayfası ({activeTasks.length}) <ArrowRight size={12} />
            </button>
          </div>

          <div className="space-y-2.5">
            {urgentTasks.length === 0 ? (
              <div className="text-center py-6 text-sm text-gray-500 dark:text-gray-400">
                <CheckCircle2 size={32} className="mx-auto text-emerald-500 mb-2 opacity-80" />
                Tüm görevler tamamlandı! Harika iş.
              </div>
            ) : (
              urgentTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200/70 dark:border-gray-700/60 group hover:bg-white dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      onClick={() => onToggleTask(task.id)}
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all cursor-pointer ${
                        task.completed
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : 'border-gray-400 dark:border-gray-500 hover:border-emerald-500'
                      }`}
                    >
                      {task.completed && <CheckCircle2 size={14} />}
                    </button>
                    <div className="min-w-0">
                      <span className={`text-sm font-medium truncate block ${
                        task.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-gray-200'
                      }`}>
                        {task.title}
                      </span>
                      {task.dueDate && (
                        <span className="text-[11px] text-gray-400 dark:text-gray-500">
                          Bitiş: {task.dueDate}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                    task.priority === 'high' 
                      ? 'bg-red-100 text-red-700 dark:bg-red-950/80 dark:text-red-300'
                      : task.priority === 'medium'
                      ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                  }`}>
                    {task.priority === 'high' ? 'Yüksek' : task.priority === 'medium' ? 'Orta' : 'Düşük'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
