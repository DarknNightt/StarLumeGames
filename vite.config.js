import { defineConfig } from 'vite';

export default defineConfig({
    base: '/StarlumeGames/', // GitHub Pages repo name
    server: {
        allowedHosts: true,
        host: true,
    },
});
