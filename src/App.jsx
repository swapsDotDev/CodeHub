import React, { useState, useMemo } from 'react'
import compilersData from './data/compilers.json'
import { FiExternalLink } from 'react-icons/fi'

function Favicon({url, name}) {
  // use Google's favicon service to fetch live favicon
  try {
    const host = new URL(url).hostname
    const src = `https://www.google.com/s2/favicons?sz=64&domain=${host}`
    return <img className="fav" src={src} alt={`${name} icon`} loading="lazy" />
  } catch (e) {
    return <div className="fav placeholder" />
  }
}

export default function App(){
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')
  const [selected, setSelected] = useState(null)

  const categories = useMemo(()=>{
    return ['All', ...Array.from(new Set(compilersData.map(c=>c.category))).sort()]
  },[])

  const filtered = useMemo(()=>{
    return compilersData.filter(c=>{
      const matchQ = q.trim() === '' ? true :
        (c.name + ' ' + (c.description||'') + ' ' + (c.category||'')).toLowerCase().includes(q.toLowerCase())
      const matchCat = (category === '' || category === 'All') ? true : c.category === category
      return matchQ && matchCat
    })
  }, [q, category])

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>CodeHub</h1>
          <p className="subtitle">Aggregator of online compilers & sandboxes — live favicons and bundled descriptions.</p>
        </div>
      </header>

      <section className="controls">
        <input placeholder="Search name, description or category..." value={q} onChange={e=>setQ(e.target.value)} />
        <select value={category} onChange={e=>setCategory(e.target.value)}>
          {categories.map(cat=> <option key={cat} value={cat}>{cat}</option>)}
        </select>
      </section>

      <main className="main">
        <aside className="sidebar">
          {filtered.map(c=> (
            <div key={c.name} className="compilerItem" onClick={()=>setSelected(c)}>
              <Favicon url={c.url} name={c.name} />
              <div className="meta">
                <div className="title">{c.name}</div>
                <div className="cat">{c.category}</div>
              </div>
            </div>
          ))}
        </aside>

        <section className="panel">
          {!selected && <div className="empty">Select a compiler to view details and preview.</div>}
          {selected && (
            <div className="details">
              <div className="topRow">
                <div className="left">
                  <Favicon url={selected.url} name={selected.name} />
                  <div>
                    <h2>{selected.name}</h2>
                    <div className="cat">{selected.category}</div>
                  </div>
                </div>
                <div className="actions">
                  <button onClick={()=>window.open(selected.url, '_blank')} className="btn">Open <FiExternalLink /></button>
                </div>
              </div>

              <p className="desc">{selected.description}</p>

              <div className="iframeWrap">
                <iframe title={selected.name} src={selected.url} sandbox="allow-scripts allow-forms allow-same-origin"></iframe>
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <div>CodeHub React — packed with 50+ compilers. To run: <code>npm install</code> and <code>npm run dev</code>.</div>
      </footer>
    </div>
  )
}
