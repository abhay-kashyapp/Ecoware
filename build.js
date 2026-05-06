const fs = require('fs');

console.log('Building static HTML for Vercel...');

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

    // Combine into final index.html
    const finalHtml = headerContent + content + footerContent;

    fs.writeFileSync('./index.html', finalHtml, 'utf8');
    console.log('Successfully generated index.html');
} catch (error) {
    console.error('Error during build:', error);
    process.exit(1);
}
