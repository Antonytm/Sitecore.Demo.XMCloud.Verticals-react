import { rewrite } from '@vercel/edge';

export default function middleware(request: Request) {
  console.log(request);
  console.log(request.url);
  console.log(new URL(request.url));

  console.log("VERCEL EDGE MIDDLEWARE");
  if (request.url.indexOf(".js") === -1
    && request.url.indexOf(".css") === -1
    && request.url.indexOf("site_") === -1) {
    if (request.url.startsWith("https://deployment-4nu2c4veudc0r9aare0a-services.vercel.app/")) {
      return rewrite(request.url.replace("https://deployment-4nu2c4veudc0r9aare0a-services.vercel.app/", "https://deployment-4nu2c4veudc0r9aare0a-services.vercel.app/site_Services/"));
    }
    if (request.url.startsWith("https://deployment-4nu2c4veudc0r9aare0a-financial.vercel.app/")) {
      return rewrite(request.url.replace("https://deployment-4nu2c4veudc0r9aare0a-financial.vercel.app/", "https://deployment-4nu2c4veudc0r9aare0a-financial.vercel.app/site_Financial/"));
    }
    if (request.url.startsWith("https://deployment-4nu2c4veudc0r9aare0a-basic.vercel.app/")) {
      return rewrite(request.url.replace("https://deployment-4nu2c4veudc0r9aare0a-basic.vercel.app/", "https://deployment-4nu2c4veudc0r9aare0a-basic.vercel.app/site_Basic/"));
    }
  }
  console.log("VERCEL EDGE MIDDLEWARE END");
}