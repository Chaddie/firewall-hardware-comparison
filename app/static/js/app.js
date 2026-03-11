/* Firewall Comparison Web App */

const state = {
  vendors: {},
  hardware: {},
  features: {},
  takeaways: [],
  healthcheck: { questions: [] },
  takedown: { sophos_strengths: [], vendor_comparisons: {} },
  activeVendors: new Set(),
  activeTab: "overview",
  hcAnswers: {},
  hcStep: 0,
  hcDone: false,
  hcReportView: "exec",
  tdSelectedVendor: null,
  discovery: { products: [] },
  discMode: "guided",
  discProduct: null,
  discStep: 0,
  discNotes: {},
  discGuidedDone: false,
  licensing: { bundles: [], a_la_carte: [], bundle_comparison: [] },
  haGuide: {},
};

// ── Bootstrap ──
document.addEventListener("DOMContentLoaded", async () => {
  await loadData();
  initNav();
  initVendorFilters();
  renderOverview();
  renderHardwareTiers();
  renderFeatures();
  renderTakeaways();
  renderHealthCheckStart();
  renderTakedownPage();
  renderDiscoveryPage();
  renderLicensingPage();
  renderHAGuidePage();
  initChat();
  showTab("overview");
});

async function loadData() {
  const [vendors, hardware, features, takeaways, healthcheck, takedown, discovery, licensing, haGuide] = await Promise.all([
    fetch("/api/vendors").then((r) => r.json()),
    fetch("/api/hardware").then((r) => r.json()),
    fetch("/api/features").then((r) => r.json()),
    fetch("/api/takeaways").then((r) => r.json()),
    fetch("/api/healthcheck").then((r) => r.json()),
    fetch("/api/takedown").then((r) => r.json()),
    fetch("/api/discovery").then((r) => r.json()),
    fetch("/api/licensing").then((r) => r.json()),
    fetch("/api/ha-guide").then((r) => r.json()),
  ]);
  state.vendors = vendors;
  state.hardware = hardware;
  state.features = features;
  state.takeaways = takeaways;
  state.healthcheck = healthcheck;
  state.takedown = takedown;
  state.discovery = discovery;
  state.licensing = licensing;
  state.haGuide = haGuide;
  Object.keys(vendors).forEach((v) => state.activeVendors.add(v));
}

// ── Navigation ──
function initNav() {
  document.querySelectorAll(".main-nav button").forEach((btn) => {
    if (btn.dataset.tab === "ask") return; // handled by initChat
    btn.addEventListener("click", () => showTab(btn.dataset.tab));
  });
}

function showTab(tab) {
  state.activeTab = tab;
  document.querySelectorAll(".main-nav button").forEach((b) => {
    b.classList.toggle("active", b.dataset.tab === tab);
  });
  document.querySelectorAll(".page-section").forEach((s) => {
    s.classList.toggle("active", s.id === `section-${tab}`);
  });
}

// ── Vendor filter chips ──
function initVendorFilters() {
  const container = document.getElementById("vendor-filters");
  container.innerHTML = "";

  const allChip = el("button", {
    className: "vendor-chip active",
    innerHTML: "All Vendors",
    onclick: () => toggleAll(),
  });
  allChip.id = "chip-all";
  container.appendChild(allChip);

  for (const [key, v] of Object.entries(state.vendors)) {
    const chip = el("button", {
      className: "vendor-chip active",
      dataset: { vendor: key },
      innerHTML: `<span class="dot" style="background:${v.color}"></span>${v.name}`,
      onclick: () => toggleVendor(key),
    });
    container.appendChild(chip);
  }
}

function toggleVendor(key) {
  if (state.activeVendors.has(key)) {
    state.activeVendors.delete(key);
  } else {
    state.activeVendors.add(key);
  }
  syncFilterUI();
  applyFilters();
}

function toggleAll() {
  const allActive = state.activeVendors.size === Object.keys(state.vendors).length;
  if (allActive) {
    state.activeVendors.clear();
  } else {
    Object.keys(state.vendors).forEach((v) => state.activeVendors.add(v));
  }
  syncFilterUI();
  applyFilters();
}

function syncFilterUI() {
  const allActive = state.activeVendors.size === Object.keys(state.vendors).length;
  const allChip = document.getElementById("chip-all");
  if (allChip) allChip.classList.toggle("active", allActive);

  document.querySelectorAll(".vendor-chip[data-vendor]").forEach((chip) => {
    chip.classList.toggle("active", state.activeVendors.has(chip.dataset.vendor));
  });
}

function applyFilters() {
  document.querySelectorAll("[data-vendor-id]").forEach((el) => {
    const visible = state.activeVendors.has(el.dataset.vendorId);
    el.classList.toggle("dimmed", !visible);
  });
}

// ── Overview cards ──
function renderOverview() {
  const grid = document.querySelector("#section-overview .card-grid");
  grid.innerHTML = "";
  for (const [key, v] of Object.entries(state.vendors)) {
    const card = el("div", {
      className: "card",
      dataset: { vendorId: key },
      innerHTML: `
        <h3><span class="dot" style="background:${v.color}"></span>${v.name}</h3>
        <p>${v.description}</p>
        <ul>${v.highlights.map((h) => `<li>${h}</li>`).join("")}</ul>
      `,
    });
    grid.appendChild(card);
  }
}

// ── Hardware tier tables ──
function renderHardwareTiers() {
  const container = document.getElementById("hw-tables");
  container.innerHTML = "";

  for (const [tierKey, tier] of Object.entries(state.hardware)) {
    const section = document.createElement("div");
    section.innerHTML = `
      <div class="section-head">
        <h2>${tier.title}</h2>
        <p>${tier.subtitle}</p>
      </div>
    `;

    const wrap = el("div", { className: "table-wrap" });
    const table = document.createElement("table");

    const badgeClass = `badge-${tierKey}`;

    table.innerHTML = `
      <thead>
        <tr>
          ${tier.columns.map((c) => `<th>${c}</th>`).join("")}
          <th>Tier</th>
        </tr>
      </thead>
      <tbody>
        ${tier.rows
          .map((r) => {
            const vendor = state.vendors[r.vendor];
            return `<tr data-vendor-id="${r.vendor}">
              <td><span class="vendor-name"><span class="dot" style="background:${vendor.color}"></span>${vendor.name.split("(")[0].trim()} ${r.model}</span></td>
              <td>${r.fw_throughput}</td>
              <td>${r.ngfw_throughput}</td>
              <td>${r.interfaces}</td>
              <td>${r.form_factor}</td>
              <td><span class="badge ${badgeClass}">${tier.title.split("/")[0].trim()}</span></td>
            </tr>`;
          })
          .join("")}
      </tbody>
    `;

    wrap.appendChild(table);
    section.appendChild(wrap);
    container.appendChild(section);
  }
}

// ── Feature comparison table ──
function renderFeatures() {
  const container = document.getElementById("feature-table-wrap");
  const vendorKeys = state.features.columns.filter((c) => c !== "Capability");

  const table = document.createElement("table");
  table.className = "feature-table";
  table.innerHTML = `
    <thead>
      <tr>
        <th>Capability</th>
        ${vendorKeys
          .map((k) => {
            const v = state.vendors[k];
            return `<th><span style="display:flex;align-items:center;gap:.35rem"><span class="dot" style="background:${v.color};width:8px;height:8px;border-radius:50%;flex-shrink:0"></span>${v.name.split("(")[0].trim()}</span></th>`;
          })
          .join("")}
      </tr>
    </thead>
    <tbody>
      ${state.features.rows
        .map(
          (row) => `
        <tr>
          <td>${row.capability}</td>
          ${vendorKeys.map((k) => `<td data-vendor-id="${k}">${row[k]}</td>`).join("")}
        </tr>
      `
        )
        .join("")}
    </tbody>
  `;

  container.innerHTML = "";
  container.appendChild(table);
}

// ── Takeaways ──
function renderTakeaways() {
  const grid = document.querySelector("#section-takeaways .takeaway-grid");
  grid.innerHTML = "";

  for (const t of state.takeaways) {
    const v = state.vendors[t.vendor];
    const card = el("div", {
      className: "takeaway",
      dataset: { vendorId: t.vendor },
      style: `border-left: 3px solid ${v.color}`,
      innerHTML: `
        <strong><span class="dot" style="background:${v.color}"></span>${t.title}</strong>
        <p>${t.body}</p>
      `,
    });
    grid.appendChild(card);
  }
}

// ══════════════════════════════════════
// HEALTH CHECK WIZARD
// ══════════════════════════════════════

function renderHealthCheckStart() {
  const container = document.getElementById("hc-wizard");
  state.hcAnswers = {};
  state.hcStep = 0;
  state.hcDone = false;

  container.innerHTML = `
    <div class="wizard-start">
      <p>This wizard walks through ${state.healthcheck.questions.length} key areas of firewall best practice.
         Answer each question honestly and receive a tailored report with executive-level justifications
         and detailed technical remediation steps linked to Sophos documentation.</p>
      <button class="btn-primary" id="hc-start-btn">Start Health Check</button>
    </div>
  `;

  document.getElementById("hc-start-btn").addEventListener("click", () => {
    state.hcStep = 0;
    state.hcAnswers = {};
    renderWizardStep();
  });
}

function renderWizardStep() {
  const container = document.getElementById("hc-wizard");
  const questions = state.healthcheck.questions;
  const q = questions[state.hcStep];
  const total = questions.length;
  const pct = ((state.hcStep) / total) * 100;

  container.innerHTML = `
    <div class="wizard-container">
      <div class="wizard-progress">
        <div class="wizard-progress-header">
          <span>Step ${state.hcStep + 1} of ${total}</span>
          <strong>${Math.round(pct)}%</strong>
        </div>
        <div class="progress-track">
          <div class="progress-fill" style="width:${pct}%"></div>
        </div>
      </div>
      <div class="wizard-question-card">
        <div class="wizard-category">${q.category}</div>
        <h3>${q.question}</h3>
        <p class="wizard-context">${q.context}</p>
        <div class="wizard-answers">
          <button class="btn-yes" data-answer="yes">Yes</button>
          <button class="btn-no" data-answer="no">No</button>
          <button class="btn-na" data-answer="na">N/A</button>
        </div>
      </div>
    </div>
  `;

  container.querySelectorAll(".wizard-answers button").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.hcAnswers[q.id] = btn.dataset.answer;
      if (state.hcStep < total - 1) {
        state.hcStep++;
        renderWizardStep();
      } else {
        state.hcDone = true;
        renderHealthCheckReport();
      }
    });
  });
}

function renderHealthCheckReport() {
  const container = document.getElementById("hc-wizard");
  const questions = state.healthcheck.questions;

  const gaps = questions.filter(
    (q) => state.hcAnswers[q.id] === "no"
  );
  const answered = questions.filter((q) => state.hcAnswers[q.id] !== "na");
  const passed = answered.filter((q) => state.hcAnswers[q.id] === "yes");
  const score = answered.length > 0 ? Math.round((passed.length / answered.length) * 100) : 100;

  const severityOrder = { critical: 0, high: 1, medium: 2 };
  gaps.sort((a, b) => (severityOrder[a.severity] ?? 3) - (severityOrder[b.severity] ?? 3));

  let gradeClass, gradeText, ringClass;
  if (score >= 90) { gradeClass = "grade-perfect"; gradeText = "Excellent"; ringClass = "fill-perfect"; }
  else if (score >= 70) { gradeClass = "grade-good"; gradeText = "Good"; ringClass = "fill-good"; }
  else if (score >= 50) { gradeClass = "grade-warning"; gradeText = "Needs Work"; ringClass = "fill-warning"; }
  else { gradeClass = "grade-critical"; gradeText = "Critical"; ringClass = "fill-critical"; }

  const circumference = 2 * Math.PI * 65;
  const dashOffset = circumference - (score / 100) * circumference;

  let html = `<div class="report-container"><div class="wizard-container">`;

  html += `
    <div class="score-section">
      <div class="score-ring">
        <svg width="160" height="160" viewBox="0 0 160 160">
          <circle class="track" cx="80" cy="80" r="65"/>
          <circle class="${ringClass}" cx="80" cy="80" r="65"
            stroke-dasharray="${circumference}"
            stroke-dashoffset="${dashOffset}"
            stroke-linecap="round"/>
        </svg>
        <div class="score-label">
          <div class="score-num">${score}%</div>
          <div class="score-den">${passed.length}/${answered.length} passed</div>
        </div>
      </div>
      <div class="score-grade ${gradeClass}">${gradeText}</div>
    </div>
  `;

  if (gaps.length === 0) {
    html += `
      <div class="all-clear">
        <h3>All checks passed!</h3>
        <p>Your firewall configuration follows all assessed best practices. Keep it up.</p>
      </div>
    `;
  } else {
    html += `
      <div class="report-toggle">
        <button class="${state.hcReportView === 'exec' ? 'active' : ''}" data-view="exec">Executive Summary</button>
        <button class="${state.hcReportView === 'tech' ? 'active' : ''}" data-view="tech">Technical Details</button>
      </div>
    `;

    if (state.hcReportView === "exec") {
      html += `<div class="exec-cards">`;
      for (const g of gaps) {
        html += `
          <div class="exec-card">
            <div class="severity-bar severity-${g.severity}"></div>
            <div class="exec-card-body">
              <h4>${g.category}</h4>
              <span class="severity-tag tag-${g.severity}">${g.severity}</span>
              <p>${g.exec_summary}</p>
            </div>
          </div>
        `;
      }
      html += `</div>`;
    } else {
      html += `<div class="tech-accordion">`;
      for (const g of gaps) {
        html += `
          <div class="tech-item">
            <div class="tech-item-header">
              <h4>
                <span class="severity-tag tag-${g.severity}">${g.severity}</span>
                ${g.category}
              </h4>
              <span class="chevron">&#x25BC;</span>
            </div>
            <div class="tech-item-body">
              <p>${g.tech_detail}</p>
              <a class="doc-link" href="${g.sophos_doc_url}" target="_blank" rel="noopener">
                &#x1F4D6; ${g.sophos_doc_title}
              </a>
            </div>
          </div>
        `;
      }
      html += `</div>`;
    }
  }

  html += `
    <div style="text-align:center;margin-top:2rem">
      <button class="btn-primary" id="hc-restart-btn">Restart Health Check</button>
    </div>
  `;
  html += `</div></div>`;

  container.innerHTML = html;

  container.querySelectorAll(".report-toggle button").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.hcReportView = btn.dataset.view;
      renderHealthCheckReport();
    });
  });

  container.querySelectorAll(".tech-item-header").forEach((header) => {
    header.addEventListener("click", () => {
      header.parentElement.classList.toggle("open");
    });
  });

  document.getElementById("hc-restart-btn")?.addEventListener("click", () => {
    renderHealthCheckStart();
  });
}

// ══════════════════════════════════════
// COMPETITIVE TAKEDOWN
// ══════════════════════════════════════

function renderTakedownPage() {
  renderTakedownStrengths();
  renderTakedownCompare();
}

function renderTakedownStrengths() {
  const container = document.getElementById("td-strengths");
  const strengths = state.takedown.sophos_strengths;

  let html = `<h3 class="strengths-header">Sophos Differentiators</h3>`;
  html += `<div class="strengths-grid">`;
  for (const s of strengths) {
    html += `
      <div class="strength-card">
        <div class="strength-cat">${s.category}</div>
        <h4>${s.title}</h4>
        <p>${s.description}</p>
      </div>
    `;
  }
  html += `</div>`;
  container.innerHTML = html;
}

function renderTakedownCompare() {
  const container = document.getElementById("td-compare");
  const comparisons = state.takedown.vendor_comparisons;
  const vendorKeys = Object.keys(comparisons);

  let html = `
    <div class="vendor-picker-section">
      <div class="vendor-picker-label">Compare Sophos vs...</div>
      <div class="vendor-picker-chips">
  `;

  for (const key of vendorKeys) {
    const v = state.vendors[key];
    if (!v) continue;
    const isActive = state.tdSelectedVendor === key;
    html += `<button class="td-chip ${isActive ? 'active' : ''}" data-td-vendor="${key}">
      <span class="dot" style="background:${v.color};width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:4px"></span>
      ${v.name.split("(")[0].trim()}
    </button>`;
  }
  html += `</div>`;

  if (state.tdSelectedVendor && comparisons[state.tdSelectedVendor]) {
    const items = comparisons[state.tdSelectedVendor];
    const compVendor = state.vendors[state.tdSelectedVendor];

    html += `<div class="compare-cards">`;
    for (const item of items) {
      html += `
        <div class="compare-card">
          <div class="compare-card-header">${item.category}</div>
          <div class="compare-card-body">
            <div class="compare-col">
              <div class="compare-col-label sophos-label">Sophos</div>
              ${item.sophos_position}
            </div>
            <div class="compare-col">
              <div class="compare-col-label competitor-label">${compVendor.name.split("(")[0].trim()}</div>
              ${item.competitor_position}
            </div>
          </div>
          <div class="compare-verdict">${item.verdict}</div>
        </div>
      `;
    }
    html += `</div>`;
  } else {
    html += `<div class="td-empty">Select a vendor above to see a detailed head-to-head comparison.</div>`;
  }

  html += `</div>`;
  container.innerHTML = html;

  container.querySelectorAll(".td-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      state.tdSelectedVendor = chip.dataset.tdVendor;
      renderTakedownCompare();
    });
  });
}

// ══════════════════════════════════════
// SALES DISCOVERY
// ══════════════════════════════════════

function renderDiscoveryPage() {
  const container = document.getElementById("discovery-container");
  let html = `
    <div class="disc-mode-toggle">
      <button class="${state.discMode === 'guided' ? 'active' : ''}" data-disc-mode="guided">Guided Mode</button>
      <button class="${state.discMode === 'reference' ? 'active' : ''}" data-disc-mode="reference">Quick Reference</button>
    </div>
  `;

  if (state.discMode === "guided") {
    html += renderDiscGuided();
  } else {
    html += renderDiscReference();
  }

  container.innerHTML = html;
  bindDiscEvents(container);
}

function renderDiscGuided() {
  const products = state.discovery.products;

  if (state.discGuidedDone) {
    return renderDiscSummary();
  }

  if (!state.discProduct) {
    let html = `
      <div style="text-align:center;margin-bottom:1rem">
        <p style="color:var(--text-muted);font-size:.92rem">Choose a product area to begin the discovery conversation.</p>
      </div>
      <div class="disc-product-picker">
    `;
    for (const p of products) {
      html += `<button class="disc-product-chip" data-disc-product="${p.key}">
        <span class="disc-icon">${p.icon}</span> ${p.name}
      </button>`;
    }
    html += `</div>`;
    return html;
  }

  const product = products.find((p) => p.key === state.discProduct);
  if (!product) return "";

  const q = product.questions[state.discStep];
  const total = product.questions.length;
  const noteVal = state.discNotes[q.id] || "";

  let html = `<div class="disc-step-container">`;

  html += `
    <div class="wizard-progress" style="margin-bottom:1.5rem">
      <div class="wizard-progress-header">
        <span>Question ${state.discStep + 1} of ${total}</span>
        <strong>${Math.round((state.discStep / total) * 100)}%</strong>
      </div>
      <div class="progress-track">
        <div class="progress-fill" style="width:${(state.discStep / total) * 100}%"></div>
      </div>
    </div>
  `;

  html += `
    <div class="disc-step-card">
      <div class="disc-step-meta">
        <span class="disc-step-counter">${product.icon} ${product.name}</span>
        <span class="disc-step-product" style="color:${product.color}">${q.id.replace(/^[a-z]+_/, "").replace(/_/g, " ")}</span>
      </div>
      <h3>${q.question}</h3>
      <div class="disc-coaching-tip">${q.why}</div>
  `;

  if (q.follow_ups && q.follow_ups.length) {
    html += `<div class="disc-follow-ups"><h4>Follow-up Questions</h4><ul>`;
    for (const f of q.follow_ups) {
      html += `<li>${f}</li>`;
    }
    html += `</ul></div>`;
  }

  html += `
      <textarea class="disc-notes-area" id="disc-note-input" placeholder="Capture the prospect\u2019s response here...">${noteVal}</textarea>
      <div class="disc-step-nav">
        <button class="btn-back" ${state.discStep === 0 ? 'data-disc-back-product="true"' : 'data-disc-prev="true"'}>
          ${state.discStep === 0 ? "\u2190 Products" : "\u2190 Back"}
        </button>
        <button class="btn-next" data-disc-next="true">
          ${state.discStep === total - 1 ? "Finish \u2192" : "Next \u2192"}
        </button>
      </div>
    </div>
  </div>`;

  return html;
}

function renderDiscSummary() {
  const products = state.discovery.products;
  let hasAnyNotes = false;

  let html = `<div class="disc-summary">`;
  html += `
    <div class="disc-summary-actions">
      <button class="btn-primary" id="disc-copy-btn">Copy to Clipboard</button>
      <button class="btn-primary" id="disc-print-btn" style="background:var(--surface-alt);color:var(--text);border:1px solid var(--border)">Print Summary</button>
      <button class="btn-primary" id="disc-restart-btn" style="background:var(--surface-alt);color:var(--text);border:1px solid var(--border)">New Session</button>
    </div>
  `;

  for (const product of products) {
    const productNotes = product.questions.filter((q) => state.discNotes[q.id]);
    if (productNotes.length === 0) continue;
    hasAnyNotes = true;

    html += `<div class="disc-summary-product"><h3>${product.icon} ${product.name}</h3>`;
    for (const q of product.questions) {
      const note = state.discNotes[q.id];
      if (!note) continue;
      html += `
        <div class="disc-summary-item">
          <h4>${q.question}</h4>
          <p>${note}</p>
        </div>
      `;
    }
    html += `</div>`;
  }

  if (!hasAnyNotes) {
    html += `<div style="text-align:center;padding:2rem;color:var(--text-muted)">
      <p>No notes were captured during this session. Start a new session to try again.</p>
    </div>`;
  }

  html += `</div>`;
  return html;
}

function renderDiscReference() {
  const products = state.discovery.products;
  let html = "";

  for (const product of products) {
    html += `
      <div class="disc-ref-section" data-ref-product="${product.key}">
        <div class="disc-ref-header">
          <h3>${product.icon} ${product.name} <span class="disc-count">(${product.questions.length} questions)</span></h3>
          <span class="chevron">&#x25BC;</span>
        </div>
        <div class="disc-ref-body">
          <div class="disc-ref-questions">
    `;

    for (const q of product.questions) {
      html += `<div class="disc-ref-q"><h4>${q.question}</h4>`;
      html += `<div class="disc-ref-why">${q.why}</div>`;
      if (q.follow_ups && q.follow_ups.length) {
        html += `<ul class="disc-ref-followups">`;
        for (const f of q.follow_ups) {
          html += `<li>${f}</li>`;
        }
        html += `</ul>`;
      }
      html += `</div>`;
    }

    html += `</div></div></div>`;
  }

  return html;
}

function bindDiscEvents(container) {
  container.querySelectorAll("[data-disc-mode]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.discMode = btn.dataset.discMode;
      renderDiscoveryPage();
    });
  });

  container.querySelectorAll("[data-disc-product]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.discProduct = btn.dataset.discProduct;
      state.discStep = 0;
      renderDiscoveryPage();
    });
  });

  container.querySelector("[data-disc-prev]")?.addEventListener("click", () => {
    saveCurrentNote();
    if (state.discStep > 0) {
      state.discStep--;
      renderDiscoveryPage();
    }
  });

  container.querySelector("[data-disc-back-product]")?.addEventListener("click", () => {
    saveCurrentNote();
    state.discProduct = null;
    state.discStep = 0;
    renderDiscoveryPage();
  });

  container.querySelector("[data-disc-next]")?.addEventListener("click", () => {
    saveCurrentNote();
    const product = state.discovery.products.find((p) => p.key === state.discProduct);
    if (state.discStep < product.questions.length - 1) {
      state.discStep++;
      renderDiscoveryPage();
    } else {
      state.discProduct = null;
      state.discStep = 0;
      state.discGuidedDone = true;
      renderDiscoveryPage();
    }
  });

  container.querySelectorAll(".disc-ref-header").forEach((header) => {
    header.addEventListener("click", () => {
      header.parentElement.classList.toggle("open");
    });
  });

  container.querySelector("#disc-copy-btn")?.addEventListener("click", () => {
    const text = buildSummaryText();
    navigator.clipboard.writeText(text).then(() => {
      const btn = container.querySelector("#disc-copy-btn");
      btn.textContent = "Copied!";
      setTimeout(() => { btn.textContent = "Copy to Clipboard"; }, 2000);
    });
  });

  container.querySelector("#disc-print-btn")?.addEventListener("click", () => {
    window.print();
  });

  container.querySelector("#disc-restart-btn")?.addEventListener("click", () => {
    state.discNotes = {};
    state.discProduct = null;
    state.discStep = 0;
    state.discGuidedDone = false;
    renderDiscoveryPage();
  });
}

function saveCurrentNote() {
  const input = document.getElementById("disc-note-input");
  if (!input) return;
  const product = state.discovery.products.find((p) => p.key === state.discProduct);
  if (!product) return;
  const q = product.questions[state.discStep];
  const val = input.value.trim();
  if (val) {
    state.discNotes[q.id] = val;
  } else {
    delete state.discNotes[q.id];
  }
}

function buildSummaryText() {
  let text = "SALES DISCOVERY NOTES\n" + "=".repeat(40) + "\n\n";
  for (const product of state.discovery.products) {
    const notes = product.questions.filter((q) => state.discNotes[q.id]);
    if (notes.length === 0) continue;
    text += `${product.name}\n${"-".repeat(30)}\n`;
    for (const q of notes) {
      text += `Q: ${q.question}\nA: ${state.discNotes[q.id]}\n\n`;
    }
    text += "\n";
  }
  return text.trim();
}

// ── Licensing Page ──
function renderLicensingPage() {
  const c = document.getElementById("licensing-container");
  if (!c) return;
  const { bundles, a_la_carte, bundle_comparison } = state.licensing;

  let html = '<div class="lic-bundles">';
  bundles.forEach((b) => {
    html += `<div class="lic-bundle-card">
      <span class="bundle-badge" style="background:${b.color}">${b.name}</span>
      <h3 style="margin-top:1.8rem">${b.name}</h3>
      <p class="bundle-tagline">${b.tagline}</p>
      <p class="bundle-desc">${b.description}</p>`;
    if (b.includes_standard) {
      html += '<div class="lic-includes-note">Includes everything in Standard Protection, plus:</div>';
    }
    b.subscriptions.forEach((s) => {
      html += `<div class="lic-sub-item">
        <h4>${s.name}</h4>
        <p class="sub-desc">${s.description}</p>
        <ul class="lic-sub-features">
          ${s.key_features.map((f) => `<li>${f}</li>`).join("")}
        </ul>
      </div>`;
    });
    html += "</div>";
  });
  html += "</div>";

  if (bundle_comparison.length) {
    html += '<div class="lic-comparison"><h3>Bundle Comparison at a Glance</h3>';
    html += '<table class="lic-comp-table"><thead><tr><th>Feature</th><th>Standard</th><th>Xstream</th></tr></thead><tbody>';
    bundle_comparison.forEach((row) => {
      const sc = row.standard ? '<span class="lic-check">\u2713</span>' : '<span class="lic-cross">\u2717</span>';
      const xc = row.xstream ? '<span class="lic-check">\u2713</span>' : '<span class="lic-cross">\u2717</span>';
      html += `<tr><td>${row.feature}</td><td>${sc}</td><td>${xc}</td></tr>`;
    });
    html += "</tbody></table></div>";
  }

  if (a_la_carte.length) {
    html += '<div class="lic-alacarte"><h3>A La Carte Subscriptions</h3><div class="lic-alacarte-grid">';
    a_la_carte.forEach((a) => {
      html += `<div class="lic-alacarte-card">
        <h4>${a.name}</h4>
        <p class="alc-desc">${a.description}</p>
        <p class="alc-use"><strong>Typical use: </strong>${a.typical_use}</p>
      </div>`;
    });
    html += "</div></div>";
  }

  c.innerHTML = html;
}

// ── HA Guide Page ──
function renderHAGuidePage() {
  const c = document.getElementById("ha-guide-container");
  if (!c) return;
  const g = state.haGuide;
  if (!g.overview) return;

  let html = "";

  html += `<div class="ha-overview">
    <h3>${g.overview.title}</h3>
    <p>${g.overview.description}</p>
  </div>`;

  if (g.ha_basics) {
    html += '<div class="ha-basics-grid">';
    g.ha_basics.forEach((b) => {
      html += `<div class="ha-basic-card">
        <div class="ha-icon">${b.icon}</div>
        <h4>${b.title}</h4>
        <p>${b.description}</p>
      </div>`;
    });
    html += "</div>";
  }

  if (g.support_comparison) {
    const sc = g.support_comparison;
    html += `<div class="ha-support-section">
      <h3>${sc.title}</h3>
      <p>${sc.description}</p>
      <div class="ha-support-cards">`;
    sc.tiers.forEach((t) => {
      html += `<div class="ha-support-card ${t.level}">
        <span class="support-tier-badge">${t.name}</span>
        <h4>${t.name}</h4>
        <div class="ha-rma-row">
          <div class="ha-rma-item"><strong>Primary Unit RMA</strong>${t.rma_primary}</div>
          <div class="ha-rma-item"><strong>Auxiliary Unit RMA</strong>${t.rma_auxiliary}</div>
        </div>
        <div class="ha-risk">${t.risk}</div>
      </div>`;
    });
    html += "</div></div>";
  }

  if (g.quoting_checklist) {
    html += '<div class="ha-checklist"><h3>Quoting Checklist</h3><div class="ha-checklist-items">';
    g.quoting_checklist.forEach((item, i) => {
      html += `<div class="ha-checklist-item">
        <div class="ha-checklist-num">${i + 1}</div>
        <div class="ha-checklist-text">
          <h4>${item.item}</h4>
          <p>${item.detail}</p>
        </div>
      </div>`;
    });
    html += "</div></div>";
  }

  if (g.talk_track) {
    html += `<div class="ha-talk-track"><h3>${g.talk_track.title}</h3><div class="talk-card">`;
    g.talk_track.paragraphs.forEach((p) => {
      html += `<p>${p}</p>`;
    });
    html += "</div></div>";
  }

  c.innerHTML = html;
}

// ── AI Chat ──
const chat = {
  history: [],
  busy: false,
};

function initChat() {
  const fab = document.getElementById("chat-fab");
  const panel = document.getElementById("chat-panel");
  const input = document.getElementById("chat-input");
  const sendBtn = document.getElementById("chat-send");
  const clearBtn = document.getElementById("chat-clear");

  fab.addEventListener("click", () => {
    const open = panel.classList.toggle("open");
    fab.classList.toggle("open", open);
    if (open) input.focus();
  });

  sendBtn.addEventListener("click", () => sendMessage());
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  clearBtn.addEventListener("click", () => {
    chat.history = [];
    const msgs = document.getElementById("chat-messages");
    msgs.innerHTML = `<div class="chat-msg assistant"><p>Chat cleared. Ask me anything about firewall hardware!</p></div>`;
    document.getElementById("chat-suggestions").style.display = "flex";
  });

  document.querySelectorAll(".chat-suggestion").forEach((btn) => {
    btn.addEventListener("click", () => {
      input.value = btn.textContent;
      sendMessage();
    });
  });

  // "Ask AI" nav button opens the chat panel
  document.querySelector('[data-tab="ask"]')?.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!panel.classList.contains("open")) {
      panel.classList.add("open");
      fab.classList.add("open");
    }
    input.focus();
  });
}

async function sendMessage() {
  const input = document.getElementById("chat-input");
  const text = input.value.trim();
  if (!text || chat.busy) return;

  chat.busy = true;
  input.value = "";
  document.getElementById("chat-send").disabled = true;
  document.getElementById("chat-suggestions").style.display = "none";

  appendMsg("user", text);
  chat.history.push({ role: "user", content: text });

  const typingEl = showTyping();

  try {
    const supabaseUrl = window.SUPABASE_URL;
    const supabaseKey = window.SUPABASE_ANON_KEY;

    if (!supabaseUrl || supabaseUrl === "YOUR_SUPABASE_URL") {
      throw new Error("Supabase is not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY in index.html.");
    }

    const res = await fetch(`${supabaseUrl}/functions/v1/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${supabaseKey}`,
        apikey: supabaseKey,
      },
      body: JSON.stringify({
        message: text,
        history: chat.history.slice(-10),
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || `Request failed (${res.status})`);
    }

    const data = await res.json();
    typingEl.remove();
    appendMsg("assistant", data.reply);
    chat.history.push({ role: "assistant", content: data.reply });
  } catch (err) {
    typingEl.remove();
    appendMsg("error", err.message);
  } finally {
    chat.busy = false;
    document.getElementById("chat-send").disabled = false;
  }
}

function appendMsg(role, content) {
  const container = document.getElementById("chat-messages");
  const msg = document.createElement("div");
  msg.className = `chat-msg ${role}`;

  if (role === "assistant") {
    msg.innerHTML = markdownToHtml(content);
  } else {
    msg.textContent = content;
  }

  container.appendChild(msg);
  container.scrollTop = container.scrollHeight;
}

function showTyping() {
  const container = document.getElementById("chat-messages");
  const typing = document.createElement("div");
  typing.className = "chat-typing";
  typing.innerHTML = "<span></span><span></span><span></span>";
  container.appendChild(typing);
  container.scrollTop = container.scrollHeight;
  return typing;
}

function markdownToHtml(md) {
  return md
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/^[-*] (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>")
    .replace(/\n{2,}/g, "</p><p>")
    .replace(/\n/g, "<br>")
    .replace(/^(.+)$/, "<p>$1</p>");
}

// ── Helpers ──
function el(tag, props = {}) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === "dataset") {
      Object.assign(node.dataset, v);
    } else if (k === "style" && typeof v === "string") {
      node.style.cssText = v;
    } else {
      node[k] = v;
    }
  }
  return node;
}
