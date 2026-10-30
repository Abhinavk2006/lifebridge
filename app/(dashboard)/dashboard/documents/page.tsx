'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLifeBridgeStore } from '@/lib/store';
import { DocumentItem } from '@/lib/types';
import { useToast } from '@/components/ui/Toast';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { FileText, ShieldCheck, Upload, Eye, X, CheckCircle2, Sparkles, Filter, Search, FileUp } from 'lucide-react';

export default function DocumentVaultPage() {
  const { documents, activeCaseId } = useLifeBridgeStore();
  const { toast } = useToast();
  const { t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [fileName, setFileName] = useState('Form_26AS_Tax_Statement_FY2025_26_Rameshchandra_Mehta.pdf');
  const [category, setCategory] = useState<'Identity' | 'Legal' | 'Financial' | 'Tax'>('Financial');

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
    setFileName(file.name);
    toast('File Selected', `Ready to ingest ${file.name} (${(file.size / 1024).toFixed(1)} KB)`, 'info');
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileChange(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    toast('Uploading Document', 'Virus scanning & initializing async OCR pipeline...', 'info');

    setTimeout(() => {
      const newDocId = `doc-${Date.now().toString().slice(-4)}`;
      const newDocItem: DocumentItem = {
        id: newDocId,
        caseId: activeCaseId || 'c-101',
        fileName: fileName || (selectedFile ? selectedFile.name : 'Uploaded_Document.pdf'),
        fileType: (fileName.endsWith('.png') || fileName.endsWith('.jpg') || fileName.endsWith('.jpeg')) ? 'IMAGE' : 'PDF',
        category: category as any,
        uploadedAt: 'Just now',
        authenticityScore: 98.9,
        tamperStatus: 'PASSED',
        issuingAuthority: category === 'Tax' ? 'Income Tax Department (e-Filing Portal)' : 'Sub-Registrar Office (SRO Mumbai)',
        extractedEntitiesCount: 16,
        summary: `Parsed ${fileName}. Verified digital seal & extracted 16 linked Indian financial entity nodes.`,
        fileUrl: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/storage/${newDocId}.pdf`
      };

      useLifeBridgeStore.setState((state) => ({
        documents: [newDocItem, ...state.documents]
      }));

      setUploading(false);
      setIsUploadOpen(false);
      setSelectedFile(null);
      toast('Document Processed!', `Parsed ${newDocItem.fileName} with 98.9% authenticity score.`, 'success');
    }, 1200);
  };

  const filteredDocs = documents.filter((doc: DocumentItem) => {
    const matchesSearch = doc.fileName.toLowerCase().includes(searchQuery.toLowerCase()) || doc.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryName = (cat: string) => {
    switch (cat) {
      case 'all': return t('documents.all_cat');
      case 'Identity': return t('documents.cat_identity');
      case 'Legal': return t('documents.cat_legal');
      case 'Financial': return t('documents.cat_financial');
      case 'Tax': return t('documents.cat_tax');
      default: return cat;
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto font-sans">
      {/* High-Impact Indian Banking Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-700 min-h-[240px] flex items-center bg-slate-900">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/indian_bank_vault.png"
            alt="Forensic Document Vault"
            fill
            priority
            className="object-cover object-center"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002b49] via-[#002b49]/90 to-transparent" />
        </div>

        <div className="relative z-10 p-8 w-full flex flex-col md:flex-row md:items-center justify-between gap-6 text-white">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#B8935B]/20 text-[#B8935B] border border-[#B8935B]/40 px-3.5 py-1.5 rounded-full text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-[#B8935B]" />
              <span>FORENSIC DOCUMENT VERIFICATION VAULT</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 shrink-0 bg-white/10 p-1.5 rounded-2xl border border-white/20">
                <Image
                  src="/ashoka_legal_seal.png"
                  alt="High Court Seal"
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="font-serif text-3xl font-bold tracking-tight text-white">
                  {t('documents.title')}
                </h1>
                <p className="text-xs text-blue-200 font-mono mt-0.5">
                  {t('documents.subtitle')}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => setIsUploadOpen(true)}
              className="px-5 py-2.5 bg-[#B8935B] text-[#002b49] font-bold text-xs font-mono rounded-xl hover:bg-white transition flex items-center gap-2 shadow-sm uppercase tracking-wider shrink-0 cursor-pointer"
            >
              <Upload className="w-4 h-4" /> <span>{t('documents.upload_btn')}</span>
            </button>
            <Link
              href="/dashboard/export-certificate"
              className="px-5 py-2.5 bg-[#B8935B] text-[#002b49] font-bold text-xs font-mono rounded-xl hover:bg-white transition flex items-center gap-2 shadow-sm uppercase tracking-wider"
            >
              <FileUp className="w-4 h-4" />
              <span>EXPORT STATEMENT (PDF)</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
          {['all', 'Identity', 'Legal', 'Financial', 'Tax'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                filterCategory === cat
                  ? 'bg-white text-blue-700 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {getCategoryName(cat)}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('documents.filter_placeholder')}
            className="w-full bg-white border border-slate-200 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDocs.map((doc) => (
          <div key={doc.id} className="card-enterprise p-5 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0 font-bold text-xs">
                  {doc.fileType}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 truncate max-w-xs">{doc.fileName}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{doc.issuingAuthority}</p>
                </div>
              </div>

              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono-val px-2.5 py-1 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" /> {t('documents.passed')}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              {doc.summary}
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <span className="text-slate-400 text-[10px] block">{t('documents.authenticity_score')}</span>
                <span className="font-mono-val font-bold text-emerald-600 text-sm">{doc.authenticityScore}%</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <span className="text-slate-400 text-[10px] block">{t('documents.extracted_entities')}</span>
                <span className="font-bold text-slate-900 text-sm">{doc.extractedEntitiesCount} {t('documents.linked_nodes')}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono-val">{t('documents.uploaded')} {doc.uploadedAt}</span>
              <Link
                href={`/dashboard/documents/${doc.id}/verify`}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" /> {t('documents.deep_verification_scan')}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredDocs.length === 0 && (
        <div className="card-enterprise p-12 text-center text-slate-400 text-xs">
          {t('documents.no_documents_found')} "{searchQuery}".
        </div>
      )}

      {/* Upload Modal */}
      {isUploadOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h3 className="font-serif text-lg font-bold text-slate-900">{t('documents.modal_title')}</h3>
              </div>
              <button
                onClick={() => setIsUploadOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
              {/* Native Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.docx"
                onChange={onFileInputChange}
                className="hidden"
              />

              <div>
                <label className="font-semibold text-slate-700 block mb-1">{t('documents.file_name_label')}</label>
                <input
                  type="text"
                  required
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500 font-mono-val"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">{t('documents.file_classification_label')}</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                >
                  <option value="Identity">{t('documents.cat_identity')} (PAN Card, Aadhaar, Death Certificate)</option>
                  <option value="Legal">{t('documents.cat_legal')} (Will, Legal Heir Cert, Succession Cert)</option>
                  <option value="Financial">{t('documents.cat_financial')} (Passbook, Demat, Fixed Deposit)</option>
                  <option value="Tax">{t('documents.cat_tax')} (Form 26AS, AIS/TIS, Form 16, ITR Filing)</option>
                </select>
              </div>

              {/* Interactive File Dropzone */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
                  isDragging 
                    ? 'border-blue-500 bg-blue-50/80 scale-[1.01]' 
                    : selectedFile 
                      ? 'border-emerald-400 bg-emerald-50/60' 
                      : 'border-slate-300 bg-slate-50 hover:bg-slate-100/80 hover:border-slate-400'
                }`}
              >
                {selectedFile ? (
                  <div className="space-y-1">
                    <FileUp className="w-8 h-8 text-emerald-600 mx-auto mb-1 animate-bounce" />
                    <p className="font-bold text-slate-900 flex items-center justify-center gap-1.5 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      {t('documents.file_selected')} {selectedFile.name}
                    </p>
                    <p className="text-[11px] text-emerald-700 font-mono-val">
                      {(selectedFile.size / 1024).toFixed(1)} KB — {t('documents.ready_for_ingestion')}
                    </p>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="font-semibold text-slate-900">{t('documents.drag_drop')}</p>
                    <p className="text-[11px] text-slate-400 mt-1">Supports PDF, PNG, JPG up to 25MB with cryptographic seal analysis</p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsUploadOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:text-slate-900"
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-colors flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {uploading ? (
                    <span>{t('documents.processing_ocr')}</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{t('documents.start_ocr')}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
