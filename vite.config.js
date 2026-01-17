import { defineConfig } from 'vite';

export default defineConfig({
    base: '/StarLumeGames/', // GitHub Pages repo name
    server: {
        allowedHosts: true,
        host: true,
    },
});
