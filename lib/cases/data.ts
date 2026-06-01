import type { Case } from "./types";

export const ALLCASES: Case[] = [
  {
    id: "001",
    title: "Project Chimera",
    summary: "A complex web platform with heavily tangled state logic.",
    tags: ["React", "State Management", "Redux"],
    status: "SOLVED",
    date: "1994-10-24",
    image:
      "https://images.unsplash.com/photo-1633520833019-e34afd4b8fad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGQlMjBjbGFzc2lmaWVkJTIwZm9sZGVyfGVufDF8fHx8MTc3OTUzNTExM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    images: [
      "https://images.unsplash.com/photo-1633520833019-e34afd4b8fad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1579856703268-d123303cbd57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    description:
      "A complex web platform with heavily tangled state logic causing memory leaks and unpredictable render cycles.",
    projectUrl: "https://github.com",
    sections: [
      {
        heading: "The Incident",
        body: "The initial premise seemed sound. We had built the architecture according to the blueprints, yet the resulting structure exhibited signs of instability under stress. It started as a whisper — a slight delay in the UI, an anomalous network request — but soon grew into a cascade of uncaught exceptions.",
        image: {
          src: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          caption: "Fig 1: Visual representation of the data flow bottleneck.",
        },
      },
      {
        heading: "Gathering Evidence",
        body: "We compiled logs. Thousands of lines of textual evidence pointing to a singular conclusion: the state was mutating unpredictably. A rogue useEffect was caught red-handed dispatching state updates without proper dependency arrays, causing an infinite render loop. The culprit tried to hide within a deeply nested Context provider, but performance profiling exposed the timeline.",
      },
      {
        heading: "Resolution",
        body: "The fix wasn't a new library or architectural overhaul, but a fundamental restructuring of dependency arrays and strict memoization. By isolating the offending closure and rewriting the subscription logic, render count dropped from 847 to a stable 3 per interaction. Case closed.",
        image: {
          src: "https://images.unsplash.com/photo-1579856703268-d123303cbd57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          caption: "Fig 2: Final documentation placed in the permanent archives.",
        },
      },
    ],
  },
  {
    id: "002",
    title: "The Silent API",
    summary:
      "Investigating the disappearance of crucial data points in a high-traffic app.",
    tags: ["Next.js", "API", "Performance"],
    status: "HOLDED",
    date: "2010-07-10",
    image:
      "https://images.unsplash.com/photo-1725023860191-74206dfd4982?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBzdHJpbmclMjBjb25zcGlyYWN5JTIwYm9hcmR8ZW58MXx8fHwxNzc5NTM1MTEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "Crucial data points vanish between client and server with no trace in logs. The API responds 200 but delivers silence.",
    sections: [
      {
        heading: "First Contact",
        body: "The client reported intermittent data loss. Not a crash — a silence. Endpoints returned 200 status codes yet the response payload arrived empty. The system logs showed nothing unusual. This was the troubling part: no error, no trace, only absence.",
      },
      {
        heading: "The Trail Goes Cold",
        body: "Network inspection revealed the requests were being intercepted by a middleware layer added three sprints ago. A content-negotiation header mismatch caused the serializer to silently drop the payload under specific load conditions. Reproducible only above 3,000 concurrent users.",
        image: {
          src: "https://images.unsplash.com/photo-1551029506-0807df4e2031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          caption: "Fig 1: Network trace showing the dropped payload window.",
        },
      },
      {
        heading: "Status: On Hold",
        body: "A temporary patch was deployed to serialize the offending header before it reaches the middleware. The root cause — a race condition in the serializer's thread pool — requires a deeper refactor scheduled for Q3. Investigation is paused pending resource allocation.",
      },
    ],
  },
  {
    id: "003",
    title: "Enigma Protocol",
    summary: "Reverse-engineering a legacy authentication system.",
    tags: ["Authentication", "Security", "OAuth"],
    status: "ONGOING",
    date: "2017-09-08",
    image:
      "https://images.unsplash.com/photo-1551029506-0807df4e2031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWdpY2FsJTIwZ2xvd2luZyUyMHNwZWxsJTIwYm9va3xlbnwxfHx8fDE3Nzk1MzUxMTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    description:
      "A 15-year-old authentication system with no documentation, no original authors, and a codebase that predates modern OAuth standards.",
    projectUrl: "https://github.com",
    sections: [
      {
        heading: "The Brief",
        body: "The mission: modernize a monolithic auth system without a single day of downtime. No documentation exists. The original engineers have long since departed. The codebase predates OAuth 2.0, relies on proprietary session tokens, and serves 40,000 active users.",
        image: {
          src: "https://images.unsplash.com/photo-1633520833019-e34afd4b8fad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          caption: "Fig 1: The original auth flowchart, recovered from an archived PDF.",
        },
      },
      {
        heading: "Deciphering the Cipher",
        body: "By mapping all token validation paths via static analysis, we identified three undocumented edge cases in the session renewal logic. These had been silently failing for an estimated 2.3% of users on token refresh — a bug that had existed undetected for over a decade.",
      },
      {
        heading: "Active Investigation",
        body: "The migration to OAuth 2.0 + PKCE is 60% complete. A shadow-mode dual-auth system is running in parallel, validating tokens against both the legacy and new systems before any hard cutover. Expected completion: Q4.",
      },
    ],
  },
];
