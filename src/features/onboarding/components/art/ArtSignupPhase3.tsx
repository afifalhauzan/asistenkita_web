"use client";

import { useForm, useWatch } from 'react-hook-form';
import { useState } from 'react';
// Custom SVG Icons
const PencilIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const XMarkIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);
import {
  ArtSignupFormData,
  Phase3FormData,
  EditModeStates
} from '@/types/artSignup';

interface ArtSignupPhase3Props {
  // All data from previous phases plus phase 3 data
  allFormData: ArtSignupFormData;
  onSubmit: (data: Phase3FormData) => void;
  onUpdateData: (updatedData: Partial<ArtSignupFormData>) => void;
  onBack: () => void;
  isLoading?: boolean;
}

// Preview Section Component
interface PreviewSectionProps {
  title: string;
  isEditing: boolean;
  onEditToggle: () => void;
  onSave: () => void;
  onCancel: () => void;
  children: React.ReactNode;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({
  title,
  isEditing,
  onEditToggle,
  onSave,
  onCancel,
  children
}) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4">
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <div className="flex space-x-2">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={onSave}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="Simpan"
            >
              <CheckIcon className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Batal"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={onEditToggle}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit"
          >
            <PencilIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
    {children}
  </div>
);

export const ArtSignupPhase3: React.FC<ArtSignupPhase3Props> = ({
  allFormData,
  onSubmit,
  onUpdateData,
  onBack,
  isLoading = false
}) => {
  const [editModes, setEditModes] = useState<EditModeStates>({
    personal: false,
    professional: false
  });

  // Forms for editing different sections
  const personalForm = useForm({
    defaultValues: {
      name: allFormData.name,
      email: allFormData.email,
      phone: allFormData.phone,
    }
  });

  const professionalForm = useForm({
    defaultValues: {
      services: allFormData.services,
      specialSkills: allFormData.specialSkills,
      salaryMin: allFormData.salaryMin,
      salaryMax: allFormData.salaryMax,
      salaryUnit: allFormData.salaryUnit,
      availability: allFormData.availability,
      profileTitle: allFormData.profileTitle,
      bio: allFormData.bio,
      education: allFormData.education,
      university: allFormData.university,
      graduationYear: allFormData.graduationYear,
    }
  });

  const profileForm = useForm<Phase3FormData>({
    defaultValues: {
      agreeToTerms: allFormData.agreeToTerms
    }
  });

  // Watch the agreeToTerms checkbox state
  const agreeToTermsValue = useWatch({
    control: profileForm.control,
    name: 'agreeToTerms'
  });

  // Edit mode handlers
  const handleEditToggle = (section: keyof EditModeStates) => {
    setEditModes(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleSave = (section: keyof EditModeStates) => {
    let updatedData: Partial<ArtSignupFormData> = {};

    if (section === 'personal') {
      updatedData = personalForm.getValues();
    } else if (section === 'professional') {
      updatedData = professionalForm.getValues();
    }

    onUpdateData(updatedData);
    setEditModes(prev => ({ ...prev, [section]: false }));
  };

  const handleCancel = (section: keyof EditModeStates) => {
    // Reset forms to original values
    if (section === 'personal') {
      personalForm.reset({
        name: allFormData.name,
        email: allFormData.email,
        phone: allFormData.phone,
      });
    } else if (section === 'professional') {
      professionalForm.reset({
        services: allFormData.services,
        specialSkills: allFormData.specialSkills,
        salaryMin: allFormData.salaryMin,
        salaryMax: allFormData.salaryMax,
        salaryUnit: allFormData.salaryUnit,
        availability: allFormData.availability,
        profileTitle: allFormData.profileTitle,
        bio: allFormData.bio,
        education: allFormData.education,
        university: allFormData.university,
        graduationYear: allFormData.graduationYear,
      });
    }

    setEditModes(prev => ({ ...prev, [section]: false }));
  };

  // Final submission handler
  const handleFinalSubmit = () => {
    const phase3Data = profileForm.getValues();
    onSubmit(phase3Data);
  };

  return (
    <div className="space-y-6">
      {/* Personal Information Section */}
      <PreviewSection
        title="Data Pribadi"
        isEditing={editModes.personal}
        onEditToggle={() => handleEditToggle('personal')}
        onSave={() => handleSave('personal')}
        onCancel={() => handleCancel('personal')}
      >
        {editModes.personal ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
              <input
                {...personalForm.register('name', { required: 'Nama lengkap harus diisi' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                {...personalForm.register('email', { required: 'Email harus diisi' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">No. Telefon</label>
              <input
                {...personalForm.register('phone', { required: 'Nomor telefon harus diisi' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <p><span className="font-medium">Nama:</span> {allFormData.name}</p>
            <p><span className="font-medium">Email:</span> {allFormData.email}</p>
            <p><span className="font-medium">Telefon:</span> {allFormData.phone}</p>
            {allFormData.ktpPhoto && allFormData.ktpPhoto.length > 0 && (
              <p><span className="font-medium">KTP:</span> File terlampir</p>
            )}
          </div>
        )}
      </PreviewSection>

      {/* Professional Information Section */}
      <PreviewSection
        title="Detail Profesional & Profil"
        isEditing={editModes.professional}
        onEditToggle={() => handleEditToggle('professional')}
        onSave={() => handleSave('professional')}
        onCancel={() => handleCancel('professional')}
      >
        {editModes.professional ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Layanan</label>
              <div className="text-sm text-gray-600">
                {allFormData.services.join(', ') || 'Belum dipilih'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Keahlian Khusus</label>
              <div className="text-sm text-gray-600">
                {allFormData.specialSkills.join(', ') || 'Belum dipilih'}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gaji Minimum</label>
                <input
                  type="number"
                  {...professionalForm.register('salaryMin', { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gaji Maksimum</label>
                <input
                  type="number"
                  {...professionalForm.register('salaryMax', { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Judul Profil</label>
              <input
                {...professionalForm.register('profileTitle', { required: 'Judul profil harus diisi' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Contoh: Asisten Rumah Tangga Berpengalaman 5 Tahun"
              />
            </div>
            <div>
              <label className="block text-sm text-wrap font-medium text-gray-700 mb-1">Bio</label>
              <textarea
                {...professionalForm.register('bio', { required: 'Bio harus diisi' })}
                rows={10}
                className="w-full px-3 py-2 border text-wrap border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ceritakan tentang diri Anda, pengalaman, dan keunggulan Anda..."
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pendidikan</label>
                <select
                  {...professionalForm.register('education')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Pilih pendidikan</option>
                  <option value="SD">SD</option>
                  <option value="SMP">SMP</option>
                  <option value="SMA/SMK">SMA/SMK</option>
                  <option value="D3">D3</option>
                  <option value="S1">S1</option>
                  <option value="S2">S2</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Universitas/Sekolah</label>
                <input
                  {...professionalForm.register('university')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nama institusi pendidikan"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tahun Lulus</label>
                <input
                  {...professionalForm.register('graduationYear')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Contoh: 2020"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <p><span className="font-medium">Layanan:</span> {allFormData.services.join(', ')}</p>
            <p><span className="font-medium">Keahlian:</span> {allFormData.specialSkills.join(', ')}</p>
            <p><span className="font-medium">Range Gaji:</span> Rp {allFormData.salaryMin?.toLocaleString()} - Rp {allFormData.salaryMax?.toLocaleString()} {allFormData.salaryUnit}</p>
            <p><span className="font-medium">Ketersediaan:</span> {allFormData.availability.join(', ')}</p>
            <div className="border-t pt-2 mt-2">
              <p><span className="font-medium">Judul Profil:</span> {allFormData.profileTitle || 'Belum diisi'}</p>
              <p className="whitespace-pre-wrap"><span className="font-medium">Bio:</span> {allFormData.bio || 'Belum diisi'}</p>
              <p><span className="font-medium">Pendidikan:</span> {allFormData.education || 'Belum dipilih'}</p>
              {allFormData.university && (
                <p><span className="font-medium">Institusi:</span> {allFormData.university}</p>
              )}
              {allFormData.graduationYear && (
                <p><span className="font-medium">Tahun Lulus:</span> {allFormData.graduationYear}</p>
              )}
            </div>
          </div>
        )}
      </PreviewSection>

      {/* Terms Agreement */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <label className="flex items-start space-x-2 cursor-pointer">
          <input
            type="checkbox"
            {...profileForm.register('agreeToTerms', {
              required: 'Anda harus menyetujui syarat dan ketentuan'
            })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
            disabled={isLoading}
          />
          <span className="text-sm text-gray-700">
            Dengan ini, saya menyatakan semua informasi yang saya berikan adalah benar dan saya
            menyetujui <a href="#" className="text-blue-600 hover:underline">Syarat & Ketentuan</a> dan{' '}
            <a href="#" className="text-blue-600 hover:underline">Kebijakan Privasi</a> kami.
          </span>
        </label>
        {profileForm.formState.errors.agreeToTerms && (
          <p className="mt-1 text-sm text-red-600">{profileForm.formState.errors.agreeToTerms.message}</p>
        )}
      </div>

      {/* Info */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-start space-x-2">
          <div className="text-blue-600 text-lg">ℹ️</div>
          <div className="text-sm text-gray-700">
            Setelah ini, tim AsistenKita akan melakukan verifikasi singkat (maksimal 1x24 jam) sebelum
            profil Anda resmi aktif dan dapat dicari oleh keluarga. Kami akan memberitahu lewat
            email & WhatsApp.
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="flex-1 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 font-semibold py-4 px-6 rounded-lg transition-all duration-300 disabled:cursor-not-allowed"
        >
          Sebelumnya
        </button>
        <button
          type="button"
          onClick={handleFinalSubmit}
          disabled={isLoading || !agreeToTermsValue}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
        >
          {isLoading ? 'Memproses...' : 'Aktifkan Profil'}
        </button>
      </div>
    </div>
  );
};