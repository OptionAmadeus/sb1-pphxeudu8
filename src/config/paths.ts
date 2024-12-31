import path from 'path';

export const PATHS = {
  root: path.resolve(__dirname, '../..'),
  src: path.resolve(__dirname, '..'),
  public: path.resolve(__dirname, '../../public'),
  assets: path.resolve(__dirname, '../assets'),
  components: path.resolve(__dirname, '../components'),
  pages: path.resolve(__dirname, '../pages'),
  lib: path.resolve(__dirname, '../lib'),
  utils: path.resolve(__dirname, '../utils'),
} as const;