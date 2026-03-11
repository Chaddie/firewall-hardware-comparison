import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const FIREWALL_CONTEXT = `You are a firewall hardware expert assistant. Answer questions using ONLY the data below.
If a question falls outside this data, say so honestly. Be concise and use markdown formatting.

=== VENDOR OVERVIEW ===

PALO ALTO NETWORKS
- Product lines: PA-400, PA-800, PA-3400, PA-5400, PA-7000 series
- Architecture: Single-pass parallel processing (SP3) with custom FPGA/ASIC
- OS: PAN-OS | Management: Panorama
- Threat intel: WildFire, Advanced Threat Prevention (inline ML)
- TLS inspection: Hardware-assisted SSL decryption offload
- SD-WAN: Yes (Prisma SD-WAN optional) | ZTNA: Prisma Access, GlobalProtect
- Licensing: Tiered bundles (Threat, DNS, URL, WildFire)
- Ecosystem lock-in: Moderate — Cortex, Prisma suite

FORTINET (FORTIGATE)
- Product lines: FortiGate 40F–7000 series
- Architecture: Custom SPU ASICs (NP7, CP9) offloading from x86
- OS: FortiOS | Management: FortiManager + FortiAnalyzer
- Threat intel: FortiGuard Labs (AI/ML, sandboxing)
- TLS inspection: CP9 ASIC-accelerated
- SD-WAN: Yes (included in FortiOS, ASIC-accelerated) | ZTNA: FortiSASE, FortiClient
- Licensing: FortiGuard bundles (UTM, Enterprise, NGFW)
- Ecosystem lock-in: Strong — Security Fabric across 50+ products

CISCO (SECURE FIREWALL)
- Product lines: Secure Firewall 1000, 3100, 4200, 9300 series
- Architecture: x86-based with Cisco Silicon One in newer models
- OS: FTD (Snort 3) or ASA | Management: FMC / CDO
- Threat intel: Cisco Talos + SecureX
- TLS inspection: Software-based on x86
- SD-WAN: Yes (Meraki or Viptela) | ZTNA: Cisco+ Secure Connect, Duo
- Licensing: Tiered (Essentials, Advantage, Premier)
- Ecosystem lock-in: Strong — deep Cisco networking integration

CHECK POINT
- Product lines: Quantum Spark 1500, Quantum 6000/7000/Maestro
- Architecture: x86 with SecurityPowerEngine; Maestro hyperscale orchestrator
- OS: Gaia OS (R81+) | Management: SmartConsole / Smart-1 Cloud
- Threat intel: ThreatCloud AI (60+ engines)
- TLS inspection: CoreXL multi-core acceleration
- SD-WAN: Yes (Quantum SD-WAN) | ZTNA: Harmony Connect, Identity Awareness
- Licensing: Blade-based (per software blade)
- Ecosystem lock-in: Moderate — Infinity architecture

SOPHOS (XGS SERIES)
- Product lines: XGS 87–XGS 8500 series
- Architecture: Dual-processor: Xstream Flow Processor (FPGA) + x86 CPU
- OS: Sophos Firewall OS (SFOS) | Management: Sophos Central
- Threat intel: SophosLabs + Sophos X-Ops, Intelix sandboxing
- TLS inspection: Xstream Flow Processor hardware offload
- SD-WAN: Yes (Xstream SD-WAN) | ZTNA: via Sophos Central
- Licensing: Bundled (Standard, Xstream Protection)
- Ecosystem lock-in: Moderate — Synchronized Security (endpoint heartbeat)

=== HARDWARE SPECS: ENTRY-LEVEL / BRANCH ===
| Model              | FW Throughput | NGFW Throughput       | Interfaces             |
|--------------------|---------------|-----------------------|------------------------|
| Palo Alto PA-460   | 5.2 Gbps     | 2.4 Gbps (App-ID)    | 8×GbE, 4×SFP          |
| FortiGate 60F      | 10 Gbps      | 1.0 Gbps (NGFW)      | 10×GbE                 |
| Cisco Secure 1120  | 3.0 Gbps     | 1.5 Gbps (FTD)       | 8×GbE                  |
| Check Point 1590   | 2.8 Gbps     | 0.7 Gbps (Full TI)   | 8×GbE, Wi-Fi 6        |
| Sophos XGS 126     | 5.5 Gbps     | 1.0 Gbps (Xstream)   | 8×GbE                  |

=== HARDWARE SPECS: MID-RANGE / CAMPUS ===
| Model                | FW Throughput | NGFW Throughput        | Interfaces                    | HA Support              |
|----------------------|---------------|------------------------|-------------------------------|-------------------------|
| Palo Alto PA-3440    | 30 Gbps      | 14 Gbps (App-ID)       | 12×10G SFP+, 2×25G, 2×40G    | Active/Passive, A/A     |
| FortiGate 600F       | 36 Gbps      | 10 Gbps (NGFW)         | 4×25G, 16×GbE, 8×SFP+        | A/P, A/A, FGCP          |
| Cisco Secure 3130    | 25 Gbps      | 8 Gbps (FTD)           | 8×10G, 2×25G, 8×GbE          | Active/Standby, A/A     |
| Check Point Q 6700   | 29 Gbps      | 7 Gbps (Full TI)       | 2×40G, 8×10G, 16×GbE         | ClusterXL A/A, A/S      |
| Sophos XGS 4300      | 40 Gbps      | 9.5 Gbps (Xstream)     | 8×SFP+, 2×SFP28, 8×GbE      | Active/Passive, A/A     |

=== HARDWARE SPECS: ENTERPRISE / DATA CENTRE ===
| Model                | FW Throughput | NGFW Throughput        | Max Interfaces                | Form Factor |
|----------------------|---------------|------------------------|-------------------------------|-------------|
| Palo Alto PA-5450    | 150 Gbps     | 70 Gbps (App-ID)       | Up to 48×25G / 8×100G         | 4U Chassis  |
| FortiGate 4400F      | 800 Gbps     | 70 Gbps (NGFW)         | 12×100G, 18×25G, 16×10G       | 3U Rack     |
| Cisco Secure 4245    | 110 Gbps     | 45 Gbps (FTD)          | Up to 24×25G / 4×100G         | 2U Rack     |
| Check Point Q 28000  | 145 Gbps     | 30 Gbps (Full TI)      | Up to 64×10G / 16×40G         | 2U Rack     |
| Sophos XGS 8500      | 99 Gbps      | 22 Gbps (Xstream)      | 8×SFP28, 16×SFP+, 8×GbE      | 2U Rack     |

=== KEY TAKEAWAYS ===
- Best raw throughput: Fortinet (custom ASICs, highest Gbps, lower cost-per-Gbps)
- Most consistent under load: Palo Alto (single-pass = minimal perf penalty with all features on)
- Best for Cisco shops: Cisco Secure Firewall (native stack + Talos intel)
- Strongest central management: Check Point SmartConsole (mature multi-gateway platform)
- Best endpoint synergy: Sophos (Synchronized Security heartbeat for automated isolation)
- SD-WAN value: Fortinet (included in FortiOS, ASIC-accelerated, no extra licence)`;

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
      { role: "system", content: FIREWALL_CONTEXT },
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
