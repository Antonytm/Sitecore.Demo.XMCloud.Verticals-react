import { rewrite } from '@vercel/edge';
 
export default function middleware(request: Request) {
  console.log(request);
  console.log(request.url);
  console.log(new URL(request.url));

  console.log("VERCEL EDGE MIDDLEWARE");
  if (request.url.startsWith("https://deployment-4nu2c4veudc0r9aare0a-services.vercel.app/")) {
    return rewrite("https://deployment-4nu2c4veudc0r9aare0a-services.vercel.app/site_Basic/en");
  }
  console.log("VERCEL EDGE MIDDLEWARE END");
}