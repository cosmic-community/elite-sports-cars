const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

async function injectConsoleScript() {
  try {
    // Find all HTML files in the build output
    const htmlFiles = await glob('**/*.html', {
      cwd: path.join(process.cwd(), '.next'),
      absolute: true
    });

    const scriptTag = '<script src="/dashboard-console-capture.js"></script>';
    
    for (const filePath of htmlFiles) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Only inject if not already present and has a head tag
      if (!content.includes('/dashboard-console-capture.js') && content.includes('<head>')) {
        content = content.replace('<head>', `<head>${scriptTag}`);
        fs.writeFileSync(filePath, content);
        console.log(`✅ Injected console capture script into ${path.relative(process.cwd(), filePath)}`);
      }
    }
    
    console.log(`🎉 Console capture script injection complete. Processed ${htmlFiles.length} files.`);
  } catch (error) {
    console.error('❌ Error injecting console capture script:', error);
    process.exit(1);
  }
}

// Run the injection
injectConsoleScript();