"use client";

import React, { useState, useEffect } from 'react';
import { storageService } from '@/lib/storageService';
import { storage, DATABASE_CONFIG } from '@/lib/appwrite';
import { ID } from 'appwrite';

export const StorageTest: React.FC = () => {
    const [isConfigured, setIsConfigured] = useState<boolean | null>(null);
    const [uploadFile, setUploadFile] = useState<File | null>(null);
    const [uploadedFileId, setUploadedFileId] = useState<string>('');
    const [uploadStatus, setUploadStatus] = useState<string>('');

    useEffect(() => {
        const testStorage = async () => {
            const configured = await storageService.isStorageConfigured();
            setIsConfigured(configured);
        };

        testStorage();
    }, []);

    const handleFileUpload = async () => {
        if (!uploadFile) return;

        setUploadStatus('Uploading...');
        try {
            const response = await storage.createFile(
                DATABASE_CONFIG.buckets.artphoto,
                ID.unique(),
                uploadFile
            );

            setUploadedFileId(response.$id);
            setUploadStatus('Upload successful!');
        } catch (error) {
            console.error('Upload error:', error);
            setUploadStatus('Upload failed: ' + (error as Error).message);
        }
    };

    const avatarUrls = uploadedFileId ? storageService.getAvatarUrls(uploadedFileId) : null;

    return (
        <div className="p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Appwrite Storage Test</h2>

            {/* Configuration Status */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Storage Configuration:</h3>
                <div className={`p-3 rounded-lg ${isConfigured === null ? 'bg-gray-100' :
                        isConfigured ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                    {isConfigured === null ? 'Testing...' :
                        isConfigured ? '✅ Storage is properly configured' :
                            '❌ Storage configuration error'}
                </div>
                {!isConfigured && isConfigured !== null && (
                    <p className="text-sm text-gray-600 mt-2">
                        Check your NEXT_PUBLIC_APPWRITE_BUCKET_ARTPHOTO environment variable
                    </p>
                )}
            </div>

            {/* File Upload Test */}
            {isConfigured && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">Upload Test:</h3>
                    <div className="space-y-3">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <button
                            onClick={handleFileUpload}
                            disabled={!uploadFile}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300"
                        >
                            Upload Image
                        </button>
                        {uploadStatus && (
                            <p className={`text-sm ${uploadStatus.includes('successful') ? 'text-green-600' :
                                    uploadStatus.includes('failed') ? 'text-red-600' : 'text-blue-600'
                                }`}>
                                {uploadStatus}
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* Display Uploaded Image */}
            {uploadedFileId && avatarUrls && (
                <div className="mb-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                            <img
                                src={avatarUrls.getAvatarUrl()}
                                className="w-10 h-10 rounded-full mx-auto object-cover"
                            />
                        </div>
                    </div>
                    <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                        <p className="text-sm"><strong>File ID:</strong> {uploadedFileId}</p>
                        <p className="text-sm"><strong>Medium URL:</strong> {avatarUrls.getAvatarUrl()}</p>
                    </div>
                </div>
            )}

            {/* Environment Variables Display */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Environment Check:</h3>
                <div className="space-y-1 text-sm">
                    <p><strong>Endpoint:</strong> {process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'Not set'}</p>
                    <p><strong>Project ID:</strong> {process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || 'Not set'}</p>
                    <p><strong>Bucket ID:</strong> {DATABASE_CONFIG.buckets.artphoto || 'Not set'}</p>
                </div>
            </div>
        </div>
    );
};