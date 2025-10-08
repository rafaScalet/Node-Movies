import { defineConfig } from 'tsup';

export default defineConfig({
  entry: { index: 'src/server.ts' },
  outDir: 'dist',
  format: ['esm'],
  clean: true,
  minify: true,
  sourcemap: true,
});
