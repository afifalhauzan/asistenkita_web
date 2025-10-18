"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import {
    LowonganListItem,
    LOWONGAN_GENDER_LABELS,
    LOWONGAN_JOB_TYPE_LABELS,
    LOWONGAN_SKILL_LABELS,
    LOWONGAN_WORK_ARRANGEMENT_LABELS
} from '@/types/lowongan';
import { lowonganService } from '@/services/lowonganService';
import { useAuth } from '@/features/auth/hooks/useAuth';

interface LowonganCardProps {
    lowongan: LowonganListItem;
    showActions?: boolean;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    onPublish?: (id: string) => void;
    onClose?: (id: string) => void;
}

export default function LowonganCardAdmin({
    lowongan,
    showActions = false,
    onEdit,
    onDelete,
    onPublish,
    onClose
}: LowonganCardProps) {
    const { user, isAuthenticated, loading } = useAuth();
    const [lowongans, setLowongans] = useState<LowonganListItem[]>([]);
    const [isLoadingLowongans, setIsLoadingLowongans] = useState(true);
    const [activeTab, setActiveTab] = useState<'semua' | 'buka' | 'tutup'>('semua');
    
    const formatSalary = (min?: number, max?: number) => {
        if (!min && !max) return 'Negosiasi';

        const formatNumber = (num: number) => {
            if (num >= 1000000) {
                return `${(num / 1000000).toFixed(1)}jt`;
            } else if (num >= 1000) {
                return `${(num / 1000).toFixed(0)}rb`;
            }
            return num.toString();
        };

        if (min && max) {
            return `Rp ${formatNumber(min)} - ${formatNumber(max)}`;
        } else if (min) {
            return `Mulai Rp ${formatNumber(min)}`;
        } else if (max) {
            return `Hingga Rp ${formatNumber(max)}`;
        }

        return 'Negosiasi';
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getStatusBadge = (isActive?: boolean) => {
        if (!status) return null;

        const getStatusColor = () => {
            switch (status) {
                case 'true':
                    return isActive ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
                case 'false':
                    return 'bg-red-100 text-red-800';
                default:
                    return 'bg-gray-100 text-gray-800';
            }
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()}`}>
                ==        {isActive ? 'Aktif' : 'Tidak Aktif'}
            </span>
        );
    };

    const handleEdit = (id: string) => {
        // TODO: Implement edit functionality
        console.log('Edit lowongan:', id);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Apakah Anda yakin ingin menghapus lowongan ini?')) {
            try {
                await lowonganService.deleteLowongan(id);
                setLowongans(prev => prev.filter(l => l.$id !== id));
            } catch (error) {
                console.error('Error deleting lowongan:', error);
                alert('Gagal menghapus lowongan');
            }
        }
    };

    const handleClose = async (id: string) => {
        if (confirm('Apakah Anda yakin ingin menutup lowongan ini?')) {
            try {
                await lowonganService.closeLowongan(id);
                setLowongans(prev => prev.map(l =>
                    l.$id === id ? { ...l, status: 'closed', is_active: false } : l
                ));
            } catch (error) {
                console.error('Error closing lowongan:', error);
                alert('Gagal menutup lowongan');
            }
        }
    };

    return (
        <div className="bg-white rounded-lg box-shadow-default border border-gray-200 hover:shadow-lg transition-shadow duration-200">
            {/* Header */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                        <p className="text-sm text-gray-600">
                            {lowongan.applications_count || 0} Asisten melamar pekerjaan ini
                        </p>

                        <p className="text-sm text-gray-900 font-medium">
                            Mulai dari
                        </p>
                        <Link
                            href={`/pekerjaan/${lowongan.$id}`}
                            className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2"
                        >
                            {lowongan.title}
                        </Link>
                        {/* Applicants Count */}
                        <div className="flex justify-between items-center mb-4">

                        </div>
                    </div>
                    {showActions && (
                        <div className="flex items-center space-x-2 ml-4">
                            {getStatusBadge(lowongan.is_active)}
                        </div>
                    )}
                </div>

                {/* Location & Salary */}
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {lowongan.domicile_city}
                    </div>
                    <div className="text-sm font-medium text-blue-600">
                        {formatSalary(lowongan.salary_min, lowongan.salary_max)}
                    </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {lowongan.description}
                </p>

                {/* Job Types */}
                {lowongan.job_types && lowongan.job_types.length > 0 && (
                    <div className="mb-3">
                        <div className="flex flex-wrap gap-2">
                            {lowongan.job_types.slice(0, 3).map((jobType) => (
                                <span
                                    key={jobType}
                                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                >
                                    {LOWONGAN_JOB_TYPE_LABELS[jobType]}
                                </span>
                            ))}
                            {lowongan.job_types.length > 3 && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                    +{lowongan.job_types.length - 3} lainnya
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Skills */}
                {lowongan.skills && lowongan.skills.length > 0 && (
                    <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-1">Keahlian yang dibutuhkan:</p>
                        <div className="flex flex-wrap gap-1">
                            {lowongan.skills.slice(0, 3).map((skill) => (
                                <span
                                    key={skill}
                                    className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-green-100 text-green-800"
                                >
                                    {LOWONGAN_SKILL_LABELS[skill]}
                                </span>
                            ))}
                            {lowongan.skills.length > 3 && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600">
                                    +{lowongan.skills.length - 3}
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Work Arrangement */}
                {lowongan.work_arrangement && lowongan.work_arrangement.length > 0 && (
                    <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-1">Pengaturan kerja:</p>
                        <h2 className="text-sm font-semibold text-gray-800"> {lowongan.work_arrangement.join(", ")}</h2>
                        {/* <div className="flex flex-wrap gap-1">
                            {lowongan.work_arrangement.slice(0, 1).map((arrangement) => (
                                <span
                                    key={arrangement}
                                    className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-purple-100 text-purple-800"
                                >
                                    {LOWONGAN_WORK_ARRANGEMENT_LABELS[arrangement]}
                                </span>
                            ))}
                            {lowongan.work_arrangement.length > 1 && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-gray-600">
                                    +{lowongan.work_arrangement.length - 1}
                                </span>
                            )}
                        </div> */}
                    </div>
                )}

                {/* Footer */}
                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {lowongan.views_count || 0} views
                        </div>
                        <div className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                            </svg>
                            {lowongan.applications_count || 0} pelamar
                        </div>
                    </div>
                    <div className="text-xs text-gray-500">
                        {formatDate(lowongan.$createdAt)}
                    </div>
                </div>

                {/* Actions for owner */}
                {showActions && (
                    <div className="flex justify-end space-x-2 mt-4 pt-3 border-t border-gray-100">
                        {onEdit && (
                            <button
                                onClick={() => onEdit(lowongan.$id)}
                                className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                            >
                                Edit
                            </button>
                        )}
                        {onClose && lowongan.is_active === true && (
                            <button
                                onClick={() => onClose(lowongan.$id)}
                                className="px-3 py-1 text-sm text-orange-600 hover:text-orange-800 transition-colors"
                            >
                                Tutup
                            </button>
                        )}
                        {onDelete && (
                            <button
                                onClick={() => onDelete(lowongan.$id)}
                                className="px-3 py-1 text-sm text-red-600 hover:text-red-800 transition-colors"
                            >
                                Hapus
                            </button>
                        )}
                    </div>
                )}

                {/* Action Buttons Below Card */}
                <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                        <button
                            onClick={() => handleClose(lowongan.$id)}
                            className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                        >
                            Tutup Lowongan
                        </button>
                        <button
                            onClick={() => handleEdit(lowongan.$id)}
                            className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                        >
                            Edit Lowongan
                        </button>
                    </div>
                    <Link
                        href={`/dashboard/lowongan/${lowongan.$id}`}
                        className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Lihat Applier
                    </Link>
                </div>
            </div>
        </div>
    );
}