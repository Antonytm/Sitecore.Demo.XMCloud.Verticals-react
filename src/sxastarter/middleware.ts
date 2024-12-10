import { rewrite } from '@vercel/edge';
 
export default function middleware(request: Request) {
  console.log(request);
  console.log(request.url);
  console.log(new URL(request.url));

  console.log("VERCEL EDGE MIDDLEWARE");
  if (request.url.startsWith("/en")) {
    return rewrite(new URL('/site_Financial', request.url));
  }
  console.log("VERCEL EDGE MIDDLEWARE END");
}