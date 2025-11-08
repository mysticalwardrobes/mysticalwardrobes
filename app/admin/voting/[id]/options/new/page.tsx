'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabaseAdmin } from '@/lib/supabase';

export default function NewOptionPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    display_order: 0,
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState('');

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Validate files
    const validFiles: File[] = [];
    const newPreviews: string[] = [];

    files.forEach(file => {
      if (!file.type.startsWith('image/')) {
        setError('Only image files are allowed');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Images must be under 5MB');
        return;
      }
      validFiles.push(file);
      newPreviews.push(URL.createObjectURL(file));
    });

    setSelectedFiles([...selectedFiles, ...validFiles]);
    setPreviews([...previews, ...newPreviews]);
    setError('');
  };

  const removeImage = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSaving(true);

    try {
      // First create the option to get an option ID
      setUploadProgress('Creating option...');
      
      const optionResponse = await fetch(`/api/admin/voting/events/${eventId}/options`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          image_urls: [], // Will update after upload
        }),
      });

      const optionData = await optionResponse.json();

      if (!optionResponse.ok) {
        setError(optionData.error || 'Failed to create option');
        setIsSaving(false);
        return;
      }

      const optionId = optionData.option.id;

      // Upload images if any
      const imageUrls: string[] = [];
      if (selectedFiles.length > 0) {
        setUploadProgress(`Uploading ${selectedFiles.length} image(s)...`);

        for (let i = 0; i < selectedFiles.length; i++) {
          const file = selectedFiles[i];
          const timestamp = Date.now();
          const path = `${eventId}/${optionId}/image-${i}-${timestamp}.${file.name.split('.').pop()}`;

          const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
            .from('voting-option-images')
            .upload(path, file);

          if (uploadError) {
            console.error('Upload error:', uploadError);
            continue;
          }

          // Get public URL
          const { data: { publicUrl } } = supabaseAdmin.storage
            .from('voting-option-images')
            .getPublicUrl(uploadData.path);

          imageUrls.push(publicUrl);
        }

        // Update option with image URLs
        setUploadProgress('Updating option with images...');
        await fetch(`/api/admin/voting/events/${eventId}/options/${optionId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image_urls: imageUrls }),
        });
      }

      // Redirect back to event details
      router.push(`/admin/voting/${eventId}`);
    } catch (err) {
      setError('An error occurred while creating the option');
      setIsSaving(false);
      setUploadProgress('');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl">
        <div className="mb-6">
          <h2 className="text-3xl font-vegawanty text-foreground-darker">
            Add Voting Option
          </h2>
          <p className="font-manrope text-gray-600 mt-1">
            Create a new option for users to vote on
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 font-manrope">{error}</p>
          </div>
        )}

        {uploadProgress && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-600 font-manrope">{uploadProgress}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Option Name */}
          <div>
            <label className="block text-sm font-manrope font-medium text-gray-700 mb-2">
              Option Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-manrope"
              placeholder="e.g., Enchanted Garden Collection"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-manrope font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-manrope"
              placeholder="Describe this collection concept..."
            />
          </div>

          {/* Display Order */}
          <div>
            <label className="block text-sm font-manrope font-medium text-gray-700 mb-2">
              Display Order
            </label>
            <input
              type="number"
              value={formData.display_order}
              onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-manrope"
              placeholder="0"
            />
            <p className="text-xs text-gray-500 mt-1 font-manrope">
              Lower numbers appear first
            </p>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-manrope font-medium text-gray-700 mb-2">
              Images (Optional)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-manrope"
            />
            <p className="text-xs text-gray-500 mt-1 font-manrope">
              Upload multiple images (max 5MB each). Supported: JPG, PNG, WebP
            </p>
          </div>

          {/* Image Previews */}
          {previews.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {previews.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-foreground-darker rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3 bg-primary text-foreground-darker font-manrope rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isSaving ? 'Creating...' : 'Create Option'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              disabled={isSaving}
              className="px-6 py-3 bg-gray-100 text-gray-700 font-manrope rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

