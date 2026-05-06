const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.php';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.svg': 'image/svg+xml'
    };

    let contentType = mimeTypes[extname] || 'application/octet-stream';

    // Emulate PHP behavior for index.php
    if (filePath === './index.php') {
        contentType = 'text/html';
        try {
            const header = fs.readFileSync('./includes/header.php', 'utf8');
            const footer = fs.readFileSync('./includes/footer.php', 'utf8');
            let content = fs.readFileSync('./index.php', 'utf8');

            // Strip <?php ... ?> tags
            content = content.replace(/<\?php[\s\S]*?\?>/g, '');
            let headerContent = header.replace(/<\?php[\s\S]*?\?>/g, '');
            let footerContent = footer.replace(/<\?php[\s\S]*?\?>/g, '');
            
            // Replace dynamic year in footer
            footerContent = footerContent.replace('<?php echo date("Y"); ?>', new Date().getFullYear());

            const finalHtml = headerContent + content + footerContent;

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(finalHtml, 'utf-8');
        } catch (error) {
            res.writeHead(500);
            res.end(`Sorry, check with the site admin for error: ${error.code} ..\n`);
        }
    } else {
        // Serve static files
        fs.readFile(filePath, (error, content) => {
            if (error) {
                if (error.code == 'ENOENT') {
                    res.writeHead(404);
                    res.end('File not found');
                } else {
                    res.writeHead(500);
                    res.end(`Sorry, check with the site admin for error: ${error.code} ..\n`);
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
