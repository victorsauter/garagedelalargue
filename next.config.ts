import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  serverExternalPackages: ['bcryptjs', '@prisma/client'],
  images: {
    remotePatterns: [
      {protocol: 'https', hostname: 'images.unsplash.com'},
      {protocol: 'https', hostname: '*.public.blob.vercel-storage.com'},
      {protocol: 'https', hostname: 'public.blob.vercel-storage.com'},
    ],
  },
};

export default withNextIntl(nextConfig);
