import { supabaseAdmin } from './supabase';

const BUCKET_NAME = 'voting-option-images';

/**
 * Upload an image to Supabase Storage
 * @param file - File to upload (File or Blob)
 * @param path - Storage path (e.g., 'event-id/option-id/image.jpg')
 * @returns Public URL of uploaded image
 */
export async function uploadOptionImage(
  file: File | Blob,
  path: string
): Promise<string | null> {
  try {
    const { data, error } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }

    // Get public URL
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.error('Error in uploadOptionImage:', error);
    return null;
  }
}

/**
 * Upload multiple images for a voting option
 * @param files - Array of files to upload
 * @param eventId - Event ID for organizing files
 * @param optionId - Option ID for organizing files
 * @returns Array of public URLs
 */
export async function uploadOptionImages(
  files: (File | Blob)[],
  eventId: string,
  optionId: string
): Promise<string[]> {
  const urls: string[] = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const timestamp = Date.now();
    const path = `${eventId}/${optionId}/image-${i}-${timestamp}.jpg`;
    
    const url = await uploadOptionImage(file, path);
    if (url) {
      urls.push(url);
    }
  }

  return urls;
}

/**
 * Delete an image from Supabase Storage
 * @param path - Storage path to delete
 */
export async function deleteOptionImage(path: string): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .remove([path]);

    if (error) {
      console.error('Error deleting image:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteOptionImage:', error);
    return false;
  }
}

/**
 * Delete all images for a voting option
 * @param eventId - Event ID
 * @param optionId - Option ID
 */
export async function deleteOptionImages(
  eventId: string,
  optionId: string
): Promise<void> {
  try {
    const { data: files } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .list(`${eventId}/${optionId}`);

    if (files && files.length > 0) {
      const paths = files.map(file => `${eventId}/${optionId}/${file.name}`);
      await supabaseAdmin.storage
        .from(BUCKET_NAME)
        .remove(paths);
    }
  } catch (error) {
    console.error('Error deleting option images:', error);
  }
}

/**
 * Delete all images for an event
 * @param eventId - Event ID
 */
export async function deleteEventImages(eventId: string): Promise<void> {
  try {
    const { data: folders } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .list(eventId);

    if (folders && folders.length > 0) {
      for (const folder of folders) {
        const { data: files } = await supabaseAdmin.storage
          .from(BUCKET_NAME)
          .list(`${eventId}/${folder.name}`);

        if (files && files.length > 0) {
          const paths = files.map(file => `${eventId}/${folder.name}/${file.name}`);
          await supabaseAdmin.storage
            .from(BUCKET_NAME)
            .remove(paths);
        }
      }
    }
  } catch (error) {
    console.error('Error deleting event images:', error);
  }
}

/**
 * Validate image file
 * @param file - File to validate
 * @returns Validation result
 */
export function validateImage(file: File): { valid: boolean; error?: string } {
  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Only JPEG, PNG, and WebP images are allowed.',
    };
  }

  // Check file size (5MB max)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File size exceeds 5MB limit.',
    };
  }

  return { valid: true };
}

/**
 * Create the storage bucket if it doesn't exist
 */
export async function ensureBucketExists(): Promise<void> {
  try {
    const { data: buckets } = await supabaseAdmin.storage.listBuckets();
    const bucketExists = buckets?.some(b => b.name === BUCKET_NAME);

    if (!bucketExists) {
      await supabaseAdmin.storage.createBucket(BUCKET_NAME, {
        public: true,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
      });
      console.log(`✅ Created storage bucket: ${BUCKET_NAME}`);
    }
  } catch (error) {
    console.error('Error ensuring bucket exists:', error);
  }
}

