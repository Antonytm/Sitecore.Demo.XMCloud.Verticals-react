import { rewrite } from '@vercel/edge';
 
export default function middleware(request: Request) {
  const url = new URL(request.url);

  console.log("VERCEL EDGE MIDDLEWARE");
  console.log(url);
  if (url.pathname.startsWith("/en")) {
    return rewrite(new URL('/site_Financial', request.url));
  }
  console.log("VERCEL EDGE MIDDLEWARE END");
}