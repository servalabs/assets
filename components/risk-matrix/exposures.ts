import type { Severity, RiskSource } from "./types";

// Sovereignty Risk Matrix + Exposure Ledger — SINGLE SOURCE OF TRUTH.
//
// This file (exposures.ts) is the SSOT for the Sovereignty Risk Matrix and
// the headline-driven exposure ledger shared by servalabs.com and the
// WinCommander dashboard. `scandals.ts` derives its `SCANDALS` map — the
// data structure actually consumed by the rendered Risk Matrix component —
// from `EXPOSURES` (the punchy-headline event ledger) and `ENTITIES` (the
// per-node metadata) defined below. `SOURCES.md` remains the citation
// verification ledger: every claim behind every `explanation` below was
// checked against the authoritative sources listed in `sources`, quotes and
// verification notes live there, and wording here is tightened to what
// those sources support.
//
// EXPOSURES entries are grouped by entity in the same order as scandals.ts
// (nvidia, google, microsoft, meta, amazon, apple, openai, zoom, oracle,
// adobe, slack, nsa, usgov, cia, fbi, rsa, juniper, cisco) so a reader can
// scan company-by-company. 18 entities, 111 events — one Exposure per event,
// none dropped, merged, or skipped.

export interface EntityMeta {
  name: string;
  /** Logo key resolved via the bundled asset map (e.g. "google-logo.svg"). */
  logo: string;
  /** Node/brand accent color (any CSS color). */
  color: string;
  /** Short editorial tagline shown under the name, e.g. "The Data Harvester". */
  description: string;
  /** Placement: orbiting tech giant, or a central intel/state node. */
  category: "tech" | "agency";
}

export interface Exposure {
  /** The ENTITIES key this event belongs to, e.g. "google", "meta", "nsa". */
  entity: string;
  /** Punchy, consumer-legible headline — the point of this ledger. */
  headline: string;
  /** Brief (1-3 sentence) explanation of what happened. */
  explanation: string;
  year: string;
  severity: Severity;
  /** Capped at the 4 strongest citations. */
  sources: RiskSource[];
  /** Editorial image key, resolved via the bundled asset map (optional). */
  image?: string;
  /** Audiences this event is most relatable to (ISO country codes, e.g. "IN"
   *  for Indian readers: WhatsApp, Android, Windows, ChatGPT, an Indian
   *  company cut off). Hosts can float these to the top with the
   *  RiskMatrix `featuredAudience` prop. Optional; most events have none. */
  audiences?: string[];
  /** How close the incident is to ordinary people's daily life:
   *  1 = everyday (phones, chats, email, glasses, home cameras, AI chats),
   *  2 = businesses / organisations / countries, 3 = government or spy background.
   *  Hosts may sort by it (lower first). */
  rank?: 1 | 2 | 3;
  /** Show this incident first for its entity (owner pick). */
  pin?: boolean;
}

export const ENTITIES: Record<string, EntityMeta> = {
  nvidia: {
    name: "NVIDIA",
    logo: "nvidia-logo.svg",
    color: "#76B900",
    description: "Chips caught in politics",
    category: "tech",
  },
  google: {
    name: "Google",
    logo: "google-logo.svg",
    color: "#EA4335",
    description: "Collects your data",
    category: "tech",
  },
  microsoft: {
    name: "Microsoft",
    logo: "microsoft-logo.svg",
    color: "#00A4EF",
    description: "Collects Windows usage data",
    category: "tech",
  },
  meta: {
    name: "Meta",
    logo: "meta-logo.png",
    color: "#1877F2",
    description: "Earns from your data",
    category: "tech",
  },
  amazon: {
    name: "Amazon",
    logo: "amazon-logo.svg",
    color: "#FF9900",
    description: "Home cameras and Alexa",
    category: "tech",
  },
  apple: {
    name: "Apple",
    logo: "apple-logo.svg",
    color: "#A2AAAD",
    description: "Privacy brand with gaps",
    category: "tech",
  },
  openai: {
    name: "OpenAI",
    logo: "openai-logo.svg",
    color: "#10A37F",
    description: "Learns from your chats",
    category: "tech",
  },
  zoom: {
    name: "Zoom",
    logo: "zoom-logo.svg",
    color: "#2D8CFF",
    description: "China server mix-up",
    category: "tech",
  },
  oracle: {
    name: "Oracle",
    logo: "oracle-logo.svg",
    color: "#F80000",
    description: "Works with US government",
    category: "tech",
  },
  adobe: {
    name: "Adobe",
    logo: "adobe-logo.png",
    color: "#FF0000",
    description: "Can lock your account",
    category: "tech",
  },
  slack: {
    name: "Slack",
    logo: "slack-logo.svg",
    color: "#4A154B",
    description: "Closes accounts by country",
    category: "tech",
  },
  nsa: {
    name: "NSA",
    logo: "nsa-logo.png",
    color: "#e5e7eb",
    description: "US spy agency",
    category: "agency",
  },
  usgov: {
    name: "US Government",
    logo: "usa-flag.jpg",
    color: "#dc2626",
    description: "Sets the US rules",
    category: "agency",
  },
  cia: {
    name: "CIA",
    logo: "cia-logo.png",
    color: "#e5e7eb",
    description: "Builds hacking tools",
    category: "agency",
  },
  fbi: {
    name: "FBI",
    logo: "fbi-seal.svg",
    color: "#002E6D",
    description: "US federal police",
    category: "agency",
  },
  rsa: {
    name: "RSA",
    logo: "rsa-logo.svg",
    color: "#CC0000",
    description: "Paid to weaken security",
    category: "tech",
  },
  juniper: {
    name: "Juniper Networks",
    logo: "juniper-logo.svg",
    color: "#84B135",
    description: "Hidden master password",
    category: "tech",
  },
  cisco: {
    name: "Cisco",
    logo: "cisco-logo.svg",
    color: "#049FD9",
    description: "Devices opened in shipping",
    category: "tech",
  },
};

export const EXPOSURES: Exposure[] = [
  // ---- NVIDIA ----
  {
    entity: "nvidia",
    headline: "The US has limited Nvidia's AI chip sales to China since 2022",
    rank: 2,
    explanation:
      "US government rules, tightened in 2023 and 2024, limit sales of Nvidia's most powerful AI chips to China. In December 2025 the US allowed H200 chip sales, with conditions.",
    year: "2022–25",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.cfr.org/expert-brief/consequences-exporting-nvidias-h200-chips-china", label: "Council on Foreign Relations" },
      { url: "https://www.congress.gov/crs-product/R48642", label: "Congressional Research Service" },
    ],
  },
  {
    entity: "nvidia",
    headline: "US rules also limited sales of Nvidia's RTX 4090 gaming card",
    rank: 2,
    explanation:
      "From November 17, 2023, selling this gaming card to China, Saudi Arabia, the UAE and Vietnam needed US government permission. It is built on the same chip as limited AI chips.",
    year: "2023",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.tomshardware.com/pc-components/gpus/nvidia-rtx-4090-subject-to-china-export-restrictions-starting-november-17", label: "Tom's Hardware" },
      { url: "https://videocardz.com/newz/u-s-to-restrict-shipment-of-nvidia-h800-and-rtx-4090-gpus-to-china", label: "VideoCardz" },
    ],
  },
  {
    entity: "nvidia",
    headline: "The US ordered Nvidia to stop selling top AI chips to China",
    rank: 2,
    explanation:
      "On October 17, 2023 the US banned sales to China of Nvidia's A100 and H100 chips, and the A800 and H800 made for China. The ban took effect early, on October 23.",
    year: "2023",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.cnbc.com/2023/10/17/us-bans-export-of-more-ai-chips-including-nvidia-h800-to-china.html", label: "CNBC" },
      { url: "https://technode.com/2023/10/26/us-tells-nvidia-to-immediately-cease-ai-chip-exports-to-china/", label: "TechNode" },
    ],
  },

  // ---- Google ----
  {
    entity: "google",
    headline: "In 1999 Google promised a search engine with no ads",
    rank: 2,
    explanation:
      "A 1999 Google advert said its search was 'pure', with no ads and no paid links. Later, Google built the world's biggest online advertising business.",
    year: "1999",
    severity: "CRITICAL",
    sources: [
      { url: "https://cybercultural.com/p/google-1999/", label: "Cybercultural" },
      { url: "https://www.uniladtech.com/news/tech-news/google-ad-from-1999-588164-20240314", label: "UNILAD Tech" },
    ],
    image: "google-ad-1999.jpeg",
  },
  {
    entity: "google",
    headline: "Google scanned your Gmail emails to choose ads for over 10 years",
    rank: 1,
    explanation:
      "Google stopped this for personal Gmail accounts in 2017. Ads still bring in most of its money: about 77% of its parent company's income in 2023.",
    year: "Ongoing",
    severity: "CRITICAL",
    sources: [
      { url: "https://fourweekmba.com/google-revenue-breakdown/", label: "FourWeekMBA" },
      { url: "https://www.npr.org/sections/thetwo-way/2017/06/26/534451513/google-says-it-will-no-longer-read-users-emails-to-sell-targeted-ads", label: "NPR" },
      { url: "https://time.com/4831200/google-gmail-ads-advertising-email/", label: "TIME" },
    ],
  },
  {
    entity: "google",
    headline: "Android phones send data to Google every 4½ minutes, even when unused",
    rank: 1,
    audiences: ["IN"],
    explanation:
      "A 2021 Trinity College Dublin study found this, on average, for both Android phones and iPhones. Resting Google Pixel phones sent about 20 times more data than the iPhone tested.",
    year: "2021",
    severity: "HIGH",
    sources: [
      { url: "https://www.irishtimes.com/business/technology/smartphones-share-our-data-every-four-and-a-half-minutes-says-study-1.4521267", label: "The Irish Times" },
    ],
  },
  {
    entity: "google",
    headline: "People working for Google may read your Gemini AI chats",
    rank: 1,
    explanation:
      "Google says trained reviewers may read Gemini chats to improve it, keeping some for up to three years. It warns users not to type anything they would not want reviewers to see.",
    year: "Ongoing",
    severity: "HIGH",
    sources: [
      { url: "https://support.google.com/gemini/answer/13594961?hl=en", label: "Google" },
    ],
    image: "humans-review-gemini.jpg",
  },
  {
    entity: "google",
    headline: "US order cut new Huawei phones off Gmail, YouTube and Play Store",
    rank: 1,
    audiences: ["IN"],
    explanation:
      "In May 2019 the US government put Huawei on a trade blacklist. Google could no longer give its apps to Huawei, so new Huawei phones came without Play Store, Gmail, Maps and YouTube.",
    year: "2019",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.androidauthority.com/huawei-google-android-ban-988382/", label: "Android Authority" },
    ],
  },
  {
    entity: "google",
    headline: "Google agreed to pay Texas $1.375 billion over face and location data",
    rank: 1,
    explanation:
      "The deal, final in October 2025, settled claims Google collected people's locations, private Incognito browsing, voice prints and face shapes through Photos, Assistant and Nest Hub Max without permission.",
    year: "2025",
    severity: "HIGH",
    sources: [
      { url: "https://www.texasattorneygeneral.gov/news/releases/attorney-general-ken-paxton-finalizes-historic-settlement-google-and-secures-1375-billion-big-tech", label: "Texas Attorney General" },
      { url: "https://www.bracewell.com/resources/google-agrees-to-1-375-billion-settlement-as-texas-attorney-general-continues-data-privacy-push/", label: "Bracewell LLP" },
    ],
  },
  {
    entity: "google",
    headline: "Google kept records of people's private 'Incognito' browsing",
    rank: 1,
    explanation:
      "In April 2024 Google agreed to delete billions of these records or remove names from them, and to block some outside tracking in Incognito for five years. About 136 million users got no direct payment.",
    year: "2024",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.npr.org/2024/04/01/1242019127/google-incognito-mode-settlement-search-history", label: "NPR" },
      { url: "https://thehackernews.com/2024/04/google-to-delete-billions-of-browsing.html", label: "The Hacker News" },
    ],
  },
  {
    entity: "google",
    headline: "Google permanently closed two fathers' accounts over medical photos of their children",
    rank: 1,
    explanation:
      "The fathers took photos of their toddlers because a doctor asked. Google's automatic checker for child-abuse images flagged them; police found no crime, but Google never gave the accounts back.",
    year: "2021–22",
    severity: "CRITICAL",
    sources: [
      { url: "https://gizmodo.com/google-csam-photodna-1849440471", label: "Gizmodo" },
    ],
  },
  {
    entity: "google",
    headline: "Turning off 'Location History' did not stop Google tracking your location",
    rank: 1,
    explanation:
      "In November 2022 Google paid $391.5 million to 40 US states. They said Google kept collecting location through another setting, 'Web & App Activity', and misled users from 2014 to 2020.",
    year: "2022",
    severity: "HIGH",
    sources: [
      { url: "https://fortune.com/2022/11/14/google-settles-with-40-states-391-million-location-data-tracking-privacy/", label: "Fortune" },
      { url: "https://www.hunton.com/privacy-and-cybersecurity-law-blog/google-agrees-to-391-5-million-settlement-with-40-states-over-misleading-location-tracking-practices", label: "Hunton Andrews Kurth" },
    ],
  },

  // ---- Microsoft ----
  {
    entity: "microsoft",
    headline: "Microsoft, Amazon, Google and Oracle shared a $9 billion US military deal",
    rank: 3,
    explanation:
      "Microsoft won a $10 billion US military online computing contract in 2019. After Amazon's court challenge it was cancelled; in December 2022 the four companies split up to $9 billion instead.",
    year: "2019/2022",
    severity: "HIGH",
    sources: [
      { url: "https://en.wikipedia.org/wiki/Joint_Enterprise_Defense_Infrastructure", label: "Wikipedia" },
      { url: "https://www.cnbc.com/2022/12/07/google-oracle-amazon-and-microsoft-awarded-9-billion-pentagon-cloud-deals.html", label: "CNBC" },
    ],
  },
  {
    entity: "microsoft",
    headline: "Windows sends basic data to Microsoft that you cannot fully switch off",
    rank: 1,
    audiences: ["IN"],
    explanation:
      "Home versions of Windows send this data about your device by default. Extra data about your web browsing and app use is also sent, but you can turn that part off.",
    year: "Ongoing",
    severity: "HIGH",
    sources: [
      { url: "https://learn.microsoft.com/en-us/windows/privacy/optional-diagnostic-data", label: "Microsoft Learn" },
      { url: "https://learn.microsoft.com/en-us/windows/privacy/configure-windows-diagnostic-data-in-your-organization", label: "Microsoft Learn" },
    ],
  },
  {
    entity: "microsoft",
    headline: "Windows 'Recall' saved screenshots of your screen, even card numbers",
    rank: 1,
    audiences: ["IN"],
    explanation:
      "Researchers found Recall's screenshots, including credit card and US ID numbers, could be read without special access. After complaints, Microsoft delayed it, made users choose to turn it on, and protected its data better.",
    year: "2024",
    severity: "CRITICAL",
    sources: [
      { url: "https://thehackernews.com/2024/06/microsoft-revamps-controversial-ai.html", label: "The Hacker News" },
      { url: "https://securityboulevard.com/2024/11/microsofts-controversial-recall-feature-release-delayed-again/", label: "Security Boulevard" },
    ],
  },
  {
    entity: "microsoft",
    headline: "Chinese-linked hackers used a stolen Microsoft key to read US government email",
    rank: 2,
    explanation:
      "In 2023 the hackers read email at about 25 organisations, including US government offices. A US review board said Microsoft could have prevented it and its security culture was not good enough.",
    year: "2023",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.helpnetsecurity.com/2024/04/03/microsoft-storm-0558-key/", label: "Help Net Security" },
      { url: "https://www.microsoft.com/en-us/security/blog/2023/07/14/analysis-of-storm-0558-techniques-for-unauthorized-email-access/", label: "Microsoft Security Response Center Blog" },
    ],
  },
  {
    entity: "microsoft",
    headline: "Microsoft stopped new sales in Russia after it invaded Ukraine",
    rank: 2,
    explanation:
      "On March 4, 2022, Microsoft stopped all new sales of its products and services in Russia. It acted in step with trade limits placed on Russia by the US, EU and UK.",
    year: "2022",
    severity: "HIGH",
    sources: [
      { url: "https://blogs.microsoft.com/on-the-issues/2022/03/04/microsoft-suspends-russia-sales-ukraine-conflict/", label: "Microsoft" },
      { url: "https://techcrunch.com/2022/03/10/amazon-microsoft-and-google-have-suspended-cloud-sales-in-russia/", label: "TechCrunch" },
    ],
  },
  {
    entity: "microsoft",
    headline: "Microsoft's GitHub limited coders in Iran, Syria and Crimea",
    rank: 2,
    explanation:
      "In July 2019 GitHub, a website where programmers keep their code, blocked private projects and some other services for users in Iran, Syria and Crimea, citing US trade law. Public projects stayed open.",
    year: "2019",
    severity: "HIGH",
    sources: [
      { url: "https://techcrunch.com/2019/07/29/github-ban-sanctioned-countries/", label: "TechCrunch" },
    ],
  },
  {
    entity: "microsoft",
    headline: "Leaked papers said Microsoft was first to join a US spy programme",
    rank: 3,
    explanation:
      "Leaked papers from the NSA, a US spy agency, said Microsoft joined in September 2007 and worked with it on Outlook.com, SkyDrive and Skype. Microsoft denied giving any government unlimited or direct access.",
    year: "2013",
    severity: "HIGH",
    sources: [
      { url: "https://en.wikipedia.org/wiki/PRISM", label: "Wikipedia" },
      { url: "https://thenextweb.com/news/guardian-microsoft-cooperated-with-nsa-giving-access-to-skydrive-skype-and-outlook-com-data", label: "TheNextWeb" },
    ],
  },
  {
    entity: "microsoft",
    headline: "Microsoft cut off an Indian company's email and Teams for eight days",
    rank: 2,
    audiences: ["IN"],
    explanation:
      "On July 22, 2025 Microsoft stopped Outlook and Teams for Nayara Energy, 49% owned by Russia's Rosneft, citing EU penalties. Service returned July 30, hours before a Delhi High Court hearing.",
    year: "2025",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.theregister.com/2025/08/04/nayara_energy_microsoft_india/", label: "The Register" },
      { url: "https://www.datacenterdynamics.com/en/news/microsoft-cuts-off-cloud-services-to-rosneft-backed-nayara-energy/", label: "Data Center Dynamics" },
    ],
  },

  // ---- Meta ----
  {
    entity: "meta",
    headline: "About 97% of Meta's money comes from ads based on your data",
    rank: 1,
    explanation:
      "Meta owns Facebook, Instagram and WhatsApp. In 2025 it earned about $196.2 billion from ads out of $201.0 billion in total. Its ads are chosen using what it knows about users.",
    year: "2025",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.sec.gov/Archives/edgar/data/0001326801/000162828026003942/meta-20251231.htm", label: "SEC EDGAR" },
      { url: "https://s21.q4cdn.com/399680738/files/doc_news/Meta-Reports-Fourth-Quarter-and-Full-Year-2025-Results-2026.pdf", label: "Meta Investor Relations" },
    ],
  },
  {
    entity: "meta",
    headline: "WhatsApp messages are private, but WhatsApp still collects other details",
    rank: 1,
    audiences: ["IN"],
    explanation:
      "Only you and the other person can read messages; WhatsApp says it does not record who messages whom. It collects device and internet details, activity times and call length, and may share some with Meta.",
    year: "Ongoing",
    severity: "HIGH",
    sources: [
      { url: "https://faq.whatsapp.com/683043392411948/?locale=en_US", label: "WhatsApp Help Center" },
      { url: "https://www.whatsapp.com/legal/privacy-policy", label: "WhatsApp (Meta) Privacy Policy" },
    ],
  },
  {
    entity: "meta",
    headline: "Europe fined Meta a record €1.2 billion for moving data to America",
    rank: 2,
    explanation:
      "In May 2023 Ireland's data protection office fined Meta for unlawfully sending European users' data to the US after a top EU court ruling. It is still the biggest fine ever under Europe's privacy law.",
    year: "2023",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.dataprotection.ie/en/news-media/press-releases/Data-Protection-Commission-announces-conclusion-of-inquiry-into-Meta-Ireland", label: "Data Protection Commission (Ireland)" },
      { url: "https://noyb.eu/en/edpb-decision-facebooks-eu-us-data-transfers-stop-transfers-fine-and-repatriation", label: "noyb.eu" },
    ],
  },
  {
    entity: "meta",
    headline: "Facebook fined $5 billion after an app took millions of users' data",
    rank: 1,
    explanation:
      "Facebook let an outside app wrongly collect data on tens of millions of users, which went to Cambridge Analytica for political use. The US fine, a record then, came in July 2019.",
    year: "2019",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.ftc.gov/news-events/news/press-releases/2019/07/ftc-imposes-5-billion-penalty-sweeping-new-privacy-restrictions-facebook", label: "Federal Trade Commission" },
      { url: "https://www.forbes.com/sites/mnunez/2019/07/24/ftcs-unprecedented-slap-fines-facebook-5-billion-forces-new-privacy-controls/", label: "Forbes" },
    ],
  },
  {
    entity: "meta",
    headline: "Workers in Kenya watched private videos from Meta's Ray-Ban smart glasses",
    rank: 1,
    pin: true,
    explanation:
      "A Swedish newspaper found staff at Sama, a Nairobi company, watched private glasses videos, even nudity and bathroom moments. This led to a US group lawsuit against Meta and Ray-Ban maker Luxottica in March 2026.",
    year: "2026",
    severity: "CRITICAL",
    sources: [
      { url: "https://techcrunch.com/2026/03/05/meta-sued-over-ai-smartglasses-privacy-concerns-after-workers-reviewed-nudity-sex-and-other-footage/", label: "TechCrunch" },
      { url: "https://www.euronews.com/next/2026/03/06/meta-faces-privacy-lawsuit-over-ai-smart-glasses", label: "Euronews" },
    ],
    image: "meta-rayban-scandal.jpg",
  },

  // ---- Amazon ----
  {
    entity: "amazon",
    headline: "A Ring camera employee watched thousands of customers' bathroom and bedroom videos",
    rank: 1,
    explanation:
      "A US regulator found Ring gave staff wide, poorly checked access to customers' videos; one viewed thousands of recordings of women in bathrooms and bedrooms over several months. Ring paid $5.8 million in refunds.",
    year: "2023",
    severity: "HIGH",
    sources: [
      { url: "https://www.eff.org/deeplinks/2023/06/ftc-forces-ring-take-user-privacy-seriously", label: "Electronic Frontier Foundation" },
    ],
  },
  {
    entity: "amazon",
    headline: "Amazon kept kids' Alexa recordings even when parents asked to delete them",
    rank: 1,
    audiences: ["IN"],
    explanation:
      "US authorities said Amazon broke a children's privacy law by keeping kids' Alexa voice recordings with no time limit. Amazon paid a $25 million penalty to settle.",
    year: "2023",
    severity: "HIGH",
    sources: [
      { url: "https://www.foxbusiness.com/technology/amazon-agrees-25m-settlement-alexa-unlawfully-storing-childrens-voice-recordings-location-data", label: "Fox Business" },
    ],
  },
  {
    entity: "amazon",
    headline: "Ring gave police doorbell videos without owners' permission 11 times in 2022",
    rank: 1,
    explanation:
      "Amazon told a US senator that in 2022 Ring gave police videos 11 times without a court order or the owner's permission. It said each was a real emergency and Ring's own decision.",
    year: "2022",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.eff.org/deeplinks/2022/07/ring-reveals-they-give-videos-police-without-user-consent-or-warrant", label: "Electronic Frontier Foundation" },
      { url: "https://www.theregister.com/2022/07/14/amazon_gave_police_unauthorized_doorbell/", label: "The Register" },
    ],
  },
  {
    entity: "amazon",
    headline: "Former head of a US spy agency joined Amazon's board in 2020",
    rank: 3,
    explanation:
      "Retired General Keith Alexander led the NSA, a US spy agency, from 2005 to 2014, and the US military's cyber unit from 2010 to 2014. He joined Amazon's board in September 2020.",
    year: "2020",
    severity: "HIGH",
    sources: [
      { url: "https://techcrunch.com/2020/09/09/former-nsa-chief-general-keith-alexander-is-now-on-amazons-board/", label: "TechCrunch" },
      { url: "https://www.geekwire.com/2020/amazon-adds-former-nsa-u-s-cyber-command-leader-keith-alexander-board-director/", label: "GeekWire" },
    ],
  },
  {
    entity: "amazon",
    headline: "Amazon built a private computer system for the CIA for $600 million",
    rank: 3,
    explanation:
      "Amazon won a deal worth about $600 million to build a private online computer system for the CIA and other spy agencies. A US court confirmed Amazon's win in October 2013 after IBM complained.",
    year: "2013",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.washingtontechnology.com/2013/10/amazon-win-restarts-cia-cloud-contract/338279/", label: "Washington Technology" },
      { url: "https://www.theregister.com/2013/06/03/ibm_protests_aws_cia_cloud/", label: "The Register" },
      { url: "https://www.informationweek.com/it-infrastructure/amazon-again-beats-ibm-for-cia-cloud-contract", label: "InformationWeek" },
    ],
  },

  // ---- Apple ----
  {
    entity: "apple",
    headline: "A hidden iPhone chip flaw let spyware in without any tap",
    rank: 1,
    audiences: ["IN"],
    explanation:
      "In December 2023 security firm Kaspersky said an iMessage attack needing no tap used a secret feature in Apple's A12–A16 iPhone chips to break key protections. Apple had quietly fixed it in July 2023.",
    year: "2023",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.kaspersky.com/about/press-releases/kaspersky-discloses-iphone-hardware-feature-vital-in-operation-triangulation-case", label: "Kaspersky" },
      { url: "https://securelist.com/operation-triangulation-the-last-hardware-mystery/111669/", label: "Kaspersky Securelist" },
      { url: "https://www.bleepingcomputer.com/news/security/iphone-triangulation-attack-abused-undocumented-hardware-feature/", label: "BleepingComputer" },
    ],
  },
  {
    entity: "apple",
    headline: "Apple agreed to pay $95 million over claims Siri recorded private talks",
    rank: 1,
    explanation:
      "People said Siri switched on by accident between 2014 and 2024 and recorded private talks; some were said to be shared with other companies.",
    year: "2025",
    severity: "HIGH",
    sources: [
      { url: "https://www.courthousenews.com/judge-approves-95-million-apple-settlement-over-siri-privacy-case/", label: "Courthouse News Service" },
      { url: "https://www.cbsnews.com/news/apple-siri-settlement-95-million-lopez-how-to-file-claim/", label: "CBS News" },
      { url: "https://www.axios.com/2025/05/13/apple-lopez-voice-assistant-settlement-siri", label: "Axios" },
    ],
  },
  {
    entity: "apple",
    headline: "Apple dropped fully private iCloud backups after the FBI privately objected",
    rank: 1,
    explanation:
      "Reuters reported that around 2018 Apple dropped a plan for iCloud phone backups only you could open. The FBI, the US federal police, had privately said this would make crime investigations harder.",
    year: "2020",
    severity: "HIGH",
    sources: [
      { url: "https://www.investing.com/news/stock-market-news/exclusive-apple-dropped-plan-for-encrypting-backups-after-fbi-complained--sources-2063709", label: "Reuters" },
      { url: "https://appleinsider.com/articles/20/01/21/apple-dropped-plans-to-encrypt-icloud-after-the-fbi-complained", label: "AppleInsider" },
    ],
  },

  // ---- OpenAI ----
  {
    entity: "openai",
    headline: "ChatGPT may learn from your chats unless you switch this off",
    rank: 1,
    audiences: ["IN"],
    explanation:
      "By default, OpenAI may use chats from Free, Plus, Pro and Go ChatGPT accounts to train its AI. Business, Enterprise and developer accounts are left out unless they agree.",
    year: "Ongoing",
    severity: "HIGH",
    sources: [
      { url: "https://help.openai.com/en/articles/7039943-data-usage-for-consumer-services-faq", label: "OpenAI Help Center" },
      { url: "https://openai.com/policies/how-your-data-is-used-to-improve-model-performance/", label: "OpenAI" },
    ],
  },
  {
    entity: "openai",
    headline: "OpenAI blocks ChatGPT and its services in China, Russia and Iran",
    rank: 2,
    explanation:
      "OpenAI only allows ChatGPT and its developer tools in countries on its approved list. From July 9, 2024 it began blocking developer tool traffic from other places, including mainland China, Russia and Iran.",
    year: "2024",
    severity: "HIGH",
    sources: [
      { url: "https://developers.openai.com/api/docs/supported-countries", label: "OpenAI" },
      { url: "https://www.bankinfosecurity.com/openai-drops-chatgpt-access-for-users-in-china-russia-iran-a-25631", label: "BankInfoSecurity" },
    ],
  },
  {
    entity: "openai",
    headline: "OpenAI put a former US spy agency chief on its board",
    rank: 3,
    explanation:
      "In June 2024 OpenAI put retired General Paul Nakasone on its board and safety and security committee. He led the NSA, a US spy agency, and the US military's cyber unit from 2018 to 2024.",
    year: "2024",
    severity: "HIGH",
    sources: [
      { url: "https://openai.com/index/openai-appoints-retired-us-army-general/", label: "OpenAI" },
      { url: "https://www.washingtonpost.com/technology/2024/06/13/openai-board-paul-nakasone-nsa/", label: "The Washington Post" },
      { url: "https://www.cio.com/article/2152275/whats-behind-openais-appointment-of-an-ex-nsa-director-to-its-board.html", label: "CIO.com" },
    ],
    image: "chatgpt-nsa-director.jpg",
  },
  {
    entity: "openai",
    headline: "OpenAI quietly removed its ban on military and weapons use",
    rank: 3,
    explanation:
      "On January 10, 2024 OpenAI removed its full ban on 'military and warfare' use and weapons building from its rules. It replaced this with a narrower rule against harming people.",
    year: "2024",
    severity: "HIGH",
    sources: [
      { url: "https://techcrunch.com/2024/01/12/openai-changes-policy-to-allow-military-applications/", label: "TechCrunch" },
      { url: "https://theintercept.com/2024/01/12/open-ai-military-ban-chatgpt/", label: "The Intercept" },
    ],
  },

  // ---- Zoom ----
  {
    entity: "zoom",
    headline: "A US–Canada Zoom call's secret key came from a Beijing computer",
    rank: 1,
    explanation:
      "In 2020 Citizen Lab, a research group, found the key protecting a test call came from a computer that seemed to be in Beijing. Zoom blamed a backup-server mistake and undid it.",
    year: "2020",
    severity: "CRITICAL",
    sources: [
      { url: "https://citizenlab.ca/2020/04/move-fast-roll-your-own-crypto-a-quick-look-at-the-confidentiality-of-zoom-meetings/", label: "Citizen Lab" },
      { url: "https://techcrunch.com/2020/04/03/zoom-calls-routed-china/", label: "TechCrunch" },
    ],
  },
  {
    entity: "zoom",
    headline: "A US regulator said Zoom wrongly claimed calls were fully private",
    rank: 1,
    explanation:
      "Since at least 2016 Zoom claimed only meeting members could see or hear calls, but Zoom kept access. It agreed to a deal in November 2020: no fine, but security checks.",
    year: "2020",
    severity: "HIGH",
    sources: [
      { url: "https://www.goodwinlaw.com/en/insights/publications/2020/11/11_18-ftc-and-zoom-reach-settlement-over-alleged", label: "Goodwin Procter" },
      { url: "https://fortune.com/2020/11/09/zoom-ftc-settlement-fine-security-privacy/", label: "Fortune" },
      { url: "https://techcrunch.com/2020/11/09/zoom-ftc-deceptive-security-claims/", label: "TechCrunch" },
    ],
  },

  // ---- Oracle ----
  {
    entity: "oracle",
    headline: "Oracle took its name from a CIA project for its first customer",
    rank: 3,
    explanation:
      "Larry Ellison, Bob Miner and Ed Oates started Oracle in 1977. They named it after the code name of a CIA data storage project, and the CIA was their first customer.",
    year: "1977",
    severity: "HIGH",
    sources: [
      { url: "https://gizmodo.com/larry-ellisons-oracle-started-as-a-cia-project-1636592238", label: "Gizmodo" },
      { url: "https://en.wikipedia.org/wiki/Oracle_Corporation", label: "Wikipedia" },
    ],
  },
  {
    entity: "oracle",
    headline: "A former CIA director joined Oracle's board in 2015",
    rank: 3,
    explanation:
      "Leon Panetta, who led the CIA from 2009 to 2011 and was US defence minister from 2011 to 2013, joined Oracle's board of directors in January 2015.",
    year: "2015",
    severity: "HIGH",
    sources: [
      { url: "https://investor.oracle.com/investor-news/news-details/2015/Oracle-Names-Leon-Panetta-to-the-Board-of-Directors/default.aspx", label: "Oracle Investor Relations" },
      { url: "https://www.itnews.com.au/news/former-cia-boss-joins-oracle-399524", label: "iTnews" },
    ],
  },

  // ---- Adobe ----
  {
    entity: "adobe",
    headline: "Adobe moved to cut off every Venezuelan customer over a US order",
    rank: 1,
    explanation:
      "In October 2019 Adobe said it would close all Venezuelan customer accounts, cutting off Creative Cloud and Document Cloud, to follow a US government order. Days later it got permission to keep serving Venezuela.",
    year: "2019",
    severity: "CRITICAL",
    sources: [
      { url: "https://blog.adobe.com/en/publish/2019/10/28/adobe-continues-digital-media-access-in-venezuela", label: "Adobe" },
      { url: "https://www.engadget.com/2019-10-08-adobe-venezuela-executive-order.html", label: "Engadget" },
      { url: "https://www.theregister.com/2019/10/10/adobe_venezuela_sanctions/", label: "The Register" },
    ],
  },

  // ---- Slack ----
  {
    entity: "slack",
    headline: "Slack closed accounts just for logging in from countries under trade bans",
    rank: 1,
    explanation:
      "In December 2018 Slack closed accounts it linked to these countries by internet address, including people who had only travelled there. After complaints, it gave most accounts back and instead blocked only connections from there.",
    year: "2018",
    severity: "HIGH",
    sources: [
      { url: "https://techcrunch.com/2018/12/22/slack-says-it-will-comply-with-sanctions/", label: "TechCrunch" },
      { url: "https://www.engadget.com/2018-12-22-iran-sanctions-slack.html", label: "Engadget" },
      { url: "https://9to5mac.com/2018/12/22/slack-iran-deactivating-accounts/", label: "9to5Mac" },
    ],
  },

  // ---- NSA ----
  {
    entity: "nsa",
    headline: "Most of what we know about NSA spying came from one man",
    rank: 3,
    explanation:
      "Edward Snowden leaked secret NSA papers starting in June 2013. They showed the NSA kept records of who called whom, not just suspects, and took data from big tech companies (PRISM).",
    year: "2013",
    severity: "UNKNOWN",
    sources: [
      { url: "https://www.pbs.org/wgbh/frontline/article/how-the-nsa-spying-programs-have-changed-since-snowden/", label: "PBS Frontline" },
      { url: "https://en.wikipedia.org/wiki/Snowden_disclosures", label: "Wikipedia" },
    ],
  },
  {
    entity: "nsa",
    headline: "The NSA pretended to be Facebook to plant spy software on devices",
    rank: 1,
    explanation:
      "A 2014 report said the NSA used tricks (QUANTUM), like pretending to be Facebook's computers, to take over web visits and plant hidden spy software. It built a system meant to handle millions of them.",
    year: "2014",
    severity: "HIGH",
    sources: [
      { url: "https://theintercept.com/2014/03/12/nsa-plans-infect-millions-computers-malware/", label: "The Intercept" },
    ],
  },
  {
    entity: "nsa",
    headline: "An NSA tool let staff search people's emails, chats and web browsing",
    rank: 1,
    explanation:
      "XKeyscore, revealed by Snowden in 2013, let NSA staff search huge amounts of captured emails, chats and web history by typing simple searches. Checks on its use came only afterwards.",
    year: "2013",
    severity: "CRITICAL",
    sources: [
      { url: "https://theintercept.com/2015/07/01/nsas-google-worlds-private-communications/", label: "The Intercept" },
      { url: "https://en.wikipedia.org/wiki/XKeyscore", label: "Wikipedia" },
    ],
  },
  {
    entity: "nsa",
    headline: "The NSA took user data directly from Google, Apple and Facebook",
    rank: 1,
    explanation:
      "Under a programme called PRISM, revealed in June 2013, the NSA collected users' messages and other data from Microsoft, Google, Facebook, Apple, Yahoo and others, using a US law (Section 702).",
    year: "2013",
    severity: "CRITICAL",
    sources: [
      { url: "https://en.wikipedia.org/wiki/PRISM", label: "Wikipedia" },
    ],
    image: "nsa-prism-slide.png",
  },
  {
    entity: "nsa",
    headline: "The NSA secretly worked to break locks on bank and email data",
    rank: 1,
    explanation:
      "Leaked papers revealed BULLRUN, a secret NSA programme. It used supercomputers, court orders, hacking and secret help from companies to get past the lock that keeps business, banking and medical records private.",
    year: "2013",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.theguardian.com/world/2013/sep/05/nsa-gchq-encryption-codes-security", label: "The Guardian" },
      { url: "https://www.propublica.org/article/the-nsas-secret-campaign-to-crack-undermine-internet-encryption", label: "ProPublica" },
      { url: "https://en.wikipedia.org/wiki/Bullrun_(decryption_program)", label: "Wikipedia" },
    ],
  },
  {
    entity: "nsa",
    headline: "The NSA spent over $800 million getting companies to weaken data locks",
    rank: 2,
    explanation:
      "A leaked 2013 budget paper showed this NSA project, funded since 2011, worked with chip makers to add hidden ways in to chips that lock data, and to shape industry rules for locks.",
    year: "2013",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.nytimes.com/interactive/2013/09/05/us/documents-reveal-nsa-campaign-against-encryption.html", label: "New York Times" },
      { url: "https://www.theguardian.com/world/2013/sep/05/nsa-gchq-encryption-codes-security", label: "The Guardian" },
      { url: "https://www.eff.org/node/77502", label: "EFF" },
    ],
  },
  {
    entity: "nsa",
    headline: "The NSA quietly pushed a flawed data-locking method it could break",
    rank: 2,
    explanation:
      "The NSA pushed a US standards body (NIST) to adopt a random-number tool for data locks. In 2007 researchers showed a secret key-holder could predict its numbers; NIST withdrew it in 2014.",
    year: "2006–14",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.nytimes.com/interactive/2013/09/05/us/documents-reveal-nsa-campaign-against-encryption.html", label: "New York Times" },
      { url: "https://en.wikipedia.org/wiki/Dual_EC_DRBG", label: "Wikipedia" },
      { url: "https://arstechnica.com/information-technology/2013/09/stop-using-nsa-influenced-code-in-our-product-rsa-tells-customers/", label: "Ars Technica" },
    ],
  },
  {
    entity: "nsa",
    headline: "A leaked NSA list offered hidden spy software for iPhones",
    rank: 1,
    explanation:
      "The 2013 leak described DROPOUTJEEP, spy software giving access to an iPhone's texts, contacts, voicemail, location, camera and microphone. The list claimed 100% success installing it; Apple denied working with the NSA.",
    year: "2013",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.eff.org/files/2014/01/06/20131230-appelbaum-nsa_ant_catalog.pdf", label: "EFF (NSA ANT Catalog PDF)" },
      { url: "https://en.wikipedia.org/wiki/ANT_catalog", label: "Wikipedia" },
    ],
    image: "nsa-ant-dropoutjeep.jpg",
  },
  {
    entity: "nsa",
    headline: "The NSA listed $20,000 USB plugs for spying on offline computers",
    rank: 2,
    explanation:
      "The leaked NSA catalogue (ANT) described COTTONMOUTH, USB devices costing about $20,000–25,000 each. A hidden radio inside could reach computers kept off any network and quietly take data out.",
    year: "2013",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.eff.org/files/2014/01/06/20131230-appelbaum-nsa_ant_catalog.pdf", label: "EFF (NSA ANT Catalog PDF)" },
      { url: "https://gizmodo.com/a-peek-inside-the-nsas-spy-gear-catalog-1491827763", label: "Gizmodo" },
    ],
    image: "nsa-ant-cottonmouth-i.jpg",
  },
  {
    entity: "nsa",
    headline: "The NSA secretly opened shipped internet equipment to hide spy tools inside",
    rank: 2,
    explanation:
      "A leaked 2010 NSA memo said an NSA team stopped internet equipment (routers and servers) being shipped out of the US, added hidden spy tools in secret workshops, then resealed it and sent it on.",
    year: "2010",
    severity: "CRITICAL",
    sources: [
      { url: "https://techcrunch.com/2014/05/13/nsa-reportedly-intercepts-and-alters-routers-and-servers-exported-from-u-s-to-facilitate-surveillance/", label: "TechCrunch" },
      { url: "https://www.theregister.com/2014/05/13/greenwald_alleges_nsa_tampers_with_routers_to_plant_backdoors", label: "The Register" },
    ],
  },
  {
    entity: "nsa",
    headline: "NSA computers answered before real websites to send people to spy software",
    rank: 2,
    explanation:
      "Snowden papers showed this (QUANTUM): NSA computers on main internet lines replied before real websites, sending chosen people to spy software that revealed who was using Tor, a privacy browser.",
    year: "2013",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.schneier.com/blog/archives/2013/10/how_the_nsa_att.html", label: "Schneier on Security (orig. The Guardian, Oct 4, 2013)" },
      { url: "https://www.schneier.com/blog/archives/2013/11/another_quantum.html", label: "Schneier on Security — Another QUANTUMINSERT Attack Example (Nov 13, 2013, citing Der Spiegel)" },
    ],
  },
  {
    entity: "nsa",
    headline: "The NSA tapped private cables linking Google's and Yahoo's own computer centres",
    rank: 1,
    explanation:
      "With Britain's spy agency, the NSA tapped cables between Google and Yahoo computer centres worldwide (MUSCULAR), where data was not locked. In one 30-day count, over 181 million new records went to the NSA.",
    year: "2013",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.washingtonpost.com/world/national-security/nsa-infiltrates-links-to-yahoo-google-data-centers-worldwide-snowden-documents-say/2013/10/30/e51d661e-4166-11e3-8b74-d89d714ca4dd_story.html", label: "The Washington Post" },
      { url: "https://www.npr.org/sections/thetwo-way/2013/10/30/241855353/report-nsa-has-broken-into-google-and-yahoo-data-centers", label: "NPR" },
    ],
    image: "nsa-muscular-google-cloud-slide.jpg",
  },
  {
    entity: "nsa",
    headline: "The NSA collected 97 billion pieces of information worldwide in 30 days",
    rank: 3,
    explanation:
      "An NSA tool (Boundless Informant) showed on a coloured map how much information it gathered by country, like who contacted whom and when. Almost 3 billion pieces were from the US in that period.",
    year: "2013",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.theguardian.com/world/2013/jun/08/nsa-boundless-informant-global-datamining", label: "The Guardian" },
      { url: "https://www.engadget.com/2013-06-08-the-nsas-boundless-informant.html", label: "Engadget" },
    ],
    image: "boundless-informant-heat-map.svg",
  },
  {
    entity: "nsa",
    headline: "AT&T, a US phone company, put NSA spy equipment in its network",
    rank: 2,
    explanation:
      "AT&T worked with the NSA from 1985 (FAIRVIEW), putting NSA equipment in at least 17 key US internet sites. By 2003 it passed on over a million emails a day.",
    year: "1985–2013 (disclosed 2015)",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.propublica.org/article/nsa-spying-relies-on-atts-extreme-willingness-to-help", label: "ProPublica" },
      { url: "https://www.propublica.org/article/a-trail-of-evidence-leading-to-atts-partnership-with-the-nsa", label: "ProPublica" },
    ],
  },
  {
    entity: "nsa",
    headline: "Verizon's cables became the NSA's second-biggest way of collecting data",
    rank: 2,
    explanation:
      "Through a company partner identified in 2015 as US phone company Verizon, the NSA tapped internet cables (STORMBREW). Only its AT&T programme (FAIRVIEW) collected more.",
    year: "2013",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.propublica.org/article/a-trail-of-evidence-leading-to-atts-partnership-with-the-nsa", label: "ProPublica" },
      { url: "https://en.wikipedia.org/wiki/STORMBREW", label: "Wikipedia — STORMBREW" },
    ],
  },
  {
    entity: "nsa",
    headline: "The NSA collected about 194 million text messages a day worldwide",
    rank: 1,
    explanation:
      "By 2011 DISHFIRE, an NSA and British database, was collecting about 194 million texts a day, whether or not senders were suspects. It searched them for contacts, locations, payments and border crossings.",
    year: "2014",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.theguardian.com/world/2014/jan/16/nsa-collects-millions-text-messages-daily-untargeted-global-sweep", label: "The Guardian" },
      { url: "https://www.npr.org/sections/thetwo-way/2014/01/16/263130142/nsa-reportedly-collected-millions-of-phone-texts-every-day", label: "NPR" },
    ],
  },
  {
    entity: "nsa",
    headline: "The NSA collected nearly 5 billion mobile phone location records every day",
    rank: 1,
    explanation:
      "Taking them from mobile network cables around the world (CO-TRAVELER), the NSA mapped which phones travel together to find hidden links between people. Americans abroad were caught up too.",
    year: "2013",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.washingtonpost.com/world/national-security/nsa-tracking-cellphone-locations-worldwide-snowden-documents-show/2013/12/04/5492873a-5cf2-11e3-bc56-c6ca94801fac_story.html", label: "The Washington Post" },
      { url: "https://www.eff.org/deeplinks/2013/12/meet-co-traveler-nsas-cell-phone-location-tracking-program", label: "EFF" },
    ],
  },
  {
    entity: "nsa",
    headline: "NSA hacking tools were leaked to the public and never recovered",
    rank: 2,
    explanation:
      "From 2016, an unknown group (Shadow Brokers) leaked NSA hacking tools; an April 2017 leak included EternalBlue. Microsoft had quietly fixed its weakness a month earlier, possibly warned by the NSA; nobody has been charged.",
    year: "2016–17",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.rapid7.com/blog/post/2017/04/18/the-shadow-brokers-leaked-exploits-faq/", label: "Rapid7" },
      { url: "https://en.wikipedia.org/wiki/The_Shadow_Brokers", label: "Wikipedia" },
    ],
  },
  {
    entity: "nsa",
    headline: "A leaked NSA tool was used in attacks that hit hospitals worldwide",
    rank: 1,
    explanation:
      "The leaked tool powered WannaCry, which locked computers for ransom in over 150 countries in May 2017, including parts of Britain's health service. Weeks later, NotPetya also used it, causing about $10 billion in damage.",
    year: "2017",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.cisa.gov/news-events/alerts/2017/05/12/indicators-associated-wannacry-ransomware", label: "CISA" },
      { url: "https://www.justice.gov/archives/opa/pr/six-russian-gru-officers-charged-connection-worldwide-deployment-destructive-malware-and", label: "DOJ" },
      { url: "https://www.fbi.gov/wanted/cyber/gru-hackers-destructive-malware-and-international-cyber-attacks", label: "FBI" },
    ],
  },
  {
    entity: "nsa",
    headline: "Spy software linked to the NSA hid inside hard drives, surviving wipes",
    rank: 2,
    explanation:
      "In 2015 Kaspersky described a group, active since at least 2001, whose spy software hid inside hard drives and stayed even after full erasing. Former NSA officials told Reuters the NSA built it.",
    year: "2015",
    severity: "CRITICAL",
    sources: [
      { url: "https://securelist.com/equation-the-death-star-of-malware-galaxy/68750/", label: "Kaspersky Securelist" },
      { url: "https://www.eff.org/deeplinks/2015/02/russian-researchers-uncover-sophisticated-malware-equation-group", label: "EFF" },
    ],
  },
  {
    entity: "nsa",
    headline: "The NSA and British spies stole millions of SIM card keys",
    rank: 1,
    explanation:
      "A leaked British spy paper says the NSA and Britain's GCHQ broke into SIM card maker Gemalto and, in three months of 2010, took millions of keys that keep phone calls private.",
    year: "2010",
    severity: "CRITICAL",
    sources: [
      { url: "https://theintercept.com/2015/02/19/great-sim-heist/", label: "The Intercept" },
      { url: "https://www.thalesgroup.com/en/markets/digital-identity-and-security/press-release/gemalto-presents-the-findings-of-its-investigations-into-the-alleged-hacking-of-sim-card-encryption-keys", label: "Thales/Gemalto press release" },
    ],
  },
  {
    entity: "nsa",
    headline: "The NSA spied on German leader Merkel's personal phone from 2002",
    rank: 2,
    explanation:
      "German magazine Der Spiegel reported this. A separate leaked 2006 paper showed 35 world leaders' phone numbers were chosen for spying; Merkel called President Obama to demand an explanation.",
    year: "2002–13",
    severity: "HIGH",
    sources: [
      { url: "https://www.france24.com/en/20131027-germany-report-usa-bugged-merkel-phone", label: "France 24" },
      { url: "https://www.benton.org/headlines/nsa-monitored-calls-35-world-leaders-after-us-official-handed-over-contacts", label: "Benton Institute (citing The Guardian)" },
      { url: "https://www.nbcnews.com/storyline/nsa-snooping/germany-drops-nsa-merkel-cellphone-spying-probe-lacking-evidence-n374206", label: "NBC News" },
    ],
    image: "angela-merkel-portrait-2011.jpg",
  },
  {
    entity: "nsa",
    headline: "The NSA built a $1.5 billion centre to store captured data",
    rank: 3,
    explanation:
      "The NSA's Utah Data Center, finished in 2014, covers about 1 million square feet. Reports say it was built to capture, store and study calls, messages and other communications on a huge scale.",
    year: "2011–2014",
    severity: "CRITICAL",
    sources: [
      { url: "https://en.wikipedia.org/wiki/Utah_Data_Center", label: "Wikipedia" },
      { url: "https://clui.org/ludb/site/nsa-utah-data-center", label: "Center for Land Use Interpretation" },
      { url: "https://www.eff.org/deeplinks/2014/07/releasing-public-domain-image-nsas-utah-data-center", label: "EFF" },
    ],
    image: "nsa-utah-data-center-aerial.jpg",
  },
  {
    entity: "nsa",
    headline: "Britain's spy agency tapped internet cables and shared data with the NSA",
    rank: 2,
    explanation:
      "By 2011 this programme (TEMPORA) tapped cables under the Atlantic that land in Britain. It stored internet content for up to three days and details of who contacted whom, and when, for thirty.",
    year: "2013",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.npr.org/sections/thetwo-way/2013/06/21/194267403/report-uk-spy-agency-taps-trans-atlantic-fiber-optic-cables", label: "NPR" },
      { url: "https://en.wikipedia.org/wiki/Tempora", label: "Wikipedia (secondary corroboration)" },
      { url: "https://www.eff.org/document/20140618-der-spiegel-gchq-report-technical-abilities-tempora", label: "EFF (leaked GCHQ document)" },
    ],
  },
  {
    entity: "nsa",
    headline: "British spies took webcam photos from 1.8 million Yahoo video chat accounts",
    rank: 1,
    explanation:
      "With NSA help, British spies (OPTIC NERVE) saved a still picture every five minutes from Yahoo video chats, suspects or not. In six months they reached 1.8 million accounts; 3–11% of pictures showed nudity.",
    year: "2014",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.npr.org/2014/02/28/283999713/joint-surveillance-program-stores-millions-of-yahoo-webcam-images", label: "NPR" },
      { url: "https://en.wikipedia.org/wiki/Optic_Nerve_(GCHQ)", label: "Wikipedia (secondary corroboration)" },
      { url: "https://thehackernews.com/2014/02/optic-nerve-dirty-nsa-hacked-into.html", label: "The Hacker News" },
    ],
  },
  {
    entity: "nsa",
    headline: "Hidden spy software tapped the Greek prime minister's phone in 2004–05",
    rank: 2,
    explanation:
      "It tapped over 100 phones on Vodafone Greece, including those of the Prime Minister and ministers, until Ericsson removed it; who planted it is still disputed. The network manager who found it died days later.",
    year: "2004–05",
    severity: "UNKNOWN",
    sources: [
      { url: "https://spectrum.ieee.org/the-athens-affair", label: "IEEE Spectrum" },
      { url: "https://theintercept.com/2015/09/28/death-athens-rogue-nsa-operation/", label: "The Intercept" },
      { url: "https://en.wikipedia.org/wiki/Greek_wiretapping_case_2004%E2%80%9305", label: "Wikipedia (secondary corroboration)" },
    ],
  },
  {
    entity: "nsa",
    headline: "A former NSA chief said some security flaws need not be fixed",
    rank: 3,
    explanation:
      "A former NSA and CIA head explained 'NOBUS' (nobody but us): there is no legal or moral duty to fix a flaw only the US can use. The NSA weighs using flaws against revealing them.",
    year: "2013",
    severity: "HIGH",
    sources: [
      { url: "https://www.washingtonpost.com/news/the-switch/wp/2013/10/04/why-everyone-is-left-less-secure-when-the-nsa-doesnt-help-fix-security-flaws/", label: "The Washington Post" },
      { url: "https://en.wikipedia.org/wiki/NOBUS", label: "Wikipedia" },
    ],
    image: "michael-hayden-portrait.jpg",
  },
  {
    entity: "nsa",
    headline: "The NSA was accused of using, not reporting, the Heartbleed flaw",
    rank: 2,
    explanation:
      "Bloomberg said the NSA knew about Heartbleed, a flaw in common website security software, for at least two years and often used it to spy. The NSA denied this the same day.",
    year: "2014",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.bloomberg.com/news/articles/2014-04-11/nsa-said-to-have-used-heartbleed-bug-exposing-consumers", label: "Bloomberg" },
      { url: "https://www.npr.org/sections/thetwo-way/2014/04/11/301967026/nsa-denies-it-knew-about-heartbleed-bug-before-it-was-made-public", label: "NPR" },
    ],
  },

  // ---- US Government ----
  {
    entity: "usgov",
    headline: "US law lets US police demand your Google or Facebook data anywhere",
    rank: 1,
    explanation:
      "A 2018 US law (the CLOUD Act) lets US police order American companies like Google or Facebook to hand over your data, even when stored in another country, going around that country's privacy laws.",
    year: "2018",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.eff.org/deeplinks/2018/02/cloud-act-dangerous-expansion-police-snooping-cross-border-data", label: "Electronic Frontier Foundation" },
    ],
  },
  {
    entity: "usgov",
    headline: "US spy law lets the FBI search Americans' messages without court permission",
    rank: 1,
    explanation:
      "A 2008 US law (FISA Section 702) is meant for spying on foreigners abroad using US companies. In practice it also collects Americans' messages, which the FBI can search without a judge's permission.",
    year: "2008",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.eff.org/702-spying", label: "Electronic Frontier Foundation" },
    ],
  },
  {
    entity: "usgov",
    headline: "The US government once planned a phone chip that police could unlock",
    rank: 3,
    explanation:
      "In 1993 President Clinton's White House announced the Clipper Chip to lock phone calls, but the government held the keys so police could listen with legal approval. Opposition stopped it by 1996.",
    year: "1993",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.eff.org/deeplinks/2015/04/clipper-chips-birthday-looking-back-22-years-key-escrow-failures", label: "EFF" },
      { url: "https://en.wikipedia.org/wiki/Clipper_chip", label: "Wikipedia" },
      { url: "https://w2.eff.org/Privacy/Key_escrow/Clipper/", label: "EFF Archive" },
    ],
    image: "myk-78-clipper-chip-markings.jpg",
  },
  {
    entity: "usgov",
    headline: "In 1994 a researcher found a flaw in the government's phone-lock chip",
    rank: 3,
    explanation:
      "Matt Blaze of AT&T Bell Labs showed the Clipper Chip's police-access part could be tricked. Someone could still use the chip's lock while stopping the government from listening in.",
    year: "1994",
    severity: "HIGH",
    sources: [
      { url: "https://www.nist.gov/news-events/news/1994/06/statement-response-blaze-key-escrow-paper", label: "NIST" },
      { url: "https://dl.acm.org/doi/10.1145/191177.191193", label: "ACM Digital Library" },
      { url: "https://en.wikipedia.org/wiki/Clipper_chip", label: "Wikipedia" },
    ],
  },
  {
    entity: "usgov",
    headline: "After 9/11, President Bush secretly allowed spying on Americans' calls and email",
    rank: 1,
    explanation:
      "In October 2001 Bush approved STELLARWIND to collect, without court permission, mass records of who Americans contacted by phone and internet, plus some content, from phone companies. The New York Times revealed it in 2005.",
    year: "2001–2007",
    severity: "CRITICAL",
    sources: [
      { url: "https://oig.justice.gov/reports/report-presidents-surveillance-program-unclassified-prepared-offices-inspectors-general", label: "DOJ Office of Inspector General" },
      { url: "https://www.aclu.org/files/natsec/nsa/20130816/NSA%20IG%20Report.pdf", label: "ACLU (declassified NSA IG Report)" },
      { url: "https://www.eff.org/files/filenode/foia_C0705278/022908_ex_a-d_0.pdf", label: "EFF (NYT: \"Bush Lets U.S. Spy on Callers Without Courts\")" },
    ],
  },
  {
    entity: "usgov",
    headline: "A 1994 US law made phone networks ready for police listening",
    rank: 2,
    explanation:
      "President Clinton signed this law (CALEA) in 1994, making phone companies build into their networks a way for police to listen in. In 2005 it was extended to fast internet and internet calls.",
    year: "1994",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.fcc.gov/calea", label: "FCC" },
      { url: "https://www.congress.gov/bill/103rd-congress/house-bill/4922", label: "Congress.gov" },
      { url: "https://www.eff.org/issues/calea", label: "EFF" },
    ],
  },
  {
    entity: "usgov",
    headline: "Chinese hackers broke into US phone companies' police listening systems",
    rank: 1,
    explanation:
      "Made public in October 2024: China-linked hackers got into these systems at AT&T, Verizon and others. They took near-complete lists of numbers under US police watch and call details of over a million users.",
    year: "2024",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.cisa.gov/news-events/alerts/2024/12/03/cisa-and-partners-release-joint-guidance-prc-affiliated-threat-actor-compromising-networks-global", label: "CISA" },
      { url: "https://www.eff.org/deeplinks/2024/10/salt-typhoon-hack-shows-theres-no-security-backdoor-thats-only-good-guys", label: "EFF" },
      { url: "https://www.axios.com/2024/10/15/salt-typhoon-hack-china-verizon-att", label: "Axios" },
    ],
  },
  {
    entity: "usgov",
    headline: "For nearly a decade the US collected almost all Americans' call records",
    rank: 1,
    explanation:
      "A secret 2006 court order (Section 215) made phone companies give the NSA (US spy agency) daily call records for nearly all Americans, kept up to five years. Reforms ended it in 2015.",
    year: "2006",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.csis.org/analysis/fact-sheet-section-215-usa-patriot-act", label: "CSIS" },
      { url: "https://www.lawfaremedia.org/article/nsa-ends-bulk-collection-telephony-metadata-under-section-215", label: "Lawfare" },
    ],
  },
  {
    entity: "usgov",
    headline: "A student sued the US government to publish his own data-locking code",
    rank: 3,
    explanation:
      "In 1995 a PhD student sued because US rules needed a government licence just to publish his code for locking data. A federal judge ruled twice that computer code is protected free speech.",
    year: "1995–99",
    severity: "HIGH",
    sources: [
      { url: "https://www.eff.org/cases/bernstein-v-us-dept-justice", label: "EFF" },
      { url: "https://law.justia.com/cases/federal/district-courts/FSupp/945/1279/1457799/", label: "Justia (Bernstein v. Dept. of State, 945 F. Supp. 1279)" },
    ],
  },
  {
    entity: "usgov",
    headline: "US officials investigated PGP's creator for giving away free privacy software",
    rank: 3,
    explanation:
      "In 1991 Phil Zimmermann gave away PGP, a tool that locks messages. US officials investigated him for possibly breaking weapons-export rules; the case was dropped in 1996 without charges.",
    year: "1993–96",
    severity: "HIGH",
    sources: [
      { url: "https://en.wikipedia.org/wiki/Phil_Zimmermann", label: "Wikipedia" },
      { url: "https://dubois.com/pgp-case/", label: "duboislaw (PGP Case case file)" },
    ],
  },
  {
    entity: "usgov",
    headline: "A proposed US law could push apps to remove chat privacy locks",
    rank: 1,
    explanation:
      "The EARN IT Act, still not passed, would remove legal protection from apps ignoring government-backed rules on child abuse material. A privacy group (EFF) warned it pushes apps to drop chat locks or scan phones.",
    year: "2020–22",
    severity: "HIGH",
    sources: [
      { url: "https://www.eff.org/deeplinks/2020/07/new-earn-it-bill-still-threatens-encryption-and-free-speech", label: "EFF" },
      { url: "https://www.eff.org/deeplinks/2022/02/key-senators-have-voted-anti-encryption-earn-it-act", label: "EFF" },
    ],
  },
  {
    entity: "usgov",
    headline: "The US removed a security standard after reports its spies weakened it",
    rank: 2,
    explanation:
      "In April 2014 a US standards agency removed a number tool for data locks, approved for seven years, after a 2013 New York Times report said the NSA (US spy agency) built in a weakness.",
    year: "2014",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.nist.gov/news-events/news/2014/04/nist-removes-cryptography-algorithm-random-number-generator-recommendations", label: "NIST" },
      { url: "https://en.wikipedia.org/wiki/NIST_SP_800-90A", label: "Wikipedia" },
    ],
  },
  {
    entity: "usgov",
    headline: "Experts: a US standards agency must be able to reject spy advice",
    rank: 3,
    explanation:
      "After claims the NSA (US spy agency) weakened a tool from NIST (US standards agency), a 2014 expert panel said NIST may consult the NSA but must be able to reject its advice when needed.",
    year: "2014",
    severity: "HIGH",
    sources: [
      { url: "https://www.nist.gov/news-events/news/2014/07/nist-advisory-group-releases-report-cryptography-expertise-and-standards", label: "NIST" },
      { url: "https://www.lawfaremedia.org/article/nsas-subversion-nists-algorithm", label: "Lawfare" },
    ],
  },
  {
    entity: "usgov",
    headline: "The White House said it sometimes keeps software security flaws secret",
    rank: 3,
    explanation:
      "In April 2014 the White House first publicly explained how it decides whether to reveal unknown software flaws. It said it leans toward revealing them, but has no fixed rules.",
    year: "2014",
    severity: "HIGH",
    sources: [
      { url: "https://obamawhitehouse.archives.gov/blog/2014/04/28/heartbleed-understanding-when-we-disclose-cyber-vulnerabilities", label: "The White House (Obama Archives)" },
      { url: "https://nsarchive.gwu.edu/document/17627-white-house-heartbleed-understanding-when-we", label: "National Security Archive" },
    ],
  },

  // ---- CIA ----
  {
    entity: "cia",
    headline: "The CIA secretly owned a company selling data-locking machines to governments",
    rank: 2,
    explanation:
      "From 1970 to 2018, the CIA and West Germany's spy agency secretly owned Swiss company Crypto AG and rigged its machines. This let them read secret messages of about 100 of the 130 buying governments.",
    year: "2020",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.washingtonpost.com/graphics/2020/world/national-security/cia-crypto-encryption-machines-espionage/", label: "Washington Post" },
      { url: "https://www.npr.org/2020/03/05/812499752/uncovering-the-cias-audacious-operation-that-gave-them-access-to-state-secrets", label: "NPR" },
      { url: "https://en.wikipedia.org/wiki/Operation_Rubicon", label: "Wikipedia" },
    ],
  },
  {
    entity: "cia",
    headline: "WikiLeaks published secret CIA files about breaking into phones and computers",
    rank: 1,
    explanation:
      "From March 2017, WikiLeaks published 'Vault 7', the largest ever release of secret CIA (US spy agency) documents. Thousands of files described the agency's hacking tools and hidden ways into phones and computers.",
    year: "2017",
    severity: "CRITICAL",
    sources: [
      { url: "https://wikileaks.org/ciav7p1/", label: "WikiLeaks" },
      { url: "https://en.wikipedia.org/wiki/Vault_7", label: "Wikipedia" },
    ],
  },
  {
    entity: "cia",
    headline: "The CIA's investment fund backed the company behind Google Earth",
    rank: 3,
    explanation:
      "In 2003 In-Q-Tel, the CIA's investment fund, invested in Keyhole, maker of 3D world-map software called EarthViewer. Google bought Keyhole in 2004 and relaunched it in 2005 as Google Earth.",
    year: "2003",
    severity: "HIGH",
    sources: [
      { url: "https://www.iqt.org/library/in-q-tel-announces-strategic-investment-in-keyhole", label: "In" },
      { url: "https://en.wikipedia.org/wiki/In-Q-Tel", label: "Wikipedia" },
      { url: "https://fortune.com/2025/07/29/in-q-tel-cia-venture-capital-palantir-anduril/", label: "Fortune" },
    ],
  },
  {
    entity: "cia",
    headline: "A leaked CIA tool could make its hacks look like other countries'",
    rank: 3,
    explanation:
      "In 2017 WikiLeaks released 'Marble', a CIA tool that hides text in harmful software to confuse investigators. Its test text included Chinese, Russian, Korean, Arabic and Farsi, which could point blame at other nations.",
    year: "2017",
    severity: "CRITICAL",
    sources: [
      { url: "https://wikileaks.org/vault7/", label: "WikiLeaks" },
      { url: "https://securityaffairs.com/57586/intelligence/vault7-marble-framework.html", label: "Security Affairs" },
    ],
  },
  {
    entity: "cia",
    headline: "The CIA made a tool to turn Samsung TVs into hidden microphones",
    rank: 1,
    explanation:
      "In 2017 WikiLeaks revealed 'Weeping Angel', a CIA and UK spy tool. Put on a Samsung smart TV using USB, it made the TV look switched off while it recorded room sounds for the CIA.",
    year: "2017",
    severity: "CRITICAL",
    sources: [
      { url: "https://wikileaks.org/ciav7p1/cms/page_12353643.html", label: "WikiLeaks" },
      { url: "https://www.consumerreports.org/electronics-computers/privacy/a-closer-look-at-the-tvs-from-the-cia-vault-7-hack-a1864416431/", label: "Consumer Reports" },
    ],
  },
  {
    entity: "cia",
    headline: "The CIA hid a hacking base inside a US consulate in Germany",
    rank: 3,
    explanation:
      "In 2017 WikiLeaks revealed the base, in Frankfurt, covered Europe, the Middle East and Africa. Staff used diplomat status to cross European borders without checks, then used USB sticks to break into target computers.",
    year: "2017",
    severity: "HIGH",
    sources: [
      { url: "https://www.thelocal.de/20170307/wikileaks-claims-us-frankfurt-consulate-is-a-cia-hacker-base", label: "The Local Germany" },
      { url: "https://wikileaks.org/ciav7p1/", label: "WikiLeaks Vault 7 \"Year Zero\"" },
    ],
    image: "cia-frankfurt-consulate.jpg",
  },
  {
    entity: "cia",
    headline: "Leaked CIA code showed it faking Kaspersky's identity to hide its hacks",
    rank: 3,
    explanation:
      "In 2017 WikiLeaks released code for 'Hive', the CIA system that controlled its hacking software. It showed the CIA making fake digital ID cards pretending to be Kaspersky, an antivirus company, to avoid being noticed.",
    year: "2017",
    severity: "CRITICAL",
    sources: [
      { url: "https://thehackernews.com/2017/11/cia-hive-malware-code.html", label: "The Hacker News" },
      { url: "https://securityaffairs.com/65355/intelligence/vault-8-hive-platform.html", label: "Security Affairs" },
    ],
  },
  {
    entity: "cia",
    headline: "A US-Israeli computer attack destroyed about 1,000 machines in Iran's nuclear plant",
    rank: 2,
    explanation:
      "A joint US-Israeli programme used Stuxnet, a harmful computer program, on Iran's Natanz nuclear plant, destroying about 1,000 of 5,000 machines and delaying Iran's nuclear work by an estimated 18 months to two years.",
    year: "2010",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.nytimes.com/2012/06/01/world/middleeast/obama-ordered-wave-of-cyberattacks-against-iran.html", label: "The New York Times" },
      { url: "https://www.npr.org/sections/thetwo-way/2012/06/01/154127061/obama-sped-up-wave-of-cyberattacks-against-iran-says-nyt", label: "NPR" },
      { url: "https://en.wikipedia.org/wiki/Operation_Olympic_Games", label: "Wikipedia" },
    ],
    image: "natanz-nuclear-facility-2006.jpg",
  },
  {
    entity: "cia",
    headline: "The CIA was Palantir's only customer from 2005 to 2008",
    rank: 3,
    explanation:
      "The CIA's investment fund saved Palantir with two rounds of funding after Silicon Valley investors said no. As its only customer, the CIA helped it grow into defence and business markets.",
    year: "2003–05",
    severity: "HIGH",
    sources: [
      { url: "https://www.forbes.com/sites/andygreenberg/2013/08/14/agent-of-intelligence-how-a-deviant-philosopher-built-palantir-a-cia-funded-data-mining-juggernaut/", label: "Forbes" },
      { url: "https://fortune.com/2025/07/29/in-q-tel-cia-venture-capital-palantir-anduril/", label: "Fortune" },
      { url: "https://en.wikipedia.org/wiki/In-Q-Tel", label: "Wikipedia" },
    ],
  },
  {
    entity: "cia",
    headline: "Report: Swiss firm sold rigged data-locking devices to spies and a bank",
    rank: 2,
    explanation:
      "Swiss TV reported in 2020 that Omnisec, Crypto AG's rival, sold rigged machines to Swiss spy agencies and a big bank. A consultant said US spies tried influencing its products in 1989 and were refused.",
    year: "2020",
    severity: "HIGH",
    sources: [
      { url: "https://www.swissinfo.ch/eng/business/second-swiss-firm-allegedly-sold-encrypted-spying-devices/46186432", label: "SWI swissinfo.ch" },
      { url: "https://www.securityweek.com/report-claims-cia-controlled-second-swiss-encryption-firm/", label: "SecurityWeek" },
    ],
  },

  // ---- FBI ----
  {
    entity: "fbi",
    headline: "The FBI secretly ran a private-chat phone service used by criminal gangs",
    rank: 3,
    explanation:
      "The FBI and Australian police secretly built 'Anom', a private-chat phone offered to crime groups, with a hidden key copying every message to the FBI. Over 12,000 phones reached 300+ gangs; 800+ were arrested.",
    year: "2018–21",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.justice.gov/usao-sdca/pr/fbi-s-encrypted-phone-platform-infiltrated-hundreds-criminal-syndicates-result-massive", label: "DOJ (Southern District of California)" },
      { url: "https://www.npr.org/2021/06/08/1004332551/drug-rings-platform-operation-trojan-shield-anom-operation-greenlight", label: "NPR" },
      { url: "https://www.fbi.gov/news/stories/fbi-global-partners-announce-results-of-operation-trojan-shield-060821", label: "FBI.gov" },
    ],
  },
  {
    entity: "fbi",
    headline: "The FBI put a system at internet providers to catch targeted emails",
    rank: 1,
    explanation:
      "Carnivore, an FBI system at internet providers, scanned all data on part of a network to pick out a target's email. Reported in 2000 for its use at EarthLink, it was later abandoned.",
    year: "2000",
    severity: "CRITICAL",
    sources: [
      { url: "https://archive.epic.org/privacy/carnivore/", label: "EPIC" },
      { url: "https://en.wikipedia.org/wiki/Carnivore_(software)", label: "Wikipedia" },
    ],
  },
  {
    entity: "fbi",
    headline: "Hidden FBI software could record the password suspects used to lock messages",
    rank: 1,
    explanation:
      "Magic Lantern, FBI software recording key presses, could be sent by email or through a hidden way in. It switched on when a suspect used PGP to lock messages, catching the password for the FBI.",
    year: "2001",
    severity: "HIGH",
    sources: [
      { url: "https://en.wikipedia.org/wiki/Magic_Lantern_(spyware)", label: "Wikipedia" },
      { url: "https://www.nbcnews.com/id/wbna3341694", label: "NBC News" },
    ],
  },
  {
    entity: "fbi",
    headline: "The FBI found a teen bomb-threat suspect using a fake MySpace link",
    rank: 1,
    explanation:
      "CIPAV, FBI tracking software, came through a fake MySpace link to identify an unnamed suspect. A 2007 court order in a bomb-threat case let it record a target's internet address, open programs and browser details.",
    year: "2007",
    severity: "HIGH",
    sources: [
      { url: "https://www.computerworld.com/article/1583582/faq-what-we-know-now-about-the-fbi-s-cipav-spyware.html", label: "Computerworld" },
      { url: "https://en.wikipedia.org/wiki/Computer_and_Internet_Protocol_Address_Verifier", label: "Wikipedia" },
    ],
  },
  {
    entity: "fbi",
    headline: "The FBI took over a child abuse site and hacked its visitors",
    rank: 3,
    explanation:
      "In 2015, after taking control of Playpen, a child abuse website, the FBI kept it running for nearly two weeks. It used hacking code to find visitors' real internet addresses, infecting over 1,000 computers worldwide.",
    year: "2015",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.eff.org/deeplinks/2016/09/playpen-story-fbis-unprecedented-and-illegal-hacking-operation", label: "EFF" },
      { url: "https://www.eff.org/pages/playpen-cases-frequently-asked-questions", label: "EFF FAQ" },
    ],
  },
  {
    entity: "fbi",
    headline: "The FBI paid about $900,000 to unlock an iPhone after Apple refused",
    rank: 1,
    explanation:
      "After Apple refused a 2016 court order to help unlock the San Bernardino shooter's iPhone, the FBI paid a private company about $900,000 for a hidden way in. Nothing useful was found on the phone.",
    year: "2016",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.washingtonpost.com/technology/2021/04/14/azimuth-san-bernardino-apple-iphone-fbi/", label: "The Washington Post" },
      { url: "https://appleinsider.com/articles/21/04/14/firm-that-unlocked-san-bernardino-shooters-iphone-for-fbi-is-revealed", label: "AppleInsider" },
      { url: "https://en.wikipedia.org/wiki/FBI%E2%80%93Apple_encryption_dispute", label: "Wikipedia" },
    ],
  },
  {
    entity: "fbi",
    headline: "The FBI secretly bought and tested Pegasus, a tool for hacking phones",
    rank: 3,
    explanation:
      "In 2019 the FBI bought Pegasus from NSO Group and tested it in New Jersey with fake accounts and foreign SIM cards. After two years of discussion, it decided in 2021 not to use it.",
    year: "2019",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.washingtonpost.com/technology/2022/02/02/pegasus-fbi-nso-test/", label: "The Washington Post" },
      { url: "https://9to5mac.com/2022/01/28/us-version-of-pegasus-fbi/", label: "9to5Mac" },
      { url: "https://epic.org/report-fbi-explored-using-spyware-pegasus-for-criminal-investigations/", label: "EPIC" },
    ],
  },
  {
    entity: "fbi",
    headline: "AT&T staff help US police search phone records going back to 1987",
    rank: 1,
    explanation:
      "Through Hemisphere, AT&T staff work with US drug police, the FBI and others to search call records back to 1987, adding about 4 billion records a day. Agencies were told to hide its use.",
    year: "2007–Ongoing",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.eff.org/cases/hemisphere", label: "EFF" },
      { url: "https://archive.epic.org/2018/09/epic-foia-docs-show-fbi-and-cb.html", label: "EPIC" },
      { url: "https://www.aclu.org/news/national-security/vast-troubling-call-database-drug-agents-use", label: "ACLU" },
    ],
  },
  {
    entity: "fbi",
    headline: "The FBI chief pushed for laws to open locked phones for police",
    rank: 1,
    explanation:
      "In a 2014 speech, FBI Director James Comey said Apple and Google locking phones automatically would let criminals escape court-approved searches. This started years of FBI efforts for laws forcing a way past the lock.",
    year: "2014",
    severity: "HIGH",
    sources: [
      { url: "https://www.fbi.gov/news/speeches-and-testimony/going-dark-are-technology-privacy-and-public-safety-on-a-collision-course", label: "FBI" },
      { url: "https://www.washingtonpost.com/news/the-switch/wp/2014/10/17/fbi-director-comey-calls-on-congress-to-stop-unlockable-encryption-good-luck-with-that/", label: "The Washington Post" },
      { url: "https://www.brookings.edu/articles/watch-fbi-director-james-comey-on-technology-law-enforcement-and-going-dark/", label: "Brookings" },
    ],
  },

  // ---- RSA ----
  {
    entity: "rsa",
    headline: "A US spy agency paid RSA $10 million to use weak security",
    rank: 3,
    explanation:
      "Reuters reported the NSA paid RSA $10 million to make a random-number tool, likely with a hidden back door, the default in its popular security software from 2004.",
    year: "2004–13",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.theregister.com/2013/12/21/nsa_paid_rsa_10_million/", label: "The Register" },
      { url: "https://www.geekwire.com/2013/report-rsa-10m-nsa-push-bad-crypto/", label: "GeekWire" },
      { url: "https://www.huffpost.com/2013/12/20/nsa-rsa-contract_n_4482227.html", label: "HuffPost" },
    ],
  },
  {
    entity: "rsa",
    headline: "Researchers found RSA's default security tool had a hidden master key",
    rank: 3,
    explanation:
      "In 2007 Microsoft researchers showed whoever chose its built-in numbers could predict its future results. RSA kept it as the default until 2013, when leaks confirmed the role of the NSA, a US spy agency.",
    year: "2007",
    severity: "HIGH",
    sources: [
      { url: "https://www.wired.com/2013/09/nsa-backdoor/", label: "Wired" },
      { url: "https://arstechnica.com/security/2013/12/nsa-influenced-crypto-standard-may-have-poisoned-rsas-bsafe-tool-after-all/", label: "Ars Technica" },
    ],
  },

  // ---- Juniper Networks ----
  {
    entity: "juniper",
    headline: "A hidden master password let anyone control Juniper's network security boxes",
    rank: 2,
    explanation:
      "In 2015 Juniper revealed unauthorised code in its NetScreen software. It included a built-in password giving anyone full control, which a researcher found within six hours, and a flaw letting outsiders secretly read protected connections.",
    year: "2015",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.rapid7.com/blog/post/2015/12/20/cve-2015-7755-juniper-screenos-authentication-backdoor/", label: "Rapid7" },
      { url: "https://www.securityweek.com/juniper-firewall-backdoor-password-found-6-hours/", label: "SecurityWeek" },
    ],
  },
  {
    entity: "juniper",
    headline: "Someone reused a US spy-linked weakness in Juniper devices to spy",
    rank: 3,
    explanation:
      "Researchers found the flaw changed a number Juniper added in 2008, suggesting someone reused work linked to a US spy agency. In 2020 US lawmakers pressed Juniper, which still had not said who did it.",
    year: "2008–20",
    severity: "HIGH",
    sources: [
      { url: "https://www.schneier.com/blog/archives/2016/04/details_about_j.html", label: "Schneier on Security" },
      { url: "https://www.theregister.com/2020/06/10/congress_juniper_letter/", label: "The Register" },
    ],
  },

  // ---- Cisco ----
  {
    entity: "cisco",
    headline: "US spy agency staff opened Cisco boxes during shipping to add beacons",
    rank: 3,
    explanation:
      "Leaked NSA photos showed staff opening a Cisco box, adding a hidden beacon that signals back, then resealing it for the customer. Cisco's boss warned President Obama this would hurt trust in US technology.",
    year: "2014",
    severity: "CRITICAL",
    sources: [
      { url: "https://techcrunch.com/2014/05/18/the-nsa-cisco-and-the-issue-of-interdiction/", label: "TechCrunch" },
      { url: "https://www.computerworld.com/article/1633983/to-avoid-nsa-cisco-delivers-gear-to-strange-addresses.html", label: "Computerworld" },
    ],
  },
  {
    entity: "cisco",
    headline: "Cisco's built-in feature for legal listening could be misused by insiders",
    rank: 2,
    explanation:
      "A 2010 security conference talk showed insiders without permission could start listening in, see who was already being watched, or turn off the activity records, with no lock after wrong passwords.",
    year: "2010",
    severity: "HIGH",
    sources: [
      { url: "https://www.forbes.com/2010/02/03/hackers-networking-equipment-technology-security-cisco.html", label: "Forbes" },
      { url: "https://blackhat.com/presentations/bh-dc-10/Cross_Tom/BlackHat-DC-2010-Cross-Attacking-LawfulI-Intercept-wp.pdf", label: "Black Hat (IBM X-Force whitepaper)" },
    ],
  },
  {
    entity: "cisco",
    headline: "Leaked NSA catalogue showed a hidden, permanent way into Cisco security devices",
    rank: 3,
    explanation:
      "The leaked catalogue from the NSA, a US spy agency, listed 'JETPLOW', software giving a lasting secret way into Cisco PIX and ASA security devices that survived restarts, at no extra cost.",
    year: "2013",
    severity: "CRITICAL",
    sources: [
      { url: "https://www.eff.org/files/2014/01/06/20131230-appelbaum-nsa_ant_catalog.pdf", label: "EFF (leaked NSA ANT catalog document)" },
      { url: "https://en.wikipedia.org/wiki/NSA_ANT_catalog", label: "Wikipedia (secondary corroboration)" },
    ],
    image: "nsa-ant-jetplow.jpg",
  },
];

/** Orbiting tech-giant nodes, in display order. */
export const TECH_ORDER = ["nvidia","google","microsoft","meta","amazon","apple","openai","zoom","oracle","adobe","slack","rsa","juniper","cisco"];

/** Central intel/state cluster; the middle entry renders larger. */
export const AGENCY_ORDER = ["nsa","usgov","cia","fbi"];

/** Consumer "perceived-secure vs actually-provable" exposures — the everyday
 *  beliefs that don't survive a forensic examiner. A distinct ledger from the
 *  historical big-tech/agency EXPOSURES above; `entity` here is a topic slug,
 *  not an ENTITIES node, so these are not rendered as matrix nodes. Every claim
 *  is grounded in the sources listed. Keep headlines accurate — nuance beats a
 *  false absolute (e.g. an iPhone is strong in BFU, weak AFU/backup, not
 *  simply "unhackable" or "forensic-proof"). */
export const PERCEPTIONS: Exposure[] = [
  {
    entity: "iphone",
    headline: "Your iPhone is a vault only while it's switched off",
    explanation:
      "Before First Unlock (powered off, passcode never entered since boot) most keys are sealed and even Cellebrite/GrayKey struggle. But phones are usually seized After First Unlock, where far more is extractable — and without Advanced Data Protection, an iCloud backup hands Apple, and any warrant, the same data anyway.",
    year: "Ongoing",
    severity: "HIGH",
    sources: [
      { url: "https://www.404media.co/leaked-documents-show-what-phones-secretive-tech-graykey-can-unlock-2/", label: "404 Media" },
      { url: "https://www.macrumors.com/2024/11/19/graykey-ios-18-partial-unlock/", label: "MacRumors" },
      { url: "https://support.apple.com/guide/security/advanced-data-protection-for-icloud-sec973254c5f/web", label: "Apple" },
    ],
  },
  {
    entity: "android",
    headline: "Samsung Knox is paint over stock Android — a real secure phone seals its keys in hardware",
    explanation:
      "Knox/Defex/RKP are app-layer restrictions forensic vendors have built bypasses around (Magnet lists physical acquisition for 1,300+ Samsung models). GrapheneOS on a Pixel seals keys in the Titan M2 element, auto-reboots to BFU, and offers a duress PIN that instantly wipes — the architecture behind secureOS/Privon.",
    year: "Ongoing",
    severity: "HIGH",
    sources: [
      { url: "https://www.magnetforensics.com/blog/loading-cellebrite-images-into-magnet-axiom/", label: "Magnet Forensics" },
      { url: "https://grapheneos.org/faq", label: "GrapheneOS" },
    ],
  },
  {
    entity: "bitlocker",
    headline: "BitLocker being on is not the same as safe — the default unlocks itself for a thief with a USB stick",
    explanation:
      "Consumer BitLocker defaults to TPM-only auto-unlock with no PIN. The bitpixie / CVE-2025-48804 class feeds the boot manager a signed-but-manipulated recovery environment to pull the key without a PIN — demonstrated bypassing TPM-only Windows 11 in under five minutes. Enabling TPM+PIN defeats the entire attack class.",
    year: "2023-2025",
    severity: "HIGH",
    sources: [
      { url: "https://blog.compass-security.com/2025/05/bypassing-bitlocker-encryption-bitpixie-poc-and-winpe-edition/", label: "Compass Security" },
      { url: "https://blog.elcomsoft.com/2026/05/a-decade-of-bitlocker-vulnerabilities-whats-patched-whats-not-and-what-still-works/", label: "Elcomsoft" },
      { url: "https://www.techpowerup.com/348954/bitunlocker-downgrade-attack-bypasses-tpm-only-windows-11-bitlocker-in-under-5-minutes", label: "TechPowerUp" },
    ],
  },
  {
    entity: "messaging",
    headline: "End-to-end encryption hides what you said, not who you talked to — or what's on the phone",
    explanation:
      "E2EE protects message content in transit. It does nothing for metadata (WhatsApp can yield contacts and who-messaged-whom-when to a warrant or pen register) or for a seized, unlocked device, where the plaintext message database is extractable regardless of which protocol carried it.",
    year: "Ongoing",
    severity: "HIGH",
    sources: [
      { url: "https://www.justsecurity.org/79549/we-now-know-what-information-the-fbi-can-obtain-from-encrypted-messaging-apps/", label: "Just Security" },
      { url: "https://faq.whatsapp.com/444002211197967", label: "WhatsApp Law Enforcement guidelines" },
    ],
  },
  {
    entity: "deletion",
    headline: "Deleting a file doesn't delete it — and on an SSD, neither does overwriting it",
    explanation:
      "Delete, empty-trash, and factory-reset normally remove only the pointer, leaving the data carvable. On flash (SSD/NVMe/eMMC) wear-leveling means an OS-level overwrite often misses the physical cells — NIST SP 800-88 treats overwrite as unreliable on flash and elevates cryptographic erase as the dependable method.",
    year: "Ongoing",
    severity: "HIGH",
    sources: [
      { url: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-88r2.pdf", label: "NIST SP 800-88 Rev. 2" },
      { url: "https://www.sciencedirect.com/science/article/pii/S2666281723000963", label: "ScienceDirect (Android reset study)" },
    ],
  },
  {
    entity: "cloud-account",
    headline: "Your Google account isn't yours — it answers to warrants and can be switched off without you",
    explanation:
      "A strong password doesn't change two facts: providers field tens of thousands of law-enforcement requests (Google received ~40,000 in the first half of 2020 alone) and can suspend or terminate an account unilaterally. For a business run on one Workspace identity that's a continuity risk, not just a privacy one — custody, not control.",
    year: "Ongoing",
    severity: "HIGH",
    sources: [
      { url: "https://transparencyreport.google.com/user-data/overview", label: "Google Transparency Report" },
      { url: "https://support.google.com/legal-help-center/answer/16719647?hl=en", label: "Google Legal Help" },
    ],
  },
  {
    entity: "physical-capture",
    headline: "The leak no security tool sees: someone points a phone at the screen and walks out",
    explanation:
      "A photo of the screen generates no file transfer, download, or log — so conventional DLP, which watches data flows, is blind to it. It's a documented, common insider move. Only least-data-on-screen defaults, watermarking/session monitoring, and camera-discipline policy address it — no amount of encryption does.",
    year: "Ongoing",
    severity: "HIGH",
    sources: [
      { url: "https://www.echomark.com/post/the-insider-with-a-camera-phone-the-leak-vector-no-security-tool-sees-coming", label: "EchoMark" },
      { url: "https://www.dtex.ai/blog/modern-data-exfiltration-patterns/", label: "DTEX" },
      { url: "https://www.strongdm.com/what-is/shoulder-surfing", label: "StrongDM" },
    ],
  },
];
