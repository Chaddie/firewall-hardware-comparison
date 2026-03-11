"""Firewall vendor hardware comparison data."""

VENDORS = {
    "paloalto": {
        "name": "Palo Alto Networks",
        "color": "#ff6b6b",
        "description": "Single-pass architecture (SP3) with dedicated hardware data-planes. Known for consistent performance under full threat inspection.",
        "highlights": [
            "PA-400, PA-800, PA-3400, PA-5400, PA-7000 series",
            "Custom networking & security processing chips",
            "PAN-OS with integrated AI-powered threat prevention",
        ],
    },
    "fortinet": {
        "name": "Fortinet (FortiGate)",
        "color": "#51cf66",
        "description": "Purpose-built ASICs (NP7, CP9, SP5) deliver some of the highest raw throughput numbers in the industry at competitive price points.",
        "highlights": [
            "FortiGate 40F\u201370000 series",
            "Security Processing Units (SPUs) offload crypto & IPS",
            "FortiOS with Security Fabric integration",
        ],
    },
    "cisco": {
        "name": "Cisco (Secure Firewall)",
        "color": "#6c8cff",
        "description": "Deep integration with the broader Cisco networking stack. Snort 3\u2013based IPS engine with Talos threat intelligence.",
        "highlights": [
            "Secure Firewall 1000, 3100, 4200, 9300 series",
            "Leverages Cisco Silicon One in newer models",
            "Firepower Threat Defense (FTD) or ASA image",
        ],
    },
    "checkpoint": {
        "name": "Check Point",
        "color": "#a78bfa",
        "description": "Consistent security management via SmartConsole. Quantum appliances range from small branch to hyperscale data-centre gateways.",
        "highlights": [
            "Quantum Spark 1500, Quantum 6000/7000/Maestro",
            "HyperFlow technology for scaling",
            "R81+ Gaia OS with ThreatCloud AI",
        ],
    },
    "sophos": {
        "name": "Sophos (XGS Series)",
        "color": "#ff922b",
        "description": "Xstream architecture with a dedicated hardware FastPath for accelerating trusted traffic, freeing CPU for deep inspection.",
        "highlights": [
            "XGS 87\u2013XGS 8500 series",
            "Dual-processor design (Xstream Flow Processor + x86 CPU)",
            "Sophos Firewall OS with Synchronized Security",
        ],
    },
}

HARDWARE_TIERS = {
    "entry": {
        "title": "Entry-Level / Branch Office",
        "subtitle": "Compact desktop appliances for small offices and branch deployments.",
        "columns": [
            "Vendor / Model",
            "Firewall Throughput",
            "Threat / NGFW Throughput",
            "Interfaces",
            "Form Factor",
        ],
        "rows": [
            {
                "vendor": "paloalto",
                "model": "PA-460",
                "fw_throughput": "5.2 Gbps",
                "ngfw_throughput": "2.4 Gbps (App-ID)",
                "interfaces": "8\u00d7GbE, 4\u00d7SFP",
                "form_factor": "Desktop",
            },
            {
                "vendor": "fortinet",
                "model": "FortiGate 60F",
                "fw_throughput": "10 Gbps",
                "ngfw_throughput": "1.0 Gbps (NGFW)",
                "interfaces": "10\u00d7GbE",
                "form_factor": "Desktop",
            },
            {
                "vendor": "cisco",
                "model": "Secure FW 1120",
                "fw_throughput": "3.0 Gbps",
                "ngfw_throughput": "1.5 Gbps (FTD)",
                "interfaces": "8\u00d7GbE",
                "form_factor": "Desktop",
            },
            {
                "vendor": "checkpoint",
                "model": "Quantum 1590",
                "fw_throughput": "2.8 Gbps",
                "ngfw_throughput": "0.7 Gbps (Full TI)",
                "interfaces": "8\u00d7GbE, Wi-Fi 6",
                "form_factor": "Desktop",
            },
            {
                "vendor": "sophos",
                "model": "XGS 126",
                "fw_throughput": "5.5 Gbps",
                "ngfw_throughput": "1.0 Gbps (Xstream)",
                "interfaces": "8\u00d7GbE",
                "form_factor": "Desktop",
            },
        ],
    },
    "midrange": {
        "title": "Mid-Range / Campus",
        "subtitle": "1U rack-mount appliances for medium-sized enterprises and campus edge deployments.",
        "columns": [
            "Vendor / Model",
            "Firewall Throughput",
            "Threat / NGFW Throughput",
            "Interfaces",
            "HA Support",
        ],
        "rows": [
            {
                "vendor": "paloalto",
                "model": "PA-3440",
                "fw_throughput": "30 Gbps",
                "ngfw_throughput": "14 Gbps (App-ID)",
                "interfaces": "12\u00d710G SFP+, 2\u00d725G, 2\u00d740G",
                "form_factor": "Active/Passive, A/A",
            },
            {
                "vendor": "fortinet",
                "model": "FortiGate 600F",
                "fw_throughput": "36 Gbps",
                "ngfw_throughput": "10 Gbps (NGFW)",
                "interfaces": "4\u00d725G, 16\u00d7GbE, 8\u00d7SFP+",
                "form_factor": "Active/Passive, A/A, FGCP",
            },
            {
                "vendor": "cisco",
                "model": "Secure FW 3130",
                "fw_throughput": "25 Gbps",
                "ngfw_throughput": "8 Gbps (FTD)",
                "interfaces": "8\u00d710G, 2\u00d725G, 8\u00d7GbE",
                "form_factor": "Active/Standby, A/A",
            },
            {
                "vendor": "checkpoint",
                "model": "Quantum 6700",
                "fw_throughput": "29 Gbps",
                "ngfw_throughput": "7 Gbps (Full TI)",
                "interfaces": "2\u00d740G, 8\u00d710G, 16\u00d7GbE",
                "form_factor": "ClusterXL A/A, A/S",
            },
            {
                "vendor": "sophos",
                "model": "XGS 4300",
                "fw_throughput": "40 Gbps",
                "ngfw_throughput": "9.5 Gbps (Xstream)",
                "interfaces": "8\u00d7SFP+, 2\u00d7SFP28, 8\u00d7GbE",
                "form_factor": "Active/Passive, A/A",
            },
        ],
    },
    "enterprise": {
        "title": "Enterprise / Data Centre",
        "subtitle": "High-performance chassis and multi-blade systems for large enterprise and service-provider environments.",
        "columns": [
            "Vendor / Model",
            "Firewall Throughput",
            "Threat / NGFW Throughput",
            "Max Interfaces",
            "Form Factor",
        ],
        "rows": [
            {
                "vendor": "paloalto",
                "model": "PA-5450",
                "fw_throughput": "150 Gbps",
                "ngfw_throughput": "70 Gbps (App-ID)",
                "interfaces": "Up to 48\u00d725G / 8\u00d7100G",
                "form_factor": "4U Chassis",
            },
            {
                "vendor": "fortinet",
                "model": "FortiGate 4400F",
                "fw_throughput": "800 Gbps",
                "ngfw_throughput": "70 Gbps (NGFW)",
                "interfaces": "12\u00d7100G, 18\u00d725G, 16\u00d710G",
                "form_factor": "3U Rack",
            },
            {
                "vendor": "cisco",
                "model": "Secure FW 4245",
                "fw_throughput": "110 Gbps",
                "ngfw_throughput": "45 Gbps (FTD)",
                "interfaces": "Up to 24\u00d725G / 4\u00d7100G",
                "form_factor": "2U Rack",
            },
            {
                "vendor": "checkpoint",
                "model": "Quantum 28000",
                "fw_throughput": "145 Gbps",
                "ngfw_throughput": "30 Gbps (Full TI)",
                "interfaces": "Up to 64\u00d710G / 16\u00d740G",
                "form_factor": "2U Rack",
            },
            {
                "vendor": "sophos",
                "model": "XGS 8500",
                "fw_throughput": "99 Gbps",
                "ngfw_throughput": "22 Gbps (Xstream)",
                "interfaces": "8\u00d7SFP28, 16\u00d7SFP+, 8\u00d7GbE",
                "form_factor": "2U Rack",
            },
        ],
    },
}

FEATURE_COMPARISON = {
    "columns": [
        "Capability",
        "paloalto",
        "fortinet",
        "cisco",
        "checkpoint",
        "sophos",
    ],
    "rows": [
        {
            "capability": "Processing Approach",
            "paloalto": "Single-pass parallel processing (SP3) with custom FPGA/ASIC",
            "fortinet": "Custom SPU ASICs (NP7, CP9) offloading from x86",
            "cisco": "x86-based with Cisco Silicon One in newer models",
            "checkpoint": "x86 with SecurityPowerEngine; Maestro hyperscale orchestrator",
            "sophos": "Dual-processor: Xstream Flow Processor (FPGA) + x86 CPU",
        },
        {
            "capability": "Operating System",
            "paloalto": "PAN-OS",
            "fortinet": "FortiOS",
            "cisco": "FTD (Snort 3) or ASA",
            "checkpoint": "Gaia OS (R81+)",
            "sophos": "Sophos Firewall OS (SFOS)",
        },
        {
            "capability": "Central Management",
            "paloalto": "Panorama",
            "fortinet": "FortiManager + FortiAnalyzer",
            "cisco": "Firepower Management Center (FMC) / CDO",
            "checkpoint": "SmartConsole / Smart-1 Cloud",
            "sophos": "Sophos Central",
        },
        {
            "capability": "Threat Intelligence",
            "paloalto": "WildFire, Advanced Threat Prevention (inline ML)",
            "fortinet": "FortiGuard Labs (AI/ML, sandboxing)",
            "cisco": "Cisco Talos + SecureX",
            "checkpoint": "ThreatCloud AI (60+ engines)",
            "sophos": "SophosLabs + Sophos X-Ops, Intelix sandboxing",
        },
        {
            "capability": "SD-WAN Built-In",
            "paloalto": "Yes (Prisma SD-WAN optional)",
            "fortinet": "Yes (included in FortiOS, ASIC-accelerated)",
            "cisco": "Yes (Meraki or Viptela integration)",
            "checkpoint": "Yes (Quantum SD-WAN)",
            "sophos": "Yes (Xstream SD-WAN)",
        },
        {
            "capability": "Zero Trust / SASE",
            "paloalto": "Prisma Access, GlobalProtect",
            "fortinet": "FortiSASE, ZTNA via FortiClient",
            "cisco": "Cisco+ Secure Connect, Duo integration",
            "checkpoint": "Harmony Connect, Identity Awareness",
            "sophos": "ZTNA via Sophos Central",
        },
        {
            "capability": "TLS Inspection",
            "paloalto": "Hardware-assisted (SSL decryption offload)",
            "fortinet": "CP9 ASIC-accelerated",
            "cisco": "Software-based on x86",
            "checkpoint": "CoreXL multi-core acceleration",
            "sophos": "Xstream Flow Processor hardware offload",
        },
        {
            "capability": "Ecosystem Lock-In",
            "paloalto": "Moderate \u2014 Cortex, Prisma suite",
            "fortinet": "Strong \u2014 Security Fabric across 50+ products",
            "cisco": "Strong \u2014 deep Cisco networking integration",
            "checkpoint": "Moderate \u2014 Infinity architecture",
            "sophos": "Moderate \u2014 Synchronized Security (endpoint heartbeat)",
        },
        {
            "capability": "Licensing Model",
            "paloalto": "Tiered bundles (Threat, DNS, URL, WildFire)",
            "fortinet": "FortiGuard bundles (UTM, Enterprise, NGFW)",
            "cisco": "Tiered (Essentials, Advantage, Premier)",
            "checkpoint": "Blade-based (per software blade)",
            "sophos": "Bundled (Standard, Xstream Protection)",
        },
    ],
}

HEALTHCHECK_DATA = {
    "questions": [
        {
            "id": "tls_inspection",
            "category": "TLS / SSL Inspection",
            "question": "Do you have TLS/SSL inspection enabled on your firewall?",
            "context": "Over 90% of web traffic is now encrypted. Without TLS inspection your firewall is blind to the majority of threats.",
            "severity": "critical",
            "exec_summary": "The vast majority of internet traffic is encrypted with TLS. Malware, phishing payloads, and command-and-control communications routinely hide inside encrypted sessions. Without TLS inspection enabled, your firewall cannot examine this traffic and effectively becomes a pass-through for encrypted threats, rendering IPS, web filtering, and sandboxing ineffective on the bulk of your traffic.",
            "tech_detail": "Enable TLS/SSL inspection rules in Sophos Firewall under Rules & Policies > SSL/TLS Inspection Rules. Create a rule that applies to outbound web traffic, import or generate a signing CA certificate, and deploy it to endpoints via GPO or MDM. Exclude sensitive categories (banking, health) where required by policy. Use the Xstream DPI engine for hardware-accelerated decryption.",
            "sophos_doc_url": "https://docs.sophos.com/nsg/sophos-firewall/20.0/Help/en-us/webhelp/onlinehelp/AdministratorHelp/RulesPolicies/SSLTLSInspectionRules/index.html",
            "sophos_doc_title": "SSL/TLS Inspection Rules \u2014 Sophos Firewall Docs",
        },
        {
            "id": "admin_mfa",
            "category": "Administrator Authentication",
            "question": "Are you using multi-factor authentication (MFA) for firewall admin access?",
            "context": "Admin account compromise is one of the most impactful attack vectors on network infrastructure.",
            "severity": "critical",
            "exec_summary": "If an attacker gains access to a firewall admin account they can disable security controls, exfiltrate data, or pivot across the network. Without MFA a single compromised password is all that stands between an attacker and full control of your security perimeter. MFA adds a second verification factor that blocks the vast majority of credential-based attacks.",
            "tech_detail": "Configure MFA using one-time passwords (OTP) under Authentication > Multi-factor Authentication in Sophos Firewall. Create an OTP token for each admin user and enforce OTP sign-in for the WebAdmin and CLI interfaces. Sophos supports standard TOTP tokens compatible with Google Authenticator, Microsoft Authenticator, or any RFC 6238\u2013compliant app.",
            "sophos_doc_url": "https://docs.sophos.com/nsg/sophos-firewall/20.0/Help/en-us/webhelp/onlinehelp/AdministratorHelp/Authentication/MultiFactorAuthentication/index.html",
            "sophos_doc_title": "Multi-factor Authentication \u2014 Sophos Firewall Docs",
        },
        {
            "id": "firmware",
            "category": "Firmware & Patching",
            "question": "Is your firewall running the latest supported firmware version?",
            "context": "Outdated firmware may contain known vulnerabilities that attackers actively exploit.",
            "severity": "critical",
            "exec_summary": "Firewall vendors regularly release firmware updates that patch security vulnerabilities, fix stability issues, and add new threat protections. Running outdated firmware leaves your organisation exposed to publicly disclosed CVEs that attackers routinely scan for. Keeping firmware current is one of the most fundamental and impactful security controls.",
            "tech_detail": "Check your current firmware under System > Administration > Firmware in Sophos Firewall. Download the latest SFOS version from MySophos, schedule a maintenance window, and apply the update. Use the dual-image feature to keep a rollback option. Enable automatic update checks under Backup & Firmware > Firmware to receive notifications when new versions are available.",
            "sophos_doc_url": "https://docs.sophos.com/nsg/sophos-firewall/20.0/Help/en-us/webhelp/onlinehelp/AdministratorHelp/BackupAndFirmware/Firmware/index.html",
            "sophos_doc_title": "Firmware Management \u2014 Sophos Firewall Docs",
        },
        {
            "id": "network_segmentation",
            "category": "Network Segmentation",
            "question": "Do you have separate network zones for servers, users, IoT, and guests?",
            "context": "Flat networks allow attackers to move laterally once they breach a single endpoint.",
            "severity": "high",
            "exec_summary": "A flat network architecture means that once a single device is compromised, the attacker can freely move laterally to reach servers, databases, and other sensitive systems. Proper network segmentation with dedicated zones limits blast radius, contains breaches, and allows you to apply differentiated security policies to each segment based on its risk profile.",
            "tech_detail": "Create separate zones in Sophos Firewall under System > Network > Zones for each logical segment (e.g. LAN_Users, LAN_Servers, IoT, Guest). Assign the relevant interfaces or VLANs to each zone. Create inter-zone firewall rules that only permit the minimum required traffic between segments. Use Sophos Synchronized Security to automatically isolate compromised endpoints at the zone level.",
            "sophos_doc_url": "https://docs.sophos.com/nsg/sophos-firewall/20.0/Help/en-us/webhelp/onlinehelp/AdministratorHelp/Network/Zones/index.html",
            "sophos_doc_title": "Zones \u2014 Sophos Firewall Docs",
        },
        {
            "id": "logging_siem",
            "category": "Logging & Monitoring",
            "question": "Are firewall logs being forwarded to a SIEM or central log collector?",
            "context": "Without centralised logging, security incidents can go undetected for weeks or months.",
            "severity": "high",
            "exec_summary": "Firewall logs contain critical evidence of attacks, policy violations, and anomalous behaviour. If logs only exist on the firewall itself they can be overwritten, tampered with, or missed entirely. Forwarding logs to a centralised SIEM enables real-time alerting, correlation with other data sources, forensic investigations, and compliance reporting.",
            "tech_detail": "Configure syslog forwarding under System Services > Log Settings in Sophos Firewall. Add your SIEM server as a syslog target using TCP or UDP (TCP recommended for reliability). Select the log categories to forward (Security, Firewall, IPS, Web Filter, etc.). For deeper integration, use the Sophos Central Data Lake which automatically ingests firewall logs for XDR correlation.",
            "sophos_doc_url": "https://docs.sophos.com/nsg/sophos-firewall/20.0/Help/en-us/webhelp/onlinehelp/AdministratorHelp/SystemServices/LogSettings/index.html",
            "sophos_doc_title": "Log Settings \u2014 Sophos Firewall Docs",
        },
        {
            "id": "ips_enabled",
            "category": "Intrusion Prevention (IPS)",
            "question": "Is intrusion prevention (IPS) enabled on all relevant firewall rules?",
            "context": "IPS detects and blocks exploit attempts, vulnerability scans, and known attack patterns.",
            "severity": "high",
            "exec_summary": "An Intrusion Prevention System actively inspects traffic for known exploit signatures, vulnerability probes, and malicious patterns. Without IPS enabled on your firewall rules, attacks like buffer overflows, SQL injection probes, and brute-force attempts pass through unchallenged. IPS is a critical layer of defence-in-depth that catches threats other controls miss.",
            "tech_detail": "Enable IPS by applying an IPS policy to your firewall rules under Rules & Policies > Firewall Rules. Edit each relevant rule and under the Security Features section, toggle on the IPS policy. Use the \u2018landesk_default\u2019 or \u2018recommended\u2019 policy as a starting point, then tune based on your environment. Review IPS logs regularly under Log Viewer > IPS to identify and address false positives.",
            "sophos_doc_url": "https://docs.sophos.com/nsg/sophos-firewall/20.0/Help/en-us/webhelp/onlinehelp/AdministratorHelp/IntrusionPrevention/index.html",
            "sophos_doc_title": "Intrusion Prevention \u2014 Sophos Firewall Docs",
        },
        {
            "id": "web_filtering",
            "category": "Web Filtering",
            "question": "Do you have web filtering policies applied for all user groups?",
            "context": "Web filtering blocks access to malicious, phishing, and policy-violating websites.",
            "severity": "high",
            "exec_summary": "Web-based threats remain one of the top attack vectors. Phishing sites, drive-by downloads, and malicious ad networks are responsible for a significant share of malware infections. Web filtering policies block access to known-bad and risky categories before users can interact with dangerous content, significantly reducing your attack surface.",
            "tech_detail": "Configure web filtering under Web > Policies in Sophos Firewall. Create policies for each user group (e.g. Standard Users, IT Staff, Guests) with appropriate category blocks. At minimum, block categories: Malware, Phishing, Spam URLs, Anonymisers/Proxies, and Command & Control. Apply the policies to your firewall rules under the Web Filtering section. Enable SafeSearch enforcement for search engines.",
            "sophos_doc_url": "https://docs.sophos.com/nsg/sophos-firewall/20.0/Help/en-us/webhelp/onlinehelp/AdministratorHelp/WebProtection/index.html",
            "sophos_doc_title": "Web Protection \u2014 Sophos Firewall Docs",
        },
        {
            "id": "backups",
            "category": "Backup & Disaster Recovery",
            "question": "Do you have automated firewall configuration backups scheduled?",
            "context": "Without backups, a failed update or hardware failure means rebuilding from scratch.",
            "severity": "medium",
            "exec_summary": "Firewall configurations represent hundreds of hours of work and encode your entire security policy. A hardware failure, botched update, or ransomware attack could wipe this configuration entirely. Automated backups ensure you can restore your security perimeter within minutes rather than days, dramatically reducing downtime and business impact.",
            "tech_detail": "Schedule automated backups under Backup & Firmware > Backup & Restore in Sophos Firewall. Configure daily backups to be sent via email or uploaded to FTP/SFTP. Enable encryption for backup files. Additionally, configure Sophos Central backup which automatically stores the latest configuration in the cloud. Test restoring a backup periodically to validate the process.",
            "sophos_doc_url": "https://docs.sophos.com/nsg/sophos-firewall/20.0/Help/en-us/webhelp/onlinehelp/AdministratorHelp/BackupAndFirmware/BackupRestore/index.html",
            "sophos_doc_title": "Backup & Restore \u2014 Sophos Firewall Docs",
        },
        {
            "id": "ztna_vpn",
            "category": "Zero Trust / Remote Access",
            "question": "Are you using ZTNA or a modern VPN solution for remote access?",
            "context": "Traditional VPNs grant broad network access once connected, increasing risk.",
            "severity": "medium",
            "exec_summary": "Traditional VPN solutions grant remote users broad access to the entire network once authenticated, violating the principle of least privilege. Zero Trust Network Access (ZTNA) takes a fundamentally different approach by granting access only to specific applications based on user identity, device health, and context. This dramatically reduces the attack surface for remote access scenarios.",
            "tech_detail": "Deploy Sophos ZTNA through Sophos Central. Install the ZTNA agent on endpoints and configure application-level access policies. For each application, define who can access it and under what conditions (device compliance, user group, location). ZTNA gateways can be deployed on the firewall or as standalone VMs. For organisations transitioning gradually, Sophos Firewall also supports modern SSL VPN and IPsec configurations.",
            "sophos_doc_url": "https://docs.sophos.com/nsg/sophos-firewall/20.0/Help/en-us/webhelp/onlinehelp/AdministratorHelp/VPN/index.html",
            "sophos_doc_title": "VPN & ZTNA \u2014 Sophos Firewall Docs",
        },
        {
            "id": "sdwan",
            "category": "SD-WAN",
            "question": "If you have multiple WAN links, have you configured SD-WAN?",
            "context": "SD-WAN optimises application performance and provides resilient failover across WAN links.",
            "severity": "medium",
            "exec_summary": "Organisations with multiple internet connections or MPLS links that do not use SD-WAN are leaving performance and resilience on the table. SD-WAN intelligently routes traffic based on application requirements, performs real-time link quality monitoring, and provides seamless failover. This improves the experience for cloud and SaaS applications while maximising the value of your WAN investment.",
            "tech_detail": "Configure SD-WAN profiles under Routing > SD-WAN Profiles in Sophos Firewall. Create SD-WAN profiles that define link selection strategies (e.g. lowest latency for VoIP, highest bandwidth for bulk transfers). Assign profiles to firewall rules to control which traffic uses which strategy. Configure link health checks (ping, TCP, HTTP) to enable automatic failover. Use SLA-based routing to guarantee quality for critical applications.",
            "sophos_doc_url": "https://docs.sophos.com/nsg/sophos-firewall/20.0/Help/en-us/webhelp/onlinehelp/AdministratorHelp/Routing/SDWANProfiles/index.html",
            "sophos_doc_title": "SD-WAN Profiles \u2014 Sophos Firewall Docs",
        },
    ],
}

TAKEDOWN_DATA = {
    "sophos_strengths": [
        {
            "title": "Synchronized Security",
            "category": "Integration",
            "description": "Only Sophos provides a real-time heartbeat between the firewall and endpoint protection. When a compromised endpoint is detected, the firewall automatically isolates it at the network level within seconds \u2014 no manual intervention required.",
        },
        {
            "title": "Xstream Architecture",
            "category": "Performance",
            "description": "A dedicated Xstream Flow Processor (FPGA) handles trusted traffic at wire speed, freeing the x86 CPU to perform deep-packet inspection on suspicious traffic. This dual-processor design delivers high throughput without sacrificing security depth.",
        },
        {
            "title": "Sophos Central Management",
            "category": "Management",
            "description": "Manage all your firewalls, endpoints, servers, mobile devices, email, and Wi-Fi from a single cloud-based console. No additional management servers to deploy, patch, or maintain. Zero infrastructure overhead.",
        },
        {
            "title": "Hardware-Accelerated TLS Inspection",
            "category": "Encryption",
            "description": "The Xstream Flow Processor offloads TLS decryption to dedicated hardware, enabling inspection of encrypted traffic with minimal performance impact \u2014 critical when 90%+ of traffic is encrypted.",
        },
        {
            "title": "Transparent Pricing",
            "category": "Value",
            "description": "Simple, all-inclusive licensing bundles (Standard or Xstream Protection) without the complex per-blade or per-feature pricing that other vendors use. No surprises at renewal time.",
        },
        {
            "title": "AI-Powered Threat Intelligence",
            "category": "Security",
            "description": "SophosLabs and Sophos X-Ops deliver continuously updated threat intelligence backed by one of the largest AI/ML threat research teams in the industry, feeding directly into firewall detection engines.",
        },
    ],
    "vendor_comparisons": {
        "paloalto": [
            {
                "category": "Endpoint Integration",
                "sophos_position": "Synchronized Security provides automatic, real-time endpoint-to-firewall heartbeat. Compromised devices are isolated instantly at the network level without admin action.",
                "competitor_position": "Requires Cortex XDR as a separate purchase and integration effort. No native real-time heartbeat between firewall and endpoint. Isolation requires manual orchestration or SOAR playbooks.",
                "verdict": "Sophos offers out-of-the-box endpoint\u2013firewall synergy that Palo Alto requires additional products and complexity to achieve.",
            },
            {
                "category": "Management Simplicity",
                "sophos_position": "Sophos Central is a cloud-native platform managing firewalls, endpoints, and more from a single pane of glass with zero infrastructure required.",
                "competitor_position": "Panorama is a dedicated on-premises or VM-based management platform that requires its own licensing, sizing, patching, and HA configuration.",
                "verdict": "Sophos eliminates management infrastructure overhead entirely with a true cloud-native approach.",
            },
            {
                "category": "Total Cost of Ownership",
                "sophos_position": "Bundled licensing includes all security features. No separate charges for URL filtering, sandboxing, or DNS security. Sophos Central is included at no extra cost.",
                "competitor_position": "Requires multiple subscription tiers (Threat Prevention, URL Filtering, DNS Security, WildFire, etc.) plus Panorama licensing. Costs escalate quickly at scale.",
                "verdict": "Sophos delivers significantly lower TCO with transparent, predictable pricing.",
            },
            {
                "category": "TLS Inspection Performance",
                "sophos_position": "Xstream Flow Processor provides dedicated hardware acceleration for TLS decryption with minimal throughput penalty.",
                "competitor_position": "Hardware-assisted but relies on custom silicon that is tied to specific hardware generations. Performance can degrade significantly with full TLS inspection at scale.",
                "verdict": "Both offer hardware-assisted TLS inspection, but Sophos\u2019s FPGA-based approach is more flexible.",
            },
        ],
        "fortinet": [
            {
                "category": "Endpoint Integration",
                "sophos_position": "Synchronized Security heartbeat enables automatic, real-time isolation of compromised endpoints at the firewall level \u2014 no additional agent configuration beyond Sophos Endpoint.",
                "competitor_position": "Security Fabric provides telemetry sharing across FortiGate and FortiClient, but automated isolation requires FortiNAC or FortiClient EMS as additional components with their own licensing.",
                "verdict": "Sophos provides tighter endpoint\u2013firewall integration with fewer moving parts.",
            },
            {
                "category": "Ecosystem Flexibility",
                "sophos_position": "Moderate ecosystem integration \u2014 works well with third-party tools, open APIs, and does not penalise customers for using non-Sophos products.",
                "competitor_position": "Security Fabric strongly incentivises an all-Fortinet stack across 50+ product categories. Full benefits only available when using FortiGate, FortiSwitch, FortiAP, FortiClient, FortiNAC, FortiManager, etc.",
                "verdict": "Sophos offers more flexibility for mixed-vendor environments without feature penalties.",
            },
            {
                "category": "Management Simplicity",
                "sophos_position": "Sophos Central provides unified cloud management at no extra cost. Single console for firewalls and endpoints.",
                "competitor_position": "FortiManager and FortiAnalyzer are separate products requiring dedicated VMs or appliances, each with their own licenses. FortiCloud provides some cloud management but with limited features.",
                "verdict": "Sophos\u2019s cloud-native management is simpler and has no additional infrastructure cost.",
            },
            {
                "category": "Real-World NGFW Throughput",
                "sophos_position": "Xstream architecture delivers consistent performance with all security features enabled. Throughput figures are measured with realistic traffic profiles.",
                "competitor_position": "Headline firewall throughput numbers (e.g. 800 Gbps on the 4400F) are impressive but achieved with large UDP packets. NGFW throughput with all features enabled is dramatically lower.",
                "verdict": "Fortinet wins on raw numbers, but real-world performance gaps are much smaller than datasheets suggest.",
            },
        ],
        "cisco": [
            {
                "category": "Endpoint Integration",
                "sophos_position": "Synchronized Security heartbeat provides automatic endpoint isolation at the firewall level, included in standard licensing.",
                "competitor_position": "Requires Cisco SecureX platform plus Cisco Secure Endpoint (AMP) plus ISE for automated response. Multiple products, multiple licenses, significant integration effort.",
                "verdict": "Sophos achieves automated endpoint\u2013firewall response in a single ecosystem vs. Cisco\u2019s multi-product stack.",
            },
            {
                "category": "TLS Inspection",
                "sophos_position": "Xstream Flow Processor provides hardware-accelerated TLS decryption with minimal performance impact.",
                "competitor_position": "TLS inspection is entirely software-based on x86 processors, causing significant throughput reduction when enabled (often 60\u201380% drop).",
                "verdict": "Sophos delivers dramatically better TLS inspection performance through dedicated hardware offload.",
            },
            {
                "category": "Deployment Simplicity",
                "sophos_position": "Sophos Firewall can be fully configured and managed from day one via an intuitive web UI or Sophos Central. Zero-touch deployment available.",
                "competitor_position": "FTD requires Firepower Management Center (FMC) for full feature access. Initial setup and ongoing management have a steep learning curve. Dual-image (ASA/FTD) model adds confusion.",
                "verdict": "Sophos is significantly easier to deploy and manage, especially for lean IT teams.",
            },
            {
                "category": "Licensing Transparency",
                "sophos_position": "Two clear bundles (Standard Protection, Xstream Protection) with no per-feature add-ons.",
                "competitor_position": "Three tiers (Essentials, Advantage, Premier) plus separate licensing for features like Secure Malware Analytics, SecureX, and Umbrella. Complex renewal process.",
                "verdict": "Sophos pricing is simpler and more predictable.",
            },
        ],
        "checkpoint": [
            {
                "category": "Endpoint Integration",
                "sophos_position": "Synchronized Security heartbeat enables automatic, real-time endpoint\u2013firewall communication and threat response out of the box.",
                "competitor_position": "Harmony Endpoint and Quantum gateways can share threat intelligence, but automated network-level isolation of endpoints requires additional configuration and Identity Awareness blade licensing.",
                "verdict": "Sophos offers a more seamless and automatic endpoint\u2013firewall integration.",
            },
            {
                "category": "Cloud Management",
                "sophos_position": "Sophos Central is a fully featured, cloud-native management platform included at no additional cost.",
                "competitor_position": "SmartConsole is a powerful but Windows-only desktop application. Smart-1 Cloud is available but with additional licensing costs and some feature limitations compared to on-prem SmartConsole.",
                "verdict": "Sophos provides a modern, platform-agnostic cloud management experience included in the base price.",
            },
            {
                "category": "Licensing Model",
                "sophos_position": "Simple bundled licensing \u2014 choose Standard or Xstream Protection and get everything included.",
                "competitor_position": "Software Blade architecture charges per-blade (IPS, App Control, URL Filtering, Anti-Bot, SandBlast, etc.). Costs are difficult to predict and escalate with each additional blade.",
                "verdict": "Sophos\u2019s bundled approach is far more transparent than Check Point\u2019s per-blade model.",
            },
            {
                "category": "Hardware Architecture",
                "sophos_position": "Dual-processor design with a dedicated Xstream Flow Processor (FPGA) for traffic acceleration alongside the x86 inspection engine.",
                "competitor_position": "Pure x86 architecture with CoreXL for multi-core distribution. No dedicated security processing hardware. Performance relies entirely on CPU scaling.",
                "verdict": "Sophos\u2019s purpose-built hardware acceleration delivers better price-to-performance for security workloads.",
            },
        ],
    },
}

DISCOVERY_DATA = {
    "products": [
        {
            "key": "firewall",
            "name": "Sophos Firewall",
            "icon": "\U0001F6E1",
            "color": "#ff922b",
            "questions": [
                {
                    "id": "fw_current_vendor",
                    "question": "What firewall solution are you currently using, and when is your renewal date?",
                    "why": "Establishes the competitive landscape and identifies the urgency window. Renewal dates create natural opportunities for a switch.",
                    "follow_ups": [
                        "How long have you been with this vendor?",
                        "What made you choose them originally?",
                        "Are there any contractual lock-ins we should be aware of?",
                    ],
                },
                {
                    "id": "fw_pain_points",
                    "question": "What are the biggest challenges you face with your current firewall?",
                    "why": "Uncovers dissatisfaction that Sophos can address. Common pains include complexity, poor visibility, slow support, or cost.",
                    "follow_ups": [
                        "Have you experienced any security incidents that your current firewall missed?",
                        "How much time does your team spend managing firewall rules and policies each week?",
                    ],
                },
                {
                    "id": "fw_throughput",
                    "question": "What are your current bandwidth requirements, and do you expect them to grow?",
                    "why": "Ensures we right-size the appliance. Undersizing causes performance bottlenecks; oversizing wastes budget.",
                    "follow_ups": [
                        "What is your current internet circuit bandwidth?",
                        "Do you plan to upgrade your internet links in the next 12\u201324 months?",
                        "How many concurrent users do you typically have?",
                    ],
                },
                {
                    "id": "fw_tls",
                    "question": "Are you currently inspecting encrypted (TLS/SSL) traffic on your firewall?",
                    "why": "Over 90% of traffic is encrypted. If they\u2019re not inspecting it, they have a massive visibility gap \u2014 a key Sophos Xstream differentiator.",
                    "follow_ups": [
                        "Do you know what percentage of your traffic is encrypted?",
                        "Have you tried enabling TLS inspection before? What happened to performance?",
                    ],
                },
                {
                    "id": "fw_endpoint",
                    "question": "What endpoint protection are you running, and does it integrate with your firewall?",
                    "why": "Opens the Synchronized Security conversation \u2014 Sophos\u2019s unique heartbeat between endpoint and firewall for automated threat response.",
                    "follow_ups": [
                        "If a laptop gets infected, how quickly can you isolate it from the network today?",
                        "Would automated isolation of compromised devices be valuable to your team?",
                    ],
                },
                {
                    "id": "fw_management",
                    "question": "How do you manage your firewalls today? On-box, central management, or cloud?",
                    "why": "Positions Sophos Central as a zero-infrastructure cloud management platform included at no extra cost.",
                    "follow_ups": [
                        "How many firewall locations do you manage?",
                        "Do you have dedicated security staff or does IT wear multiple hats?",
                        "Would a single cloud dashboard for firewalls, endpoints, and Wi-Fi be valuable?",
                    ],
                },
                {
                    "id": "fw_budget",
                    "question": "What does your budget look like for this project, and what\u2019s your typical procurement timeline?",
                    "why": "Qualifies the opportunity and ensures we propose the right tier. Also identifies whether they need CapEx or subscription pricing.",
                    "follow_ups": [
                        "Are you looking for a capital purchase or a subscription/MSP model?",
                        "Who else is involved in the decision-making process?",
                        "Are you evaluating other vendors alongside us?",
                    ],
                },
            ],
        },
        {
            "key": "switches",
            "name": "Sophos Switches",
            "icon": "\U0001F500",
            "color": "#6c8cff",
            "questions": [
                {
                    "id": "sw_current",
                    "question": "What switching infrastructure do you currently have in place?",
                    "why": "Understand the existing vendor, age of equipment, and whether they\u2019re due for a refresh.",
                    "follow_ups": [
                        "How old is your current switching hardware?",
                        "Are you experiencing any performance issues or port shortages?",
                        "What vendor and models are you running?",
                    ],
                },
                {
                    "id": "sw_poe",
                    "question": "Do you need Power over Ethernet (PoE) for devices like IP phones, cameras, or access points?",
                    "why": "PoE requirements drive model selection and budget. Sophos offers PoE and PoE+ across the range.",
                    "follow_ups": [
                        "How many PoE devices do you need to support?",
                        "What is the total PoE wattage you require?",
                    ],
                },
                {
                    "id": "sw_management",
                    "question": "How do you manage your switches today? CLI, web UI, or a central platform?",
                    "why": "Sophos switches are managed through Sophos Central alongside firewalls and APs \u2014 a single-pane-of-glass differentiator.",
                    "follow_ups": [
                        "Would consolidating switch, firewall, and Wi-Fi management into one cloud console appeal to you?",
                        "How much time does your team spend on switch configuration and troubleshooting?",
                    ],
                },
                {
                    "id": "sw_scale",
                    "question": "How many switch ports do you need across all locations, and do you expect growth?",
                    "why": "Sizes the opportunity and identifies whether they need access-layer, aggregation, or both.",
                    "follow_ups": [
                        "Do you need 1G access ports, 10G uplinks, or both?",
                        "How many floors or wiring closets do you have?",
                        "Are you planning any office expansions or new sites?",
                    ],
                },
                {
                    "id": "sw_segmentation",
                    "question": "Are you using VLANs to segment your network traffic today?",
                    "why": "Segmentation is a security best practice. Ties into the firewall health check conversation and Sophos\u2019s integrated approach.",
                    "follow_ups": [
                        "How many VLANs do you currently have?",
                        "Do you separate IoT, guest, and corporate traffic?",
                    ],
                },
                {
                    "id": "sw_stacking",
                    "question": "Do you need switch stacking or link aggregation for high availability?",
                    "why": "Identifies resilience requirements and whether they need higher-end models with stacking support.",
                    "follow_ups": [
                        "Is network downtime a critical concern for your business?",
                        "Do you have redundant uplinks today?",
                    ],
                },
            ],
        },
        {
            "key": "sdred",
            "name": "Sophos SD-RED",
            "icon": "\U0001F310",
            "color": "#51cf66",
            "questions": [
                {
                    "id": "red_sites",
                    "question": "How many remote or branch office sites do you have?",
                    "why": "Quantifies the SD-RED opportunity. Each site is a potential unit sale plus the value of simplified remote networking.",
                    "follow_ups": [
                        "Where are these sites located geographically?",
                        "Do all sites need full firewall functionality, or just secure tunnelling back to HQ?",
                    ],
                },
                {
                    "id": "red_current_wan",
                    "question": "How are your remote sites connected to your main network today?",
                    "why": "Identifies whether they\u2019re using MPLS (expensive), site-to-site VPN (complex), or nothing (security gap).",
                    "follow_ups": [
                        "What is your monthly cost for MPLS or dedicated WAN links?",
                        "Have you considered replacing MPLS with internet-based SD-WAN tunnels?",
                    ],
                },
                {
                    "id": "red_vpn_pain",
                    "question": "What challenges do you face setting up and maintaining VPN tunnels to remote sites?",
                    "why": "SD-RED\u2019s zero-touch deployment eliminates VPN complexity \u2014 plug in the device and it auto-connects.",
                    "follow_ups": [
                        "How long does it take to bring a new site online today?",
                        "Do you have IT staff at remote sites, or are they unstaffed?",
                    ],
                },
                {
                    "id": "red_bandwidth",
                    "question": "What bandwidth do your remote sites need, and what type of internet do they have?",
                    "why": "Ensures the right SD-RED model is selected. Also opens up split-tunnel vs full-tunnel architecture discussion.",
                    "follow_ups": [
                        "Do remote users need direct internet breakout for cloud apps like Microsoft 365?",
                        "Would you prefer all traffic to route through HQ for inspection, or split-tunnel?",
                    ],
                },
                {
                    "id": "red_deployment",
                    "question": "How important is zero-touch deployment for your remote sites?",
                    "why": "SD-RED can be pre-configured in Sophos Central and shipped to a site \u2014 a non-technical user just plugs it in. Huge differentiator for distributed organisations.",
                    "follow_ups": [
                        "Could you see value in shipping a pre-configured device to a site with no IT staff?",
                        "How much do you currently spend sending engineers to remote sites for network setup?",
                    ],
                },
            ],
        },
        {
            "key": "ztna",
            "name": "Sophos ZTNA",
            "icon": "\U0001F512",
            "color": "#a78bfa",
            "questions": [
                {
                    "id": "ztna_remote",
                    "question": "How many of your employees work remotely, and how often?",
                    "why": "Quantifies the remote access user base. More remote users = bigger ZTNA opportunity and stronger ROI story.",
                    "follow_ups": [
                        "Is remote work permanent, hybrid, or temporary?",
                        "Do contractors or third parties also need remote access?",
                    ],
                },
                {
                    "id": "ztna_current_vpn",
                    "question": "What VPN solution do you use for remote access today?",
                    "why": "Traditional VPN grants broad network access \u2014 ZTNA provides granular, per-application access. Identifying VPN pain is the entry point.",
                    "follow_ups": [
                        "Are users frustrated with VPN performance or reliability?",
                        "Has VPN capacity been a bottleneck?",
                        "Do you have visibility into what resources VPN users are accessing?",
                    ],
                },
                {
                    "id": "ztna_apps",
                    "question": "What internal applications do your remote users need access to?",
                    "why": "ZTNA provides per-app access rather than full network access. Understanding the app landscape helps scope the deployment.",
                    "follow_ups": [
                        "Are these applications web-based, client-server, or both?",
                        "Are any of these hosted in cloud IaaS (AWS, Azure)?",
                        "Do different user groups need access to different applications?",
                    ],
                },
                {
                    "id": "ztna_identity",
                    "question": "What identity provider do you use? (Azure AD, Okta, on-prem AD, etc.)",
                    "why": "ZTNA relies on identity-based access control. Knowing their IdP determines integration complexity and architecture.",
                    "follow_ups": [
                        "Do you already use conditional access policies?",
                        "Is MFA enforced for all users?",
                    ],
                },
                {
                    "id": "ztna_compliance",
                    "question": "Do you have compliance requirements around remote access? (PCI, HIPAA, ISO 27001, Cyber Essentials)",
                    "why": "Compliance drivers accelerate projects. ZTNA\u2019s least-privilege model directly supports audit and compliance requirements.",
                    "follow_ups": [
                        "Have auditors raised concerns about your current remote access model?",
                        "Do you need to demonstrate least-privilege access in audit reports?",
                    ],
                },
                {
                    "id": "ztna_device_health",
                    "question": "Is device health and posture important for granting remote access?",
                    "why": "Sophos ZTNA can enforce device compliance checks (OS version, endpoint protection status) before granting access \u2014 a key zero-trust principle.",
                    "follow_ups": [
                        "Would you block access from devices that don\u2019t have up-to-date endpoint protection?",
                        "Do you need to differentiate between corporate-managed and personal devices?",
                    ],
                },
            ],
        },
        {
            "key": "wireless",
            "name": "Sophos Wireless",
            "icon": "\U0001F4F6",
            "color": "#ff6b6b",
            "questions": [
                {
                    "id": "wifi_current",
                    "question": "What wireless solution are you running today, and how old is it?",
                    "why": "Identifies the competitive landscape and whether the hardware is due for a refresh (Wi-Fi 5 to Wi-Fi 6/6E).",
                    "follow_ups": [
                        "What vendor and AP models do you have?",
                        "Do you support Wi-Fi 6 or 6E yet?",
                        "Are you experiencing any dead zones or performance issues?",
                    ],
                },
                {
                    "id": "wifi_coverage",
                    "question": "How many access points do you have, and does your coverage meet user expectations?",
                    "why": "Sizes the opportunity and identifies gaps. Users expect seamless roaming and consistent performance.",
                    "follow_ups": [
                        "Have you done a wireless site survey recently?",
                        "What areas have the worst coverage or most complaints?",
                        "Are you planning any office renovations or expansions?",
                    ],
                },
                {
                    "id": "wifi_density",
                    "question": "How many wireless devices connect per access point on average?",
                    "why": "High-density environments (conference rooms, lecture halls, warehouses) need different AP models and design considerations.",
                    "follow_ups": [
                        "Do you have meeting rooms or event spaces where many devices connect simultaneously?",
                        "Are IoT devices (sensors, cameras) also on the wireless network?",
                    ],
                },
                {
                    "id": "wifi_guest",
                    "question": "Do you provide guest Wi-Fi access, and how do you manage it?",
                    "why": "Guest access is a common requirement. Sophos APs support captive portals, vouchers, and social login integrated with the firewall.",
                    "follow_ups": [
                        "Do you need to capture guest information for compliance?",
                        "Is guest traffic isolated from your corporate network?",
                        "Do you throttle bandwidth for guest users?",
                    ],
                },
                {
                    "id": "wifi_management",
                    "question": "How do you manage your wireless infrastructure? A dedicated controller, cloud, or standalone?",
                    "why": "Sophos APs are managed via Sophos Central (cloud) with deep firewall integration \u2014 no separate wireless controller needed.",
                    "follow_ups": [
                        "Would you prefer cloud-managed APs with no on-site controller to maintain?",
                        "Is a single management console for Wi-Fi, switches, and firewalls appealing?",
                    ],
                },
                {
                    "id": "wifi_security",
                    "question": "What wireless security standards are you enforcing? (WPA2-Enterprise, WPA3, 802.1X)",
                    "why": "Identifies security maturity. Sophos APs support WPA3 and integrate with RADIUS/AD for enterprise authentication.",
                    "follow_ups": [
                        "Do you use certificate-based authentication for wireless?",
                        "Are you concerned about rogue access points on your network?",
                    ],
                },
            ],
        },
    ],
}

LICENSING_DATA = {
    "bundles": [
        {
            "key": "standard",
            "name": "Standard Protection",
            "color": "#6c8cff",
            "tagline": "Essential security for every network",
            "description": "The Standard Protection bundle provides the core security subscriptions needed for a well-protected network. It\u2019s the baseline for any Sophos Firewall deployment.",
            "subscriptions": [
                {
                    "name": "Network Protection",
                    "description": "Intrusion Prevention System (IPS), Advanced Threat Protection (ATP), SD-WAN, and Sophos Security Heartbeat\u2122 for Synchronized Security.",
                    "key_features": [
                        "IPS with regularly updated signatures",
                        "Advanced Threat Protection (ATP) with multi-layer threat detection",
                        "SD-WAN with application-based routing and link health monitoring",
                        "Security Heartbeat\u2122 for automatic endpoint\u2013firewall communication",
                        "RED (Remote Ethernet Device) management",
                        "Wireless controller for Sophos APX/AP6 access points",
                    ],
                },
                {
                    "name": "Web Protection",
                    "description": "Web filtering, URL categorisation, application control, and anti-malware scanning for web traffic.",
                    "key_features": [
                        "Web filtering with 90+ URL categories",
                        "HTTPS scanning (with TLS inspection)",
                        "Application control with 3,000+ application signatures",
                        "Dual anti-virus engine scanning (Sophos + third-party)",
                        "Pharming protection",
                        "Enforced SafeSearch for search engines",
                    ],
                },
                {
                    "name": "Enhanced Support",
                    "description": "24/7 phone and email support from Sophos, firmware update access, and advance hardware replacement.",
                    "key_features": [
                        "24/7 technical support via phone and email",
                        "Access to all firmware updates and patches",
                        "10/5 advance replacement (next business day, business hours)",
                        "Access to the Sophos Support Portal and knowledge base",
                    ],
                },
            ],
        },
        {
            "key": "xstream",
            "name": "Xstream Protection",
            "color": "#a78bfa",
            "tagline": "Complete protection with zero-day and cloud orchestration",
            "description": "The Xstream Protection bundle includes everything in Standard Protection plus advanced zero-day threat protection and central orchestration for multi-firewall environments. This is the recommended bundle for most deployments.",
            "includes_standard": True,
            "subscriptions": [
                {
                    "name": "Zero-Day Protection",
                    "description": "Cloud-based sandboxing powered by SophosLabs Intelix\u2122 for analysing suspicious files and detecting unknown threats.",
                    "key_features": [
                        "Cloud sandboxing with machine learning analysis",
                        "Static and dynamic file analysis",
                        "Deep learning threat detection models",
                        "SophosLabs Intelix threat intelligence integration",
                        "Automatic submission of suspicious files",
                        "Detailed threat analysis reports in the dashboard",
                    ],
                },
                {
                    "name": "Central Orchestration",
                    "description": "Sophos Central\u2013based management, reporting, and orchestration features for multi-firewall estates.",
                    "key_features": [
                        "Central Firewall Reporting Advanced (CFR Advanced) with cross-firewall reporting",
                        "SD-WAN VPN orchestration for automated tunnel setup between sites",
                        "Central Firewall Management via Sophos Central",
                        "Group firewall policy management",
                        "Backup management across all firewalls from Central",
                    ],
                },
                {
                    "name": "Enhanced Support Plus",
                    "description": "Upgraded support with 24/7 advance hardware replacement and enhanced RMA for HA auxiliary units.",
                    "key_features": [
                        "24/7 technical support via phone and email",
                        "24/7 advance hardware replacement (next business day, around the clock)",
                        "Enhanced RMA coverage for HA auxiliary (passive) units",
                        "Access to all firmware updates and patches",
                        "Dedicated escalation paths for critical issues",
                    ],
                },
            ],
        },
    ],
    "a_la_carte": [
        {
            "name": "Network Protection",
            "description": "Purchase IPS, ATP, SD-WAN, and Synchronized Security independently without a bundle.",
            "typical_use": "Organisations that only need network-layer protection without web filtering.",
        },
        {
            "name": "Web Protection",
            "description": "Purchase web filtering, application control, and anti-malware scanning independently.",
            "typical_use": "Environments that already have a separate web proxy but need firewall-level application control.",
        },
        {
            "name": "Zero-Day Protection",
            "description": "Add cloud sandboxing and deep-learning analysis as a standalone subscription.",
            "typical_use": "Standard Protection customers who want to add zero-day threat detection without upgrading to the full Xstream bundle.",
        },
        {
            "name": "Central Orchestration",
            "description": "Add Sophos Central management, SD-WAN orchestration, and advanced cross-firewall reporting.",
            "typical_use": "Multi-site deployments on Standard Protection that need centralised VPN orchestration and reporting.",
        },
        {
            "name": "Enhanced Support",
            "description": "24/7 support with 10/5 advance hardware replacement. Included in Standard Protection bundle.",
            "typical_use": "Base-level support for standalone firewall deployments.",
        },
        {
            "name": "Enhanced Support Plus",
            "description": "24/7 support with 24/7 advance hardware replacement and enhanced HA auxiliary RMA.",
            "typical_use": "Any HA deployment or business-critical environment requiring the fastest possible hardware replacement.",
        },
    ],
    "bundle_comparison": [
        {"feature": "Network Protection (IPS, ATP, SD-WAN)", "standard": True, "xstream": True},
        {"feature": "Web Protection (filtering, app control)", "standard": True, "xstream": True},
        {"feature": "Wireless Controller", "standard": True, "xstream": True},
        {"feature": "RED Management", "standard": True, "xstream": True},
        {"feature": "Security Heartbeat\u2122", "standard": True, "xstream": True},
        {"feature": "Enhanced Support (24/7, 10/5 RMA)", "standard": True, "xstream": False},
        {"feature": "Enhanced Support Plus (24/7, 24/7 RMA)", "standard": False, "xstream": True},
        {"feature": "Zero-Day Protection (cloud sandboxing)", "standard": False, "xstream": True},
        {"feature": "Central Orchestration (CFR, VPN orchestration)", "standard": False, "xstream": True},
        {"feature": "HA Auxiliary Enhanced RMA", "standard": False, "xstream": True},
    ],
}

HA_GUIDE_DATA = {
    "overview": {
        "title": "Quoting Sophos Firewalls in HA Configuration",
        "description": "When a customer deploys two Sophos Firewalls in a High Availability (Active/Passive) cluster, only one set of subscriptions is needed \u2014 the licence covers both the primary and auxiliary unit. However, the choice of support subscription is critical for hardware protection on the auxiliary unit.",
    },
    "ha_basics": [
        {
            "title": "One Licence, Two Firewalls",
            "description": "In an HA pair, subscriptions only need to be purchased for the primary unit. The auxiliary (passive) firewall automatically receives the same licence entitlements. There is no need to purchase a second set of security subscriptions.",
            "icon": "\U0001F4B0",
        },
        {
            "title": "Identical Hardware Required",
            "description": "Both firewalls in an HA pair must be the same model. You cannot mix different XGS models in a cluster. Quote two identical hardware appliances.",
            "icon": "\U0001F501",
        },
        {
            "title": "Automatic Failover",
            "description": "If the primary firewall fails, the auxiliary unit takes over seamlessly. No manual intervention required. Stateful failover preserves active connections.",
            "icon": "\u26A1",
        },
    ],
    "support_comparison": {
        "title": "Why Enhanced Support Plus Matters for HA",
        "description": "The key difference between Enhanced Support and Enhanced Support Plus is how the auxiliary (passive) unit is covered for hardware replacement.",
        "tiers": [
            {
                "name": "Enhanced Support",
                "level": "standard",
                "rma_primary": "10/5 advance replacement (next business day, business hours)",
                "rma_auxiliary": "No advance replacement \u2014 return-and-replace only (can take 1\u20132 weeks)",
                "risk": "If the primary fails and the auxiliary takes over, you have no spare. If the auxiliary then fails too, you have no firewall at all while waiting for a replacement. Extended downtime risk.",
            },
            {
                "name": "Enhanced Support Plus",
                "level": "plus",
                "rma_primary": "24/7 advance replacement (next business day, around the clock)",
                "rma_auxiliary": "Enhanced RMA \u2014 advance replacement for the auxiliary unit as well",
                "risk": "Both units are covered with advance replacement. If either unit fails, a replacement is dispatched immediately, maintaining HA resilience at all times.",
            },
        ],
    },
    "quoting_checklist": [
        {
            "item": "Quote two identical XGS hardware appliances",
            "detail": "Both units must be the same model for HA to function.",
        },
        {
            "item": "Quote one set of subscriptions only",
            "detail": "Security subscriptions (Standard or Xstream Protection) only need to be on the primary unit. The auxiliary inherits the licence.",
        },
        {
            "item": "Always recommend Xstream Protection or Enhanced Support Plus",
            "detail": "Xstream Protection includes Enhanced Support Plus by default. If the customer insists on Standard Protection, strongly recommend adding Enhanced Support Plus as an upgrade to cover the auxiliary unit\u2019s RMA.",
        },
        {
            "item": "Explain the HA RMA gap to the customer",
            "detail": "Make the customer aware that without Enhanced Support Plus, their auxiliary firewall only gets return-and-replace RMA \u2014 meaning if it fails, they could wait 1\u20132 weeks for a replacement, leaving them without HA protection.",
        },
        {
            "item": "Position HA as business continuity insurance",
            "detail": "HA isn\u2019t just about uptime \u2014 it\u2019s about ensuring the business never goes unprotected. Enhanced Support Plus ensures the insurance policy itself is protected.",
        },
    ],
    "talk_track": {
        "title": "Suggested Talk Track",
        "paragraphs": [
            "When you deploy two firewalls in HA, you\u2019re making a smart investment in business continuity. The good news is you only need one set of subscriptions \u2014 so the second appliance is essentially just the cost of the hardware.",
            "However, there\u2019s an important consideration around support. With standard Enhanced Support, only the primary firewall gets advance hardware replacement. The auxiliary unit \u2014 the one that\u2019s keeping your network running if the primary fails \u2014 only gets return-and-replace. That means if it fails, you could be waiting up to two weeks for a replacement, during which time you have no HA protection.",
            "With Enhanced Support Plus, both firewalls get advance replacement. So if either unit fails, a replacement is on its way immediately. For the relatively small uplift in cost, you\u2019re ensuring your HA investment is fully protected. That\u2019s why we always recommend Xstream Protection for HA deployments \u2014 it includes Enhanced Support Plus as standard.",
        ],
    },
}

TAKEAWAYS = [
    {
        "title": "Best Raw Throughput",
        "body": "Fortinet\u2019s custom ASIC approach delivers industry-leading throughput numbers, especially at the enterprise tier, often at lower cost-per-Gbps than competitors.",
        "vendor": "fortinet",
    },
    {
        "title": "Most Consistent Under Load",
        "body": "Palo Alto\u2019s single-pass architecture means enabling all security features has a smaller performance penalty than vendors who inspect traffic in multiple stages.",
        "vendor": "paloalto",
    },
    {
        "title": "Best for Cisco Shops",
        "body": "If your network already runs Cisco switches, routers, and ISE, the Secure Firewall integrates natively with your existing stack and Talos intelligence.",
        "vendor": "cisco",
    },
    {
        "title": "Strongest Central Management",
        "body": "Check Point\u2019s SmartConsole has long been regarded as one of the most mature multi-gateway management platforms, especially for complex rule bases.",
        "vendor": "checkpoint",
    },
    {
        "title": "Best Endpoint Synergy",
        "body": "Sophos Synchronized Security creates a real-time heartbeat between the firewall and endpoint, enabling automated lateral-movement isolation that other vendors require additional products to achieve.",
        "vendor": "sophos",
    },
    {
        "title": "SD-WAN Value",
        "body": "Fortinet includes full SD-WAN in FortiOS at no extra licence cost, with ASIC-accelerated overlay performance \u2014 often replacing a dedicated SD-WAN appliance.",
        "vendor": "fortinet",
    },
]
