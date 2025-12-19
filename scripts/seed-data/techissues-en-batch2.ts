// English Tech Issues - Batch 2 (Articles 11-20)
export const techissuesEnBatch2 = [
    {
        title: 'How to Fix Stuck Windows Updates',
        slug: 'fix-stuck-windows-updates-en',
        tags: ['Windows Update', 'Stuck', 'Pending', 'Update', 'Troubleshooting'],
        excerpt: 'Solutions for Windows updates that hang or fail during installation.',
        content: `<h2>Wait Before Acting</h2>
<p>Large updates can take hours. Wait at least an hour before considering an update stuck. Don't interrupt unless absolutely necessary.</p>

<h2>Run Update Troubleshooter</h2>
<p>Settings > Update & Security > Troubleshoot > Windows Update. Microsoft's tool resolves common update problems automatically.</p>

<h2>Reset Update Components</h2>
<p>Stop services: wuauserv, bits, cryptsvc. Delete SoftwareDistribution and catroot2 folder contents. Restart services and try again.</p>

<h2>Clear Windows Update Cache</h2>
<p>Navigate to C:\Windows\SoftwareDistribution\Download. Delete all contents. This forces re-download of update files.</p>

<h2>Free Up Disk Space</h2>
<p>Updates require significant free space. Clear temporary files, empty Recycle Bin. At least 20GB free is recommended.</p>

<h2>Manually Download Updates</h2>
<p>Find the KB number in Update History. Download from Microsoft Update Catalog. Install manually to bypass issues.</p>

<h2>Conclusion</h2>
<p>The troubleshooter resolves most issues. Resetting components works for persistent problems. Manual installation is a reliable fallback.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=800&q=80',
        readingTime: 7,
    },
    {
        title: 'Fixing Slow Internet Speed',
        slug: 'fix-slow-internet-speed-en',
        tags: ['Internet', 'Speed', 'WiFi', 'Router', 'Network'],
        excerpt: 'Troubleshoot and improve slow internet connection speeds.',
        content: `<h2>Test Your Actual Speed</h2>
<p>Use speedtest.net to measure real speeds. Compare with your plan. If dramatically different, there's a problem to solve.</p>

<h2>Restart Your Router</h2>
<p>The simplest and most effective fix. Unplug for 30 seconds and restart. Clears memory and refreshes connections.</p>

<h2>Change WiFi Channel</h2>
<p>Access router settings (usually 192.168.1.1). Change WiFi channel to avoid neighbor interference. 5GHz band typically has less congestion.</p>

<h2>Use Ethernet Connection</h2>
<p>Wired connections are faster and more reliable. For important work or gaming, use Ethernet. Tests if the issue is WiFi-specific.</p>

<h2>Check for Background Downloads</h2>
<p>Other devices or apps consuming bandwidth. Check for large updates downloading. Streaming on multiple devices impacts speed.</p>

<h2>Update Router Firmware</h2>
<p>Outdated firmware affects performance. Check manufacturer website for updates. New firmware often improves speed and stability.</p>

<h2>Conclusion</h2>
<p>Router restarts and channel changes help most cases. If problems persist, contact your ISP—the issue may be on their end.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
        readingTime: 7,
    },
    {
        title: 'Battery Draining Fast - Quick Fixes',
        slug: 'fix-battery-draining-fast-en',
        tags: ['Battery', 'Power', 'Phone', 'Battery Life', 'Android'],
        excerpt: 'Solutions for smartphones with rapidly draining batteries.',
        content: `<h2>Check Battery Usage</h2>
<p>Settings > Battery > Usage shows consumption by app. Identify which apps drain the most. Address the biggest consumers first.</p>

<h2>Restrict Background Apps</h2>
<p>Many apps run unnecessarily in the background. Limit background activity in app settings. Social media apps are common offenders.</p>

<h2>Lower Screen Brightness</h2>
<p>Display is the biggest battery consumer. Use auto-brightness or manually reduce levels. Every bit of brightness reduction helps.</p>

<h2>Disable Unnecessary Features</h2>
<p>Turn off WiFi, Bluetooth, GPS when not needed. Location services are particularly power-hungry. Enable only when necessary.</p>

<h2>Update Apps and System</h2>
<p>Outdated software may contain battery bugs. Keep everything updated for optimization improvements.</p>

<h2>Check Battery Health</h2>
<p>iPhone: Settings > Battery > Battery Health. Batteries degrade over time. Under 80% capacity indicates replacement need.</p>

<h2>Conclusion</h2>
<p>Screen and background apps consume most power. If battery health is poor, replacement is the only permanent solution.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'Printer Problems and Solutions',
        slug: 'fix-printer-problems-en',
        tags: ['Printer', 'Printing', 'Windows', 'USB', 'WiFi'],
        excerpt: 'Comprehensive troubleshooting guide for common printer issues.',
        content: `<h2>Check Connections</h2>
<p>For USB: verify cable is secure at both ends. For wireless: confirm printer is on the same network. Basic connectivity solves many issues.</p>

<h2>Restart Print Spooler</h2>
<p>Press Win+R, type services.msc. Find Print Spooler, right-click and Restart. Clears stuck print jobs.</p>

<h2>Clear Print Queue</h2>
<p>Settings > Printers & scanners > select printer > Open queue. Cancel all documents. Stuck jobs prevent new printing.</p>

<h2>Remove and Re-add Printer</h2>
<p>Settings > Printers & scanners > remove the printer. Add it again. Fresh installation resolves configuration issues.</p>

<h2>Update Printer Drivers</h2>
<p>Download latest drivers from manufacturer website. Old drivers cause compatibility issues with new Windows versions.</p>

<h2>Set as Default Printer</h2>
<p>Right-click printer > Set as default. Windows sometimes prints to wrong device. Verify correct selection before printing.</p>

<h2>Conclusion</h2>
<p>Print Spooler issues are extremely common. Re-adding the printer with fresh drivers resolves most persistent problems.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'Black Screen on Windows - Fixes',
        slug: 'fix-black-screen-windows-en',
        tags: ['Black Screen', 'Windows', 'Boot', 'Display', 'Troubleshooting'],
        excerpt: 'How to fix Windows black screen issues at startup or after login.',
        content: `<h2>Types of Black Screen</h2>
<p>Before Windows loads: likely hardware issue. After Windows logo: driver problem. After login: Explorer crash. Identify the type first.</p>

<h2>Check Display Connections</h2>
<p>Ensure monitor cables are secure. Try different cable or port on graphics card. Test with different monitor if available.</p>

<h2>Boot into Safe Mode</h2>
<p>Force shutdown 3 times to trigger recovery. Choose Safe Mode from Advanced options. If Safe Mode works, it's likely a driver issue.</p>

<h2>Run Explorer Manually</h2>
<p>Press Ctrl+Shift+Esc for Task Manager. File > Run new task > type "explorer.exe". This can restore the desktop.</p>

<h2>Uninstall Display Driver</h2>
<p>In Safe Mode, open Device Manager. Uninstall graphics driver. Restart to let Windows install basic driver.</p>

<h2>System Restore</h2>
<p>From Advanced Recovery, select System Restore. Choose a point before problems began. Reverts system changes.</p>

<h2>Conclusion</h2>
<p>Most black screens are driver-related. Safe Mode is your friend for troubleshooting. Graphics driver updates often resolve issues.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
        readingTime: 7,
    },
    {
        title: 'Computer Won\'t Boot - Fix Guide',
        slug: 'computer-wont-boot-fix-en',
        tags: ['Boot', 'Startup', 'Windows', 'BIOS', 'Hardware'],
        excerpt: 'Step-by-step troubleshooting when your computer refuses to start.',
        content: `<h2>Identify the Problem</h2>
<p>Nothing happens at all: power issue. Fans spin but no display: hardware issue. Stops at logo: system issue. Diagnosis guides your approach.</p>

<h2>Check Power Supply</h2>
<p>Verify wall outlet works. Check power cables are connected. Look for PSU switch position. Try different power cable.</p>

<h2>Remove External Devices</h2>
<p>Computer might try booting from USB device. Remove all USB devices and external drives. Try starting again.</p>

<h2>Access BIOS</h2>
<p>Press Del or F2 during startup. Verify boot drive is detected. Check boot order settings. Reset to defaults if uncertain.</p>

<h2>Run Startup Repair</h2>
<p>Boot from Windows USB. Choose Repair your computer > Startup Repair. Fixes boot configuration automatically.</p>

<h2>Rebuild Boot Configuration</h2>
<p>From Recovery Command Prompt: bootrec /fixmbr, bootrec /fixboot, bootrec /rebuildbcd. Repairs Windows boot loader.</p>

<h2>Conclusion</h2>
<p>Startup Repair solves most boot issues. Hardware problems require physical inspection or professional diagnosis.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
        readingTime: 8,
    },
    {
        title: 'Fixing Chrome and Browser Issues',
        slug: 'fix-chrome-browser-issues-en',
        tags: ['Chrome', 'Browser', 'Slow', 'Crash', 'Extensions'],
        excerpt: 'Solutions for Chrome problems from slowness to crashes and errors.',
        content: `<h2>Clear Cache and Cookies</h2>
<p>Ctrl+Shift+Delete > select All time > Clear data. Removes accumulated files causing issues. Do this periodically for smooth browsing.</p>

<h2>Disable Extensions</h2>
<p>Extensions commonly cause problems. Type chrome://extensions and disable all. Re-enable one by one to find the culprit.</p>

<h2>Update Chrome</h2>
<p>Menu > Help > About Chrome. Updates install automatically. Outdated versions have bugs and security issues.</p>

<h2>Reset Chrome Settings</h2>
<p>Settings > Reset settings > Restore to defaults. Returns everything to factory state. You'll need to reconfigure preferences.</p>

<h2>Create New Profile</h2>
<p>Corrupted profiles cause persistent issues. Create new user in Chrome. If new profile works, migrate data gradually.</p>

<h2>Reinstall Chrome</h2>
<p>As last resort, completely uninstall Chrome. Delete remaining data in User Data folder. Install fresh from google.com/chrome.</p>

<h2>Conclusion</h2>
<p>Cache clearing and extension management resolve most Chrome issues. The browser is generally reliable—problems usually come from additions.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'Mouse Not Working - Troubleshooting',
        slug: 'fix-mouse-not-working-en',
        tags: ['Mouse', 'USB', 'Bluetooth', 'Input', 'Hardware'],
        excerpt: 'Fix mouse problems from complete failure to erratic behavior.',
        content: `<h2>Try Different USB Port</h2>
<p>Simple first test. USB ports can fail. Try different ports, preferably on the back of desktop computers.</p>

<h2>Test on Another Computer</h2>
<p>Determines if mouse or computer is the problem. Working elsewhere means computer issue. Not working means mouse issue.</p>

<h2>For Wireless Mouse</h2>
<p>Check batteries first—most common cause. Re-pair the USB receiver. Keep receiver close to mouse to avoid interference.</p>

<h2>For Bluetooth Mouse</h2>
<p>Toggle Bluetooth off and on. Remove mouse and pair again. Check if Bluetooth adapter is working.</p>

<h2>Update Mouse Driver</h2>
<p>Device Manager > Mice and pointing devices > Update driver. Or uninstall and restart for automatic reinstallation.</p>

<h2>Clean the Mouse</h2>
<p>Optical sensors get dusty. Clean the bottom lens carefully. Ensure the surface you're using works with the sensor type.</p>

<h2>Conclusion</h2>
<p>Port changes and batteries solve most issues. Wireless mice are more prone to problems than wired ones.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'Keyboard Not Working - Solutions',
        slug: 'fix-keyboard-not-working-en',
        tags: ['Keyboard', 'USB', 'Input', 'Driver', 'Hardware'],
        excerpt: 'Fix keyboard issues from complete failure to specific keys not responding.',
        content: `<h2>For Wired Keyboards</h2>
<p>Try different USB port. Test keyboard on another computer. Check for visible cable damage.</p>

<h2>For Wireless Keyboards</h2>
<p>Replace batteries even if "new." Re-connect the USB receiver. Check receiver isn't blocked by metal objects.</p>

<h2>Clean the Keyboard</h2>
<p>Dust and debris cause keys to stick. Turn keyboard upside down and shake. Use compressed air between keys.</p>

<h2>Check Filter Keys</h2>
<p>Settings > Accessibility > Keyboard. Disable Filter Keys and Sticky Keys. These can cause unexpected behavior.</p>

<h2>Update Keyboard Driver</h2>
<p>Device Manager > Keyboards > Update driver. Or uninstall and restart for fresh installation.</p>

<h2>Try On-Screen Keyboard</h2>
<p>Search for "On-Screen Keyboard" as temporary solution. Helps navigate while troubleshooting physical keyboard.</p>

<h2>Conclusion</h2>
<p>Batteries and cleaning resolve most issues. If specific keys don't work after cleaning, the keyboard may need replacement.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'Fixing iCloud Sync Problems',
        slug: 'fix-icloud-sync-problems-en',
        tags: ['iCloud', 'Apple', 'Sync', 'iPhone', 'Mac'],
        excerpt: 'Solutions for iCloud sync failures and missing data across devices.',
        content: `<h2>Check iCloud Status</h2>
<p>Visit apple.com/support/systemstatus first. Apple service outages happen. If status shows issues, wait for Apple to fix.</p>

<h2>Sign Out and Back In</h2>
<p>Settings > [Your Name] > Sign Out. Wait a minute, then sign back in. Refreshes the connection completely.</p>

<h2>Check Internet Connection</h2>
<p>iCloud needs stable internet. WiFi is better than cellular for syncing. Verify connection is working properly.</p>

<h2>Toggle Sync Settings</h2>
<p>Settings > [Your Name] > iCloud. Toggle off the problematic service. Wait, then toggle back on.</p>

<h2>Check Storage Space</h2>
<p>Settings > [Your Name] > iCloud > Manage Storage. Full storage stops syncing. Delete files or upgrade storage.</p>

<h2>Update All Devices</h2>
<p>Ensure iOS and macOS are updated on all devices. Version mismatches can cause sync issues.</p>

<h2>Conclusion</h2>
<p>Sign out/in resolves most sync issues. Full storage is a common but overlooked cause. Check Apple's status page first.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=800&q=80',
        readingTime: 6,
    },
];
