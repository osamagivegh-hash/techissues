// English Tech Issues - Batch 4 (Articles 31-40)
export const techissuesEnBatch4 = [
    {
        title: 'Microphone Not Working - Fix Guide',
        slug: 'fix-microphone-not-working-en',
        tags: ['Microphone', 'Audio', 'Recording', 'Windows', 'Permissions'],
        excerpt: 'Troubleshoot and fix microphone issues on Windows computers.',
        content: `<h2>Check Privacy Permissions</h2>
<p>Settings > Privacy > Microphone. Ensure microphone access is enabled. Check that the specific app has permission.</p>

<h2>Select Correct Input Device</h2>
<p>Settings > Sound > Input. Choose the correct microphone. Many systems have multiple input options that cause confusion.</p>

<h2>Adjust Input Volume</h2>
<p>In Sound settings, check input volume isn't too low. Test microphone and watch the input level indicator.</p>

<h2>Update Audio Driver</h2>
<p>Device Manager > Audio inputs and outputs > Update driver. Or uninstall and restart for automatic reinstallation.</p>

<h2>Run Audio Troubleshooter</h2>
<p>Settings > Troubleshoot > Recording Audio. Windows attempts automatic diagnosis and repair.</p>

<h2>Check Physical Connection</h2>
<p>For external mics: try different USB port. Test microphone on another device. Verify cable isn't damaged.</p>

<h2>Conclusion</h2>
<p>Privacy permissions are the most common issue. Selecting wrong input device is frequently overlooked. Most problems are software-related.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'Fixing DPC Watchdog Violation Error',
        slug: 'fix-dpc-watchdog-violation-en',
        tags: ['BSOD', 'Windows', 'Driver', 'SSD', 'Error'],
        excerpt: 'Resolve the DPC_WATCHDOG_VIOLATION blue screen error.',
        content: `<h2>Understanding the Error</h2>
<p>This error occurs when hardware or driver takes too long to respond. Usually related to SSD or graphics card drivers. Requires targeted troubleshooting.</p>

<h2>Update SSD Driver</h2>
<p>Most common cause. Download AHCI or NVMe driver from SSD manufacturer. Intel Rapid Storage Technology may help.</p>

<h2>Update Graphics Driver</h2>
<p>Second most common cause. Use DDU for clean removal. Install fresh driver from NVIDIA or AMD.</p>

<h2>Check SATA Cable</h2>
<p>Faulty SATA cables cause this error. Replace cable or try different port. For NVMe, ensure proper installation.</p>

<h2>Run SFC and DISM</h2>
<p>Command Prompt as Administrator: "sfc /scannow" then "DISM /Online /Cleanup-Image /RestoreHealth". Repairs system files.</p>

<h2>Boot into Safe Mode</h2>
<p>If Windows won't start, use Safe Mode to update drivers. Access through Advanced Startup Options.</p>

<h2>Conclusion</h2>
<p>SSD driver is the cause in most cases. Update it first. Check cables if problem persists.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80',
        readingTime: 7,
    },
    {
        title: 'iOS Apps Crashing - How to Fix',
        slug: 'fix-ios-apps-crashing-en',
        tags: ['iOS', 'iPhone', 'Apps', 'Crash', 'Apple'],
        excerpt: 'Solutions for iPhone apps that crash or freeze unexpectedly.',
        content: `<h2>Restart iPhone</h2>
<p>Simple but effective. Restart clears memory and stops problematic processes. Should be your first troubleshooting step.</p>

<h2>Update the App</h2>
<p>Open App Store > Updates. Install pending updates. Developers fix crash bugs regularly.</p>

<h2>Update iOS</h2>
<p>Settings > General > Software Update. Updated iOS improves app compatibility. Security patches also included.</p>

<h2>Delete and Reinstall App</h2>
<p>Long-press app > Remove App > Delete. Reinstall from App Store. Fresh installation often resolves issues.</p>

<h2>Free Up Storage</h2>
<p>Settings > General > iPhone Storage. Low storage causes crashes. Delete unused apps and files.</p>

<h2>Reset All Settings</h2>
<p>Settings > General > Reset > Reset All Settings. Doesn't delete data but resets system settings. Often fixes stubborn issues.</p>

<h2>Conclusion</h2>
<p>Updates and reinstallation solve most crashes. iOS apps are generally reliable—persistent issues may indicate hardware problems.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'Wireless Charging Not Working - Fixes',
        slug: 'fix-wireless-charging-not-working-en',
        tags: ['Wireless Charging', 'Qi', 'Phone', 'Battery', 'Hardware'],
        excerpt: 'Troubleshoot wireless charging problems on smartphones.',
        content: `<h2>Check Compatibility</h2>
<p>Verify your phone supports Qi wireless charging. Not all phones have this feature. Check specifications.</p>

<h2>Remove Phone Case</h2>
<p>Thick or metal cases block charging. Remove case and try again. Thin plastic cases usually work fine.</p>

<h2>Center the Phone</h2>
<p>Position phone precisely on charging pad. Coils must align properly. Experiment with positioning.</p>

<h2>Clean Both Surfaces</h2>
<p>Clean phone back and charger surface. Dirt and debris interrupt charging. Use soft, dry cloth.</p>

<h2>Test the Charger</h2>
<p>Try a different phone on the charger. Try your phone on different charger. Identifies which device is problematic.</p>

<h2>Restart Your Phone</h2>
<p>Software glitch may disable charging. Restart and try again. Simple but sometimes necessary.</p>

<h2>Conclusion</h2>
<p>Positioning and cases are most common issues. If no chargers work, the phone's wireless charging may be damaged.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'Windows Not Detecting Hard Drive',
        slug: 'windows-not-detecting-hard-drive-en',
        tags: ['Hard Drive', 'Storage', 'BIOS', 'Windows', 'Hardware'],
        excerpt: 'Fix hard drive detection issues in Windows and BIOS.',
        content: `<h2>Check BIOS First</h2>
<p>Enter BIOS (Del or F2 at startup). Check if drive appears. If not visible in BIOS, the issue is physical.</p>

<h2>Use Disk Management</h2>
<p>Press Win+X > Disk Management. Drive may appear but need initialization. Right-click > Initialize Disk if needed.</p>

<h2>Assign Drive Letter</h2>
<p>Drive visible in Disk Management but not Explorer? Right-click > Change Drive Letter. Assign an available letter.</p>

<h2>Update SATA Driver</h2>
<p>Device Manager > Storage controllers. Update driver. Outdated driver may not recognize newer drives.</p>

<h2>Check Cables</h2>
<p>SATA data and power cables may be loose. Try different cables and ports. Common issue after moving computer.</p>

<h2>BIOS Settings</h2>
<p>Ensure SATA controller is enabled. Try AHCI vs IDE mode. Check motherboard documentation for options.</p>

<h2>Conclusion</h2>
<p>If BIOS doesn't see the drive, it's a cable or drive failure. If BIOS sees it but Windows doesn't, it's a software issue.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&q=80',
        readingTime: 7,
    },
    {
        title: 'Screen Flickering - How to Fix',
        slug: 'fix-screen-flickering-en',
        tags: ['Screen', 'Flicker', 'Display', 'Driver', 'Windows'],
        excerpt: 'Resolve monitor flickering and display flashing issues.',
        content: `<h2>Identify the Cause</h2>
<p>Open Task Manager. If Task Manager flickers too, it's a display driver issue. If not, an app is causing it.</p>

<h2>Update Display Driver</h2>
<p>If Task Manager flickered, update GPU driver. Use DDU for clean installation. Download from NVIDIA, AMD, or Intel.</p>

<h2>Disable Problematic App</h2>
<p>If Task Manager didn't flicker, an app causes it. Antivirus and iCloud are common culprits. Disable and test.</p>

<h2>Change Refresh Rate</h2>
<p>Settings > Display > Advanced display settings. Try different refresh rate. 60Hz is most stable.</p>

<h2>Check Monitor Cable</h2>
<p>For external monitors, try different HDMI or DisplayPort cable. Faulty cables cause flickering.</p>

<h2>Disable Hardware Acceleration</h2>
<p>In Chrome or affected app settings, disable hardware acceleration. Can cause flickering on some systems.</p>

<h2>Conclusion</h2>
<p>Task Manager test determines if driver or app issue. Most cases resolve with driver update.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1616763355603-9755a640a287?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'USB Device Not Recognized - Solutions',
        slug: 'fix-usb-device-not-recognized-en',
        tags: ['USB', 'Flash Drive', 'Hardware', 'Windows', 'Driver'],
        excerpt: 'Fix "USB Device Not Recognized" error messages on Windows.',
        content: `<h2>Try Different USB Port</h2>
<p>Simplest test. USB ports can fail. Try rear ports on desktop computers—they're directly connected to motherboard.</p>

<h2>Test on Another Computer</h2>
<p>Determines if USB device or computer is the problem. Works elsewhere means computer issue.</p>

<h2>Update USB Controllers</h2>
<p>Device Manager > Universal Serial Bus controllers. Update driver for all items. Or uninstall and restart.</p>

<h2>Uninstall and Reconnect</h2>
<p>In Device Manager, uninstall the unrecognized device. Disconnect USB and reconnect. Windows reinstalls driver.</p>

<h2>Disable USB Selective Suspend</h2>
<p>Power Options > Change plan settings > Advanced > USB settings. Disable Selective suspend. Saves power but causes issues.</p>

<h2>Check Power Requirements</h2>
<p>Some USB devices need more power. Use powered USB hub. Insufficient power causes recognition failures.</p>

<h2>Conclusion</h2>
<p>Most issues resolve with port change or driver update. Faulty USB devices are also common—test elsewhere.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1618410320928-25228d811631?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'Zoom Video and Audio Problems - Fixes',
        slug: 'fix-zoom-video-audio-problems-en',
        tags: ['Zoom', 'Video', 'Conference', 'Camera', 'Audio'],
        excerpt: 'Troubleshoot Zoom video calls, camera, and microphone issues.',
        content: `<h2>Update Zoom</h2>
<p>Ensure latest version installed. Zoom releases frequent updates. Check for updates in the app settings.</p>

<h2>Audio Settings</h2>
<p>In Zoom, Settings > Audio. Select correct speaker and microphone. Use Test buttons to verify they work.</p>

<h2>Video Settings</h2>
<p>Settings > Video. Select correct camera. Close other apps using camera. Only one app can access camera at once.</p>

<h2>Low Video Quality</h2>
<p>Check internet speed. Close bandwidth-heavy applications. Use Ethernet instead of WiFi for stability.</p>

<h2>Virtual Background Issues</h2>
<p>Requires powerful CPU. Settings > Background & Effects > "I have a green screen." Disable if causing problems.</p>

<h2>Close Other Applications</h2>
<p>Zoom is resource-intensive. Close unnecessary apps. Especially browsers with many tabs.</p>

<h2>Conclusion</h2>
<p>Most Zoom problems come from wrong device selection or slow internet. Updates and correct settings usually resolve issues.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1587759537854-eab9f3c32da8?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'Not Receiving Emails - Troubleshooting',
        slug: 'fix-not-receiving-emails-en',
        tags: ['Email', 'Outlook', 'Gmail', 'Receiving', 'Spam'],
        excerpt: 'Fix email delivery problems and missing messages.',
        content: `<h2>Check Spam/Junk Folder</h2>
<p>First place to look. Important emails often go to spam. Mark legitimate emails as "Not spam" and add sender to contacts.</p>

<h2>Check Storage Quota</h2>
<p>Full mailbox rejects new messages. Delete old emails or upgrade storage. Especially important for free accounts.</p>

<h2>Sync/Refresh</h2>
<p>In Gmail or Outlook, pull down to refresh. Sync may be delayed. Ensure automatic sync is enabled.</p>

<h2>Check Filters/Rules</h2>
<p>You may have rules auto-deleting or moving emails. Review filters in email settings. Unexpected rules cause missing mail.</p>

<h2>Re-add Email Account</h2>
<p>In email app, remove account and add again. Forces fresh sync. May resolve connection issues.</p>

<h2>Send Test Email to Yourself</h2>
<p>Send email to your own address. If it arrives, problem is sender-side. Ask sender to check your address.</p>

<h2>Conclusion</h2>
<p>Spam folder is the most common cause. Full storage prevents receiving. Most issues aren't technical but settings-related.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1563986768711-b3bde3dc821e?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'Touch ID Not Working - How to Fix',
        slug: 'fix-touch-id-not-working-en',
        tags: ['Touch ID', 'Fingerprint', 'iPhone', 'Mac', 'Apple'],
        excerpt: 'Resolve Touch ID fingerprint recognition failures.',
        content: `<h2>Clean the Button and Finger</h2>
<p>Moisture and oils prevent accurate reading. Dry your finger and wipe Home button with soft cloth.</p>

<h2>Re-register Fingerprints</h2>
<p>Settings > Touch ID & Passcode. Delete existing fingerprints. Register new ones slowly and precisely.</p>

<h2>Register Multiple Angles</h2>
<p>Register same finger twice from different angles. Or register multiple fingers. Improves recognition success.</p>

<h2>Restart Device</h2>
<p>Temporary software glitch may disable Touch ID. Restart iPhone or Mac and try again.</p>

<h2>Update iOS/macOS</h2>
<p>Updates fix Touch ID bugs. Ensure system software is current.</p>

<h2>Reset All Settings</h2>
<p>Settings > General > Reset > Reset All Settings. Doesn't delete data but resets system preferences.</p>

<h2>Conclusion</h2>
<p>Cleaning and re-registering solve most issues. If all else fails, hardware damage may require repair.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&q=80',
        readingTime: 6,
    },
];
