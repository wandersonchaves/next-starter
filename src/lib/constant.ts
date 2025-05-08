import { env } from '@/env.mjs';
import * as m from '@/paraglide/messages';

export const siteConfig = {
  title: m.meta_title,
  description: m.meta_description,
  keywords: () => [
    m.meta_keyword_next(),
    m.meta_keyword_react(),
    m.meta_keyword_next_commerce(),
    m.meta_keyword_next_boilerplate(),
    m.meta_keyword_commerce_template(),
    m.meta_keyword_tailwindcss(),
    m.meta_keyword_typescript(),
    m.meta_keyword_shadcn_ui(),
    m.meta_keyword_next_auth(),
    m.meta_keyword_prisma(),
  ],
  url: () => env.APP_URL,
  googleSiteVerificationId: () => env.GOOGLE_SITE_VERIFICATION_ID || '',
};
