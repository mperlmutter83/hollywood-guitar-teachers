import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leave a Review | Hollywood Guitar Teachers",
  description: "Leave Hollywood Guitar Teachers a review on Google or Yelp.",
};

const reviews = [
  { label: "Leave a Google Review", href: "https://g.page/r/CWMzR55AgPGAEBM/", kind: "google" },
  { label: "Leave a Yelp Review", href: "https://www.yelp.com/biz/hollywood-guitar-teachers-los-angeles", kind: "yelp" },
];

function GoogleLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45c-.28 1.48-1.12 2.73-2.39 3.57v2.97h3.86c2.26-2.09 3.58-5.17 3.58-8.73z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.91l-3.86-2.97c-1.07.72-2.44 1.15-4.08 1.15-3.14 0-5.8-2.12-6.75-4.97H1.29v3.06C3.26 21.3 7.31 24 12 24z" />
      <path fill="#FBBC05" d="M5.25 14.3c-.24-.72-.38-1.49-.38-2.3s.14-1.58.38-2.3V6.64H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.36l3.96-3.06z" />
      <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.61 4.58 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.64l3.96 3.06C6.2 6.89 8.86 4.77 12 4.77z" />
    </svg>
  );
}

function YelpLogo() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l2.9 6.2 6.6.8-4.9 4.6 1.3 6.6L12 16.9 6.1 20.2l1.3-6.6L2.5 9l6.6-.8L12 2z" />
    </svg>
  );
}

export default function ReviewsPage() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
          Click Below to Leave Us a Review
        </h1>
        <p className="mb-10 text-gray-600">
          Your feedback helps others find Hollywood Guitar Teachers and helps us keep improving.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          {reviews.map((review) => (
            <a
              key={review.label}
              href={review.href}
              target="_blank"
              rel="noopener noreferrer"
              className={
                review.kind === "yelp"
                  ? "inline-flex w-full items-center justify-center gap-3 rounded-lg bg-[#d32323] px-8 py-4 font-semibold text-white shadow-sm transition-colors hover:bg-[#b81d1d] sm:w-auto"
                  : "inline-flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-8 py-4 font-semibold text-gray-900 shadow-sm transition-shadow hover:shadow-md sm:w-auto"
              }
            >
              {review.kind === "google" ? <GoogleLogo /> : <YelpLogo />}
              {review.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
