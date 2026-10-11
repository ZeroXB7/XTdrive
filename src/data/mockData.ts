import { FileItem, SharedVault, ExternalLink, ActiveTransfer, ClientNode } from '../types';

export const USER_AVATAR = "https://lh3.googleusercontent.com/aida/AEtjO1UUrN9FVvjnxyXq6GbHAPYAi2cKBnejDrp4gSaD-CklcQH5ZbpRabU-uH__iMd4mCGEw3IEetnCySIUBH3xrtVMfS_BCYZDLtEh-Bkq2W0rGth15pNvyWv27HJDXPTfEo-wkBpnICcJOjx68qh65zm9JigcKc1ZCaMJHO9DPfFLaq6pNxKH7S5tRvkfTvmI7hBVIC04bq8B05q1Y1gTJ9WTZSEzGohKnymncxlcZVZOorGsRv7hvDxFZLI";

export const VAULT_REPLICA_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuBoaOCWg6XjRtd28BZGn31xDQCOhtyQhpForX-aAo0kP_3wMd_sXI4t9VK4Igd8UyHaDUHdZfqSTWIDxSPYHqT1XmR3I6nOQHo3zCyrmFnyUfUlp27aAz-t15hrb0LZNTPCIjVrGAxRHXzCAf0vsEABNVWdw2KgLsjbyqwzcHy56eY4zKr7qJtpI0tOJtEllh6PZYiIOR1zxjInLQyZQGrwlMJqI6lOy2yHCobdN8K9R4DxInoxWuTP";

export const INVESTOR_AVATAR_1 = "https://lh3.googleusercontent.com/aida-public/AB6AXuA47yLm2-y7GV2Oo_Tc8uMtHTB8901JDgj-wUnT5Kh3X6C6VrH_D2TQy15hBHYwJbnEf-gDlBO8fAHoUA6nIbGCdFr5P_v3lcJKA4YZsMzlah33IhC5IMICc4Qgc5t-DiX49f1Z_HafgIZsJomZ7sGAMvXTkcqppGlm20uOZtYoztfjEbp0Ce6pzm8RizyfinmN3Znb2ZnntyfNKcw8fe2pH_-YM3UGkiwwv22PwSC4uZm3m_dObbIg";

export const AUDITOR_AVATAR_2 = "https://lh3.googleusercontent.com/aida-public/AB6AXuApzLVfPmbovHZ8jghTE_e2fR-bDkcXebnrJLpzsrFBDvINd8x-PKdcdto6zpsiQu4UW0ndK5fNfIk2fbViBD51z-kSSXTaTmO4QBTIl3bA4uvO06MC9F-bkLrn8Mf9MpykBEtTHNZfH2z3e6vaXZF2E4njVUbhe-PFrS-MT0i3gwZRqGqlpRS0W8m4pcKi3jNh0Ou7oNoE6qGFpNQLDXR72KgCrleTyt6VXErxf8PzI_ZD5Dl6JaJL";

export const VIDEO_PREVIEW_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuD5WPx9MZiFXUoQ37bigRFPTsbQ0UI8b6vXETPFqO3MkNDsAYSXGTkR7vv0CJdRBSGELWIYiNIP78HVjhTIFkkJCX6FqgLFmJyGbEjc5ZYAA29G2nWLM_rGaGxMDQzKOQoEarZcXLcXEBq3sRpCi6qjnu6NyVSSG2wYe4QjBwY1j6-t2oZnDUVegqSQyli3Q__cwd1LKnAvsO4xaxmhauDwxzlAYZiEQcX4ni2Qq4DZoYNyK0Gi9DKp";

export const INITIAL_FILES: FileItem[] = [
  {
    id: "f-1",
    name: "3D Render Passes",
    type: "folder",
    size: "18.4 GB",
    sizeBytes: 19756849561,
    modified: "28m ago",
    securityTier: "AES-256 Vault",
    path: "/vault/deliverables/3d_passes",
    tags: [{ label: "Production", color: "bg-surface-container-high text-secondary-fixed-dim" }],
    collaborators: [
      { name: "Alex Rivera", initials: "AL", role: "Owner" },
      { name: "Marcus Vance", initials: "MK", role: "Editor" },
      { name: "External 4+", initials: "+4", role: "Viewers" }
    ],
    sha256: "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9",
    isPinned: true,
  },
  {
    id: "f-2",
    name: "Figma Export Packages",
    type: "folder",
    size: "4.2 GB",
    sizeBytes: 4509715660,
    modified: "3h ago",
    securityTier: "Token Encrypted",
    path: "/vault/deliverables/figma_exports",
    tags: [{ label: "Client Review", color: "bg-surface-container-high text-primary" }],
    collaborators: [
      { name: "Sarah Lin", initials: "SL", role: "Auditor" },
      { name: "Designer", initials: "+1", role: "Contributor" }
    ],
    sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    isStarred: true,
  },
  {
    id: "f-3",
    name: "hero_cinematic_grade_4k.prores",
    type: "video",
    extension: "prores",
    size: "12.8 GB",
    sizeBytes: 13765115904,
    modified: "1h ago",
    securityTier: "Zero-Knowledge",
    path: "/vault/deliverables/hero_cinematic_grade_4k.prores",
    tags: [{ label: "Confidential", color: "bg-surface-bright text-secondary-fixed" }],
    collaborators: [
      { name: "Alex Rivera", avatar: USER_AVATAR, initials: "AR", role: "Owner" },
      { name: "Marcus Vance", initials: "MK", role: "Creative Director" },
      { name: "Sarah Lin", initials: "SL", role: "Security Auditor" }
    ],
    sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    isPinned: true,
    isStarred: true,
    previewUrl: VIDEO_PREVIEW_IMG,
    technicalSpecs: {
      resolution: "3840 × 2160 (UHD)",
      colorSpace: "DCI-P3 / Wide Gamut",
      framerate: "24.000 fps TC",
      bitDepth: "12-bit Quantized",
      encryption: "AES-256-GCM"
    },
    versionHistory: [
      { version: "Version 3.2", label: "Color grade DCI-P3 final pass approved", timeAgo: "1h ago", isActive: true, author: "Alex Rivera" },
      { version: "Version 3.1", label: "Audio sync remaster by Marcus", timeAgo: "Yesterday", isActive: false, author: "Marcus Vance" },
      { version: "Version 3.0", label: "Initial ProRes 4444 raw master export", timeAgo: "3 days ago", isActive: false, author: "Motion Studio" }
    ],
    auditLog: [
      { action: "Downloaded by Alex Rivera", user: "Alex Rivera", timeAgo: "24m ago", ip: "192.168.1.84", verified: true },
      { action: "Signed share token issued by Marcus Vance", user: "Marcus Vance", timeAgo: "1h ago", ip: "SOC2 Signed", verified: true },
      { action: "Ingested & encrypted on node fra-01-vault", user: "System", timeAgo: "1h ago", ip: "Zero-Knowledge Pass", verified: true }
    ]
  },
  {
    id: "f-4",
    name: "vaulta_keynote_presentation_v3.key",
    type: "doc",
    extension: "key",
    size: "248 MB",
    sizeBytes: 260046848,
    modified: "12m ago",
    securityTier: "Workspace Auth",
    path: "/vault/deliverables/vaulta_keynote_presentation_v3.key",
    tags: [{ label: "Approved", color: "bg-surface-container-high text-on-surface-variant" }],
    collaborators: [
      { name: "Sarah Lin", initials: "SL", role: "Contributor" }
    ],
    sha256: "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
    isStarred: true,
  },
  {
    id: "f-5",
    name: "enterprise_security_audit_soc2.pdf",
    type: "doc",
    extension: "pdf",
    size: "14.2 MB",
    sizeBytes: 14889779,
    modified: "Oct 24, 2025",
    securityTier: "Hardware Key",
    path: "/vault/deliverables/enterprise_security_audit_soc2.pdf",
    tags: [{ label: "SOC2 Type II", color: "bg-surface-container-high text-error" }],
    collaborators: [
      { name: "Security Officer", initials: "SO", role: "Auditor" }
    ],
    sha256: "9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca7",
    isPinned: true,
  },
  {
    id: "f-6",
    name: "runtime_model_weights_fp16.bin",
    type: "bin",
    extension: "bin",
    size: "1.8 GB",
    sizeBytes: 1932735283,
    modified: "Yesterday",
    securityTier: "Token Encrypted",
    path: "/vault/deliverables/runtime_model_weights_fp16.bin",
    tags: [{ label: "Pipeline", color: "bg-surface-container-high text-on-surface-variant" }],
    collaborators: [
      { name: "CI Automation", initials: "CI", role: "Runner" }
    ],
    sha256: "13127a3b642e88b13f123f5b34e407831cf64b6e35ac380e22bd49f7b705f543"
  },
  {
    id: "f-7",
    name: "global_typography_manifest.json",
    type: "code",
    extension: "json",
    size: "42 KB",
    sizeBytes: 43008,
    modified: "12m ago",
    securityTier: "Zero-Knowledge",
    path: "/vault/config/global_typography_manifest.json",
    tags: [{ label: "JSON", color: "bg-surface-container text-secondary" }],
    collaborators: [
      { name: "Alex Rivera", avatar: USER_AVATAR, initials: "AR", role: "Owner" }
    ],
    sha256: "ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb"
  },
  {
    id: "f-8",
    name: "hardware_keynote_teaser_1080p.mov",
    type: "video",
    extension: "mov",
    size: "1.84 GB",
    sizeBytes: 1975684956,
    modified: "44m ago",
    securityTier: "Zero-Knowledge",
    path: "/vault/media/hardware_keynote_teaser_1080p.mov",
    tags: [{ label: "VIDEO", color: "bg-surface-container text-primary" }],
    collaborators: [
      { name: "Motion Studio", initials: "MS", role: "Editor" }
    ],
    sha256: "3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d"
  },
  {
    id: "f-9",
    name: "ios_icon_matrix_exported_masters.zip",
    type: "archive",
    extension: "zip",
    size: "384 MB",
    sizeBytes: 402653184,
    modified: "4h ago",
    securityTier: "Token Encrypted",
    path: "/vault/icons/ios_icon_matrix_exported_masters.zip",
    tags: [{ label: "ARCHIVE", color: "bg-surface-container text-outline" }],
    collaborators: [
      { name: "Design Team", initials: "DT", role: "Contributor" }
    ],
    sha256: "2e652328580bb03de337bc561b19904e3340607bf4f48cb9c616496584c87537"
  }
];

export const INITIAL_TRASH_ITEMS: FileItem[] = [
  {
    id: "t-1",
    name: "v2_final_rough_cut_prores.mov",
    type: "video",
    extension: "mov",
    size: "14.2 GB",
    sizeBytes: 15247133900,
    modified: "32 days ago",
    securityTier: "AES-256 Vault",
    path: "/trash/v2_final_rough_cut_prores.mov",
    tags: [{ label: "Duplicate", color: "bg-error-container text-on-error-container" }],
    collaborators: [{ name: "Alex Rivera", initials: "AR", role: "Owner" }],
    sha256: "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e",
    isDeleted: true,
    deletedDaysLeft: 2
  },
  {
    id: "t-2",
    name: "deprecated_tokens_v3_draft.json",
    type: "code",
    extension: "json",
    size: "180 KB",
    sizeBytes: 184320,
    modified: "35 days ago",
    securityTier: "Token Encrypted",
    path: "/trash/deprecated_tokens_v3_draft.json",
    tags: [{ label: "Stale", color: "bg-surface-container text-outline" }],
    collaborators: [{ name: "Alex Rivera", initials: "AR", role: "Owner" }],
    sha256: "5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5",
    isDeleted: true,
    deletedDaysLeft: 1
  },
  {
    id: "t-3",
    name: "raw_photogrammetry_scan_temp.obj",
    type: "bin",
    extension: "obj",
    size: "3.8 GB",
    sizeBytes: 4080218931,
    modified: "31 days ago",
    securityTier: "Zero-Knowledge",
    path: "/trash/raw_photogrammetry_scan_temp.obj",
    tags: [{ label: "Scratch", color: "bg-surface-container text-outline" }],
    collaborators: [{ name: "Motion Studio", initials: "MS", role: "Owner" }],
    sha256: "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b",
    isDeleted: true,
    deletedDaysLeft: 4
  }
];

export const INITIAL_SHARED_VAULTS: SharedVault[] = [
  {
    id: "sv-1",
    title: "Starlight Capital Due Diligence Room",
    description: "Strict governance for M&A advisory and audit committee.",
    badge: "ACTIVE • SSO",
    badgeColor: "text-secondary-fixed bg-surface-container-highest",
    filesCount: 14,
    investorsCount: 4,
    watermarkEnabled: true,
    engagementVelocity: "94 req/hr",
    expires: "Expires: 14d",
    collaboratorAvatars: [
      { src: INVESTOR_AVATAR_1 },
      { src: AUDITOR_AVATAR_2 },
      { initials: "+2" }
    ]
  },
  {
    id: "sv-2",
    title: "Nike Global Campaign Assets",
    description: "Multi-terabyte 8K master plates, 3D renders, and broadcast deliverables.",
    badge: "PORTAL • STREAMING",
    badgeColor: "text-primary bg-surface-container-highest",
    filesCount: 68,
    investorsCount: 8,
    watermarkEnabled: false,
    engagementVelocity: "142 GB Cached",
    expires: "No Expiry",
    collaboratorAvatars: [
      { initials: "VR" },
      { initials: "EW" },
      { initials: "+4" }
    ],
    bandwidth: "2.4 TB / mo",
    p2pCached: true
  },
  {
    id: "sv-3",
    title: "Series B Financial Modeling & Cap Table",
    description: "Air-gapped enclave with ephemeral biometric WebAuthn verification.",
    badge: "RESTRICTED • ZERO DL",
    badgeColor: "text-error bg-error/10",
    filesCount: 6,
    investorsCount: 3,
    watermarkEnabled: true,
    engagementVelocity: "FIPS 140-3",
    expires: "Session: 30m Auto-purge",
    collaboratorAvatars: [
      { initials: "AR" },
      { initials: "YC" }
    ],
    drmRestricted: true
  },
  {
    id: "sv-4",
    title: "Open Source SDK Documentation & Binaries",
    description: "Globally propagated distribution point signed via Vaulta Root CA.",
    badge: "PUBLIC • VERIFIED CDN",
    badgeColor: "text-secondary-fixed bg-surface-container-highest",
    filesCount: 42,
    investorsCount: 120,
    watermarkEnabled: false,
    engagementVelocity: "+14% vs yesterday",
    expires: "Unmetered Bandwidth",
    collaboratorAvatars: [
      { initials: "TC" },
      { initials: "DL" }
    ],
    publicCdn: true,
    downloadsCount: "8.4k DLs"
  }
];

export const INITIAL_EXTERNAL_LINKS: ExternalLink[] = [
  {
    id: "link-1",
    targetName: "Starlight DD Enclave",
    targetPath: "Target: /vaults/fin-2025/audit",
    targetType: "folder",
    vanityEndpoint: "vaulta.to/p/starlight-dd",
    safeguards: [
      { label: "Password", icon: "key" },
      { label: "Domain IP", icon: "vpn_lock" }
    ],
    quotaUsed: 18,
    quotaLimit: 50,
    viewsCount: 142,
    telemetryNote: "4 concurrent",
    expiry: "14d 08h",
    isRevoked: false
  },
  {
    id: "link-2",
    targetName: "Nike_Cut_v09_Master.mov",
    targetPath: "Target: /campaigns/q3/video",
    targetType: "video",
    vanityEndpoint: "vaulta.to/drop/nike-agency-raw",
    safeguards: [
      { label: "Watermark", icon: "water_drop", highlight: true },
      { label: "Token Gated", icon: "lock" }
    ],
    quotaUsed: 100,
    quotaLimit: "Unlimited",
    quotaUnit: "Stream Cap: 8K",
    viewsCount: 891,
    telemetryNote: "Zero packet drops",
    expiry: "Never",
    isRevoked: false
  },
  {
    id: "link-3",
    targetName: "Q4_Board_Deck_Encrypted.pdf",
    targetPath: "Target: /exec/board/decks",
    targetType: "doc",
    vanityEndpoint: "vaulta.to/sec/bd-38910x",
    safeguards: [
      { label: "Burn-on-Read", icon: "local_fire_department", highlight: true },
      { label: "No Print", icon: "print_disabled" }
    ],
    quotaUsed: 1,
    quotaLimit: 1,
    viewsCount: 1,
    telemetryNote: "128.30.52.12",
    expiry: "Purged",
    isRevoked: true,
    isExpired: true
  },
  {
    id: "link-4",
    targetName: "vaulta-core-v2.1.4-darwin.pkg",
    targetPath: "Target: /artifacts/releases/bin",
    targetType: "bin",
    vanityEndpoint: "vaulta.to/dl/darwin-v2",
    safeguards: [
      { label: "Unrestricted", icon: "public" }
    ],
    quotaUsed: 8421,
    quotaLimit: "Unlimited",
    quotaUnit: "downloads",
    viewsCount: 19200,
    telemetryNote: "Edge Replicated",
    expiry: "Never",
    isRevoked: false
  }
];

export const INITIAL_TRANSFERS: ActiveTransfer[] = [
  {
    id: "t-1",
    name: "design_tokens_v4.json",
    progress: 100,
    speed: "Done",
    currentSize: "180 KB",
    totalSize: "180 KB",
    status: "complete",
    hashVerified: "Verified SHA-256"
  },
  {
    id: "t-2",
    name: "4k_product_reel_final.mp4",
    progress: 78,
    speed: "85.4 MB/s",
    currentSize: "3.28 GB",
    totalSize: "4.20 GB",
    status: "uploading"
  },
  {
    id: "t-3",
    name: "contracts_signed.zip",
    progress: 0,
    speed: "Waiting for pipe slot",
    currentSize: "0 MB",
    totalSize: "12.4 MB",
    status: "queued"
  }
];

export const INITIAL_CLIENT_NODES: ClientNode[] = [
  {
    id: "node-1",
    name: 'MacBook Pro 16"',
    location: "San Francisco, CA",
    ip: "198.51.100.24",
    enclaveId: "Enclave ID: T2-SEC-92938",
    activeStatus: "Active Now",
    isCurrent: true,
    isRevoked: false,
    deviceType: "laptop"
  },
  {
    id: "node-2",
    name: "Studio Workstation",
    location: "Berlin, DE",
    ip: "85.214.132.88",
    enclaveId: "Sync node active",
    activeStatus: "28 mins ago",
    isCurrent: false,
    isRevoked: false,
    deviceType: "desktop"
  },
  {
    id: "node-3",
    name: "iPad Pro M4",
    location: "Tokyo, JP",
    ip: "203.0.113.195",
    enclaveId: "Biometric Passkey",
    activeStatus: "3 hours ago",
    isCurrent: false,
    isRevoked: false,
    deviceType: "tablet"
  }
];
