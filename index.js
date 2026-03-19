import React, { useState } from 'react';
import { render, Box, Text, useInput, useApp } from 'ink';
import SelectInput from 'ink-select-input';
import chalk from 'chalk';

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
                                     ::. :-=++#####****+++++++++++++===+++++=
                                         ++******++=====+++++++++++++==+*++
                                          +*+++++++++++****+++++++++++==++=
                                          ++**#%%######%###****++++++++++=
                                           ++###*****+++++************++==
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
      _             _      _ 
   __| | __ _ _ __ (_) ___| |
  / _\` |/ _\` | '_ \\| |/ _ \\ |
 | (_| | (_| | | | | |  __/ |
  \\__,_|\\__,_|_| |_|_|\\___|_|
`;

const MENU_ITEMS = [
  { label: 'About', value: 'about' },
  { label: 'Education', value: 'education' },
  { label: 'Socials', value: 'socials' },
  { label: 'Contact', value: 'contact' },
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
      { name: "Wiki Userpage", url: "https://meta.wikimedia.org/wiki/User:Its.notd4niel" },
      { name: "Instagram", url: "https://www.instagram.com/d4nielhkim" },
      { name: "LinkedIn", url: "https://www.linkedin.com/in/daniel-hakim-mohd-yusni-07399a397" },
      { name: "Github", url: "https://github.com/d4nielhkim" }
    ]
  },
  contact: {
    title: "Get In Touch",
    details: [
      { label: "Email", value: "mohddanielhakimmohdyusni@gmail.com" },
      { label: "Location", value: "Kedah, Malaysia" }
    ]
  }
};

const App = () => {
  const [activeTab, setActiveTab] = useState('menu');
  const { exit } = useApp();

  useInput((input, key) => {
    if (input === 'q') {
      exit();
    }
    if (key.escape) {
      setActiveTab('menu');
    }
  });

  const handleSelect = (item) => {
    setActiveTab(item.value);
  };

  return (
    <Box flexDirection="column" padding={2}>
      {/* Top Bar */}
      <Box justifyContent="space-between" marginBottom={1}>
        <Text dimColor>family@daniel-hpstream11pronotebookpc: ~</Text>
        <Text dimColor>{new Date().toLocaleTimeString()}</Text>
      </Box>

      {/* Header */}
      <Box flexDirection="row" marginBottom={2}>
        <Box marginRight={4}>
          <Text dimColor>{PORTRAIT_ASCII}</Text>
        </Box>
        <Box flexDirection="column">
          <Text color="green" bold>{NAME_ASCII}</Text>
          
          {activeTab === 'menu' && (
            <Box flexDirection="column" marginTop={2}>
              <Text bold color="cyan">Main Menu</Text>
              <Box marginTop={1}>
                <SelectInput items={MENU_ITEMS} onSelect={handleSelect} />
              </Box>
            </Box>
          )}

          {activeTab !== 'menu' && (
            <Box flexDirection="column" marginTop={2}>
              <Text bold color="green">{CONTENT[activeTab].title}</Text>
              <Box flexDirection="column" marginTop={1}>
                {activeTab === 'about' && CONTENT.about.text.map((line, i) => (
                  <Box key={i} marginBottom={1}>
                    <Text>{line}</Text>
                  </Box>
                ))}

                {activeTab === 'education' && CONTENT.education.items.map((item, i) => (
                  <Box key={i} flexDirection="column" marginBottom={1} borderStyle="single" paddingX={1}>
                    <Text bold color="cyan">{item.institution}</Text>
                    <Text dimColor size="xs">{item.role}</Text>
                    <Text>{item.description}</Text>
                  </Box>
                ))}

                {activeTab === 'socials' && CONTENT.socials.links.map((link, i) => (
                  <Box key={i} marginBottom={1}>
                    <Text color="cyan" width={15}>{link.name}:</Text>
                    <Text>{link.url}</Text>
                  </Box>
                ))}

                {activeTab === 'contact' && CONTENT.contact.details.map((detail, i) => (
                  <Box key={i} marginBottom={1}>
                    <Text color="cyan" width={10}>{detail.label}:</Text>
                    <Text>{detail.value}</Text>
                  </Box>
                ))}
              </Box>
              <Box marginTop={2}>
                <Text dimColor>[Press Esc to return to menu]</Text>
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      {/* Footer */}
      <Box borderStyle="single" borderTop={true} borderBottom={false} borderLeft={false} borderRight={false} paddingTop={1}>
        <Text dimColor>[Press q to quit, Arrow keys to navigate, Enter to select]</Text>
      </Box>
    </Box>
  );
};

render(<App />);
