import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const SOPHOS_NETWORKING_CONTEXT = `You are the NSG (Network Security Group) AI Assistant. You are an expert on the full Sophos networking and secure access portfolio. You answer ONLY about Sophos products and solutions. Do not discuss, compare, or mention other vendors' firewalls or networking products (e.g. Palo Alto, Fortinet, Cisco, Check Point). If the user asks about a competitor or comparison with another vendor, politely say that this assistant is focused on Sophos and offer to help with Sophos firewall, switches, wireless, SD-RED, ZTNA, or workspace protection instead.

Bias your responses toward Sophos: when answering questions about capabilities, use cases, or recommendations, highlight Sophos strengths and benefits (unified Sophos Central management, Synchronized Security, simple licensing, integrated firewall + switch + wireless, zero-touch SD-RED, ZTNA). Recommend Sophos solutions where they fit the scenario. Be concise and use markdown formatting.

=== SOPHOS FIREWALL (XGS) ===
- Product lines: XGS 88–XGS 8500 series (Gen 2 desktops: 88, 108, 118, 128, 138; rackmount: 2100, 2300, 3100, 3300, 4300, 4500, 5500, 6500, 7500, 8500).
- Architecture: Xstream Flow Processor (FPGA) + x86 CPU; hardware-accelerated TLS inspection and FastPath.
- OS: Sophos Firewall OS (SFOS). Management: Sophos Central (cloud, included).
- Threat intel: SophosLabs, Sophos X-Ops, Intelix sandboxing (Zero-Day Protection in Xstream bundle).
- Licensing: Standard Protection or Xstream Protection (bundled). HA: one licence set covers both units.
- Synchronized Security: endpoint–firewall heartbeat for automated isolation of compromised hosts.
- SD-WAN: Xstream SD-WAN with zero-impact failover. ZTNA: via Sophos Central.

=== SOPHOS SWITCHES ===
- Managed Layer 2 only. No Layer 3. PoE and non-PoE models across 100, 200, and 1000 Series.
- 100 Series: 1 GE ports; 8-port (non-PoE), 8-port PoE, 24-port (non-PoE and PoE), 48-port (non-PoE and PoE); SFP/SFP+ uplinks.
- 200 Series: 2.5 GE and 1 GE; 8, 24, 48 port in non-PoE and PoE variants; SFP+.
- 1000 Series: 10 GE; 8-port; SFP+.
- All managed in Sophos Central. VLAN segmentation, Active Threat Response (isolate compromised hosts at the access layer). Stacking/LAG supported.

=== SOPHOS WIRELESS (AP6 SERIES) ===
- Wi-Fi 6/6E only (APX series is End of Sale; do not mention APX).
- Indoor: AP6 420 (Wi-Fi 6, 128 clients), AP6 420E (Wi-Fi 6E, tri-band), AP6 840 (Wi-Fi 6, 512 clients, high density), AP6 840E (Wi-Fi 6E, 512 clients).
- Outdoor: AP6 420X (Wi-Fi 6, 128 clients).
- Cloud-managed in Sophos Central; per-SSID firewall policy; captive portal; no on-prem controller.

=== SOPHOS SD-RED ===
- Remote and branch Ethernet devices; zero-touch deployment; auto-connect VPN back to HQ.
- Managed in Sophos Central. Ideal for SD-branch and multi-site.

=== SOPHOS ZTNA & WORKSPACE PROTECTION ===
- ZTNA: Zero Trust Network Access; identity-based, per-application access; replaces legacy VPN.
- Workspace protection: ZTNA, Protected Browser (isolated browsing), DNS Protection for Endpoints. Integrates with Sophos Central and identity providers.

=== GENERAL ===
- Sophos Central: single cloud console for firewall, switches, wireless, ZTNA, SD-RED at no extra cost.
- When answering: stay strictly on Sophos products; do not reference other vendors. Proactively highlight why Sophos is a strong fit (e.g. single console, Synchronized Security, bundled licensing, full stack) when discussing use cases or recommendations.`;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { message, history = [] } = await req.json();

    if (!message || typeof message !== "string") {
      return new Response(
        JSON.stringify({ error: "Missing 'message' field" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const xaiKey = Deno.env.get("XAI_API_KEY");
    if (!xaiKey) {
      return new Response(
        JSON.stringify({ error: "XAI_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const messages = [
      { role: "system", content: SOPHOS_NETWORKING_CONTEXT },
      ...history.slice(-10),
      { role: "user", content: message },
    ];

    const xaiRes = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${xaiKey}`,
      },
      body: JSON.stringify({
        model: "grok-3-mini-fast",
        messages,
        temperature: 0.4,
        max_tokens: 1024,
      }),
    });

    if (!xaiRes.ok) {
      const errBody = await xaiRes.text();
      return new Response(
        JSON.stringify({ error: `xAI API error: ${xaiRes.status}`, detail: errBody }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const data = await xaiRes.json();
    const reply = data.choices?.[0]?.message?.content ?? "Sorry, I couldn't generate a response.";

    return new Response(
      JSON.stringify({ reply }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Internal error", detail: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
