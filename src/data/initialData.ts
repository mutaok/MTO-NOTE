import { Note, Task, MindMapNode } from '../types';

export const INITIAL_NOTES: Note[] = [
  {
    id: 'note-1',
    title: 'NoteFlow Kullanım Kılavuzu',
    content: 'NoteFlow ile notlarınızı kategorize edebilir, günlük görevlerinizi takip edebilir ve zihin haritası ile fikirlerinizi görselleştirebilirsiniz.',
    category: 'Genel',
    tags: ['rehber', 'başlangıç'],
    pinned: true,
    color: '#38bdf8',
    createdAt: '2026-09-20 10:30',
    updatedAt: '2026-09-21 09:15',
  },
  {
    id: 'note-2',
    title: 'Yapay Zeka ve Veri Yapıları Dersi',
    content: 'Graf teorisi, derinlik öncelikli arama (DFS) ve genişlik öncelikli arama (BFS) algoritmaları üzerinde çalışıldı. Haftaya vize ödevi teslim edilecek.',
    category: 'Akademik',
    tags: ['üniversite', 'algoritma'],
    pinned: true,
    color: '#818cf8',
    createdAt: '2026-09-18 14:00',
    updatedAt: '2026-09-19 16:20',
  },
  {
    id: 'note-3',
    title: 'Mobil & Web Senkronizasyon Mimarisi',
    content: 'Kullanıcı verilerini yerel depolamada saklayıp, dışa aktarma (JSON backup) özelliği ile yedekleme ve cihazlar arası veri transferini sağlama.',
    category: 'Proje',
    tags: ['mimari', 'react', 'mobil'],
    pinned: false,
    color: '#34d399',
    createdAt: '2026-09-17 11:20',
    updatedAt: '2026-09-17 11:20',
  },
  {
    id: 'note-4',
    title: 'Haftalık Sprint Değerlendirmesi',
    content: 'Tasarım revizyonları tamamlandı. Görev listesinde önceliklendirme ve filtreleme filtreleri eklendi. Test kullanıcılarından geri bildirim toplanacak.',
    category: 'Toplantı',
    tags: ['ekip', 'sprint'],
    pinned: false,
    color: '#fbbf24',
    createdAt: '2026-09-16 15:45',
    updatedAt: '2026-09-16 17:00',
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'task-1',
    title: 'NoteFlow web arayüzünü kontrol et ve test et',
    completed: true,
    dueDate: '2026-09-21',
    priority: 'high',
    category: 'Proje',
    createdAt: '2026-09-20 09:00',
  },
  {
    id: 'task-2',
    title: 'Zihin haritası düğümlerini düzenle',
    completed: false,
    dueDate: '2026-09-22',
    priority: 'medium',
    category: 'Fikirler',
    createdAt: '2026-09-21 08:30',
  },
  {
    id: 'task-3',
    title: 'Ders notlarını tekrar et ve özet çıkar',
    completed: false,
    dueDate: '2026-09-23',
    priority: 'high',
    category: 'Akademik',
    createdAt: '2026-09-21 09:00',
  },
  {
    id: 'task-4',
    title: 'Haftalık yedekleme dosyasını dışa aktar',
    completed: false,
    dueDate: '2026-09-25',
    priority: 'low',
    category: 'Genel',
    createdAt: '2026-09-21 09:10',
  }
];

export const INITIAL_MIND_MAP_NODES: MindMapNode[] = [
  { id: 'root', label: '🧠 NoteFlow Merkezi', parentId: null, color: '#0284c7' },
  { id: 'node-notlar', label: '📝 Not Defterleri', parentId: 'root', color: '#0d9488' },
  { id: 'node-gorevler', label: '✅ Görev Yönetimi', parentId: 'root', color: '#16a34a' },
  { id: 'node-projeler', label: '🚀 Projeler & Fikirler', parentId: 'root', color: '#7c3aed' },
  { id: 'node-akademik', label: '📚 Dersler & Sınavlar', parentId: 'node-notlar', color: '#0284c7' },
  { id: 'node-gunluk', label: '📔 Günlük Düşünceler', parentId: 'node-notlar', color: '#0d9488' },
  { id: 'node-oncelikli', label: '🔥 Yüksek Öncelikli İşler', parentId: 'node-gorevler', color: '#ea580c' },
  { id: 'node-rutin', label: '🔁 Günlük Rutinler', parentId: 'node-gorevler', color: '#16a34a' },
  { id: 'node-web', label: '🌐 Web Uygulaması', parentId: 'node-projeler', color: '#6366f1' },
  { id: 'node-yedekleme', label: '💾 Güvenli JSON Yedek', parentId: 'node-projeler', color: '#8b5cf6' },
];
