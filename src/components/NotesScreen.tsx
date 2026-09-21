import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Pin, 
  Trash2, 
  Edit3, 
  Tag, 
  BookOpen, 
  X, 
  Check, 
  Folder
} from 'lucide-react';
import { Note, NotebookCategory } from '../types';

const CATEGORIES: NotebookCategory[] = [
  'Tümü',
  'Genel',
  'Akademik',
  'Proje',
  'Günlük',
  'Toplantı',
  'Kod',
  'Fikirler',
];

interface NotesScreenProps {
  notes: Note[];
  onAddNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdateNote: (id: string, updates: Partial<Note>) => void;
  onDeleteNote: (id: string) => void;
}

export const NotesScreen: React.FC<NotesScreenProps> = ({
  notes,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<NotebookCategory>('Tümü');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formCategory, setFormCategory] = useState<NotebookCategory>('Genel');
  const [formTags, setFormTags] = useState('');
  const [formColor, setFormColor] = useState('#0a7ea4');

  const openNewNoteModal = () => {
    setEditingNote(null);
    setFormTitle('');
    setFormContent('');
    setFormCategory('Genel');
    setFormTags('');
    setFormColor('#0a7ea4');
    setIsModalOpen(true);
  };

  const openEditNoteModal = (note: Note) => {
    setEditingNote(note);
    setFormTitle(note.title);
    setFormContent(note.content);
    setFormCategory(note.category);
    setFormTags(note.tags.join(', '));
    setFormColor(note.color || '#0a7ea4');
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const tagsArray = formTags
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter((t) => t.length > 0);

    if (editingNote) {
      onUpdateNote(editingNote.id, {
        title: formTitle.trim(),
        content: formContent.trim(),
        category: formCategory,
        tags: tagsArray,
        color: formColor,
        updatedAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      });
    } else {
      onAddNote({
        title: formTitle.trim(),
        content: formContent.trim(),
        category: formCategory,
        tags: tagsArray,
        color: formColor,
        pinned: false,
      });
    }
    setIsModalOpen(false);
  };

  const filteredNotes = notes.filter((note) => {
    const matchesCategory = selectedCategory === 'Tümü' || note.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query) ||
      note.tags.some((t) => t.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  // Sort pinned notes to top
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Notlarım
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {notes.length} not bulundu • Defterlerinize ve etiketlerinize göre filtreleyin
          </p>
        </div>

        <button
          id="notes-add-btn"
          onClick={openNewNoteModal}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-medium shadow-sm transition-colors cursor-pointer"
        >
          <Plus size={18} />
          <span>Yeni Not Ekle</span>
        </button>
      </div>

      {/* Search and Category Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            id="notes-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Not başlığı, içerik veya etiket ara..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === category
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Grid or Empty State */}
      {sortedNotes.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
          <div className="w-16 h-16 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 flex items-center justify-center mx-auto mb-4 text-3xl">
            📝
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
            {notes.length === 0 ? 'Henüz Not Yok' : 'Sonuç Bulunamadı'}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-6">
            {notes.length === 0 
              ? 'İlk notunuzu oluşturmak için aşağıdaki butona tıklayın.' 
              : 'Arama kriterinize uygun not bulunamadı. Filtreleri temizleyebilirsiniz.'}
          </p>
          <button
            onClick={openNewNoteModal}
            className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-medium text-sm transition-colors cursor-pointer"
          >
            Not Ekle
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedNotes.map((note) => (
            <div
              key={note.id}
              className={`p-5 rounded-2xl bg-white dark:bg-gray-800 border transition-all flex flex-col justify-between group shadow-sm hover:shadow-md ${
                note.pinned 
                  ? 'border-sky-400/80 dark:border-sky-500/80 ring-1 ring-sky-400/30' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span 
                      className="w-2.5 h-2.5 rounded-full" 
                      style={{ backgroundColor: note.color || '#0a7ea4' }} 
                    />
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                      {note.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onUpdateNote(note.id, { pinned: !note.pinned })}
                      title={note.pinned ? 'Sabitlemeyi kaldır' : 'Başa sabitle'}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        note.pinned
                          ? 'text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60'
                          : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                      }`}
                    >
                      <Pin size={14} className={note.pinned ? 'fill-sky-600 dark:fill-sky-400' : ''} />
                    </button>
                    <button
                      onClick={() => openEditNoteModal(note)}
                      title="Düzenle"
                      className="p-1.5 rounded-lg text-gray-400 hover:text-sky-600 dark:hover:text-sky-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Bu notu silmek istediğinize emin misiniz?')) {
                          onDeleteNote(note.id);
                        }
                      }}
                      title="Sil"
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-base text-gray-900 dark:text-white mb-2 leading-snug">
                  {note.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line line-clamp-4 leading-relaxed">
                  {note.content}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {note.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700/60 text-gray-600 dark:text-gray-400 text-[11px]"
                    >
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-[11px] whitespace-nowrap ml-2">
                  {note.updatedAt.slice(0, 10)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Note Creation / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl border border-gray-200 dark:border-gray-700 space-y-4 animate-scale-in">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <BookOpen size={20} className="text-sky-600 dark:text-sky-400" />
                {editingNote ? 'Notu Düzenle' : 'Yeni Not Oluştur'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Başlık *
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Örn: Hafta Sonu Planları veya Proje Özeti"
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Defter / Kategori
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as NotebookCategory)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                  >
                    {CATEGORIES.filter((c) => c !== 'Tümü').map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Renk Vurgusu
                  </label>
                  <div className="flex items-center gap-2 pt-1">
                    {['#0a7ea4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'].map((c) => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => setFormColor(c)}
                        className={`w-6 h-6 rounded-full transition-transform cursor-pointer ${
                          formColor === c ? 'scale-125 ring-2 ring-offset-2 ring-sky-500' : ''
                        }`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  İçerik
                </label>
                <textarea
                  rows={5}
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="Notunuzun detaylarını buraya yazın..."
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Etiketler (Virgülle ayırın)
                </label>
                <input
                  type="text"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  placeholder="Örn: fikir, react, toplantı"
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium transition-colors cursor-pointer"
                >
                  {editingNote ? 'Değişiklikleri Kaydet' : 'Notu Oluştur'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
