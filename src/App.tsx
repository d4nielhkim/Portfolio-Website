/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { 
  Github, 
  Mail, 
  Linkedin, 
  Globe, 
  Award, 
  User,
  GraduationCap,
  Share2,
  Phone
} from 'lucide-react';

// --- Constants & Data ---

const PORTRAIT_ASCII = `
                                                   +++***++++*
                                              ++*******#####****+++
                                           ****###%%%%%%##########*+++
                                         **###%%%%%@@@%%%#%%%%%%%%%##*+*
                                        **#%%%%%%%%%%%%%%%%%%%%%%%%%%%##*
                                       +*#%%%%%%%%%##########%%%%%%%%%%#*
                                      **###%%%%%#*===--====+**#%%%%%%%%#**+
                                     ***##%%###+===-----====+*##%%%%%%%%#*++
                                     ***####*++=============++*##%%%%%%%%#++
                                     ********+==============++*##%%%%%%%%%#*
                                     ***++++=======---=======++*#%%%%@@@%%#*+
                                      *+==+========------=====+++#%%%@%@%%%#+
                                      =============+*####***+=====+#%%%%%%%#*
                                       -==++++++++*##*+=====++=====+#%%%@@%%*
                                       +*####*++++***+++=+**++===--=*#%%%%%+--
                                       ++***##*+==++*#*###*##+====-=+#%%#*++**+
                                     - =++**%%#++===+***++===-====--=*#*+++==++
                                        **#%##+==+**========+=====-==++++***+++
                                   +--=-=+**+%=--=====================++=+==+++
                                   ::: -==+++=----===++===+============+++===+=
                                    ::. =====+++++++++++++====++++=======++===
                                     :..:-=++#####****+++++++++++++===+++++=
                                         ++******++=====+++++++++++++==+*++
                                          +*+++++++++++****+++++++++++==++=
                                          ++**#%%######%###****++++++++++=
                                           ++###*****+++++************++==
                                             ***####**++++********##*+++==
                                              +***++====++++**#####*++++==
                     :::                       ++++++++++++*##%%##*++++==--
                   -===+=                       ***#****###%%%%#**+++++==---
                ::---=+*+                         #####%%%%%%##**+++++====-::
            :--=======++=-                           **#%%####**++++=========-:
           ====++++*****++                           **######**++++===++***++====--
           =======-----=--:                          +***###***+++********+++++++==---:
         ----=====-===++=:::                         ++++********#******+++++++++==--=---:
         ++++++++===+====---                         =++++**###*******++++++++++=-----------
         ++=--============--                   ----:=***************++++++++++==------=====-----
          +=======+*+++**=---                -===--=++++++****+++****++++++++===================-
          **+=====+**+**+=--=              =====--=++++++*****+****+++++++++==++++=++*+++++========
            ======**==++=====            =+===--==++++++***+++++++++++++++++++++++***+++++++========
            ++++++*===**+====           +++==-==+++++++**++++++++++++++++++++++++***++++++++++====--
             **++++====+=====          *+==-==++++++++**+++++++++++++++++++++++*#*****+++++++++===--
             +++++=====+==+===       =++====+++++++++**+++++++++++++++++++++++**********+++++++++==-
             ==+++========+===      =+*+==++++++++++**++++++++++++++++++**++***#*********++++++++++=
            ===++======++++++==  -++***=+++++++++++**++++++++++++++*+++**++*+*#**********+++++++++++
            ===++=======++++++===+##*#+==+==-=-==+**++++++++++++++++++*******##**********+++**++++++
           ====+========++++++***##*#+==========+*+=+++++++++++++++++********####*******+****+++++++
          ==============++++++**#%*#*===--===--=*+===+++++++++++++++*****#**#%%###************++++++
          ====+++====++++++++++#%###+=+=+++++++++=====+++++++***+*******##**#%%%##***#***********++*
         =====++++++++**+++++++%###++++++++++**++==+=-+++++*************#***#%%%%#*###**********++++
        =====+++++++++**+*+++++###+*++**++++**++++==+==+****************#**##%%%%####************++*
       ======++++++++++**+**+++*#******+++***++++++++=-************#***#***##%%%%###**************+*
       -=====++++++++++**+**++++***##*+++***+++++++===+***********#***#***##%%%%%##**************+++
      -=====+++++++++++******+++**##**++****+++****==**+********###**###**##%%%%%%#*+******++*++++++
`;

const NAME_ASCII = `
  ____              _      _   _   _ 
 |  _ \\  __ _ _ __ (_) ___| | | | | |
 | | | |/ _\` | '_ \\| |/ _ \\ | | |_| |
 | |_| | (_| | | | | |  __/ | |  _  |
 |____/ \\__,_|_| |_|_|\\___|_| |_| |_|
`;

const MENU_ITEMS = [
  { id: 'about', label: 'About', icon: User },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'socials', label: 'Socials', icon: Share2 },
  { id: 'contact', label: 'Contact', icon: Phone },
];

const CONTENT = {
  about: {
    title: "About Daniel Hakim",
    text: [
      "Daniel Hakim is a high school student studying at SMK Taman Hi-Tech, an IGCSE top-achiever, and a Wikipedian.",
      "An AI engineer aspirant, he aims to develop AI-based solutions to help solve modern world problems. He also interested in problems which challenge his mind, like maths and sciences.",
      "Previously studied at MRSM Kubang Pasu where he excels academically, achieving GPAs of 3.5 and above in every examinations. He was also selected to join the Young Apprentice Leadership Camp, an exclusive leadership camp, as he showed leadership competency during his study."
    ]
  },
  education: {
    title: "Academic Background",
    items: [
      {
        institution: "SMK Taman Hi-Tech",
        role: "High School Student",
        description: "Daniel is currently in Form 5, and majoring in Pure Science stream at SMK Taman Hi-Tech. He is now preparing for Sijil Pelajaran Malaysia."
      },
      {
        institution: "MRSM Kubang Pasu",
        role: "Previous Study",
        description: "Daniel studied in a rigorous academic environment that focused on discipline and excellence. Achieved 4A*, 1A, and 1B in IGCSE exam."
      }
    ]
  },
  socials: {
    title: "Online Presence",
    links: [
      { name: "Wiki Userpage", url: "https://meta.wikimedia.org/wiki/User:Its.notd4niel", displayUrl: "meta.wikimedia.org/wiki/User:Its.notd4niel", icon: Globe },
      { name: "Instagram", url: "https://www.instagram.com/d4nielhkim", displayUrl: "@d4nielhkim www.instagram.com/d4nielhkim", icon: Share2 },
      { name: "LinkedIn", url: "https://www.linkedin.com/in/daniel-hakim-mohd-yusni-07399a397", displayUrl: "www.linkedin.com/in/daniel-hakim-mohd-yusni-07399a397", icon: Linkedin },
      { name: "Github", url: "https://github.com/d4nielhkim", displayUrl: "https://github.com/d4nielhkim", icon: Github }
    ]
  },
  contact: {
    title: "Get In Touch",
    details: [
      { label: "Email", value: "mohddanielhakimmohdyusni@gmail.com", icon: Mail },
      { label: "Location", value: "Kedah, Malaysia", icon: Globe }
    ]
  }
};

export default function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('about');

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowLeft':
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : MENU_ITEMS.length - 1));
        break;
      case 'ArrowRight':
        setSelectedIndex(prev => (prev < MENU_ITEMS.length - 1 ? prev + 1 : 0));
        break;
      case 'Enter':
        setActiveTab(MENU_ITEMS[selectedIndex].id);
        break;
      case 'q':
        setActiveTab('about');
        break;
    }
  }, [selectedIndex]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen bg-black text-[#e0e0e0] font-mono flex flex-col p-4 md:p-8 selection:bg-emerald-500/30 selection:text-emerald-400">
      {/* Top Bar */}
      <div className="flex justify-between text-[10px] md:text-xs mb-8 opacity-60 uppercase tracking-widest">
        <div className="flex gap-4">
          <span>family@daniel-hpstream11pronotebookpc: ~</span>
        </div>
        <span>11:50 PM</span>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col lg:flex-row gap-8 lg:gap-16 max-w-7xl mx-auto w-full overflow-hidden">
        
        {/* Left Column: ASCII Portrait */}
        <div className="hidden lg:block shrink-0">
          <pre className="text-[9px] leading-[1.05] text-white/70 select-none">
            {PORTRAIT_ASCII}
          </pre>
        </div>

        {/* Right Column: Info & Content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Name ASCII */}
          <div className="text-emerald-500 mb-8 overflow-x-auto">
            <pre className="text-[7px] md:text-[9px] leading-tight font-bold">
              {NAME_ASCII}
            </pre>
          </div>

          {/* Dynamic Content Section */}
          <div className="flex-1 overflow-y-auto pr-4 space-y-6">
            {activeTab === 'about' && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-emerald-400">
                  {CONTENT.about.title}
                </h2>
                <div className="space-y-4 text-sm md:text-base leading-relaxed text-white/90">
                  {CONTENT.about.text.map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'education' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-emerald-400">
                  {CONTENT.education.title}
                </h2>
                <div className="space-y-4">
                  {CONTENT.education.items.map((item, i) => (
                    <div key={i} className="p-4 border border-white/10 bg-white/[0.02]">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-emerald-300">{item.institution}</h3>
                        <Award size={14} className="text-emerald-500/50" />
                      </div>
                      <p className="text-xs text-white/40 mb-2">{item.role}</p>
                      <p className="text-sm text-white/70">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'socials' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-emerald-400">
                  {CONTENT.socials.title}
                </h2>
                <div className="space-y-3">
                  {CONTENT.socials.links.map((link, i) => (
                    <div key={i} className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-4 p-2 border-l border-emerald-500/30">
                      <span className="text-emerald-500/60 text-xs uppercase min-w-[120px]">{link.name}</span>
                      <a 
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white/90 hover:text-emerald-400 break-all"
                      >
                        {link.displayUrl}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-emerald-400">
                  {CONTENT.contact.title}
                </h2>
                <div className="space-y-4">
                  {CONTENT.contact.details.map((detail, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 border border-white/10 bg-white/[0.02]">
                      <div className="text-emerald-500">
                        <detail.icon size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-white/30">{detail.label}</p>
                        <p className="text-sm text-white/90">{detail.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Horizontal Menu (Inspiration from photo) */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 items-center mt-8 pt-8 border-t border-white/10">
            {MENU_ITEMS.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedIndex(index);
                  setActiveTab(item.id);
                }}
                className={`flex items-center gap-2 text-sm uppercase tracking-wider transition-none ${
                  selectedIndex === index ? 'text-emerald-400 font-bold' : 'text-white/40'
                }`}
              >
                {selectedIndex === index && <span className="text-emerald-500">✦</span>}
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation Hint */}
      <div className="mt-8 pt-4 border-t border-white/10 text-[10px] md:text-xs opacity-50 font-mono">
        [Press q to quit,             to choose any directory, ENTER to enter chosen directory]
      </div>

      {/* CRT Scanline Effect (Subtle) */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
    </div>
  );
}
