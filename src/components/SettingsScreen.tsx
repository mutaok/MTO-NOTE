import React, { useState, useRef } from 'react';
import { 
  Moon, 
  Sun, 
  Bell, 
  Download, 
  Upload, 
  RotateCcw, 
  Shield, 
  FileCheck, 
  Info, 
  User, 
  Globe,
  Database,
  Check
} from 'lucide-react';
import { storage } from '../lib/storage';

interface SettingsScreenProps {
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  onResetData: () => void;
  onDataImported: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  isDark,
  setIsDark,
  onResetData,
  onDataImported,
}) => {
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState<'tr' | 'en'>('tr');
  const [showExportSuccess, setShowExportSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    storage.exportBackup();
    setShowExportSuccess(true);
    setTimeout(() => setShowExportSuccess(false), 3000);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json.notes) storage.saveNotes(json.notes);
        if (json.tasks) storage.saveTasks(json.tasks);
        if (json.mindMapNodes) storage.saveMindMapNodes(json.mindMapNodes);
        onDataImported();
        alert('Yedek başarıyla geri yüklendi!');
      } catch (err) {
        alert('Geçersiz yedekleme dosyası formatı!');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleReset = () => {
    if (confirm('Tüm notlar, görevler ve zihin haritası varsayılan örnek verilere sıfırlanacak. Emin misiniz?')) {
      onResetData();
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in pb-12">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Ayarlar
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Uygulama tercihlerinizi, temanızı ve yedekleme ayarlarınızı yönetin
        </p>
      </div>

      {/* Görünüm */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">
          Görünüm
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700/60 shadow-xs">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400">
                {isDark ? <Moon size={20} /> : <Sun size={20} />}
              </div>
              <div>
                <div className="font-semibold text-sm text-gray-900 dark:text-white">Karanlık Mod</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Uygulamayı koyu temada kullan</div>
              </div>
            </div>
            <button
              onClick={() => setIsDark(!isDark)}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                isDark ? 'bg-sky-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform transform ${
                  isDark ? 'translate-x-6' : 'translate-x-1'
                } top-0.5 absolute shadow-xs`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Bildirimler */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">
          Bildirimler
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Bell size={20} />
            </div>
            <div>
              <div className="font-semibold text-sm text-gray-900 dark:text-white">Hatırlatıcı Bildirimleri</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Görev son tarihleri ve özetler</div>
            </div>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
              notifications ? 'bg-emerald-600' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform transform ${
                notifications ? 'translate-x-6' : 'translate-x-1'
              } top-0.5 absolute shadow-xs`}
            />
          </button>
        </div>
      </div>

      {/* Veri & Yedekleme */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">
          Veri & Yedekleme
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700/60 shadow-xs">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                <Download size={20} />
              </div>
              <div>
                <div className="font-semibold text-sm text-gray-900 dark:text-white">JSON Yedek İndir</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Notlarınızı ve görevlerinizi cihazınıza kaydedin</div>
              </div>
            </div>
            <button
              onClick={handleExport}
              className="px-3.5 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-xs font-semibold text-gray-700 dark:text-gray-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {showExportSuccess ? (
                <>
                  <Check size={14} className="text-emerald-500" />
                  <span>İndirildi!</span>
                </>
              ) : (
                <>
                  <Download size={14} />
                  <span>Dışa Aktar</span>
                </>
              )}
            </button>
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                <Upload size={20} />
              </div>
              <div>
                <div className="font-semibold text-sm text-gray-900 dark:text-white">Yedek Dosyası Yükle</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Önceki yedek JSON dosyasını içeri aktarın</div>
              </div>
            </div>
            <div>
              <input
                type="file"
                ref={fileInputRef}
                accept=".json"
                onChange={handleImportFile}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-xs font-semibold text-gray-700 dark:text-gray-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Upload size={14} />
                <span>İçe Aktar</span>
              </button>
            </div>
          </div>

          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
                <RotateCcw size={20} />
              </div>
              <div>
                <div className="font-semibold text-sm text-gray-900 dark:text-white">Örnek Verileri Sıfırla</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Uygulamayı başlangıç örnek notlarına döndürün</div>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="px-3.5 py-1.5 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-xs font-semibold border border-rose-200 dark:border-rose-900/50 transition-colors cursor-pointer"
            >
              Sıfırla
            </button>
          </div>
        </div>
      </div>

      {/* Hakkında & Bilgi */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider ml-1">
          Hakkında
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700/60 shadow-xs">
          <div className="p-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2.5 text-gray-700 dark:text-gray-300">
              <Globe size={18} className="text-gray-400" />
              <span>Uygulama Adı</span>
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">NoteFlow</span>
          </div>

          <div className="p-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2.5 text-gray-700 dark:text-gray-300">
              <Info size={18} className="text-gray-400" />
              <span>Sürüm</span>
            </div>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              1.0.0 (Web Edition)
            </span>
          </div>

          <div className="p-4 flex items-center justify-between text-sm">
            <div className="flex items-center gap-2.5 text-gray-700 dark:text-gray-300">
              <Shield size={18} className="text-gray-400" />
              <span>Veri Gizliliği</span>
            </div>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              Tamamen Yerel Depolama (Tarayıcı İçi)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
