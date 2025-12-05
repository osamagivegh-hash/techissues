@echo off
echo Staging changes...
git add lib/utils.ts

echo.
echo Committing changes...
git commit -m "Fix: Auto-generate slugs for Arabic titles with transliteration support"

echo.
echo Pushing to remote...
git push origin main

echo.
echo Done!

