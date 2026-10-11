import React, { useState, useRef } from 'react';
import { FileItem } from '../../types';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFilesAdded: (files: FileItem[]) => void;
  onTransferStarted: (fileName: string, fileSize: string) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onFilesAdded,
  onTransferStarted
}) => {
  const [activeTab, setActiveTab] = useState<'browse' | 'cli' | 's3'>('browse');
  const [isDragging, setIsDragging] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const cliCommand = `vaulta ingest --cluster us-east-04 --encrypt aes-256-gcm --chunk-size 64MB ./raw_deliverables/`;

  const handleCopyCli = () => {
    navigator.clipboard.writeText(cliCommand);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const handleNativeFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const newFiles: FileItem[] = [];
    Array.from(fileList).forEach((file, index) => {
      const ext = file.name.split('.').pop()?.toLowerCase() || '';
      let type: FileItem['type'] = 'doc';
      if (['mov', 'mp4', 'prores', 'mkv', 'avi'].includes(ext)) type = 'video';
      else if (['fig', 'ai', 'psd', 'sketch'].includes(ext)) type = 'design';
      else if (['ts', 'tsx', 'js', 'py', 'json', 'yaml'].includes(ext)) type = 'code';
      else if (['zip', 'tar', 'gz', '7z'].includes(ext)) type = 'archive';
      else if (['bin', 'obj', 'blend', 'onnx'].includes(ext)) type = 'bin';

      const sizeStr = file.size > 1024 * 1024 * 1024 
        ? `${(file.size / (1024 * 1024 * 1024)).toFixed(1)} GB`
        : file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;

      newFiles.push({
        id: `upload-${Date.now()}-${index}`,
        name: file.name,
        type,
        extension: ext,
        size: sizeStr,
        sizeBytes: file.size,
        modified: 'Just now',
        securityTier: 'Zero-Knowledge',
        path: `/vault/deliverables/${file.name}`,
        tags: [{ label: 'Ingested', color: 'bg-primary-container/20 text-primary' }],
        collaborators: [{ name: 'Alex Rivera', initials: 'AR', role: 'Owner' }],
        sha256: Array.from(crypto.getRandomValues(new Uint8Array(32)))
          .map(b => b.toString(16).padStart(2, '0')).join(''),
        isStarred: false,
        technicalSpecs: {
          encryption: 'AES-256-GCM',
          bitDepth: 'Client-side Encrypted'
        }
      });

      onTransferStarted(file.name, sizeStr);
    });

    onFilesAdded(newFiles);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-surface-container-low border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-5 bg-surface-container flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-xl">cloud_upload</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-on-surface">Secure Ingestion & Chunking</h3>
              <p className="font-mono text-xs text-outline">Hardware-Accelerated Client-Side Encryption</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-surface-container-high text-outline hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-white/5 bg-surface-container-lowest px-5 pt-2 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('browse')}
            className={`pb-2.5 px-3 font-mono text-xs border-b-2 transition-colors ${
              activeTab === 'browse'
                ? 'border-primary-container text-primary font-medium'
                : 'border-transparent text-outline hover:text-on-surface'
            }`}
          >
            Direct Upload
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('cli')}
            className={`pb-2.5 px-3 font-mono text-xs border-b-2 transition-colors ${
              activeTab === 'cli'
                ? 'border-primary-container text-primary font-medium'
                : 'border-transparent text-outline hover:text-on-surface'
            }`}
          >
            Terminal CLI Pipeline
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('s3')}
            className={`pb-2.5 px-3 font-mono text-xs border-b-2 transition-colors ${
              activeTab === 's3'
                ? 'border-primary-container text-primary font-medium'
                : 'border-transparent text-outline hover:text-on-surface'
            }`}
          >
            Cloud Enclave Mirror (S3/GCS)
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {activeTab === 'browse' && (
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleNativeFiles(e.dataTransfer.files);
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                isDragging 
                  ? 'border-primary bg-primary-container/10 scale-[0.99]' 
                  : 'border-white/10 hover:border-primary-container/60 hover:bg-surface-container'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={(e) => handleNativeFiles(e.target.files)}
              />
              <div className="w-14 h-14 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary mb-3 shadow-inner">
                <span className="material-symbols-outlined text-3xl">upload_file</span>
              </div>
              <h4 className="text-base font-semibold text-on-surface">Drag & drop files or click to browse</h4>
              <p className="text-xs text-outline mt-1 max-w-sm">
                Payloads chunked and encrypted in browser memory via WebCrypto AES-256-GCM before socket transmission. Up to 500 GB per single stream.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="font-mono text-xs px-2.5 py-1 rounded bg-surface-container-high text-secondary-fixed">
                  Zero-Knowledge Proofs
                </span>
                <span className="font-mono text-xs px-2.5 py-1 rounded bg-surface-container-high text-outline">
                  SHA-256 Checksummed
                </span>
              </div>
            </div>
          )}

          {activeTab === 'cli' && (
            <div className="space-y-4">
              <p className="text-xs text-on-surface-variant">
                For headless clusters, CI/CD workers, and video rendering pipelines, run Vaulta Ingest Daemon directly:
              </p>
              <div className="p-4 rounded-xl bg-surface-container-lowest border border-white/5 font-mono text-xs text-secondary-fixed space-y-2">
                <div className="flex items-center justify-between text-outline text-[11px] pb-1 border-b border-white/5">
                  <span>BASH SHELL // TLS-1.3</span>
                  <button
                    onClick={handleCopyCli}
                    className="hover:text-on-surface flex items-center gap-1 transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {copiedCli ? 'check' : 'content_copy'}
                    </span>
                    <span>{copiedCli ? 'Copied' : 'Copy Command'}</span>
                  </button>
                </div>
                <div className="select-all break-all leading-relaxed">{cliCommand}</div>
              </div>
              <div className="p-3 rounded-lg bg-surface-container border border-white/5 flex items-center justify-between text-xs font-mono text-outline">
                <span>Current Ingest Pipe: <strong className="text-on-surface">pipe-east-04</strong></span>
                <span className="text-secondary-fixed">Throughput: 850 MB/s</span>
              </div>
            </div>
          )}

          {activeTab === 's3' && (
            <div className="space-y-4">
              <p className="text-xs text-on-surface-variant">
                Synchronize external sovereign object stores with automated zero-knowledge re-encryption:
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-surface-container border border-white/5 flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-on-surface font-medium text-sm">
                    <span className="material-symbols-outlined text-primary">cloud_sync</span>
                    <span>AWS S3 Enclave</span>
                  </div>
                  <span className="font-mono text-xs text-outline mt-2">KMS ARN Configured</span>
                  <button 
                    onClick={() => {
                      onTransferStarted('s3_production_export_sync.tar.gz', '48.2 GB');
                      onClose();
                    }}
                    className="mt-3 px-3 py-1.5 rounded bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-xs font-mono text-on-surface transition-colors"
                  >
                    Trigger Pull
                  </button>
                </div>
                <div className="p-4 rounded-xl bg-surface-container border border-white/5 flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-on-surface font-medium text-sm">
                    <span className="material-symbols-outlined text-secondary-fixed">dataset</span>
                    <span>GCS Sovereign EU</span>
                  </div>
                  <span className="font-mono text-xs text-outline mt-2">Frankfurt-01 Mirror</span>
                  <button 
                    onClick={() => {
                      onTransferStarted('gcs_fra_model_weights.bin', '12.4 GB');
                      onClose();
                    }}
                    className="mt-3 px-3 py-1.5 rounded bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container text-xs font-mono text-on-surface transition-colors"
                  >
                    Trigger Pull
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-surface-container border-t border-white/5 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-mono text-xs transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
