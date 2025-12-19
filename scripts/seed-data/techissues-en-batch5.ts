// English Tech Issues - Batch 5 (Articles 41-50) - FINAL
export const techissuesEnBatch5 = [
    {
        title: 'Face ID Not Working - Fixes',
        slug: 'fix-face-id-not-working-en',
        tags: ['Face ID', 'iPhone', 'Biometric', 'Security', 'Apple'],
        excerpt: 'Troubleshoot and resolve Face ID recognition failures on iPhone.',
        content: `<h2>Clean TrueDepth Camera</h2>
<p>Wipe the front camera area with a soft cloth. Dirt and smudges interfere with sensors. Remove screen protectors temporarily to test.</p>

<h2>Don't Cover Sensors</h2>
<p>Ensure face and TrueDepth camera are unobstructed. Cases or accessories may block sensors. Remove and test.</p>

<h2>Re-setup Face ID</h2>
<p>Settings > Face ID & Passcode > Reset Face ID. Register your face again in good lighting. Keep face centered during setup.</p>

<h2>Set Up Alternate Appearance</h2>
<p>Face ID allows alternate appearance. For glasses or significant changes. Improves recognition in different looks.</p>

<h2>Restart iPhone</h2>
<p>Force restart may resolve temporary issues. Especially after iOS updates.</p>

<h2>Update iOS</h2>
<p>Apple improves Face ID regularly. Updates may fix recognition issues.</p>

<h2>Conclusion</h2>
<p>Re-setting up Face ID resolves most problems. If error messages appear, hardware repair may be needed.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'RAM Not Running at Full Capacity',
        slug: 'fix-ram-not-full-capacity-en',
        tags: ['RAM', 'Memory', 'Windows', 'BIOS', 'Hardware'],
        excerpt: 'Fix system showing less RAM than installed.',
        content: `<h2>Check Task Manager</h2>
<p>Ctrl+Shift+Esc > Performance > Memory. How much is "Hardware Reserved"? Large amounts indicate configuration issues.</p>

<h2>Check msconfig</h2>
<p>Type msconfig in Run. Boot > Advanced > Ensure "Maximum memory" is unchecked. This setting can artificially limit RAM.</p>

<h2>Verify Windows Architecture</h2>
<p>32-bit Windows only supports 4GB maximum. Confirm you're running 64-bit for full RAM access.</p>

<h2>BIOS Settings</h2>
<p>Check all RAM sticks appear in BIOS. Enable Memory Remap Feature if available. Consult motherboard manual.</p>

<h2>Reseat RAM Modules</h2>
<p>Turn off and unplug computer. Remove and reinstall RAM firmly. Listen for the click indicating proper seating.</p>

<h2>Test Individual Sticks</h2>
<p>Boot with one RAM stick at a time. Test each individually. Identifies if specific module is faulty.</p>

<h2>Conclusion</h2>
<p>msconfig and BIOS are common causes. Improper seating or faulty modules require physical attention.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&q=80',
        readingTime: 7,
    },
    {
        title: 'Apps Not Downloading - Solutions',
        slug: 'fix-apps-not-downloading-en',
        tags: ['Download', 'App Store', 'Play Store', 'Apps', 'Internet'],
        excerpt: 'Fix app download failures on iOS and Android devices.',
        content: `<h2>Check Internet Connection</h2>
<p>Downloads require stable internet. Try WiFi instead of mobile data. Or vice versa to test.</p>

<h2>Pause and Resume</h2>
<p>In the store, pause the download and tap again. Restarts the process. Simple solution that often works.</p>

<h2>Check Available Storage</h2>
<p>Apps need space to download and install. Free up storage if nearly full.</p>

<h2>Clear Store Cache</h2>
<p>Android: Settings > Apps > Play Store > Clear cache. iOS: Sign out and back into App Store.</p>

<h2>Check Date and Time</h2>
<p>Wrong date/time causes download failures. Enable automatic date and time.</p>

<h2>Restart Device</h2>
<p>Temporary system glitch. Restart and try downloading again.</p>

<h2>Conclusion</h2>
<p>Storage and connection are most common issues. Clearing store cache resolves many failures.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'AirDrop Not Working - How to Fix',
        slug: 'fix-airdrop-not-working-en',
        tags: ['AirDrop', 'Apple', 'Sharing', 'iPhone', 'Mac'],
        excerpt: 'Troubleshoot AirDrop discovery and transfer failures.',
        content: `<h2>Enable AirDrop</h2>
<p>Control Center > AirDrop > Everyone or Contacts Only. Verify enabled on both devices.</p>

<h2>WiFi and Bluetooth</h2>
<p>AirDrop requires both enabled. Turn on WiFi and Bluetooth on both devices. Don't need WiFi connection, just enabled.</p>

<h2>Disable Personal Hotspot</h2>
<p>Personal Hotspot interferes with AirDrop. Disable temporarily to test.</p>

<h2>Bring Devices Closer</h2>
<p>AirDrop has limited range. Maximum about 9 meters. Move devices closer together.</p>

<h2>Toggle Airplane Mode</h2>
<p>Turn Airplane Mode on then off. Resets WiFi and Bluetooth. Then try AirDrop again.</p>

<h2>Sign into iCloud</h2>
<p>Ensure signed into iCloud on both devices. AirDrop to Contacts Only requires iCloud.</p>

<h2>Conclusion</h2>
<p>Setting AirDrop to Everyone bypasses most issues. WiFi and Bluetooth must be on. Personal Hotspot is a common problem.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1491933382434-500287f9b54b?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'Slow SSD Performance - Fixes',
        slug: 'fix-slow-ssd-performance-en',
        tags: ['SSD', 'Speed', 'Performance', 'TRIM', 'Windows'],
        excerpt: 'Restore SSD speed when it becomes slower than expected.',
        content: `<h2>Check Free Space</h2>
<p>SSDs slow down when over 75% full. Free up space for better performance. Aim for at least 20% free.</p>

<h2>Enable TRIM</h2>
<p>Command Prompt as Administrator: "fsutil behavior query DisableDeleteNotify". If 1, TRIM is disabled. Enable it for optimal SSD performance.</p>

<h2>Update Firmware</h2>
<p>Visit SSD manufacturer website. Download firmware update tool. Updates improve performance and fix issues.</p>

<h2>Check AHCI Mode</h2>
<p>In BIOS, ensure SATA mode is AHCI not IDE. IDE mode is slower and doesn't support TRIM.</p>

<h2>Disable Defragmentation</h2>
<p>Defrag harms SSDs. Windows 10/11 uses TRIM instead. Verify SSD is recognized as SSD in Optimize Drives.</p>

<h2>Check SSD Health</h2>
<p>Use CrystalDiskInfo to check SSD health. "Caution" or "Bad" status indicates replacement needed.</p>

<h2>Conclusion</h2>
<p>Free space is the biggest factor. TRIM and AHCI are essential settings. Monitor health for early warning signs.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&q=80',
        readingTime: 7,
    },
    {
        title: 'Video Export and Render Failures',
        slug: 'fix-video-export-render-failures-en',
        tags: ['Video', 'Export', 'Premiere', 'Render', 'Editing'],
        excerpt: 'Resolve video rendering and export problems in editing software.',
        content: `<h2>Check Disk Space</h2>
<p>Exports need significant free space. Ensure output drive has room. Roughly 2x the expected file size.</p>

<h2>Update Software</h2>
<p>Premiere Pro, DaVinci, and others receive bug fix updates. Ensure latest version installed.</p>

<h2>Update GPU Driver</h2>
<p>Exports heavily use GPU. Update graphics driver. Studio Drivers may be more stable than Game Ready.</p>

<h2>Lower Export Settings</h2>
<p>Try lower bitrate or different codec. H.265 is slower than H.264. ProRes is fast but creates larger files.</p>

<h2>Render Problem Sections</h2>
<p>If export fails at specific point, render that section first. May be corrupted clip.</p>

<h2>Close Other Applications</h2>
<p>Exporting uses all system resources. Close browsers and other applications. Let system focus on export.</p>

<h2>Conclusion</h2>
<p>Space and GPU driver are key factors. Corrupt clips cause failures at specific points.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80',
        readingTime: 7,
    },
    {
        title: 'Windows Defender Won\'t Turn On',
        slug: 'fix-windows-defender-disabled-en',
        tags: ['Defender', 'Security', 'Windows', 'Antivirus', 'Protection'],
        excerpt: 'Fix Windows Defender when it stays disabled or won\'t enable.',
        content: `<h2>Check for Other Antivirus</h2>
<p>Defender automatically disables when third-party antivirus is installed. This is normal behavior. Choose one or the other.</p>

<h2>Enable from Settings</h2>
<p>Settings > Privacy & Security > Windows Security > Virus protection. Turn on Real-time protection.</p>

<h2>Check Group Policy</h2>
<p>Type gpedit.msc in Run. Computer Configuration > Administrative Templates > Windows Defender. Ensure "Turn off Windows Defender" is Not Configured.</p>

<h2>Check Registry</h2>
<p>HKEY_LOCAL_MACHINE > SOFTWARE > Policies > Microsoft > Windows Defender. Delete DisableAntiSpyware key if present.</p>

<h2>Run SFC and DISM</h2>
<p>Command Prompt as Administrator: "sfc /scannow" then "DISM /Online /Cleanup-Image /RestoreHealth". Repairs corrupted system files.</p>

<h2>Windows Update</h2>
<p>Defender updates come via Windows Update. Install all pending updates.</p>

<h2>Conclusion</h2>
<p>Third-party antivirus is the most common cause. Group Policy and Registry for advanced cases.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
        readingTime: 7,
    },
    {
        title: 'Missing Device Drivers - How to Find',
        slug: 'fix-missing-device-drivers-en',
        tags: ['Driver', 'Device Manager', 'Windows', 'Hardware', 'Installation'],
        excerpt: 'Find and install missing device drivers for unknown hardware.',
        content: `<h2>Windows Update for Drivers</h2>
<p>Settings > Windows Update. Many drivers install automatically through Windows Update.</p>

<h2>Device Manager Update</h2>
<p>Right-click unknown device with exclamation mark. Update driver > Search automatically. Windows may find the driver.</p>

<h2>Manufacturer Website</h2>
<p>Visit Dell, HP, Lenovo, or motherboard manufacturer. Enter your model number. Download appropriate drivers.</p>

<h2>Identify Unknown Device</h2>
<p>In Device Manager, right-click > Properties > Details > Hardware IDs. Search the ID in Google to identify the device.</p>

<h2>Driver Update Tools</h2>
<p>Tools like Driver Booster can find drivers. Use reputable software only. Be cautious of less known tools.</p>

<h2>Reinstall Device</h2>
<p>Uninstall device then Scan for hardware changes. Windows may reinstall with correct driver.</p>

<h2>Conclusion</h2>
<p>Windows Update solves many cases. Manufacturer websites are the most reliable source.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'Computer Random Restart Issues',
        slug: 'fix-computer-random-restart-en',
        tags: ['Restart', 'Crash', 'BSOD', 'Windows', 'Hardware'],
        excerpt: 'Diagnose and fix unexpected automatic computer restarts.',
        content: `<h2>Disable Automatic Restart</h2>
<p>System > Advanced > Startup and Recovery > Settings. Uncheck "Automatically restart". You'll see BSOD error instead of restart.</p>

<h2>Check Event Viewer</h2>
<p>Type eventvwr in Run. Windows Logs > System. Look for Critical errors near restart time. Reveals the cause.</p>

<h2>Monitor Temperature</h2>
<p>Overheating causes protective restart. Use HWiNFO to monitor temps. Clean cooling system if temps are high.</p>

<h2>Test Power Supply</h2>
<p>Failing or undersized PSU causes restarts. Especially under load. Try different PSU if possible.</p>

<h2>Test RAM</h2>
<p>Run Windows Memory Diagnostic. Faulty RAM causes random restarts. Replace failing modules.</p>

<h2>Update Drivers</h2>
<p>Bad drivers cause BSOD leading to restart. Update graphics driver especially.</p>

<h2>Conclusion</h2>
<p>Disabling automatic restart shows the real error. Temperature, RAM, and PSU are common hardware causes.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80',
        readingTime: 7,
    },
    {
        title: 'Brightness Control Not Working',
        slug: 'fix-brightness-control-not-working-en',
        tags: ['Brightness', 'Display', 'Screen', 'Windows', 'Laptop'],
        excerpt: 'Fix screen brightness adjustment failures on laptops.',
        content: `<h2>Update Display Driver</h2>
<p>Device Manager > Monitors > Generic PnP Monitor. Update driver. Generic drivers may not support brightness.</p>

<h2>Update GPU Driver</h2>
<p>Graphics driver often controls brightness. Update from NVIDIA, AMD, or Intel website.</p>

<h2>Check Function Keys</h2>
<p>Laptop brightness uses Fn + keys. May need function key driver from laptop manufacturer website.</p>

<h2>Disable Adaptive Brightness</h2>
<p>Power Options > Change plan settings > Advanced > Display. Disable Adaptive brightness. May interfere with manual control.</p>

<h2>Registry Fix</h2>
<p>HKEY_LOCAL_MACHINE > SYSTEM > ControlSet001 > Control > Class. Find FeatureTestControl and set to 0.</p>

<h2>External Monitor</h2>
<p>External monitors may not support Windows brightness control. Use monitor's own buttons instead.</p>

<h2>Conclusion</h2>
<p>Display and GPU drivers are the main causes. Function keys need manufacturer drivers. External monitors require their own controls.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1616763355603-9755a640a287?w=800&q=80',
        readingTime: 6,
    },
];
