import React, { useState, useMemo, useEffect } from "react";
import compilersData from "./data/compilers.json";
import { FiExternalLink, FiCode, FiSearch, FiGrid } from "react-icons/fi";
import "./styles.css";

function Favicon({ url, name }) {
  try {
    const host = new URL(url).hostname;
    const src = `https://www.google.com/s2/favicons?sz=64&domain=${host}`;
    return (
      <img className="fav" src={src} alt={`${name} icon`} loading="lazy" />
    );
  } catch (e) {
    return <div className="fav placeholder" />;
  }
}

function SEOHead() {
  useEffect(() => {
    document.title = "CodeHub - Online Compiler & Sandbox Directory | 50+ Coding Platforms";
    if (!document.querySelector('meta[name="viewport"]')) {
      const metaViewport = document.createElement('meta');
      metaViewport.name = "viewport";
      metaViewport.content = "width=device-width, initial-scale=1";
      document.head.appendChild(metaViewport);
    }
    
    const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
    metaDescription.name = "description";
    metaDescription.content = "Discover 50+ online compilers, code editors, and development sandboxes. Find the perfect coding environment for JavaScript, Python, React, and more.";
    if (!document.querySelector('meta[name="description"]')) {
      document.head.appendChild(metaDescription);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]') || document.createElement('meta');
    metaKeywords.name = "keywords";
    metaKeywords.content = "online compiler, code editor, sandbox, programming, javascript, python, react, codepen, jsfiddle, replit";
    if (!document.querySelector('meta[name="keywords"]')) {
      document.head.appendChild(metaKeywords);
    }

    const metaRobots = document.querySelector('meta[name="robots"]') || document.createElement('meta');
    metaRobots.name = "robots";
    metaRobots.content = "index, follow";
    if (!document.querySelector('meta[name="robots"]')) {
      document.head.appendChild(metaRobots);
    }

    // Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]') || document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    ogTitle.content = "CodeHub - Online Compiler Directory";
    if (!document.querySelector('meta[property="og:title"]')) {
      document.head.appendChild(ogTitle);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]') || document.createElement('meta');
    ogDescription.setAttribute('property', 'og:description');
    ogDescription.content = "Find the best online coding environments and compilers for all programming languages";
    if (!document.querySelector('meta[property="og:description"]')) {
      document.head.appendChild(ogDescription);
    }

    const ogType = document.querySelector('meta[property="og:type"]') || document.createElement('meta');
    ogType.setAttribute('property', 'og:type');
    ogType.content = "website";
    if (!document.querySelector('meta[property="og:type"]')) {
      document.head.appendChild(ogType);
    }
  }, []);

  return null;
}

export default function App() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page to 1 when search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [q, category]);
  const itemsPerPage = 8;

  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(compilersData.map((c) => c.category))).sort()];
  }, []);

  const filtered = useMemo(() => {
    return compilersData.filter((c) => {
      const matchQ =
        q.trim() === ""
          ? true
          : (c.name + " " + (c.description || "") + " " + (c.category || ""))
              .toLowerCase()
              .includes(q.toLowerCase());
      const matchCat =
        category === "" || category === "All" ? true : c.category === category;
      return matchQ && matchCat;
    });
  }, [q, category]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);

  const changePage = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <SEOHead />
      <div className="app">
        {/* Floating Orbs */}
        <div className="floating-orbs" aria-hidden="true">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>

        <header className="header glass-panel">
          <div className="header-content">
            <div className="logo-section">
              <FiCode className="logo-icon" />
              <h1>CodeHub</h1>
            </div>
            <p className="subtitle">
              Discover 50+ online compilers & coding sandboxes with live previews and detailed descriptions
            </p>
          </div>
        </header>

        <section className="controls">
          <div className="search-wrapper">
            <FiSearch className="search-icon" />
            <input
              placeholder="Search by name, description, or category..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search compilers and sandboxes"
            />
          </div>
          <div className="select-wrapper">
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Filter by category"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "All" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>
          <button
            className="btn glass-btn"
            style={{height: '40px', marginLeft: '8px', whiteSpace: 'nowrap'}}
            disabled
            aria-label="Add new compiler"
            title="Feature coming soon"
          >
            + Add Compiler
          </button>
        </section>

        <main className="gridView">
          <div className="grid-header">
            <FiGrid className="grid-icon" />
            <h2>Available Platforms ({filtered.length})</h2>
          </div>
          
          <div className="grid-container">
            {paginatedData.map((c, index) => (
              <article key={c.name} className="gridItem glass-card">
                <div className="card-header">
                  <Favicon url={c.url} name={c.name} />
                  <div className="card-meta">
                    <h3>{c.name}</h3>
                    <span className="category-tag">{c.category}</span>
                  </div>
                </div>
                <p className="desc">{c.description}</p>
                <button
                  onClick={() => window.open(c.url, "_blank", "noopener,noreferrer")}
                  className="btn glass-btn"
                  aria-label={`Open ${c.name} in new tab`}
                >
                  Launch Platform <FiExternalLink />
                </button>
              </article>
            ))}
          </div>

          {paginatedData.length === 0 && (
            <div className="empty-state glass-panel">
              <FiSearch size={48} />
              <h3>No platforms found</h3>
              <p>Try adjusting your search terms or category filter</p>
            </div>
          )}
        </main>

        {totalPages > 1 && (
          <nav className="pagination" aria-label="Pagination Navigation">
            <button 
              onClick={() => changePage(currentPage - 1)} 
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              Previous
            </button>
            {[...Array(Math.min(5, totalPages))].map((_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage > totalPages - 3) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={i}
                  onClick={() => changePage(pageNum)}
                  className={currentPage === pageNum ? "active" : ""}
                  aria-label={`Page ${pageNum}`}
                  aria-current={currentPage === pageNum ? "page" : undefined}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              Next
            </button>
          </nav>
        )}

        <footer className="footer glass-panel">
          <div>
            <strong>CodeHub</strong> — Curated directory of online development environments.<br />
            Built with React and modern web technologies.<br />
            <span style={{fontSize: '13px', color: 'rgba(255,255,255,0.7)'}}>
              &copy; {new Date().getFullYear()} CodeHub. Made with <span style={{color: '#e25555'}}>&#10084;&#65039;</span> by Swapnil.
            </span>
          </div>
        </footer>
      </div>
    </>
  );
}