/**
 * File Upload Handler
 * Handles file upload to Firebase Storage with validation
 */

// File validation constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

const ALLOWED_EXTENSIONS = ['pdf', 'jpg', 'jpeg', 'png', 'webp'];

/**
 * Validate file
 */
function validateFile(file) {
  const errors = [];

  // Check if file exists
  if (!file) {
    errors.push('No se seleccionó ningún archivo');
    return { valid: false, errors };
  }

  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
    errors.push(`El archivo es muy grande (${sizeMB}MB). Máximo permitido: 5MB`);
  }

  // Check file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    errors.push('Formato no válido. Solo se permiten archivos PDF e imágenes (JPG, PNG, WEBP)');
  }

  // Check file extension
  const fileName = file.name.toLowerCase();
  const hasValidExtension = ALLOWED_EXTENSIONS.some(ext => fileName.endsWith(`.${ext}`));

  if (!hasValidExtension) {
    errors.push('Extensión de archivo no válida');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Format file size for display
 */
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Get file extension
 */
function getFileExtension(filename) {
  return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2).toLowerCase();
}

/**
 * Upload file to Firebase Storage
 */
async function uploadReceiptToStorage(file, firebase) {
  try {
    // Validate file first
    const validation = validateFile(file);
    if (!validation.valid) {
      throw new Error(validation.errors.join(', '));
    }

    // Generate unique filename
    const timestamp = Date.now();
    const extension = getFileExtension(file.name);
    const filename = `receipt_${timestamp}.${extension}`;
    const storagePath = `receipts/${filename}`;

    // Ensure the user has a Firebase auth session before uploading
    const auth = firebase.auth();
    if (!auth.currentUser) {
      await auth.signInAnonymously();
    }

    // Get storage reference
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(storagePath);

    // Upload file
    const snapshot = await fileRef.put(file, {
      contentType: file.type,
      customMetadata: {
        uploadedAt: new Date().toISOString(),
        originalName: file.name,
        size: file.size.toString()
      }
    });

    // Get download URL
    const downloadURL = await snapshot.ref.getDownloadURL();

    return {
      success: true,
      url: downloadURL,
      path: storagePath,
      filename,
      size: file.size,
      type: file.type
    };

  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: error.message || 'Error al subir el archivo'
    };
  }
}

/**
 * Create file preview element
 */
function createFilePreview(file) {
  const preview = document.createElement('div');
  preview.className = 'file-preview';

  const isImage = file.type.startsWith('image/');

  if (isImage) {
    // Image preview
    const img = document.createElement('img');
    img.className = 'preview-image';
    img.file = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);

    preview.appendChild(img);
  } else {
    // PDF icon
    const icon = document.createElement('div');
    icon.className = 'preview-pdf-icon';
    icon.innerHTML = '📄';
    preview.appendChild(icon);
  }

  // File info — use textContent to prevent XSS via crafted filenames
  const info = document.createElement('div');
  info.className = 'preview-info';
  const nameEl = document.createElement('div');
  nameEl.className = 'preview-filename';
  nameEl.textContent = file.name;
  const sizeEl = document.createElement('div');
  sizeEl.className = 'preview-filesize';
  sizeEl.textContent = formatFileSize(file.size);
  info.appendChild(nameEl);
  info.appendChild(sizeEl);
  preview.appendChild(info);

  return preview;
}

/**
 * Show upload progress
 */
function showUploadProgress(percentage) {
  const progressBar = document.querySelector('.upload-progress-bar');
  const progressText = document.querySelector('.upload-progress-text');

  if (progressBar) {
    progressBar.style.width = `${percentage}%`;
  }

  if (progressText) {
    progressText.textContent = `${Math.round(percentage)}%`;
  }
}

/**
 * Show upload success message
 */
function showUploadSuccess(message = 'Archivo subido exitosamente') {
  const successEl = document.querySelector('.upload-success');
  if (successEl) {
    successEl.textContent = message;
    successEl.style.display = 'block';

    setTimeout(() => {
      successEl.style.display = 'none';
    }, 5000);
  }
}

/**
 * Show upload error message
 */
function showUploadError(message = 'Error al subir el archivo') {
  const errorEl = document.querySelector('.upload-error');
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.style.display = 'block';
  }
}

/**
 * Clear upload error
 */
function clearUploadError() {
  const errorEl = document.querySelector('.upload-error');
  if (errorEl) {
    errorEl.style.display = 'none';
  }
}

// Export functions for Node.js (if available)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    validateFile,
    formatFileSize,
    getFileExtension,
    uploadReceiptToStorage,
    createFilePreview,
    showUploadProgress,
    showUploadSuccess,
    showUploadError,
    clearUploadError,
    MAX_FILE_SIZE,
    ALLOWED_TYPES,
    ALLOWED_EXTENSIONS
  };
}

// Export functions for browser (global window object)
if (typeof window !== 'undefined') {
  window.validateFile = validateFile;
  window.formatFileSize = formatFileSize;
  window.getFileExtension = getFileExtension;
  window.uploadReceiptToStorage = uploadReceiptToStorage;
  window.createFilePreview = createFilePreview;
  window.showUploadProgress = showUploadProgress;
  window.showUploadSuccess = showUploadSuccess;
  window.showUploadError = showUploadError;
  window.clearUploadError = clearUploadError;
  window.MAX_FILE_SIZE = MAX_FILE_SIZE;
  window.ALLOWED_TYPES = ALLOWED_TYPES;
  window.ALLOWED_EXTENSIONS = ALLOWED_EXTENSIONS;
}
