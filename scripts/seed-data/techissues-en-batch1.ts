// English Tech Issues - Batch 1 (Articles 1-10)
export const techissuesEnBatch1 = [
    {
        title: 'How to Fix Windows 11 Running Slowly',
        slug: 'fix-windows-11-running-slow-en',
        tags: ['Windows 11', 'Performance', 'Slow PC', 'Optimization', 'Troubleshooting'],
        excerpt: 'Step-by-step solutions to speed up a sluggish Windows 11 computer.',
        content: `<h2>Identify the Cause</h2>
<p>Open Task Manager with Ctrl+Shift+Esc. Sort by CPU, Memory, and Disk usage. Identify which process is consuming resources excessively.</p>

<h2>Disable Startup Programs</h2>
<p>Task Manager > Startup tab. Disable unnecessary programs that launch at boot. Fewer startup items means faster boot times.</p>

<h2>Run Disk Cleanup</h2>
<p>Search for Disk Cleanup. Select the system drive (usually C:). Clean up system files for maximum space recovery.</p>

<h2>Disable Visual Effects</h2>
<p>System Properties > Advanced > Performance Settings. Choose "Adjust for best performance" or selectively disable effects.</p>

<h2>Check for Malware</h2>
<p>Run Windows Security full scan. Malware commonly causes slowdowns. Consider using Malwarebytes for additional scanning.</p>

<h2>Update Drivers</h2>
<p>Outdated drivers cause performance issues. Windows Update often includes driver updates. Check manufacturer websites for graphics drivers.</p>

<h2>Conclusion</h2>
<p>Most slowdowns come from too many startup programs or resource-heavy apps. Regular maintenance prevents performance degradation.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&q=80',
        readingTime: 7,
    },
    {
        title: 'Fixing Blue Screen of Death (BSOD) Errors',
        slug: 'fix-bsod-blue-screen-errors-en',
        tags: ['BSOD', 'Windows', 'Crash', 'Driver', 'Error'],
        excerpt: 'Understanding and resolving Windows Blue Screen of Death errors effectively.',
        content: `<h2>Understanding BSOD</h2>
<p>The Blue Screen of Death indicates a critical system error. Windows stops to prevent hardware damage. Note the error code displayed—it's crucial for diagnosis.</p>

<h2>Boot into Safe Mode</h2>
<p>If Windows crashes repeatedly, boot into Safe Mode. Hold Shift while clicking Restart. Choose Troubleshoot > Advanced Options > Startup Settings.</p>

<h2>Update or Rollback Drivers</h2>
<p>Graphics drivers are common culprits. Use Device Manager to update or roll back recently changed drivers. Consider using DDU for clean installation.</p>

<h2>Run System File Checker</h2>
<p>Open Command Prompt as Administrator. Run "sfc /scannow" to repair corrupted system files. Follow with "DISM /Online /Cleanup-Image /RestoreHealth".</p>

<h2>Check Memory</h2>
<p>Search for Windows Memory Diagnostic. Run on restart. Faulty RAM frequently causes BSODs. Replace any failing memory modules.</p>

<h2>Analyze Crash Dumps</h2>
<p>BlueScreenView software reads crash dump files. It identifies the exact driver causing crashes. Target your fixes precisely.</p>

<h2>Conclusion</h2>
<p>Most BSODs stem from driver issues or faulty hardware. Systematic troubleshooting usually identifies the cause.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80',
        readingTime: 8,
    },
    {
        title: 'WiFi Connected But No Internet Access',
        slug: 'wifi-connected-no-internet-en',
        tags: ['WiFi', 'Internet', 'Network', 'Connectivity', 'Router'],
        excerpt: 'Troubleshooting guide when WiFi shows connected but there is no internet access.',
        content: `<h2>Restart Network Equipment</h2>
<p>Power off your modem and router for 30 seconds. Restart the modem first, wait for connection, then restart the router. This solves most issues.</p>

<h2>Run Network Troubleshooter</h2>
<p>Settings > Network & Internet > Network troubleshooter. Let Windows diagnose and attempt automatic repairs.</p>

<h2>Release and Renew IP</h2>
<p>Open Command Prompt as Administrator. Run "ipconfig /release" then "ipconfig /renew". This obtains a fresh IP address from your router.</p>

<h2>Flush DNS Cache</h2>
<p>In the same Command Prompt, run "ipconfig /flushdns". Corrupted DNS cache causes connectivity issues despite valid connections.</p>

<h2>Try Different DNS Servers</h2>
<p>Change DNS to 8.8.8.8 (Google) or 1.1.1.1 (Cloudflare). Network settings > IP assignment > Edit > Manual DNS.</p>

<h2>Forget and Reconnect</h2>
<p>In WiFi settings, click on the network > Forget. Reconnect and enter password again. Refreshes the connection completely.</p>

<h2>Conclusion</h2>
<p>Most "connected but no internet" issues are router-related. Restarting equipment solves the majority of cases.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
        readingTime: 7,
    },
    {
        title: 'How to Fix Bluetooth Not Working on Windows',
        slug: 'fix-bluetooth-not-working-windows-en',
        tags: ['Bluetooth', 'Windows', 'Connectivity', 'Driver', 'Troubleshooting'],
        excerpt: 'Solutions for Bluetooth connection problems and pairing failures on Windows.',
        content: `<h2>Check Bluetooth is Enabled</h2>
<p>Open Action Center (Win+A) and verify Bluetooth is on. Also check if Airplane Mode is accidentally enabled—it disables Bluetooth.</p>

<h2>Run Bluetooth Troubleshooter</h2>
<p>Settings > System > Troubleshoot > Other troubleshooters > Bluetooth. Let Windows attempt automatic repairs.</p>

<h2>Restart Bluetooth Service</h2>
<p>Press Win+R, type "services.msc". Find Bluetooth Support Service. Right-click and Restart. Set Startup type to Automatic.</p>

<h2>Update Bluetooth Driver</h2>
<p>Device Manager > Bluetooth > right-click adapter > Update driver. Or visit manufacturer website for latest version.</p>

<h2>Remove and Re-pair Device</h2>
<p>Delete the problematic device from Bluetooth settings. Put the device in pairing mode. Add it again from scratch.</p>

<h2>Check for Interference</h2>
<p>USB 3.0 devices can interfere with Bluetooth. Move them away from Bluetooth adapter. WiFi on same frequency band also causes issues.</p>

<h2>Conclusion</h2>
<p>Driver issues cause most Bluetooth problems. Updating drivers and re-pairing devices typically resolves connectivity issues.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
        readingTime: 7,
    },
    {
        title: 'Fixing Laptop Overheating Issues',
        slug: 'fix-laptop-overheating-issues-en',
        tags: ['Overheating', 'Laptop', 'Cooling', 'Temperature', 'Hardware'],
        excerpt: 'Prevent and fix laptop overheating problems to protect performance and hardware.',
        content: `<h2>Clean the Vents and Fan</h2>
<p>Dust blocks airflow causing overheating. Use compressed air to clean vents. For thorough cleaning, consider professional service to access the fan.</p>

<h2>Use on Hard Surfaces</h2>
<p>Soft surfaces like beds block bottom vents. Always use laptop on hard, flat surfaces. Laptop stands improve airflow significantly.</p>

<h2>Check Running Programs</h2>
<p>High CPU usage generates heat. Close unnecessary programs. Task Manager shows which processes consume the most resources.</p>

<h2>Adjust Power Settings</h2>
<p>Power Options > Choose a power plan > Change plan settings. Reduce maximum processor state to limit heat generation.</p>

<h2>Replace Thermal Paste</h2>
<p>Old thermal paste loses effectiveness. Applying new paste improves heat transfer. This requires laptop disassembly—consider professional help.</p>

<h2>External Cooling Solutions</h2>
<p>Laptop cooling pads with fans reduce temperatures effectively. Essential for gaming or intensive work. Choose pads matching your laptop size.</p>

<h2>Conclusion</h2>
<p>Regular cleaning and proper placement prevent most overheating. Address thermal issues before permanent hardware damage occurs.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
        readingTime: 7,
    },
    {
        title: 'How to Recover Deleted Files in Windows',
        slug: 'recover-deleted-files-windows-en',
        tags: ['Recovery', 'Deleted Files', 'Recycle Bin', 'Data', 'Windows'],
        excerpt: 'Methods to recover accidentally deleted files from Windows computers.',
        content: `<h2>Check Recycle Bin First</h2>
<p>Deleted files go to Recycle Bin initially. Open it, find your file, right-click and select Restore. The file returns to its original location.</p>

<h2>Use File History</h2>
<p>If enabled, File History saves file versions. Right-click folder > Properties > Previous Versions. Select a date before deletion.</p>

<h2>Windows Backup</h2>
<p>Control Panel > Backup and Restore. Select "Restore my files" to recover from backups. Only works if backup was previously configured.</p>

<h2>Windows File Recovery Tool</h2>
<p>Microsoft's free command-line tool. Install from Microsoft Store. Run winfr commands to recover from formatted or corrupted drives.</p>

<h2>Third-Party Recovery Software</h2>
<p>Recuva, EaseUS, and Disk Drill scan for recoverable files. Work best when used immediately after deletion. Stop using the drive to prevent overwriting.</p>

<h2>Prevent Future Loss</h2>
<p>Enable File History for automatic backups. Use OneDrive or other cloud backup. Backup is always better than recovery.</p>

<h2>Conclusion</h2>
<p>Quick action improves recovery chances. Stop using the drive immediately. Professional data recovery services exist for critical situations.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
        readingTime: 7,
    },
    {
        title: 'Phone Not Charging - Causes and Solutions',
        slug: 'phone-not-charging-solutions-en',
        tags: ['Phone', 'Charging', 'Battery', 'USB', 'Troubleshooting'],
        excerpt: 'Troubleshoot and fix smartphone charging problems from cables to ports.',
        content: `<h2>Try Different Cables</h2>
<p>Cables fail frequently, especially cheap ones. Try a different cable before assuming phone issues. Inspect cables for damage at connection points.</p>

<h2>Test Multiple Chargers</h2>
<p>The charging brick could be faulty. Test with known-working chargers. Use certified chargers matching your phone's specifications.</p>

<h2>Clean the Charging Port</h2>
<p>Pocket lint and dust accumulate in ports. Gently clean with a toothpick or soft brush. Avoid metal objects that could damage contacts.</p>

<h2>Check for Debris Blocking Connection</h2>
<p>Inspect the port with a flashlight. Compressed air helps remove stubborn debris. Proper connection is essential for charging.</p>

<h2>Restart Your Phone</h2>
<p>Software glitches can stop charging. Restart the phone and try again. This simple step often resolves unexpected issues.</p>

<h2>Check Battery Health</h2>
<p>Old batteries lose capacity. iPhone: Settings > Battery > Battery Health. Very old batteries may need replacement.</p>

<h2>Conclusion</h2>
<p>Cables and dirty ports cause most charging issues. If all else fails, professional inspection can identify hardware problems.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=800&q=80',
        readingTime: 6,
    },
    {
        title: 'Fixing Windows Update Error 0x80070005',
        slug: 'fix-windows-update-error-0x80070005-en',
        tags: ['Windows Update', 'Error', 'Permissions', 'Access Denied', 'Fix'],
        excerpt: 'How to resolve the Access Denied error 0x80070005 preventing Windows updates.',
        content: `<h2>Understanding the Error</h2>
<p>Error 0x80070005 indicates an access denied issue. Windows Update cannot access required files. Permission or corruption problems are typical causes.</p>

<h2>Run as Administrator</h2>
<p>Run Windows Update from elevated Command Prompt. Right-click Start > Terminal (Admin). Run "sfc /scannow" first to repair system files.</p>

<h2>Reset Windows Update Components</h2>
<p>Stop services: wuauserv, cryptSvc, bits, msiserver. Delete contents of SoftwareDistribution and catroot2 folders. Restart the services.</p>

<h2>Take Ownership</h2>
<p>Run "takeown /f C:\Windows\System32\*.* /r /d y" as Administrator. Then "icacls C:\Windows\System32\*.* /grant administrators:F /t".</p>

<h2>Clean Boot Update</h2>
<p>Perform a clean boot to disable third-party software. Search for msconfig, hide Microsoft services, disable all others. Try updating again.</p>

<h2>Use Media Creation Tool</h2>
<p>Download Windows Media Creation Tool. Choose "Upgrade this PC now". This performs an in-place upgrade that fixes most issues.</p>

<h2>Conclusion</h2>
<p>Resetting Update components solves this error for most users. The Media Creation Tool is effective for persistent problems.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=800&q=80',
        readingTime: 8,
    },
    {
        title: 'No Sound on Computer - Troubleshooting Guide',
        slug: 'fix-no-sound-computer-en',
        tags: ['Sound', 'Audio', 'Speakers', 'Driver', 'Windows'],
        excerpt: 'Comprehensive guide to fixing no audio or sound issues on Windows computers.',
        content: `<h2>Check Volume and Mute</h2>
<p>Start with the obvious—check if volume is muted. Click the speaker icon and verify volume level. Check application-specific volumes in Volume Mixer.</p>

<h2>Verify Correct Output Device</h2>
<p>Right-click speaker icon > Sound settings. Ensure the correct output device is selected. Windows sometimes switches to wrong device.</p>

<h2>Run Audio Troubleshooter</h2>
<p>Settings > System > Sound > Troubleshoot. Let Windows diagnose and suggest fixes. Often resolves common audio issues automatically.</p>

<h2>Update Audio Drivers</h2>
<p>Device Manager > Sound > right-click audio device > Update driver. Or visit your PC manufacturer's website for correct drivers.</p>

<h2>Restart Windows Audio Service</h2>
<p>Press Win+R, type "services.msc". Find Windows Audio, right-click and Restart. Also restart Windows Audio Endpoint Builder.</p>

<h2>Check Physical Connections</h2>
<p>Ensure speakers or headphones are properly connected. Test with different headphones. Check if speakers are powered on.</p>

<h2>Conclusion</h2>
<p>Most sound issues stem from incorrect output selection or driver problems. Systematic checking resolves the vast majority of cases.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80',
        readingTime: 7,
    },
    {
        title: 'Touchscreen Not Working - Fix Guide',
        slug: 'fix-touchscreen-not-working-en',
        tags: ['Touchscreen', 'Display', 'Touch', 'Windows', 'Calibration'],
        excerpt: 'Solutions for unresponsive or inaccurate touchscreen problems on devices.',
        content: `<h2>Clean the Screen</h2>
<p>Dirt and smudges affect touch sensitivity. Clean with a microfiber cloth. Remove screen protectors temporarily to test.</p>

<h2>Restart the Device</h2>
<p>A simple restart resolves many touchscreen glitches. For phones, try a force restart. Hold power button for 10-15 seconds.</p>

<h2>Check Touch Settings</h2>
<p>Settings > Bluetooth & devices > Touch. Verify touch is enabled. Some devices have toggle switches.</p>

<h2>Recalibrate Touchscreen</h2>
<p>Control Panel > Hardware and Sound > Tablet PC Settings. Click Calibrate and follow instructions. Improves touch accuracy.</p>

<h2>Update Touch Drivers</h2>
<p>Device Manager > Human Interface Devices. Update HID-compliant touch screen driver. Or uninstall and restart for automatic reinstallation.</p>

<h2>Check for Physical Damage</h2>
<p>Cracked screens may lose touch in damaged areas. Water damage affects touch sensitivity. Professional repair may be necessary.</p>

<h2>Conclusion</h2>
<p>Driver updates and calibration fix most software-related touch issues. Physical damage requires professional repair or screen replacement.</p>`,
        coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
        readingTime: 6,
    },
];
