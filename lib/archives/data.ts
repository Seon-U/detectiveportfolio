import type { Archive } from "./types";

export const ALL_ARCHIVES: Archive[] = [
  {
    id: "001",
    title: "The Anatomy of a Memory Leak",
    date: "2024-01-12",
    summary: "A deep dive into how memory leaks silently accumulate in React applications and the forensic tools to expose them.",
    category: "Notes",
    description: "Memory leaks in React are often invisible until the application grinds to a halt. This note documents the patterns, symptoms, and diagnostic playbook developed across several cases.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    pinnedQuote: {
      body: "The code tells a story. You just have to listen to the variables.",
      attribution: "AP, 2022",
    },
    sections: [
      {
        heading: "Symptoms",
        body: "The application feels sluggish after extended use. Tab memory climbs steadily in DevTools. Animations stutter. Event handlers fire twice. These are the fingerprints of a leak — rarely explosive, always cumulative. In one investigation, a dashboard app consumed 1.4 GB of RAM after 40 minutes of idle use.",
        image: {
          src: "https://images.unsplash.com/photo-1633520833019-e34afd4b8fad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          caption: "Fig 1: Memory consumption graph showing a classic sawtooth leak pattern.",
        },
      },
      {
        heading: "The Usual Suspects",
        body: "Three patterns account for the vast majority of React memory leaks: (1) Event listeners attached in useEffect without cleanup functions. (2) Subscriptions — WebSocket, RxJS, custom pub/sub — that persist after component unmount. (3) Closures that capture stale references to large objects, preventing garbage collection. The third is the most insidious because no obvious code is 'wrong'.",
      },
      {
        heading: "The Autopsy",
        body: "Chrome DevTools Heap Snapshot is the scalpel of choice. Take a baseline snapshot, perform the suspected action, force a garbage collection, take a second snapshot. Filter the diff by 'Objects allocated between snapshots'. The retained objects will point directly to the offending closure or forgotten listener. Once located, the fix is almost always a cleanup function in useEffect's return value.",
        image: {
          src: "https://images.unsplash.com/photo-1595232208179-d8cf4ca455fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          caption: "Fig 2: DevTools heap snapshot diff revealing the retained event listener chain.",
        },
      },
    ],
  },
  {
    id: "002",
    title: "React Context vs Redux: A Bloody History",
    date: "2024-02-03",
    summary: "An opinionated account of when React Context became 'good enough' and when Redux still has a case for its existence.",
    category: "Notes",
    description: "The state management wars have been fought on countless blog posts and conference stages. This note cuts through the noise with concrete usage thresholds derived from real projects.",
    image: "https://images.unsplash.com/photo-1725023860191-74206dfd4982?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    sections: [
      {
        heading: "The Old War",
        body: "Redux arrived in 2015 with a promise: predictable state, time-travel debugging, and a single source of truth. It delivered. But it also delivered boilerplate, indirection, and a learning curve steep enough to deter many. React Context arrived as the supposed successor — built-in, simpler, no extra dependencies. The argument has raged since.",
      },
      {
        heading: "A Study in Contrast",
        body: "Context is synchronous and re-renders every consumer on every value change. For small, infrequently updated state — theme, locale, auth user — this is perfectly fine. For high-frequency updates like a real-time data feed, or for state shared across dozens of components with complex update logic, Context's re-render cost becomes measurable. Redux (or Zustand, Jotai) provides selective subscriptions that Context cannot.",
        image: {
          src: "https://images.unsplash.com/photo-1551029506-0807df4e2031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          caption: "Fig 1: Render profiler comparing Context vs Zustand on a 200-item live list.",
        },
      },
      {
        heading: "Verdict",
        body: "The answer is not ideological. Use Context for low-frequency, app-wide state. Reach for Zustand or Redux Toolkit when you need selective subscriptions, middleware, or devtools-grade state inspection. The mistake is picking a side permanently — the best codebases use both, each for what it does well.",
      },
    ],
  },
  {
    id: "003",
    title: "Why your useEffect is infinite looping",
    date: "2024-03-15",
    summary: "A field guide to the three most common useEffect infinite loop causes and their diagnostic signatures.",
    category: "Notes",
    description: "An infinite render loop from a misbehaving useEffect is one of the most disorienting bugs in React. The browser freezes, the console floods, and the cause is rarely where you expect it.",
    image: "https://images.unsplash.com/photo-1633520833019-e34afd4b8fad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    sections: [
      {
        heading: "The Crime Scene",
        body: "The React DevTools Profiler shows a component rendering hundreds of times per second. The console floods with log messages. The browser tab becomes unresponsive. This is an infinite render loop, almost always triggered by a useEffect that sets state which in turn triggers the effect again.",
      },
      {
        heading: "Common Culprits",
        body: "Three patterns are responsible for nearly every case. First: an object or array created inline in the component body is listed as a dependency — a new reference is created on every render, making the dependency check always fail. Second: a function is called inside useEffect and also listed as a dependency, but the function is redeclared on every render. Third: state is set unconditionally inside useEffect with no dependency array, creating an infinite cycle. The ESLint react-hooks plugin catches the third but misses the first two.",
        image: {
          src: "https://images.unsplash.com/photo-1595232208179-d8cf4ca455fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          caption: "Fig 1: Flamegraph showing component re-rendering every 2ms in an infinite loop.",
        },
      },
      {
        heading: "The Fix",
        body: "For inline objects and arrays: move the value outside the component or use useMemo. For functions: wrap in useCallback, or move the function inside the effect if it doesn't need to be shared. For unconditional state updates: add a conditional check inside the effect before calling setState. In every case, the goal is stable references in the dependency array — values that don't change identity between renders unless their logical content changes.",
      },
    ],
  },
  {
    id: "004",
    title: "WebGL Shader Magic",
    date: "2024-04-22",
    summary: "First contact with GLSL fragment shaders — building a procedural noise background that reacts to mouse position.",
    category: "Experiments",
    description: "An experiment in writing raw WebGL shaders from scratch, without three.js or similar abstractions. The goal: a living, mouse-reactive noise background for a portfolio landing page.",
    image: "https://images.unsplash.com/photo-1551029506-0807df4e2031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    sections: [
      {
        heading: "First Contact with GLSL",
        body: "GLSL is a C-like language executed on the GPU per pixel, every frame. The mental model shift from JavaScript is significant: there are no loops over pixels, no DOM, no callbacks. Instead, a fragment shader is a pure function that receives UV coordinates and outputs a color. Everything — noise, gradients, animation — must be derived from those coordinates and a time uniform.",
      },
      {
        heading: "The Experiment",
        body: "The implementation used a canvas element with a WebGL2 context, two triangles filling the viewport, and a fragment shader implementing Simplex noise. A mouse position uniform was passed each frame via requestAnimationFrame. The noise field was distorted by the mouse distance — closer proximity increased turbulence. The entire shader compiled to 47 lines of GLSL.",
        image: {
          src: "https://images.unsplash.com/photo-1725023860191-74206dfd4982?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          caption: "Fig 1: The noise field reacting to cursor position — turbulence increases near the cursor.",
        },
      },
      {
        heading: "Findings",
        body: "GPU execution is dramatically faster than equivalent Canvas 2D code — 60fps sustained with no measurable CPU overhead. The main difficulty was debugging: shader compilation errors are cryptic strings with line numbers offset from the actual source. Tooling (GLSL Lint VS Code extension) helps significantly. The experiment proved viable for production use as a low-cost ambient background effect.",
      },
    ],
  },
  {
    id: "005",
    title: "Custom Hooks for DOM Manipulation",
    date: "2024-05-10",
    summary: "Building useResizeObserver, useDragToScroll, and useClickOutside as standalone hooks — and where the abstraction breaks down.",
    category: "Experiments",
    description: "Three common DOM interaction patterns extracted into custom hooks, tested across different component architectures. Includes notes on where the hooks fail to generalize.",
    image: "https://images.unsplash.com/photo-1595232208179-d8cf4ca455fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    sections: [
      {
        heading: "The Hypothesis",
        body: "Custom hooks should encapsulate imperative DOM logic and expose a clean declarative interface. The hypothesis: three commonly duplicated DOM patterns — element resize observation, drag-to-scroll on touch and mouse, and outside click detection — could be abstracted into hooks general enough to be dropped into any project without modification.",
      },
      {
        heading: "Implementation",
        body: "useResizeObserver wraps ResizeObserver in a ref callback pattern, exposing width and height as reactive values. useDragToScroll attaches pointerdown, pointermove, and pointerup listeners, using setPointerCapture for reliable cross-device behavior. useClickOutside uses a document-level mousedown listener with a ref comparison. Each hook returns cleanup automatically via useEffect's return function.",
        image: {
          src: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
          caption: "Fig 1: Hook dependency graph — all three are single-responsibility with no shared state.",
        },
      },
      {
        heading: "Results",
        body: "useResizeObserver and useClickOutside generalized cleanly. useDragToScroll failed in one case: when the scroll container was inside a CSS transform context, pointer coordinates were off by the transform offset. The fix required passing the transform matrix as a parameter, which broke the 'drop in and go' goal. Conclusion: DOM hooks generalize well for simple interactions but accumulate escape hatches proportional to layout complexity.",
      },
    ],
  },
];
