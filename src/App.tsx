/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ViewMode, FileItem, ExternalLink, ActiveTransfer, ClientNode } from './types';
import {
  INITIAL_FILES,
  INITIAL_TRASH_ITEMS,
  INITIAL_SHARED_VAULTS,
  INITIAL_EXTERNAL_LINKS,
  INITIAL_TRANSFERS,
  INITIAL_CLIENT_NODES
} from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { OverviewView } from './components/views/OverviewView';
import { AllFilesView } from './components/views/AllFilesView';
import { SharedVaultsView } from './components/views/SharedVaultsView';
import { SecurityAuditView } from './components/views/SecurityAuditView';
import { RecentStarredView } from './components/views/RecentStarredView';
import { TrashView } from './components/views/TrashView';
import { SettingsView } from './components/views/SettingsView';
import { CreateShareDrawer } from './components/modals/CreateShareDrawer';
import { UploadModal } from './components/modals/UploadModal';
import { DeduplicationModal } from './components/modals/DeduplicationModal';
import { EmergencyZeroOutModal } from './components/modals/EmergencyZeroOutModal';
import { UpgradeModal } from './components/modals/UpgradeModal';
import { CommandPalette } from './components/CommandPalette';
import { ToastContainer, ToastMessage } from './components/Toast';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('overview');
  const [files, setFiles] = useState<FileItem[]>(INITIAL_FILES);
  const [trashItems, setTrashItems] = useState<FileItem[]>(INITIAL_TRASH_ITEMS);
  const [sharedVaults] = useState(INITIAL_SHARED_VAULTS);
  const [externalLinks, setExternalLinks] = useState<ExternalLink[]>(INITIAL_EXTERNAL_LINKS);
  const [transfers, setTransfers] = useState<ActiveTransfer[]>(INITIAL_TRANSFERS);
  const [clientNodes, setClientNodes] = useState<ClientNode[]>(INITIAL_CLIENT_NODES);
  
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(INITIAL_FILES[2]); // hero_cinematic_grade_4k.prores
  const [storageUsedTB, setStorageUsedTB] = useState<number>(3.42);
  const [storageTotalTB, setStorageTotalTB] = useState<number>(5.0);
  const [viewLayout, setViewLayout] = useState<'grid' | 'list'>('grid');

  // Modals state
  const [isShareDrawerOpen, setIsShareDrawerOpen] = useState(false);
  const [shareTargetName, setShareTargetName] = useState<string>('Project_Titan_DueDiligence_2025');
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isDeduplicationOpen, setIsDeduplicationOpen] = useState(false);
  const [isZeroOutOpen, setIsZeroOutOpen] = useState(false);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Toasts state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, message?: string, type: ToastMessage['type'] = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Real browser download simulation
  const handleDownloadFile = (file: FileItem) => {
    try {
      const dummyContent = `Vaulta Encrypted Object\nFile: ${file.name}\nPath: ${file.path}\nSHA-256: ${file.sha256}\nSecurity Tier: ${file.securityTier}\nSize: ${file.size}\nEncrypted in transit with AES-256-GCM zero-knowledge envelope.`;
      const blob = new Blob([dummyContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name.endsWith('.txt') ? file.name : `${file.name}.vaulta_pkg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      addToast('Download initiated', `Decrypted and streaming ${file.name} directly to browser.`);
    } catch {
      addToast('Download initiated', `Fetching stream for ${file.name}`);
    }
  };

  const handleCopy = (text: string, label: string = 'Link') => {
    navigator.clipboard.writeText(text);
    addToast(`${label} copied`, `Copied to clipboard: ${text}`);
  };

  // Delete files to trash
  const handleDeleteFiles = (ids: string[]) => {
    const toTrash = files.filter(f => ids.includes(f.id));
    setFiles(prev => prev.filter(f => !ids.includes(f.id)));
    setTrashItems(prev => [
      ...toTrash.map(item => ({ ...item, isDeleted: true, deletedDaysLeft: 30 })),
      ...prev
    ]);
    addToast('Moved to Trash', `${toTrash.length} file(s) moved to 30-day retention shredder.`, 'warning');
  };

  // Restore item from trash
  const handleRestoreItem = (id: string) => {
    const item = trashItems.find(t => t.id === id);
    if (!item) return;
    setTrashItems(prev => prev.filter(t => t.id !== id));
    setFiles(prev => [{ ...item, isDeleted: false }, ...prev]);
    addToast('File restored', `${item.name} has been restored to workspace.`);
  };

  // Shred item permanently
  const handleShredItem = (id: string) => {
    const item = trashItems.find(t => t.id === id);
    setTrashItems(prev => prev.filter(t => t.id !== id));
    addToast('Object shredded', `${item?.name || 'File'} permanently purged via multi-pass zeroing.`);
  };

  const handleEmptyAllTrash = () => {
    const count = trashItems.length;
    setTrashItems([]);
    addToast('Trash emptied', `${count} files permanently shredded. Inodes reclaimed.`);
  };

  // Star toggle
  const handleToggleStar = (fileId: string) => {
    setFiles(prev => prev.map(f => {
      if (f.id === fileId) {
        const nextStar = !f.isStarred;
        addToast(nextStar ? 'Starred enclave' : 'Unstarred enclave', f.name);
        return { ...f, isStarred: nextStar };
      }
      return f;
    }));
  };

  // Upload additions
  const handleFilesAdded = (newFiles: FileItem[]) => {
    setFiles(prev => [...newFiles, ...prev]);
    setStorageUsedTB(prev => +(prev + 0.05).toFixed(2));
    addToast('Secure ingestion started', `${newFiles.length} file(s) queued for AES-256 chunking.`);
  };

  const handleTransferStarted = (fileName: string, fileSize: string) => {
    const newTransfer: ActiveTransfer = {
      id: `trans-${Date.now()}`,
      name: fileName,
      progress: 15,
      speed: '92.4 MB/s',
      currentSize: '12 MB',
      totalSize: fileSize,
      status: 'uploading'
    };
    setTransfers(prev => [newTransfer, ...prev]);
  };

  // Create link in drawer
  const handleLinkCreated = (newLink: ExternalLink) => {
    setExternalLinks(prev => [newLink, ...prev]);
    addToast('Cryptographic Enclave Live', `Endpoint generated: ${newLink.vanityEndpoint}`);
  };

  // Revoke link
  const handleRevokeLink = (id: string) => {
    setExternalLinks(prev => prev.map(l => {
      if (l.id === id) {
        return { ...l, isRevoked: true };
      }
      return l;
    }));
    addToast('Revoked Endpoint', 'All active clients disconnected immediately.', 'error');
  };

  // Deduplication purge action
  const handleDeduplicationPurged = (freedGB: number) => {
    const freedTB = +(freedGB / 1024).toFixed(3);
    setStorageUsedTB(prev => Math.max(0.1, +(prev - freedTB).toFixed(2)));
    addToast('Deduplication Complete', `Reclaimed ${freedGB.toFixed(1)} GB of duplicate video byte streams!`);
  };

  // Emergency Zero-Out
  const handleZeroOut = () => {
    setClientNodes(prev => prev.map(n => ({ ...n, isRevoked: true })));
    setExternalLinks(prev => prev.map(l => ({ ...l, isRevoked: true })));
    addToast('Emergency Zero-Out Executed', 'Volatile RAM keys wiped across all remote peer enclaves.', 'error');
  };

  // Upgrade storage
  const handleStorageUpgraded = (newQuota: number) => {
    setStorageTotalTB(newQuota);
    addToast('Volume Allocated', `Primary storage limit expanded to ${newQuota} TB Sovereign Vault.`);
  };

  return (
    <div className="bg-background text-on-surface min-h-screen font-sans selection:bg-primary-container selection:text-on-primary-container flex">
      {/* Toast notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Left fixed Sidebar */}
      <Sidebar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenUpgrade={() => setIsUpgradeOpen(true)}
        storageUsedTB={storageUsedTB}
        storageTotalTB={storageTotalTB}
      />

      {/* Main Content Area */}
      <div className="pl-72 flex-1 flex flex-col min-h-screen">
        {/* Top Global Header */}
        <Header
          onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
          viewLayout={viewLayout}
          onToggleViewLayout={setViewLayout}
          onFilterClick={(type) => addToast('Filter applied', `Filtering active view by ${type}`)}
        />

        {/* View Routing Canvas */}
        <main className="relative pt-16 w-full bg-background min-h-[calc(100vh-64px)] pb-12">
          {currentView === 'overview' && (
            <OverviewView
              files={files}
              transfers={transfers}
              onOpenUpload={() => setIsUploadOpen(true)}
              onOpenCreateShare={() => {
                setShareTargetName('Project_Titan_DueDiligence_2025');
                setIsShareDrawerOpen(true);
              }}
              onSelectFile={(f) => setSelectedFile(f)}
              onDownloadFile={handleDownloadFile}
              onCopyFileLink={(f) => handleCopy(`https://vaulta.to/f/${f.id}`, f.name)}
              onNavigateToAllFiles={() => setCurrentView('all-files')}
              onNavigateToTrash={() => setCurrentView('recovery-trash')}
              storageUsedTB={storageUsedTB}
              storageTotalTB={storageTotalTB}
            />
          )}

          {currentView === 'all-files' && (
            <AllFilesView
              files={files}
              selectedFile={selectedFile}
              onSelectFile={(f) => setSelectedFile(f)}
              onDeleteFiles={handleDeleteFiles}
              onDownloadFile={handleDownloadFile}
              onOpenUpload={() => setIsUploadOpen(true)}
              onOpenCreateShare={(name) => {
                setShareTargetName(name || 'Deliverables_Enclave');
                setIsShareDrawerOpen(true);
              }}
              onCopyChecksum={(hash) => handleCopy(hash, 'SHA-256 Checksum')}
              onRestoreVersion={(v) => addToast('Version restored', `${v} is now the active file state.`)}
            />
          )}

          {currentView === 'shared-vaults' && (
            <SharedVaultsView
              vaults={sharedVaults}
              links={externalLinks}
              onOpenCreateShare={() => {
                setShareTargetName('Starlight_Capital_DueDiligence');
                setIsShareDrawerOpen(true);
              }}
              onRevokeLink={handleRevokeLink}
              onCopyLink={(url) => handleCopy(url, 'Enclave URL')}
              onExportAuditCsv={() => {
                const csvData = "Target,Endpoint,Safeguards,Views,Expiry,Status\n" + 
                  externalLinks.map(l => `"${l.targetName}","${l.vanityEndpoint}","${l.safeguards.map(s => s.label).join(';')}","${l.viewsCount}","${l.expiry}","${l.isRevoked ? 'Revoked' : 'Active'}"`).join('\n');
                const blob = new Blob([csvData], { type: 'text/csv' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `vaulta_outbound_audit_${Date.now()}.csv`;
                a.click();
                URL.revokeObjectURL(url);
                addToast('Audit Log Exported', 'CSV report downloaded.');
              }}
            />
          )}

          {currentView === 'security-access' && (
            <SecurityAuditView
              clientNodes={clientNodes}
              onRevokeNode={(nodeId) => {
                setClientNodes(prev => prev.map(n => n.id === nodeId ? { ...n, isRevoked: true } : n));
                addToast('Client Node Revoked', 'Session purged and local encryption key scrubbed.', 'warning');
              }}
              onOpenDeduplication={() => setIsDeduplicationOpen(true)}
              onEmptyStaleTrash={() => {
                handleEmptyAllTrash();
                setStorageUsedTB(prev => Math.max(0.1, +(prev - 0.018).toFixed(2)));
              }}
              onConvertTiffs={() => {
                setStorageUsedTB(prev => Math.max(0.1, +(prev - 0.006).toFixed(2)));
                addToast('Lossless AVIF Conversion Complete', '96 RAW assets compressed, 6.4 GB footprint reclaimed!');
              }}
              onRecalculateQuotas={() => {
                addToast('Hash Quotas Recalculated', 'Merkle root synchronized across 14,289 objects with zero checksum drift.');
              }}
              onOpenZeroOutModal={() => setIsZeroOutOpen(true)}
              onExportAuditLog={() => {
                addToast('Audit Log Exported', 'Cryptographic signature generated for SOC2 compliance report.');
              }}
              storageUsedTB={storageUsedTB}
              storageTotalTB={storageTotalTB}
            />
          )}

          {currentView === 'recent-starred' && (
            <RecentStarredView
              files={files}
              onSelectFile={(f) => {
                setSelectedFile(f);
                setCurrentView('all-files');
              }}
              onToggleStar={handleToggleStar}
              onDownloadFile={handleDownloadFile}
              onOpenCreateShare={(name) => {
                setShareTargetName(name || 'Starred_Asset');
                setIsShareDrawerOpen(true);
              }}
            />
          )}

          {currentView === 'recovery-trash' && (
            <TrashView
              trashItems={trashItems}
              onRestoreItem={handleRestoreItem}
              onShredItem={handleShredItem}
              onEmptyAllTrash={handleEmptyAllTrash}
            />
          )}

          {currentView === 'workspace-settings' && (
            <SettingsView
              onSaved={() => addToast('Configuration Saved', 'Post-quantum policies and watermark formulas updated.')}
            />
          )}
        </main>
      </div>

      {/* Modals & Drawers */}
      <CreateShareDrawer
        isOpen={isShareDrawerOpen}
        onClose={() => setIsShareDrawerOpen(false)}
        onCreated={handleLinkCreated}
        defaultTarget={shareTargetName}
      />

      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onFilesAdded={handleFilesAdded}
        onTransferStarted={handleTransferStarted}
      />

      <DeduplicationModal
        isOpen={isDeduplicationOpen}
        onClose={() => setIsDeduplicationOpen(false)}
        onPurged={handleDeduplicationPurged}
      />

      <EmergencyZeroOutModal
        isOpen={isZeroOutOpen}
        onClose={() => setIsZeroOutOpen(false)}
        onWipeExecuted={handleZeroOut}
      />

      <UpgradeModal
        isOpen={isUpgradeOpen}
        onClose={() => setIsUpgradeOpen(false)}
        onUpgraded={handleStorageUpgraded}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        files={files}
        onSelectFile={(f) => {
          setSelectedFile(f);
          setCurrentView('all-files');
        }}
        onChangeView={(v) => setCurrentView(v)}
        onOpenUpload={() => setIsUploadOpen(true)}
        onOpenCreateShare={() => setIsShareDrawerOpen(true)}
      />
    </div>
  );
}
