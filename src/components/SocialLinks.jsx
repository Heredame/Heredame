import { useId } from "react";

const profiles = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61593022102679",
    icon: <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.095 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.931-1.956 1.887v2.265h3.328l-.532 3.49h-2.796V24C19.612 23.095 24 18.1 24 12.073Z" />,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/heredamecl/",
    icon: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.25" />
      </>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/her%C3%A9dame-cl-34863b427/",
    icon: <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />,
  },
];

function SocialLinks() {
  const instagramGradientId = useId();

  return (
    <ul className="social-links">
      {profiles.map(({ name, href, icon }) => (
        <li key={name}>
          <a className={`social-link--${name.toLowerCase()}`} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Herédame — ${name}`} title={name}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true" focusable="false">
              {name === "Instagram" ? (
                <>
                  <defs>
                    <linearGradient id={instagramGradientId} x1="0" y1="1" x2="1" y2="0">
                      <stop offset="0%" stopColor="#FEDA75" />
                      <stop offset="25%" stopColor="#FA7E1E" />
                      <stop offset="50%" stopColor="#D62976" />
                      <stop offset="75%" stopColor="#962FBF" />
                      <stop offset="100%" stopColor="#4F5BD5" />
                    </linearGradient>
                  </defs>
                  <rect width="24" height="24" rx="6" fill={`url(#${instagramGradientId})`} />
                  <g color="#fff" fill="#fff" transform="translate(3 3) scale(0.75)">
                    {icon}
                  </g>
                </>
              ) : icon}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default SocialLinks;
