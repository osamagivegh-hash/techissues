// English Tech Issues - Batch 3 (Articles 21-30)
export const techissuesEnBatch3 = [
    {
        title: 'Fixing Computer Freezing Issues',
        slug: 'fix-computer-freezing-en',
        tags: ['Freeze', 'Hang', 'Performance', 'Windows', 'RAM'],
        excerpt: 'Troubleshoot and resolve computer freezing and unresponsiveness.',
        content: `<h2>Check Task Manager</h2>
<p>Press Ctrl+Shift+Esc. Monitor CPU, RAM, and Disk usage. At 100% indicates the bottleneck. Close the offending application.</p>

<h2>Monitor Temperature</h2>
<p>Overheating causes freezing. Use HWiNFO to check temperatures. CPUs throttle and freeze at high temps. Clean cooling system if needed.</p>

<h2>Test RAM</h2>
<p>Search for Windows Memory Diagnostic. Restart to run the test. Faulty RAM is a common freeze cause. Replace failing modules.</p>

<h2>Check Hard Drive</h2>
<p>Open Command Prompt as Administrator. Run "chkdsk C: /f /r". Scans and repairs disk errors on restart.</p>

<h2>Update Drivers</h2>
<p>Outdated or corrupt drivers cause freezes. Graphics drivers are common culprits. Update from manufacturer websites.</p>

<h2>Scan for Malware</h2>
<p>Run full Windows Security scan. Follow with Malwarebytes scan. Malware consumes resources causing freezes.</p>

<h2>Conclusion</h2>
<p>Monitor resources to identify the cause. Temperature and RAM are common hardware causes. Regular maintenance prevents freezing.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1537498425277-c283d32ef9db?w=800&q=80',
        readingTime: 7,
    },
    {
        title: 'Hard Drive Full - How to Free Space',
        slug: 'hard-drive-full-free-space-en',
        tags: ['Storage', 'Disk Space', 'Cleanup', 'Hard Drive', 'Windows'],
        excerpt: 'Effective methods to free up storage space on your hard drive.',
        content: `<h2>Run Disk Cleanup</h2>
<p>Search for Disk Cleanup. Select drive C. Check all options and clean. Click "Clean up system files" for more space.</p>

<h2>Uninstall Unused Programs</h2>
<p>Settings > Apps > Installed apps. Sort by size. Remove applications you no longer use. This often frees significant space.</p>

<h2>Clear Downloads Folder</h2>
<p>The Downloads folder accumulates forgotten files. Sort by date and delete old items. Move important files elsewhere first.</p>

<h2>Enable Storage Sense</h2>
<p>Settings > System > Storage > Storage Sense. Enable automatic cleanup. Deletes temporary files periodically.</p>

<h2>Move Files to Cloud</h2>
<p>OneDrive and Google Drive free local space. Enable Files On-Demand for automatic optimization. Keep files accessible without local storage.</p>

<h2>Analyze with WinDirStat</h2>
<p>Free tool visualizes disk usage. Shows exactly what consumes space. Helps identify large files to delete or move.</p>

<h2>Conclusion</h2>
<p>Disk Cleanup and uninstalling programs are the quickest wins. For long-term solutions, consider larger storage or cloud solutions.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'Android Apps Crashing - Fixes',
        slug: 'fix-android-apps-crashing-en',
        tags: ['Android', 'Apps', 'Crash', 'Force Close', 'Troubleshooting'],
        excerpt: 'Solutions for Android apps that keep crashing or force closing.',
        content: `<h2>Restart Your Phone</h2>
<p>Simple but effective. Restart clears memory and stops problematic processes. Try this first before other solutions.</p>

<h2>Clear App Cache</h2>
<p>Settings > Apps > [App name] > Storage > Clear Cache. Removes temporary data causing issues. Doesn't delete your data.</p>

<h2>Update the App</h2>
<p>Open Play Store. Check for pending updates. Developers fix crash bugs in updates. Keep apps current.</p>

<h2>Update Android</h2>
<p>Settings > System > Software Update. System updates improve app compatibility. Old OS versions cause issues.</p>

<h2>Reinstall the App</h2>
<p>Uninstall and reinstall from Play Store. Fresh installation often resolves persistent problems. You may lose app data.</p>

<h2>Check Storage and RAM</h2>
<p>Low storage causes crashes. Free up space if nearly full. Close other apps to free memory.</p>

<h2>Conclusion</h2>
<p>Clearing cache solves most crashes. If problems persist, reinstallation is reliable. Check for app-specific issues online.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'Camera Not Working - Quick Fixes',
        slug: 'fix-camera-not-working-en',
        tags: ['Camera', 'Webcam', 'Video', 'Windows', 'Permissions'],
        excerpt: 'Troubleshoot camera and webcam issues on computers and phones.',
        content: `<h2>Check Camera Privacy Settings</h2>
<p>Settings > Privacy > Camera. Ensure camera access is enabled. Verify the specific app has permission to use camera.</p>

<h2>Another App Using Camera</h2>
<p>Only one app can use camera at a time. Close Zoom, Skype, and similar apps. Try your camera app again.</p>

<h2>Update Camera Driver</h2>
<p>Device Manager > Cameras > Update driver. Or uninstall and restart for automatic reinstallation.</p>

<h2>Run Camera Troubleshooter</h2>
<p>Settings > System > Troubleshoot > Camera. Windows attempts automatic diagnosis and repair.</p>

<h2>Check Physical Camera</h2>
<p>For external webcams: try different USB port. Check cable connections. Test on another computer.</p>

<h2>Check Antivirus Software</h2>
<p>Some security software blocks camera access. Check antivirus settings. Add exception for camera or specific apps.</p>

<h2>Conclusion</h2>
<p>Privacy settings are the most common cause. Check permissions first. Another app using camera is frequently overlooked.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'VPN Not Connecting - Solutions',
        slug: 'fix-vpn-not-connecting-en',
        tags: ['VPN', 'Connection', 'Network', 'Security', 'Settings'],
        excerpt: 'Fix VPN connection failures and common error messages.',
        content: `<h2>Try Different Server</h2>
<p>Current server may be overloaded or blocked. Select a server in different country. Most VPNs offer many options.</p>

<h2>Change VPN Protocol</h2>
<p>OpenVPN may be blocked on some networks. Try IKEv2 or WireGuard instead. Check VPN app settings for protocol options.</p>

<h2>Temporarily Disable Firewall</h2>
<p>Firewall may block VPN connections. Disable briefly to test. If VPN works, add exception for VPN application.</p>

<h2>Flush DNS Cache</h2>
<p>Open Command Prompt. Run "ipconfig /flushdns". DNS issues can prevent VPN connections.</p>

<h2>Update VPN App</h2>
<p>Outdated VPN software causes problems. Check for updates in the app. Download latest version from official website.</p>

<h2>Reinstall TAP Adapter</h2>
<p>Device Manager > Network adapters. Uninstall TAP adapters. Reinstall VPN software to restore them.</p>

<h2>Conclusion</h2>
<p>Server and protocol changes resolve most issues. If still failing, try different VPN service or contact support.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'Fixing Discord Voice and Video Issues',
        slug: 'fix-discord-voice-video-en',
        tags: ['Discord', 'Voice', 'Video', 'Gaming', 'Communication'],
        excerpt: 'Resolve Discord audio, voice chat, and video problems.',
        content: `<h2>Check Discord Status</h2>
<p>Visit status.discord.com first. Discord outages happen. If services are down, wait for Discord to fix.</p>

<h2>Audio Settings</h2>
<p>User Settings > Voice & Video. Verify Input and Output devices are correct. Test with the built-in test buttons.</p>

<h2>Reset Voice Settings</h2>
<p>Scroll to bottom of Voice & Video settings. Click "Reset Voice Settings". Restores defaults which often fixes issues.</p>

<h2>Disable Hardware Acceleration</h2>
<p>Settings > Advanced > Hardware Acceleration. Turn off. Causes problems on some systems.</p>

<h2>Clear Discord Cache</h2>
<p>Press Win+R, type %appdata%/discord. Delete Cache, Code Cache, and GPUCache folders. Restart Discord.</p>

<h2>Update or Reinstall Discord</h2>
<p>Press Ctrl+R to refresh Discord. If issues persist, completely reinstall the application.</p>

<h2>Conclusion</h2>
<p>Reset Voice Settings fixes most audio problems. Corrupted cache commonly causes issues. Discord is reliable after proper setup.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'Games Crashing - Troubleshooting Guide',
        slug: 'fix-games-crashing-en',
        tags: ['Gaming', 'Crash', 'GPU', 'Performance', 'PC Gaming'],
        excerpt: 'Fix game crashes, freezes, and unexpected exits on PC.',
        content: `<h2>Update Graphics Drivers</h2>
<p>Most important step. Download latest from NVIDIA or AMD website. Game-specific optimizations included in updates.</p>

<h2>Verify Game Files</h2>
<p>In Steam: right-click game > Properties > Verify integrity of game files. Finds and repairs corrupted files.</p>

<h2>Lower Graphics Settings</h2>
<p>High settings stress hardware. Reduce resolution and graphics quality. Monitor temperatures during gameplay.</p>

<h2>Check Temperatures</h2>
<p>GPU overheating causes crashes. Use MSI Afterburner to monitor. Clean computer and improve cooling if needed.</p>

<h2>Disable Overlays</h2>
<p>Discord Overlay and GeForce Experience can conflict. Disable them temporarily to test. Enable once stability confirmed.</p>

<h2>Update Windows and DirectX</h2>
<p>Ensure Windows is fully updated. Install latest DirectX and Visual C++ redistributables from Microsoft.</p>

<h2>Conclusion</h2>
<p>Graphics drivers cause 70% of game crashes. Heat and overlays are common secondary causes.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80',
        readingTime: 7,
    },
    {
        title: 'GPU Not Working Properly - Fixes',
        slug: 'fix-gpu-problems-en',
        tags: ['GPU', 'Graphics Card', 'NVIDIA', 'AMD', 'Display'],
        excerpt: 'Troubleshoot graphics card issues from detection to performance.',
        content: `<h2>Check Physical Connection</h2>
<p>Ensure GPU power cables are connected securely. Modern GPUs need 6-pin or 8-pin power connectors. Check card is seated properly in PCIe slot.</p>

<h2>Update or Reinstall Drivers</h2>
<p>Use DDU (Display Driver Uninstaller) for clean removal. Install latest drivers fresh. Solves most software-related GPU issues.</p>

<h2>Check Device Manager</h2>
<p>Does GPU appear? Is there a warning symbol? Update driver or disable/enable the device. Missing GPU indicates hardware issue.</p>

<h2>BIOS Settings</h2>
<p>Ensure Primary Display is set to PCIe. Some boards need manual GPU enabling. Check motherboard documentation.</p>

<h2>Monitor Temperature</h2>
<p>Overheating causes throttling and crashes. Use HWiNFO to monitor temps. Clean fan and consider repasting thermal compound.</p>

<h2>Stress Test</h2>
<p>Run FurMark to test stability. Crashes indicate hardware problems. Compare benchmarks to expected performance.</p>

<h2>Conclusion</h2>
<p>DDU with clean driver installation resolves most issues. Physical problems require inspection or replacement.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&q=80',
        readingTime: 7,
    },
    {
        title: 'Network Not Available - Solutions',
        slug: 'fix-network-not-available-en',
        tags: ['Network', 'Connection', 'Internet', 'WiFi', 'Windows'],
        excerpt: 'Fix "network not available" errors and connection failures.',
        content: `<h2>Restart Modem and Router</h2>
<p>Disconnect power for 30 seconds. Start modem first, wait for connection. Then restart router. Fixes 50% of issues.</p>

<h2>Run Network Troubleshooter</h2>
<p>Settings > Network & Internet > Network troubleshooter. Windows diagnoses and attempts automatic repair.</p>

<h2>Reset Network Settings</h2>
<p>Settings > Network & Internet > Advanced > Network reset. Restores all network settings to default. You'll need to reconnect to networks.</p>

<h2>Update Network Driver</h2>
<p>Device Manager > Network adapters. Update driver for your adapter. Or uninstall and restart for automatic reinstallation.</p>

<h2>Reset TCP/IP Stack</h2>
<p>Command Prompt as Administrator. Run "netsh int ip reset" then "netsh winsock reset". Restart computer after.</p>

<h2>Check Cables</h2>
<p>For wired connections: try different Ethernet cable. Ensure proper port connection on router. LEDs should light up.</p>

<h2>Conclusion</h2>
<p>Modem/router restart is always first step. Network reset is powerful but requires reconfiguration afterwards.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'Google Play Store Issues - Fixes',
        slug: 'fix-google-play-store-issues-en',
        tags: ['Play Store', 'Android', 'Apps', 'Download', 'Google'],
        excerpt: 'Resolve Google Play Store download failures and errors.',
        content: `<h2>Check Internet Connection</h2>
<p>Play Store needs internet. Test by opening a website in browser. If browsing works, the issue is Play Store specific.</p>

<h2>Clear Cache and Data</h2>
<p>Settings > Apps > Google Play Store > Storage > Clear cache, then Clear data. Forces fresh start.</p>

<h2>Clear Google Services Cache</h2>
<p>Also clear cache for Google Play Services and Google Services Framework. All three work together.</p>

<h2>Check Date and Time</h2>
<p>Wrong date causes Play Store errors. Settings > Date & time > Automatic. Ensure correct time zone.</p>

<h2>Remove and Re-add Google Account</h2>
<p>Settings > Accounts > Google > Remove. Restart phone. Add account again.</p>

<h2>Update Play Store Manually</h2>
<p>Download latest APK from trusted source like APKMirror. Install manually. Updates bypasses broken version.</p>

<h2>Conclusion</h2>
<p>Clearing cache for Play Store and related services solves 90% of issues. Date/time is a hidden common cause.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=800&q=80',
        readingTime: 6,
    },
];
