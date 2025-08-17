const fs = require('fs');
const path = require('path');

// Clean up function
function cleanBuild() {
  console.log('🧹 Cleaning build artifacts...');
  
  // Remove dist folder if it exists
  const distPath = path.join(__dirname, 'dist');
  if (fs.existsSync(distPath)) {
    fs.rmSync(distPath, { recursive: true, force: true });
    console.log('✅ Removed dist folder');
  }
  
  // Remove node_modules if it exists (will be reinstalled)
  const nodeModulesPath = path.join(__dirname, 'node_modules');
  if (fs.existsSync(nodeModulesPath)) {
    fs.rmSync(nodeModulesPath, { recursive: true, force: true });
    console.log('✅ Removed node_modules folder');
  }
  
  // Remove package-lock.json if it exists
  const packageLockPath = path.join(__dirname, 'package-lock.json');
  if (fs.existsSync(packageLockPath)) {
    fs.unlinkSync(packageLockPath);
    console.log('✅ Removed package-lock.json');
  }
  
  console.log('🎉 Cleanup completed!');
  console.log('📝 Next steps:');
  console.log('1. Run: npm install');
  console.log('2. Run: npm run build');
  console.log('3. Deploy to Netlify');
}

cleanBuild();
