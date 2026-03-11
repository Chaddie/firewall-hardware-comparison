/* Firewall Comparison Web App */

const state = {
  vendors: {},
  hardware: {},
  features: {},
  takeaways: [],
  activeVendors: new Set(),
  activeTab: "overview",
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
  initChat();
  showTab("overview");
});

async function loadData() {
  const [vendors, hardware, features, takeaways] = await Promise.all([
    fetch("/api/vendors").then((r) => r.json()),
    fetch("/api/hardware").then((r) => r.json()),
    fetch("/api/features").then((r) => r.json()),
    fetch("/api/takeaways").then((r) => r.json()),
  ]);
  state.vendors = vendors;
  state.hardware = hardware;
  state.features = features;
  state.takeaways = takeaways;
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
