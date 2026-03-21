import fs from 'fs';
import ssh2 from 'ssh2';
import React from 'react';
import { render } from 'ink';
import App from './index.jsx';

const Server = ssh2.Server;
const hostKey = fs.readFileSync('/home/daniel/Portfolio-Website/id_rsa');

const server = new Server({ hostKeys: [hostKey] }, (client) => {
  
  // 1. Let them in
  client.on('authentication', (ctx) => {
    ctx.accept();
  });

  // 2. Client is ready
  client.on('ready', () => {
    console.log(`Accepted connection from: ${client.username}`);

    // 3. Handle the Session
    client.on('session', (accept, reject) => {
      const session = accept();

      // 4. IMPORTANT: Accept PTY (Interactive Terminal)
      session.on('pty', (accept, reject, info) => {
        accept();
      });

      // 5. Handle the Shell (where the UI lives)
      session.on('shell', (accept, reject) => {
        const stream = accept();

        // 6. Fake TTY for Ink compatibility
        stream.isTTY = true;
        stream.setRawMode = () => {};

        stream.ref = () => stream;   
        stream.unref = () => stream;

        stream.columns = 100;
        stream.rows = 30;
        // 7. Render the React App
        const { waitUntilExit } = render(<App username={client.username} />, {
          stdin: stream,
          stdout: stream,
          exitOnCtrlC: true,
          patchConsole: false
        });

        // 8. Cleanup on exit
        waitUntilExit().then(() => {
          stream.end();
          client.end();
        });

        stream.on('close', () => {
          client.end();
        });
      }); // End Shell
    }); // End Session
  }); // End Ready

  client.on('error', (err) => {
    console.error('SSH Error:', err.message);
  });
});

// Port 22 - Ensure you use sudo!
server.listen(22, '0.0.0.0', () => {
  console.log('🚀 Portfolio is LIVE at ssh d4niel.me');
});

