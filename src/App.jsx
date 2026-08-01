import { useEffect, useState } from 'react'
import { artworks, themes } from './data/artworks'
import './App.css'

function App() {
  const [entered, setEntered] = useState(false)
  const [theme, setTheme] = useState('All')
  const [selected, setSelected] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [arrivalArt, setArrivalArt] = useState(0)

  useEffect(() => {
    document.body.classList.toggle('locked', !entered || Boolean(selected))
    return () => document.body.classList.remove('locked')
  }, [entered, selected])

  useEffect(() => {
    if (entered || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const interval = window.setInterval(() => {
      setArrivalArt((current) => (current + 1) % artworks.length)
    }, 5200)
    return () => window.clearInterval(interval)
  }, [entered])

  const filtered = theme === 'All' ? artworks : artworks.filter((art) => art.theme === theme)

  return <div className="site-shell">
    {!entered && <section className="arrival" aria-label="Welcome to Jasmine Ware">
      <div className="arrival-gallery" aria-hidden="true">
        {artworks.map((art, index) => (
          <img key={art.slug} className={index === arrivalArt ? 'active' : ''} src={art.image} alt="" />
        ))}
      </div>
      <div className="arrival-shade" />
      <div className="grain" />
      <p className="arrival-line">Every canvas begins with a feeling.</p>
      <div className="arrival-name"><span>Jasmine Ware</span><small>Visual storyteller</small></div>
      <span className="arrival-count">{String(arrivalArt + 1).padStart(2,'0')} / {String(artworks.length).padStart(2,'0')}</span>
      <button className="enter-button" onClick={() => setEntered(true)}><span>Enter her world</span></button>
    </section>}

    <header className="nav">
      <a className="monogram" href="#top" aria-label="Jasmine Ware home">JW</a>
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen}>{menuOpen ? 'Close' : 'Index'}</button>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
        {['Story','Works','Studio','Commission'].map((item) => <a key={item} href={`#${item === 'Works' ? 'collection' : item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
      </nav>
    </header>

    <main id="top">
      <section className="hero-section">
        <div className="hero-kicker">An evolving archive of feeling</div>
        <h1><span>I don’t paint people.</span><em>I paint feelings.</em></h1>
        <div className="hero-art"><img src="/art/empty-flesh.png" alt="Empty Flesh, a surreal figure on a luminous yellow ground" /><div className="gold-mark" /></div>
      </section>

      <aside className="upcoming-show" aria-labelledby="upcoming-show-title">
        <div className="show-date" aria-label="September 26"><span>Sep</span><strong>26</strong></div>
        <div className="show-copy">
          <p className="eyebrow">Upcoming exhibition</p>
          <h2 id="upcoming-show-title">Pancakes &amp; Booze</h2>
          <p>Jasmine Ware · Penn Social · Washington, D.C.</p>
        </div>
        <figure className="show-image"><img src="/art/gallery-installation.png" alt="A gallery installation featuring several paintings by Jasmine Ware" /><figcaption>Installation view</figcaption></figure>
        <a href="https://www.pennsocialdc.com/" target="_blank" rel="noreferrer">Explore the venue <span>↗</span></a>
      </aside>

      <section className="why section-pad" id="story">
        <p className="eyebrow">01 — Meet Jasmine</p>
        <div className="why-grid">
          <h2>Some stories refuse<br />to stay inside us.</h2>
          <div className="why-copy">
            <p>Some become poems. Others become paint.</p>
            <p>For Jasmine Ware, every canvas becomes a conversation between emotion and identity.</p>
            <blockquote className="artist-motto">
              “I only have time for bad moments, not bad days. Every storm runs out of rain.”
              <cite>— Jasmine’s motto</cite>
            </blockquote>
          </div>
        </div>
        <div className="portrait-block">
          <img src="/art/jasmine-portrait-cropped.png" alt="Jasmine Ware in a quiet moment with pencil in hand" />
          <blockquote>“Artists are here to disturb the peace.” <cite>— James Baldwin</cite></blockquote>
        </div>
      </section>

      <section className="journey section-pad">
        <p className="eyebrow">02 — The Journey</p>
        {[
          ['Finding my voice','What cannot be said can still be seen.','Shape becomes language. Color becomes memory. The canvas holds what the body no longer can.'],
          ['Black womanhood','Softness is not the opposite of power.','These figures take up space without asking permission—vulnerable, complex, and becoming.'],
          ['Healing through color','Every layer leaves something behind.','Blue for the interior. Gold for what survives. Yellow for the courage to be witnessed.'],
        ].map(([label,title,copy]) => <div className="chapter-row" key={label}><span>{label}</span><h3>{title}</h3><p>{copy}</p></div>)}
      </section>

      <section className="collection" id="collection">
        <div className="section-pad collection-head"><p className="eyebrow">03 — Selected Works</p><h2>The Collection</h2></div>
        {artworks.slice(0,4).map((art,index) => <article className={`art-panel art-${index + 1}`} key={art.slug}>
          <button className="art-image-button" onClick={() => setSelected(art)} aria-label={`View ${art.title}`}><img src={art.image} alt={`${art.title} by Jasmine Ware`} loading={index ? 'lazy' : 'eager'} /></button>
          <div className="art-meta"><span>{String(index + 1).padStart(2,'0')}</span><div><h3>{art.title}</h3><p>{art.theme} · {art.year}</p></div><button onClick={() => setSelected(art)}>Enter the work ↗</button></div>
        </article>)}
      </section>

      <section className="studio section-pad" id="studio">
        <div className="studio-title"><p className="eyebrow">04 — Inside the Studio</p><h2>Late night<br /><i>art sessions.</i></h2></div>
        <div className="studio-grid">
          <figure className="studio-main"><img src="/art/up-in-smoke-wip-cropped.png" alt="Jasmine painting white flowing lines for Up in Smoke" loading="lazy" /><figcaption>Current WIP — “Up in Smoke”</figcaption></figure>
          <figure className="studio-side"><img src="/art/empty-flesh-studio-cropped.png" alt="Jasmine beside the finished Empty Flesh painting" loading="lazy" /><figcaption>From late-night layers to varnish</figcaption></figure>
        </div>
        <div className="studio-note">
          <p className="eyebrow">The work after midnight</p>
          <p>Jasmine’s studio practice is intuitive and layered—an idea begins quietly, then finds its shape through color, texture, and repetition. These late-night sessions are where emotion becomes image and a canvas begins to speak.</p>
        </div>
      </section>

      <section className="themes section-pad" id="gallery">
        <p className="eyebrow">05 — The Gallery</p>
        <div className="theme-intro"><h2>Find the feeling.<br />Enter the work.</h2><p>Explore the full collection or filter the room by theme.</p></div>
        <div className="theme-buttons">{themes.map((item) => <button key={item} className={theme === item ? 'active' : ''} onClick={() => setTheme(item)}>{item}</button>)}</div>
        <div className="wall" aria-live="polite" aria-label={`${theme} gallery selection`}>{filtered.map((art) => <button key={art.slug} onClick={() => setSelected(art)} aria-label={`View ${art.title}`}><img src={art.image} alt="" loading="lazy" /><span>{art.title}</span></button>)}</div>
      </section>

      <section className="commission section-pad" id="commission">
        <p className="eyebrow">06 — Commission a Story</p>
        <div className="commission-grid"><div><h2>Let’s create something<br /><i>that speaks for you.</i></h2><p>A commission begins with a feeling, a memory, or a person you want to hold differently.</p></div>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>Tell Jasmine what you have in mind<textarea rows="7" placeholder="Share the memory, person, feeling, colors, size, budget, or timeline—whatever matters to the story." /></label>
            <div className="form-row"><label>Your name<input type="text" /></label><label>Email<input type="email" /></label></div>
            <button type="submit">Begin the conversation ↗</button><small>Form placeholder — connect Jasmine’s preferred inquiry email before launch.</small>
          </form>
        </div>
      </section>

      <footer><blockquote>Every painting begins with my story.<br />The moment you see yourself in it…<br /><em>it becomes yours.</em></blockquote><div className="footer-row"><a href="https://www.instagram.com/j_drewitt" target="_blank" rel="noreferrer">Instagram ↗</a><a href="#commission">Commission inquiry ↗</a><a href="https://www.blackburn.works" target="_blank" rel="noreferrer">Blackburn Works LLC ↗</a><span>© {new Date().getFullYear()} Jasmine Ware</span></div></footer>
    </main>

    {selected && <div className="art-dialog" role="dialog" aria-modal="true" aria-label={selected.title}>
      <button className="dialog-close" onClick={() => setSelected(null)}>Close ×</button>
      <div className="dialog-image"><img src={selected.image} alt={`${selected.title} by Jasmine Ware`} /></div>
      <div className="dialog-copy"><p className="eyebrow">{selected.theme} — {selected.year}</p><h2>{selected.title}</h2><p className="statement">{selected.statement}</p><dl><div><dt>Medium</dt><dd>{selected.medium}</dd></div><div><dt>Dimensions</dt><dd>{selected.dimensions}</dd></div><div><dt>Availability</dt><dd>{selected.status}</dd></div></dl><p className="editable">Artist note placeholder — replace with Jasmine’s own words.</p><a href="#commission" onClick={() => setSelected(null)}>Commission a story ↗</a></div>
    </div>}
  </div>
}

export default App
