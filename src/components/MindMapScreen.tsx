import React, { useState, useRef } from 'react';
import { 
  Network, 
  Plus, 
  Edit2, 
  Trash2, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  FolderPlus, 
  Check, 
  X,
  Share2
} from 'lucide-react';
import { MindMapNode } from '../types';

interface MindMapScreenProps {
  nodes: MindMapNode[];
  onAddNode: (label: string, parentId?: string | null, color?: string) => void;
  onUpdateNode: (id: string, updates: Partial<MindMapNode>) => void;
  onDeleteNode: (id: string) => void;
}

export const MindMapScreen: React.FC<MindMapScreenProps> = ({
  nodes,
  onAddNode,
  onUpdateNode,
  onDeleteNode,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('root');
  const [zoom, setZoom] = useState(1);
  const [isEditingLabel, setIsEditingLabel] = useState(false);
  const [editLabelText, setEditLabelText] = useState('');
  const [newChildText, setNewChildText] = useState('');
  const [isAddingChild, setIsAddingChild] = useState(false);

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

  // Helper to build hierarchy tree
  const rootNode = nodes.find((n) => !n.parentId) || nodes[0];

  const getChildren = (parentId: string) => {
    return nodes.filter((n) => n.parentId === parentId);
  };

  const handleStartEdit = () => {
    if (!selectedNode) return;
    setEditLabelText(selectedNode.label);
    setIsEditingLabel(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editLabelText.trim() || !selectedNode) return;
    onUpdateNode(selectedNode.id, { label: editLabelText.trim() });
    setIsEditingLabel(false);
  };

  const handleAddChild = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChildText.trim() || !selectedNode) return;
    const colors = ['#0284c7', '#0d9488', '#16a34a', '#7c3aed', '#ea580c', '#db2777'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    onAddNode(newChildText.trim(), selectedNode.id, randomColor);
    setNewChildText('');
    setIsAddingChild(false);
  };

  const handleDeleteCurrent = () => {
    if (!selectedNode || selectedNode.id === 'root') {
      alert('Kök düğüm silinemez.');
      return;
    }
    if (confirm(`"${selectedNode.label}" düğümünü ve alt dallarını silmek istiyor musunuz?`)) {
      onDeleteNode(selectedNode.id);
      setSelectedNodeId('root');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2.5">
            <Network className="text-purple-600 dark:text-purple-400" />
            Zihin Haritası
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Fikirlerinizi ağaç ve düğüm yapısıyla görselleştirin, dallar ekleyin
          </p>
        </div>

        {/* Controls Toolbar */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-1 shadow-xs">
            <button
              onClick={() => setZoom((z) => Math.min(z + 0.15, 1.6))}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
              title="Yakınlaştır"
            >
              <ZoomIn size={16} />
            </button>
            <span className="text-xs px-2 font-mono text-gray-500">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.max(z - 0.15, 0.6))}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
              title="Uzaklaştır"
            >
              <ZoomOut size={16} />
            </button>
            <button
              onClick={() => setZoom(1)}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 border-l border-gray-200 dark:border-gray-700 ml-1"
              title="Sıfırla"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Canvas + Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Mind Map Visualizer */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 min-h-[460px] overflow-auto relative shadow-sm flex flex-col justify-between">
          <div 
            className="transition-transform duration-200 origin-top-left py-4 px-2"
            style={{ transform: `scale(${zoom})` }}
          >
            {/* Hierarchical Visual Render */}
            <div className="space-y-8">
              {/* Root */}
              {rootNode && (
                <div className="flex flex-col items-center">
                  <div
                    onClick={() => setSelectedNodeId(rootNode.id)}
                    className={`px-5 py-3 rounded-2xl shadow-md cursor-pointer transition-all border-2 text-white font-bold text-center select-none ${
                      selectedNodeId === rootNode.id
                        ? 'ring-4 ring-sky-300 scale-105 border-white'
                        : 'border-transparent hover:scale-102'
                    }`}
                    style={{ backgroundColor: rootNode.color || '#0284c7' }}
                  >
                    <div className="text-base">{rootNode.label}</div>
                    <div className="text-[11px] font-normal opacity-90">Ana Merkez</div>
                  </div>

                  {/* Level 1 branches */}
                  {getChildren(rootNode.id).length > 0 && (
                    <div className="mt-8 flex flex-wrap justify-center gap-6 relative">
                      {getChildren(rootNode.id).map((branch) => {
                        const isSelected = selectedNodeId === branch.id;
                        const subChildren = getChildren(branch.id);
                        return (
                          <div key={branch.id} className="flex flex-col items-center space-y-4">
                            {/* Branch Card */}
                            <div
                              onClick={() => setSelectedNodeId(branch.id)}
                              className={`px-4 py-2.5 rounded-xl shadow-sm cursor-pointer transition-all border-2 text-white text-sm font-semibold select-none ${
                                isSelected
                                  ? 'ring-4 ring-purple-300 scale-105 border-white'
                                  : 'border-transparent hover:scale-102'
                              }`}
                              style={{ backgroundColor: branch.color || '#6366f1' }}
                            >
                              {branch.label}
                            </div>

                            {/* Level 2 Sub-branches */}
                            {subChildren.length > 0 && (
                              <div className="flex flex-col gap-2 pt-2 border-t-2 border-dashed border-gray-200 dark:border-gray-700">
                                {subChildren.map((sub) => {
                                  const isSubSelected = selectedNodeId === sub.id;
                                  return (
                                    <div
                                      key={sub.id}
                                      onClick={() => setSelectedNodeId(sub.id)}
                                      className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all border shadow-2xs ${
                                        isSubSelected
                                          ? 'bg-sky-600 text-white border-sky-600 ring-2 ring-sky-300'
                                          : 'bg-gray-50 dark:bg-gray-900/80 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:border-sky-400'
                                      }`}
                                    >
                                      • {sub.label}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="text-xs text-gray-400 dark:text-gray-500 pt-4 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-between">
            <span>Düğüm seçmek için üzerine tıklayın</span>
            <span>Toplam {nodes.length} düğüm</span>
          </div>
        </div>

        {/* Node Inspector & Action Box */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Share2 size={18} className="text-purple-600 dark:text-purple-400" />
                Düğüm Detayı
              </h2>
              {selectedNode && selectedNode.id !== 'root' && (
                <button
                  onClick={handleDeleteCurrent}
                  className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                  title="Düğümü Sil"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>

            {selectedNode ? (
              <div className="space-y-4">
                {/* Node Name */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-1">
                    Başlık / İsim
                  </label>
                  {isEditingLabel ? (
                    <form onSubmit={handleSaveEdit} className="flex gap-2">
                      <input
                        type="text"
                        value={editLabelText}
                        onChange={(e) => setEditLabelText(e.target.value)}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      />
                      <button
                        type="submit"
                        className="p-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700"
                      >
                        <Check size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingLabel(false)}
                        className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <X size={16} />
                      </button>
                    </form>
                  ) : (
                    <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200/80 dark:border-gray-700">
                      <span className="font-semibold text-sm text-gray-900 dark:text-white">
                        {selectedNode.label}
                      </span>
                      <button
                        onClick={handleStartEdit}
                        className="p-1 text-gray-400 hover:text-sky-600 cursor-pointer"
                        title="İsmi Düzenle"
                      >
                        <Edit2 size={14} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Color change */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-2">
                    Düğüm Rengi
                  </label>
                  <div className="flex items-center gap-2">
                    {['#0284c7', '#0d9488', '#16a34a', '#7c3aed', '#ea580c', '#db2777'].map((col) => (
                      <button
                        key={col}
                        onClick={() => onUpdateNode(selectedNode.id, { color: col })}
                        className={`w-6 h-6 rounded-full transition-transform cursor-pointer ${
                          selectedNode.color === col ? 'scale-125 ring-2 ring-offset-2 ring-sky-500' : ''
                        }`}
                        style={{ backgroundColor: col }}
                      />
                    ))}
                  </div>
                </div>

                {/* Add Child Node Form */}
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      Bu Düğüme Alt Dal Ekle
                    </span>
                  </div>

                  {isAddingChild ? (
                    <form onSubmit={handleAddChild} className="space-y-2">
                      <input
                        type="text"
                        placeholder="Alt dal adı yazın..."
                        value={newChildText}
                        onChange={(e) => setNewChildText(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm focus:ring-2 focus:ring-sky-500 focus:outline-none"
                        autoFocus
                      />
                      <div className="flex gap-2 justify-end">
                        <button
                          type="button"
                          onClick={() => setIsAddingChild(false)}
                          className="px-3 py-1 rounded-lg text-xs text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Vazgeç
                        </button>
                        <button
                          type="submit"
                          className="px-3 py-1 rounded-lg text-xs bg-purple-600 hover:bg-purple-700 text-white font-medium"
                        >
                          Dalı Ekle
                        </button>
                      </div>
                    </form>
                  ) : (
                    <button
                      onClick={() => setIsAddingChild(true)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-purple-400 dark:border-purple-600 text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/30 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Plus size={14} />
                      Yeni Alt Düğüm Ekle
                    </button>
                  )}
                </div>

                {/* Sub Nodes List */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                    Mevcut Alt Dallar ({getChildren(selectedNode.id).length})
                  </span>
                  <div className="max-h-36 overflow-y-auto space-y-1">
                    {getChildren(selectedNode.id).length === 0 ? (
                      <p className="text-xs text-gray-400 py-2">Alt dal bulunmuyor.</p>
                    ) : (
                      getChildren(selectedNode.id).map((child) => (
                        <div
                          key={child.id}
                          onClick={() => setSelectedNodeId(child.id)}
                          className="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-900/60 text-xs cursor-pointer hover:bg-sky-50 dark:hover:bg-sky-950/40 text-gray-700 dark:text-gray-300"
                        >
                          <span>{child.label}</span>
                          <span className="text-[10px] text-gray-400">Seç</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-400">Bir düğüm seçin.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
