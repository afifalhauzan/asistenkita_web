"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  CreateLowonganRequest, 
  LowonganGender,
  LowonganJobType,
  LowonganSkill,
  LowonganWorkArrangement,
  LOWONGAN_GENDER_LABELS,
  LOWONGAN_JOB_TYPE_LABELS,
  LOWONGAN_SKILL_LABELS,
  LOWONGAN_WORK_ARRANGEMENT_LABELS
} from '@/types/lowongan';

interface MajikanSignupPhase3Props {
  initialData: Partial<CreateLowonganRequest>;
  onSubmit: (data: CreateLowonganRequest) => void;
  onBack: () => void;
  isLoading?: boolean;
}

export function MajikanSignupPhase3({ 
  initialData,
  onSubmit, 
  onBack, 
  isLoading = false
}: MajikanSignupPhase3Props) {
  const [selectedJobTypes, setSelectedJobTypes] = useState<LowonganJobType[]>(
    initialData?.job_types || []
  );
  const [selectedSkills, setSelectedSkills] = useState<LowonganSkill[]>(
    initialData?.skills || []
  );
  const [selectedWorkArrangements, setSelectedWorkArrangements] = useState<LowonganWorkArrangement[]>(
    initialData?.work_arrangement || []
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<CreateLowonganRequest>({
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      domicile_city: initialData?.domicile_city || '',
      education: initialData?.education || '',
      gender: initialData?.gender || undefined,
      job_types: initialData?.job_types || [],
      skills: initialData?.skills || [],
      work_arrangement: initialData?.work_arrangement || [],
      salary_min: initialData?.salary_min || undefined,
      salary_max: initialData?.salary_max || undefined,
    }
  });

  const handleJobTypeChange = (jobType: LowonganJobType, checked: boolean) => {
    let newJobTypes: LowonganJobType[];
    if (checked) {
      newJobTypes = [...selectedJobTypes, jobType];
    } else {
      newJobTypes = selectedJobTypes.filter(type => type !== jobType);
    }
    setSelectedJobTypes(newJobTypes);
    setValue('job_types', newJobTypes);
  };

  const handleSkillChange = (skill: LowonganSkill, checked: boolean) => {
    let newSkills: LowonganSkill[];
    if (checked) {
      newSkills = [...selectedSkills, skill];
    } else {
      newSkills = selectedSkills.filter(s => s !== skill);
    }
    setSelectedSkills(newSkills);
    setValue('skills', newSkills);
  };

  const handleWorkArrangementChange = (arrangement: LowonganWorkArrangement, checked: boolean) => {
    let newArrangements: LowonganWorkArrangement[];
    if (checked) {
      newArrangements = [...selectedWorkArrangements, arrangement];
    } else {
      newArrangements = selectedWorkArrangements.filter(arr => arr !== arrangement);
    }
    setSelectedWorkArrangements(newArrangements);
    setValue('work_arrangement', newArrangements);
  };

  const onFormSubmit = (data: CreateLowonganRequest) => {
    const formData = {
      ...data,
      job_types: selectedJobTypes,
      skills: selectedSkills,
      work_arrangement: selectedWorkArrangements,
    };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {/* Judul Lowongan */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Judul Lowongan*
        </label>
        <input
          type="text"
          id="title"
          maxLength={100}
          {...register('title', {
            required: 'Judul lowongan harus diisi',
            maxLength: {
              value: 100,
              message: 'Judul maksimal 100 karakter'
            }
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
          placeholder="Contoh: Dicari Asisten Rumah Tangga Cekatan dan Jujur"
          disabled={isLoading}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          {watch('title')?.length || 0}/100 karakter
        </p>
      </div>

      {/* Deskripsi */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Deskripsi Lowongan*
        </label>
        <textarea
          id="description"
          rows={6}
          maxLength={1000}
          {...register('description', {
            required: 'Deskripsi lowongan harus diisi',
            maxLength: {
              value: 1000,
              message: 'Deskripsi maksimal 1000 karakter'
            },
            minLength: {
              value: 50,
              message: 'Deskripsi minimal 50 karakter'
            }
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
          placeholder="Jelaskan secara detail tentang lowongan ini, tugas-tugas yang akan dikerjakan, persyaratan, dan informasi lainnya..."
          disabled={isLoading}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          {watch('description')?.length || 0}/1000 karakter
        </p>
      </div>

      {/* Kota Domisili */}
      <div>
        <label htmlFor="domicile_city" className="block text-sm font-medium text-gray-700 mb-2">
          Kota*
        </label>
        <input
          type="text"
          id="domicile_city"
          maxLength={50}
          {...register('domicile_city', {
            required: 'Kota harus diisi',
            maxLength: {
              value: 50,
              message: 'Nama kota maksimal 50 karakter'
            }
          })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
          placeholder="Contoh: Jakarta, Surabaya, Bandung"
          disabled={isLoading}
        />
        {errors.domicile_city && (
          <p className="mt-1 text-sm text-red-600">{errors.domicile_city.message}</p>
        )}
      </div>

      {/* Pendidikan */}
      <div>
        <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-2">
          Pendidikan Terakhir yang Diharapkan
        </label>
        <select
          id="education"
          {...register('education')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
          disabled={isLoading}
        >
          <option value="">Pilih pendidikan (opsional)</option>
          <option value="SD">SD</option>
          <option value="SMP">SMP</option>
          <option value="SMA/SMK">SMA/SMK</option>
          <option value="D3">D3</option>
          <option value="S1">S1</option>
          <option value="S2">S2</option>
        </select>
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Jenis Kelamin
        </label>
        <div className="grid grid-cols-3 gap-3">
          {(Object.keys(LOWONGAN_GENDER_LABELS) as LowonganGender[]).map((gender) => (
            <label key={gender} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                value={gender}
                {...register('gender')}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                disabled={isLoading}
              />
              <span className="text-sm text-gray-700">{LOWONGAN_GENDER_LABELS[gender]}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Layanan yang Dibutuhkan */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Layanan yang Anda Butuhkan
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {(Object.keys(LOWONGAN_JOB_TYPE_LABELS) as LowonganJobType[]).map((jobType) => (
            <label key={jobType} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedJobTypes.includes(jobType)}
                onChange={(e) => handleJobTypeChange(jobType, e.target.checked)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                disabled={isLoading}
              />
              <span className="text-sm text-gray-700">{LOWONGAN_JOB_TYPE_LABELS[jobType]}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Keahlian Khusus */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Keahlian Khusus yang Dibutuhkan
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {(Object.keys(LOWONGAN_SKILL_LABELS) as LowonganSkill[]).map((skill) => (
            <label key={skill} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedSkills.includes(skill)}
                onChange={(e) => handleSkillChange(skill, e.target.checked)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                disabled={isLoading}
              />
              <span className="text-sm text-gray-700">{LOWONGAN_SKILL_LABELS[skill]}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Ketersediaan */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ketersediaan yang Anda Butuhkan
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {(Object.keys(LOWONGAN_WORK_ARRANGEMENT_LABELS) as LowonganWorkArrangement[]).map((arrangement) => (
            <label key={arrangement} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedWorkArrangements.includes(arrangement)}
                onChange={(e) => handleWorkArrangementChange(arrangement, e.target.checked)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                disabled={isLoading}
              />
              <span className="text-sm text-gray-700">{LOWONGAN_WORK_ARRANGEMENT_LABELS[arrangement]}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Tarif yang Diharapkan */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tarif yang Anda Berikan
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="salary_min" className="block text-xs font-medium text-gray-600 mb-1">
              Minimal (Rp)
            </label>
            <input
              type="number"
              id="salary_min"
              min="0"
              step="50000"
              {...register('salary_min', {
                min: {
                  value: 0,
                  message: 'Gaji tidak boleh negatif'
                },
                valueAsNumber: true
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="500000"
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="salary_max" className="block text-xs font-medium text-gray-600 mb-1">
              Maksimal (Rp)
            </label>
            <input
              type="number"
              id="salary_max"
              min="0"
              step="50000"
              {...register('salary_max', {
                min: {
                  value: 0,
                  message: 'Gaji tidak boleh negatif'
                },
                valueAsNumber: true
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              placeholder="1500000"
              disabled={isLoading}
            />
          </div>
        </div>
        {(errors.salary_min || errors.salary_max) && (
          <p className="mt-1 text-sm text-red-600">
            {errors.salary_min?.message || errors.salary_max?.message}
          </p>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex justify-between space-x-4 pt-6 border-t">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 font-medium transition-colors"
          disabled={isLoading}
        >
          Kembali
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? 'Mendaftar...' : 'Buat Akun & Publikasi'}
        </button>
      </div>
    </form>
  );
}
