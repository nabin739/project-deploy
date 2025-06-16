import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { uploadMedia } from '../../utils/api';
import api from '../../utils/api';
import { useAuth } from '../../context/AuthContext'; // Import AuthContext

function MediaUpload() {
  const [files, setFiles] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [logloading, setLogLoading] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth(); // Get logout from AuthContext

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter(file => {
      const isValid = file.type.startsWith('image/') || file.type.startsWith('video/');
      if (!isValid) {
        toast.error(`${file.name} is not a valid image or video file`);
      }
      return isValid;
    });

    if (validFiles.length > 0) {
      setFiles(validFiles);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0 || !title || !description || !category) {
      toast.error('Please fill in all required fields and select at least one file');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();

      files.forEach(file => {
        if (file.type.startsWith('image/')) {
          formData.append('images', file);
        } else if (file.type.startsWith('video/')) {
          formData.append('videos', file);
        }
      });

      formData.append('imageData', JSON.stringify({
        title,
        description,
        marketingVertical: category
      }));

      const response = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        toast.success('Files uploaded successfully');
        setFiles([]);
        setTitle('');
        setDescription('');
        setCategory('');
        navigate('/admin/media');
      } else {
        throw new Error(response.data.message || 'Failed to upload files');
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to upload files';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLogLoading(true);
    try {
      // Optional: Call your logout API if needed
      await api.post('/logout');
      toast.success('Logged out successfully');
      logout(); // Call the context logout to clear auth state and redirect
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error(error.response?.data?.message || error.message || 'Logout failed');
    } finally {
      setLogLoading(false);
    }
  };

  return (
    <div className="min-h-screen container mx-auto px-4 py-8 pt-24">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-10">Upload New Work</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Media Files (Images and Videos)</label>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              className="mt-1 block w-full"
              multiple
              required
            />
            {files.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">Selected files:</p>
                <ul className="list-disc pl-5">
                  {files.map((file, index) => (
                    <li key={index} className="text-sm text-gray-700">
                      {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Category Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select a category</option>
              <option value="Brand Strategy">Brand Strategy</option>
              <option value="Social Media & Content">Social Media & Content</option>
              <option value="SEO & Organic Growth">SEO & Organic Growth</option>
              <option value="marketing">Marketing</option>
              <option value="Email & CRM">Email & CRM</option>
              <option value="Creative & Design">Creative & Design</option>
              <option value="Product Marketing">Product Marketing</option>
              <option value="Analytics & Growth Ops">Analytics & Growth Ops</option>
              <option value="Event & Guerrilla Marketing">Event & Guerrilla Marketing</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              disabled={loading}
              className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Uploading...' : 'Upload'}
            </button>

            <button
              type="button"
              onClick={handleLogout}
              disabled={logloading}
              className={`bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 ${logloading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {logloading ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MediaUpload;
// This code is a React component for uploading media files (images and videos) with additional metadata like title, description, and category.