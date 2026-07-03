const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType, BorderStyle, WidthType, HeadingLevel, ShadingType, VerticalAlign, LevelFormat, PageBreak } = require('docx');

// Create docx document
const doc = new Document({
    styles: {
        default: {
            document: {
                run: {
                    font: 'Arial',
                    size: 22, // 11pt
                    color: '333333'
                }
            }
        },
        paragraphStyles: [
            {
                id: 'Title',
                name: 'Title',
                basedOn: 'Normal',
                run: { size: 52, bold: true, color: '15110D', font: 'Arial' },
                paragraph: { spacing: { before: 240, after: 120 }, alignment: AlignmentType.LEFT }
            },
            {
                id: 'Subtitle',
                name: 'Subtitle',
                basedOn: 'Normal',
                run: { size: 28, color: '8A7564', font: 'Arial', bold: true },
                paragraph: { spacing: { before: 60, after: 240 } }
            },
            {
                id: 'Heading1',
                name: 'Heading 1',
                basedOn: 'Normal',
                next: 'Normal',
                quickFormat: true,
                run: { size: 32, bold: true, color: '15110D', font: 'Arial' },
                paragraph: { spacing: { before: 360, after: 180 }, outlineLevel: 0 }
            },
            {
                id: 'Heading2',
                name: 'Heading 2',
                basedOn: 'Normal',
                next: 'Normal',
                quickFormat: true,
                run: { size: 26, bold: true, color: '5C4A3C', font: 'Arial' },
                paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 }
            },
            {
                id: 'CodeBlock',
                name: 'Code Block',
                basedOn: 'Normal',
                run: { font: 'Courier New', size: 17, color: '1A1A1A' },
                paragraph: {
                    spacing: { before: 20, after: 20 },
                    indent: { left: 360, right: 360 },
                    shading: { fill: 'F5F2EB', type: ShadingType.CLEAR }
                }
            }
        ]
    },
    numbering: {
        config: [
            {
                reference: 'bullet-list',
                levels: [
                    {
                        level: 0,
                        format: LevelFormat.BULLET,
                        text: '•',
                        alignment: AlignmentType.LEFT,
                        style: { paragraph: { indent: { left: 720, hanging: 360 } } }
                    }
                ]
            }
        ]
    },
    sections: []
});

// Helper: split code snippet into paragraph rows with code block style
function createCodeBlock(code) {
    return code.trim().split('\n').map(line => new Paragraph({
        style: 'CodeBlock',
        children: [new TextRun({ text: line })]
    }));
}

// Table Borders
const borderStyle = { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' };
const cellBorders = { top: borderStyle, bottom: borderStyle, left: borderStyle, right: borderStyle };

// Section 1: About, Pages, Styling Metadata Table
const metaTable = new Table({
    columnWidths: [2000, 7360],
    margins: { top: 100, bottom: 100, left: 150, right: 150 },
    rows: [
        new TableRow({
            children: [
                new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, shading: { fill: 'FFE4C4', type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: 'Domain', bold: true })] })] }),
                new TableCell({ borders: cellBorders, width: { size: 7360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('Indie Game Asset Marketplace (Local migration)')] })] })
            ]
        }),
        new TableRow({
            children: [
                new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, shading: { fill: 'FFE4C4', type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: 'Pages', bold: true })] })] }),
                new TableCell({ borders: cellBorders, width: { size: 7360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('home.html, portfolio.html, app.js (Auth), server.js (Express)')] })] })
            ]
        }),
        new TableRow({
            children: [
                new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, shading: { fill: 'FFE4C4', type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: 'Stack & DB', bold: true })] })] }),
                new TableCell({ borders: cellBorders, width: { size: 7360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('Node.js, Express, SQLite3 (database.sqlite), LocalStorage session')] })] })
            ]
        }),
        new TableRow({
            children: [
                new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, shading: { fill: 'FFE4C4', type: ShadingType.CLEAR }, children: [new Paragraph({ children: [new TextRun({ text: 'Styling', bold: true })] })] }),
                new TableCell({ borders: cellBorders, width: { size: 7360, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('Tailwind CSS (CDN) + Vanilla CSS Variables')] })] })
            ]
        })
    ]
});

// Section 2: API Endpoints Table
const apiTable = new Table({
    columnWidths: [1200, 2000, 2660, 1500, 2000],
    margins: { top: 100, bottom: 100, left: 100, right: 100 },
    rows: [
        new TableRow({
            tableHeader: true,
            children: [
                new TableCell({ borders: cellBorders, width: { size: 1200, type: WidthType.DXA }, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Method', bold: true })] })] }),
                new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Route', bold: true })] })] }),
                new TableCell({ borders: cellBorders, width: { size: 2660, type: WidthType.DXA }, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Purpose', bold: true })] })] }),
                new TableCell({ borders: cellBorders, width: { size: 1500, type: WidthType.DXA }, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Input Data', bold: true })] })] }),
                new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Success Response', bold: true })] })] })
            ]
        }),
        new TableRow({
            children: [
                new TableCell({ borders: cellBorders, width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun('POST')] })] }),
                new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('/api/signup')] })] }),
                new TableCell({ borders: cellBorders, width: { size: 2660, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('Registers a new creator/user. Fails on duplicate email/username.')] })] }),
                new TableCell({ borders: cellBorders, width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('email, password, username, displayName')] })] }),
                new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('{ id, email, username, displayName }')] })] })
            ]
        }),
        new TableRow({
            children: [
                new TableCell({ borders: cellBorders, width: { size: 1200, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun('POST')] })] }),
                new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('/api/login')] })] }),
                new TableCell({ borders: cellBorders, width: { size: 2660, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('Authenticates credentials. Accepts username or email.')] })] }),
                new TableCell({ borders: cellBorders, width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('identifier, password')] })] }),
                new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('{ id, email, username, displayName }')] })] })
            ]
        })
    ]
});

// Section 4: Seeded Credentials Table
const credTable = new Table({
    columnWidths: [600, 2500, 1500, 2760, 2000],
    margins: { top: 100, bottom: 100, left: 100, right: 100 },
    rows: [
        new TableRow({
            tableHeader: true,
            children: [
                new TableCell({ borders: cellBorders, width: { size: 600, type: WidthType.DXA }, shading: { fill: 'E6E6E6', type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'ID', bold: true })] })] }),
                new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, shading: { fill: 'E6E6E6', type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Display Name', bold: true })] })] }),
                new TableCell({ borders: cellBorders, width: { size: 1500, type: WidthType.DXA }, shading: { fill: 'E6E6E6', type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Username', bold: true })] })] }),
                new TableCell({ borders: cellBorders, width: { size: 2760, type: WidthType.DXA }, shading: { fill: 'E6E6E6', type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Email', bold: true })] })] }),
                new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, shading: { fill: 'E6E6E6', type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Password', bold: true })] })] })
            ]
        }),
        new TableRow({
            children: [
                new TableCell({ borders: cellBorders, width: { size: 600, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun('1')] })] }),
                new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('LeafWork Studios')] })] }),
                new TableCell({ borders: cellBorders, width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('leafwork')] })] }),
                new TableCell({ borders: cellBorders, width: { size: 2760, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('leafwork@lootyard.com')] })] }),
                new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('password123')] })] })
            ]
        }),
        new TableRow({
            children: [
                new TableCell({ borders: cellBorders, width: { size: 600, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun('2')] })] }),
                new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('NeonPulse')] })] }),
                new TableCell({ borders: cellBorders, width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('neonpulse')] })] }),
                new TableCell({ borders: cellBorders, width: { size: 2760, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('neonpulse@lootyard.com')] })] }),
                new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('password123')] })] })
            ]
        }),
        new TableRow({
            children: [
                new TableCell({ borders: cellBorders, width: { size: 600, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun('8')] })] }),
                new TableCell({ borders: cellBorders, width: { size: 2500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('newdev (New Account)')] })] }),
                new TableCell({ borders: cellBorders, width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('newdev')] })] }),
                new TableCell({ borders: cellBorders, width: { size: 2760, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('newdev@example.com')] })] }),
                new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('newpassword123')] })] })
            ]
        })
    ]
});

// Section 6: AI Usage Table
const aiTable = new Table({
    columnWidths: [600, 1500, 3630, 3630],
    margins: { top: 100, bottom: 100, left: 100, right: 100 },
    rows: [
        new TableRow({
            tableHeader: true,
            children: [
                new TableCell({ borders: cellBorders, width: { size: 600, type: WidthType.DXA }, shading: { fill: 'F9D5A5', type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '#', bold: true })] })] }),
                new TableCell({ borders: cellBorders, width: { size: 1500, type: WidthType.DXA }, shading: { fill: 'F9D5A5', type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'AI Tool', bold: true })] })] }),
                new TableCell({ borders: cellBorders, width: { size: 3630, type: WidthType.DXA }, shading: { fill: 'F9D5A5', type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Prompt / Instruction', bold: true })] })] }),
                new TableCell({ borders: cellBorders, width: { size: 3630, type: WidthType.DXA }, shading: { fill: 'F9D5A5', type: ShadingType.CLEAR }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Contribution', bold: true })] })] })
            ]
        }),
        new TableRow({
            children: [
                new TableCell({ borders: cellBorders, width: { size: 600, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun('1')] })] }),
                new TableCell({ borders: cellBorders, width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('Claude')] })] }),
                new TableCell({ borders: cellBorders, width: { size: 3630, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('Help design the sqlite database initialization and default seeding logic.')] })] }),
                new TableCell({ borders: cellBorders, width: { size: 3630, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('Provided sqlite schema tables and database creation scripts in server.js.')] })] })
            ]
        }),
        new TableRow({
            children: [
                new TableCell({ borders: cellBorders, width: { size: 600, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun('2')] })] }),
                new TableCell({ borders: cellBorders, width: { size: 1500, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('Claude')] })] }),
                new TableCell({ borders: cellBorders, width: { size: 3630, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('Draft form input edge-case validators for username, email format, and password length.')] })] }),
                new TableCell({ borders: cellBorders, width: { size: 3630, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('Helped implement frontend validations inside app.js for signup/login modals.')] })] })
            ]
        })
    ]
});

// Construct document body
doc.addSection({
    properties: {
        page: {
            margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
        }
    },
    children: [
        // Title block
        new Paragraph({ style: 'Title', children: [new TextRun('LootYard')] }),
        new Paragraph({ style: 'Subtitle', children: [new TextRun('Lab Exercise 4 — Local Authentication and Database Integration')] }),
        
        // Metadata table block
        new Paragraph({ children: [new TextRun({ text: 'Student Information', bold: true })] }),
        new Paragraph({ spacing: { after: 120 }, children: [new TextRun('Name: Denzil | Reg No: 2647216 | MCA | Full Stack Development Lab')] }),
        new Paragraph({ children: [new TextRun({ text: 'Submission Date: ', bold: true }), new TextRun('3 July 2026')] }),
        new Paragraph({ spacing: { after: 240 } }),

        // 1. About the Project
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('1. About the Project')] }),
        metaTable,
        new Paragraph({ spacing: { before: 180 } }),
        new Paragraph({
            children: [
                new TextRun('LootYard is a virtual marketplace for the indie game development community. Lab Exercise 4 migrates the application from a cloud-dependent Firebase structure to a fully self-contained local environment. The application utilizes a local Node.js Express server with SQLite3 for local database persistence, and integrates secure credentials-based authentication.')
            ]
        }),
        new Paragraph({ spacing: { before: 120 } }),
        new Paragraph({
            children: [
                new TextRun('All creator accounts are pre-seeded directly from the existing mockup assets. Form-level validation is handled dynamically in both the frontend (app.js) and the backend (server.js) to catch edge-case credentials issues. External OAuth buttons (Google/GitHub) are disabled in compliance with local workspace hosting.')
            ]
        }),

        // 2. Backend Architecture & API Endpoints
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('2. Backend Architecture & API Endpoints')] }),
        new Paragraph({
            spacing: { after: 120 },
            children: [
                new TextRun('The backend is powered by Express and handles CORS requests, static files serving, and local sqlite query execution. Below is a summary of the backend API routes:')
            ]
        }),
        apiTable,

        new Paragraph({ children: [new PageBreak()] }),

        // 3. Source Code Snippets
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('3. Source Code Snippets')] }),
        
        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('3.1 Backend Initialization & Seeding (server.js)')] }),
        new Paragraph({
            spacing: { after: 120 },
            children: [
                new TextRun('Below is the Express routing setup, database initialization, and default seeding logic:')
            ]
        }),
        ...createCodeBlock(`
// server.js db setup
const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'), (err) => {
    if (err) console.error('Database connection error:', err.message);
    else {
        console.log('Connected to SQLite database.');
        initializeDatabase();
    }
});

function initializeDatabase() {
    db.run(\`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        displayName TEXT
    )\`, (err) => {
        if (!err) seedDefaultCreators();
    });
}
`),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('3.2 Local Authentication API Routes (server.js)')] }),
        new Paragraph({
            spacing: { after: 120 },
            children: [
                new TextRun('The implementation of the server login and signup credential verification handlers:')
            ]
        }),
        ...createCodeBlock(`
// server.js signup handler
app.post('/api/signup', (req, res) => {
    const { email, password, username, displayName } = req.body;
    db.run(\`INSERT INTO users (username, email, password, displayName) 
            VALUES (?, ?, ?, ?)\`,
        [username, email, password, displayName],
        function(err) {
            if (err) return res.status(400).json({ error: 'Username or email already exists.' });
            res.status(201).json({ id: this.lastID, username, email, displayName });
        }
    );
});
`),

        new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('3.3 Client-Side Fetch & Form Validation (public/app.js)')] }),
        new Paragraph({
            spacing: { after: 120 },
            children: [
                new TextRun('The frontend registration validation rules and server post requests implemented in public/app.js:')
            ]
        }),
        ...createCodeBlock(`
// app.js client authentication
async function handleEmailAuth() {
    const email = document.getElementById('authEmail').value.trim();
    const password = document.getElementById('authPassword').value;
    const name = document.getElementById('authName').value.trim();

    if (authMode === 'signup') {
        if (!email.includes('@')) { showAuthError('Invalid email format.'); return; }
        if (name.length < 3) { showAuthError('Username must be 3+ chars.'); return; }
        if (password.length < 6) { showAuthError('Password must be 6+ chars.'); return; }
    }
    // API Fetch request omitted for brevity...
}
`),

        new Paragraph({ children: [new PageBreak()] }),

        // 4. Seeded Credentials
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('4. Credentials Table')] }),
        new Paragraph({
            spacing: { after: 120 },
            children: [
                new TextRun('The following credentials table provides accounts seeded into the database, plus the new user account created to showcase registration:')
            ]
        }),
        credTable,

        // 5. GitHub Repository & Local Setup
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('5. GitHub Repository & Local Setup')] }),
        new Paragraph({
            numbering: { reference: 'bullet-list', level: 0 },
            children: [new TextRun('Repository URL: https://github.com/Denzils-repo/FSD_LAB')]
        }),
        new Paragraph({
            numbering: { reference: 'bullet-list', level: 0 },
            children: [new TextRun('Start Express Server: Navigate to lab_exercises/week4/server and run `npm start`')]
        }),
        new Paragraph({
            numbering: { reference: 'bullet-list', level: 0 },
            children: [new TextRun('Launch Page: Open http://localhost:5000/home.html in your browser')]
        }),

        // 6. AI Usage Declaration
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('6. AI Usage Declaration')] }),
        aiTable,

        // 7. Reflections
        new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('7. Reflections')] }),
        new Paragraph({
            children: [
                new TextRun('Transitioning from a cloud-first Firebase authentication schema to a local Node.js + Express setup highlighted the fundamental principles of backend integration. Decoupling authentication logic from specific SDKs and handling standard HTTP requests to local SQLite tables makes the platform highly portable and enables fully offline staging environments. The implementation of input validators on both the client and server levels prevents corrupt states and duplicate records.')
            ]
        })
    ]
});

// Write to document buffer
Packer.toBuffer(doc).then(buffer => {
    fs.writeFileSync('doc.docx', buffer);
    console.log('Document created successfully: doc.docx');
}).catch(err => {
    console.error('Error creating document:', err);
});
