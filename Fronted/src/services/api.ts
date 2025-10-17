import { ProcessOptions, ProcessResults } from '../types';

const API_BASE_URL = 'http://localhost:8000';

export class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'APIError';
  }
}

export const api = {
  async processText(text: string, options: ProcessOptions, customStopwords?: string[]): Promise<ProcessResults> {
    try {
      const response = await fetch(`${API_BASE_URL}/process`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          options,
          custom_stopwords: customStopwords,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new APIError(response.status, errorData.detail || 'Processing failed');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Cannot connect to backend server. Make sure the Python backend is running on port 8000.');
      }
      throw new Error('An unexpected error occurred while processing your text.');
    }
  },

  async fullPreprocessing(text: string, customStopwords?: string[]): Promise<ProcessResults> {
    try {
      const response = await fetch(`${API_BASE_URL}/full`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          custom_stopwords: customStopwords,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
        throw new APIError(response.status, errorData.detail || 'Processing failed');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Cannot connect to backend server. Make sure the Python backend is running on port 8000.');
      }
      throw new Error('An unexpected error occurred while processing your text.');
    }
  },

  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch {
      return false;
    }
  },
};
