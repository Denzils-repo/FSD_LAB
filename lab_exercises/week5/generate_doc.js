import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  AlignmentType,
  BorderStyle,
  WidthType,
  HeadingLevel,
  ShadingType
} from 'docx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const borderStyle = { style: BorderStyle.SINGLE, size: 1, color: 'D0C5B4' };
const cellBorders = { top: borderStyle, bottom: borderStyle, left: borderStyle, right: borderStyle };

function createCodeBlock(code) {
  return code.trim().split('\n').map(line => new Paragraph({
    spacing: { before: 20, after: 20 },
    children: [
      new TextRun({
        text: line,
        font: 'Courier New',
        size: 18,
        color: '15110D'
      })
    ]
  }));
}

const doc = new Document({
  sections: [
    {
      children: [
        // TITLE
        new Paragraph({
          spacing: { before: 240, after: 120 },
          children: [
            new TextRun({
              text: 'Lab Exercise 5 & 6: Domain-Based React Application',
              bold: true,
              size: 44,
              color: '15110D'
            })
          ]
        }),

        // SUBTITLE
        new Paragraph({
          spacing: { before: 40, after: 240 },
          children: [
            new TextRun({
              text: 'Full-Stack 3D Game Asset Marketplace (LootYard) with React, Express & SQLite',
              italic: true,
              size: 24,
              color: '8A7564'
            })
          ]
        }),

        // METADATA TABLE
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 25, type: WidthType.PERCENTAGE },
                  shading: { fill: 'FFF0DF', type: ShadingType.CLEAR },
                  borders: cellBorders,
                  children: [new Paragraph({ children: [new TextRun({ text: 'Domain & Module', bold: true, size: 20 })] })]
                }),
                new TableCell({
                  width: { size: 75, type: WidthType.PERCENTAGE },
                  borders: cellBorders,
                  children: [new Paragraph({ children: [new TextRun({ text: 'LootYard — Digital Assets & Game Art Marketplace (3D Assets, Creators, Reviews)', size: 20 })] })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 25, type: WidthType.PERCENTAGE },
                  shading: { fill: 'FFF0DF', type: ShadingType.CLEAR },
                  borders: cellBorders,
                  children: [new Paragraph({ children: [new TextRun({ text: 'Frontend Architecture', bold: true, size: 20 })] })]
                }),
                new TableCell({
                  width: { size: 75, type: WidthType.PERCENTAGE },
                  borders: cellBorders,
                  children: [new Paragraph({ children: [new TextRun({ text: 'React 19 (Vite SPA), Functional Components, JSX, Tailwind Utilities', size: 20 })] })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 25, type: WidthType.PERCENTAGE },
                  shading: { fill: 'FFF0DF', type: ShadingType.CLEAR },
                  borders: cellBorders,
                  children: [new Paragraph({ children: [new TextRun({ text: 'Backend REST API', bold: true, size: 20 })] })]
                }),
                new TableCell({
                  width: { size: 75, type: WidthType.PERCENTAGE },
                  borders: cellBorders,
                  children: [new Paragraph({ children: [new TextRun({ text: 'Express API Server running on port 3001 (GET, POST, PUT, DELETE)', size: 20 })] })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 25, type: WidthType.PERCENTAGE },
                  shading: { fill: 'FFF0DF', type: ShadingType.CLEAR },
                  borders: cellBorders,
                  children: [new Paragraph({ children: [new TextRun({ text: 'Database Engine', bold: true, size: 20 })] })]
                }),
                new TableCell({
                  width: { size: 75, type: WidthType.PERCENTAGE },
                  borders: cellBorders,
                  children: [new Paragraph({ children: [new TextRun({ text: 'SQLite (database/lootyard.sqlite) with 112 asset records and 62 creator profiles', size: 20 })] })]
                })
              ]
            })
          ]
        }),

        // 1. OBJECTIVES & OVERVIEW
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 360, after: 120 },
          children: [new TextRun({ text: '1. Problem Statement & System Overview', bold: true, color: '15110D' })]
        }),
        new Paragraph({
          spacing: { after: 180 },
          children: [
            new TextRun({
              text: 'In Part 1 (Lab Exercises 1 to 4), the LootYard 3D Game Asset Marketplace was prototyped using standard HTML, CSS, and vanilla JavaScript. In Part 2 (Lab Exercises 5 & 6), the application was completely rebuilt into a modern, component-driven React single-page application (SPA) powered by Node.js Express REST API endpoints and a persistent SQLite database (lootyard.sqlite).'
            })
          ]
        }),

        // 2. MANDATORY REQUIREMENTS TABLE
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 360, after: 120 },
          children: [new TextRun({ text: '2. Mandatory Requirements Implementation Matrix', bold: true, color: '15110D' })]
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  width: { size: 30, type: WidthType.PERCENTAGE },
                  shading: { fill: 'FFD2AA', type: ShadingType.CLEAR },
                  borders: cellBorders,
                  children: [new Paragraph({ children: [new TextRun({ text: 'Requirement', bold: true, size: 20 })] })]
                }),
                new TableCell({
                  width: { size: 20, type: WidthType.PERCENTAGE },
                  shading: { fill: 'FFD2AA', type: ShadingType.CLEAR },
                  borders: cellBorders,
                  children: [new Paragraph({ children: [new TextRun({ text: 'Status', bold: true, size: 20 })] })]
                }),
                new TableCell({
                  width: { size: 50, type: WidthType.PERCENTAGE },
                  shading: { fill: 'FFD2AA', type: ShadingType.CLEAR },
                  borders: cellBorders,
                  children: [new Paragraph({ children: [new TextRun({ text: 'Implementation Details', bold: true, size: 20 })] })]
                })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: 'Functional Components', size: 20 })] })] }),
                new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: '100% Complete', bold: true, color: '15803D', size: 20 })] })] }),
                new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: 'App.jsx, HomePage.jsx, PortfolioPage.jsx, IndexPage.jsx', size: 20 })] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: 'useState() & useEffect()', size: 20 })] })] }),
                new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: '100% Complete', bold: true, color: '15803D', size: 20 })] })] }),
                new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: 'State hooks for currentUser, assetsList, searchQuery, category filters, and selectedProduct', size: 20 })] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: 'Form Handling & Controls', size: 20 })] })] }),
                new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: '100% Complete', bold: true, color: '15803D', size: 20 })] })] }),
                new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: 'Multiple text inputs, textareas, select category dropdowns, and radio button license options', size: 20 })] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: 'CREATE (Upload Asset)', size: 20 })] })] }),
                new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: '100% Complete', bold: true, color: '15803D', size: 20 })] })] }),
                new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: 'Upload Asset modal inserts new 3D model records into SQLite via POST /api/assets', size: 20 })] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: 'READ (Fetch Records)', size: 20 })] })] }),
                new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: '100% Complete', bold: true, color: '15803D', size: 20 })] })] }),
                new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: 'Fetches 112 asset records and 62 creator profiles from SQLite via GET /api/assets & GET /api/creators', size: 20 })] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: 'UPDATE (Edit Profile)', size: 20 })] })] }),
                new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: '100% Complete', bold: true, color: '15803D', size: 20 })] })] }),
                new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: 'Edit Creator Profile modal updates displayName, title & bio via PUT /api/creators/:username', size: 20 })] })] })
              ]
            }),
            new TableRow({
              children: [
                new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: 'Bonus: Dynamic Search', size: 20 })] })] }),
                new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: '100% Complete', bold: true, color: '15803D', size: 20 })] })] }),
                new TableCell({ borders: cellBorders, children: [new Paragraph({ children: [new TextRun({ text: 'Real-time keyword filtering across title, creator handles, tags & descriptions', size: 20 })] })] })
              ]
            })
          ]
        }),

        // 3. DATABASE SCHEMA & REST ENDPOINTS
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 360, after: 120 },
          children: [new TextRun({ text: '3. Database Schema & REST Endpoints', bold: true, color: '15110D' })]
        }),
        new Paragraph({
          spacing: { after: 120 },
          children: [
            new TextRun({
              text: 'The backend database is built on SQLite (database/lootyard.sqlite) and served over Express REST API endpoints.'
            })
          ]
        }),
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 180, after: 60 },
          children: [new TextRun({ text: 'SQLite Schema (database/schema.sql)', bold: true, color: 'D97706' })]
        }),
        ...createCodeBlock(`
CREATE TABLE creators (
  username TEXT PRIMARY KEY,
  displayName TEXT NOT NULL,
  title TEXT,
  bio TEXT,
  avatar TEXT,
  email TEXT UNIQUE,
  password TEXT,
  rating REAL DEFAULT 4.8,
  totalReviews INTEGER DEFAULT 0,
  totalDownloads INTEGER DEFAULT 0
);

CREATE TABLE assets (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  creator TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  tags TEXT,
  thumbnailUrl TEXT NOT NULL,
  badge TEXT,
  status TEXT DEFAULT 'available',
  rating REAL DEFAULT 5.0,
  downloadsCount INTEGER DEFAULT 0,
  FOREIGN KEY (creator) REFERENCES creators(username)
);
        `),

        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 180, after: 60 },
          children: [new TextRun({ text: 'Express API Server (database/server.js)', bold: true, color: 'D97706' })]
        }),
        ...createCodeBlock(`
// CREATE ASSET (Upload Asset)
app.post('/api/assets', async (req, res) => {
  const { title, creator, category, description, tags, thumbnailUrl } = req.body;
  const newId = \`a_\${Date.now()}\`;
  await dbRun(\`
    INSERT INTO assets (id, title, creator, category, description, tags, thumbnailUrl, status, rating, downloadsCount)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'available', 5.0, 1)
  \`, [newId, title, creator || 'anonymous', category || 'props', description, JSON.stringify(tags || []), thumbnailUrl]);

  const created = await dbGet('SELECT * FROM assets WHERE id = ?', [newId]);
  res.status(201).json(created);
});

// UPDATE CREATOR PROFILE
app.put('/api/creators/:username', async (req, res) => {
  const { displayName, title, bio } = req.body;
  await dbRun(\`
    UPDATE creators
    SET displayName = COALESCE(?, displayName),
        title = COALESCE(?, title),
        bio = COALESCE(?, bio)
    WHERE username = ?
  \`, [displayName, title, bio, req.params.username]);
  const updated = await dbGet('SELECT * FROM creators WHERE username = ?', [req.params.username]);
  res.json(updated);
});
        `),

        // 4. SUMMARY & CONCLUSIONS
        new Paragraph({
          heading: HeadingLevel.HEADING_1,
          spacing: { before: 360, after: 120 },
          children: [new TextRun({ text: '4. Summary & Verification Results', bold: true, color: '15110D' })]
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'The LootYard React application successfully fulfills 100% of the Lab 5 & 6 requirements. All components render dynamically, state transitions execute seamlessly, and data is saved persistently in the SQLite database.'
            })
          ]
        })
      ]
    }
  ]
});

const outputPath = path.join(__dirname, 'LAB5_6_DomainBasedReactApp.docx');

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outputPath, buffer);
  console.log(`Document created successfully: ${outputPath}`);
}).catch(err => {
  console.error('Error generating document:', err);
});
