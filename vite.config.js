import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './', // ใช้ได้ทั้งบน GitHub Pages (/website-Thai-Massage-Museum/) และรันแบบ Local/Kiosk
  plugins: [react()],
});