export function Icon({ name, className = "w-6 h-6" }) {
  const paths = {
    flame:
      "M12 2c1 3-2 4-2 7a4 4 0 108 0c0-1-.5-2-1-2 .3 2-1 3-2 3-1.5 0-2.5-1.5-2-3 .6-2.2 2-3 2-5-1 .5-2.5 1.5-3 5-1 4-4 6-4 9a5 5 0 0010 0c0-4-3-6-4-10-.6 1-1 2-2 1-1-1-.5-3 0-5z",
    bolt: "M13 2L4 14h6l-1 8 9-12h-6l1-8z",
    droplet: "M12 2s7 8 7 13a7 7 0 11-14 0c0-5 7-13 7-13z",
    shield: "M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z",
    book: "M4 4h7a3 3 0 013 3v13a3 3 0 00-3-2H4V4zM20 4h-7a3 3 0 00-3 3v13a3 3 0 013-2h7V4z",
    moon: "M20 14.5A9 9 0 019.5 4a9 9 0 1010.5 10.5z",
    cross: "M11 2h2v9h9v2h-9v9h-2v-9H2v-2h9V2z",
    tree: "M12 2l5 8h-3l4 6h-4v6h-4v-6H6l4-6H7l5-8z",
    sparkle: "M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z",
    pin: "M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z",
    phone: "M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.4 21 3 12.6 3 3c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8z",
    check: "M20 6L9 17l-5-5",
    play: "M8 5v14l11-7z",
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d={paths[name] ?? paths.sparkle} />
    </svg>
  );
}
