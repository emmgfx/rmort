export const Header = () => (
  <header>
    <h1 className="text-3xl font-extrabold">RMORT? What&apos;s this?</h1>
    <div className="h-8" />
    <p>
      This page was made to help you to understand how you money can fly away
      with a mortgage and how much relevant are the periodical amortizations.
      Simply fill in the form and you will get a table with the amortization
      table and a graph. The name &quot;RMORT&quot; doesn&apos;t means anything
      special, it&apos;s just R<del className="text-white/50">EACT</del>MORT
      <del className="text-white/50">GAGE</del>.
    </p>
    <div className="h-8" />
    <p className="text-xs">
      This is an{" "}
      <a
        href="https://github.com/emmgfx/rmort"
        target="_blank"
        rel="noreferrer noopener"
        className="text-indigo-400"
      >
        open source project
      </a>{" "}
      made by{" "}
      <a
        href="https://www.viciana.me"
        target="_blank"
        rel="noreferrer noopener"
        className="text-indigo-400"
      >
        Josep Viciana
      </a>{" "}
      with tools like NextJS, Tailwindcss and Recharts. This page doesn&apos;t
      store any data of any type, doesn&apos;t use cookies, and doesn&apos;t
      analize his traffic and doesn&apos;t track you in any way.
    </p>
  </header>
);
